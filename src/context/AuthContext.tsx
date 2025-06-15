
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/api/axiosInstance';
import { useToast } from '@/hooks/use-toast';

interface User {
  username: string;
  isInitialPassword?: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  loginAdmin: (username: string, password: string) => Promise<User>;
  changeAdminPassword: (oldPassword: string, newPassword: string) => Promise<void>;
  forgotAdminPassword: (email: string) => Promise<void>;
  resetAdminPassword: (email: string, token: string, newPassword: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('jwtToken'));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const loginAdmin = async (username: string, password: string): Promise<User> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/admin/auth/login', { username, password });
      const { jwtToken, isInitialPassword } = response.data;
      const userData = { username, isInitialPassword };
      
      localStorage.setItem('jwtToken', jwtToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(jwtToken);
      setUser(userData);
      
      toast({ title: "Login Successful", description: "Welcome back!" });
      
      if (isInitialPassword) {
        navigate('/admin/change-password', { state: { fromLogin: true } });
      } else {
        navigate('/admin-dashboard');
      }
      return userData;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Invalid username or password.';
      setError(errorMessage);
      toast({ title: "Login Failed", description: errorMessage, variant: "destructive" });
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    navigate('/login');
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
  };
  
  const changeAdminPassword = async (oldPassword: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await axiosInstance.post('/admin/auth/change-password', { oldPassword, newPassword });
      toast({ title: "Success", description: "Password changed successfully." });
      logout(); // Force re-login with new password
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to change password.';
      setError(errorMessage);
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotAdminPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await axiosInstance.post('/admin/auth/forgot-password', { email });
      toast({ title: "Request Sent", description: "If an account exists, a reset code will be sent to your email." });
      navigate('/reset-password');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred.';
      setError(errorMessage);
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAdminPassword = async (email: string, token: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await axiosInstance.post('/admin/auth/reset-password', { email, token, newPassword });
      toast({ title: "Success", description: "Password has been reset. Please log in." });
      navigate('/login');
    } catch (err: any)      {
      const errorMessage = err.response?.data?.message || 'Invalid or expired token.';
      setError(errorMessage);
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated: !!token,
    user,
    token,
    isLoading,
    error,
    loginAdmin,
    logout,
    changeAdminPassword,
    forgotAdminPassword,
    resetAdminPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
