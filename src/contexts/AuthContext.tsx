
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/api/axiosInstance';
import { useToast } from "@/components/ui/use-toast";

// Define the User type based on your backend response
interface User {
  username: string;
  isInitialPassword: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (credentials: any, userType: 'admin' | 'vendor') => Promise<void>;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log('[AUTH] AuthProvider useEffect running');
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('jwtToken');
      console.log('[AUTH] Found stored token:', !!storedToken);
      if (storedToken) {
        setToken(storedToken);
        // Note: Your backend doesn't seem to have a "me" endpoint, 
        // so we'll rely on the login response to set user data
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (credentials: any, userType: 'admin' | 'vendor') => {
    console.log('[LOGIN] Starting login process for userType:', userType);
    setIsLoading(true);
    
    const loginUrl = userType === 'admin' ? '/admin/auth/login' : '/vendor/auth/login';
    
    try {
      console.log('[LOGIN] Attempting login to', loginUrl);
      const response = await axiosInstance.post(loginUrl, {
        username: credentials.username,
        password: credentials.password
      });
      
      console.log('[LOGIN] Login response received:', response.data);
      
      const { jwtToken, username, isInitialPassword } = response.data;
      
      if (!jwtToken) {
        console.error('[LOGIN] No jwtToken in response');
        throw new Error('No authentication token received');
      }

      // Store token and update state
      localStorage.setItem('jwtToken', jwtToken);
      setToken(jwtToken);
      setUser({ username, isInitialPassword });
      console.log('[LOGIN] Token stored successfully, user set:', { username, isInitialPassword });

      if (isInitialPassword) {
        console.log('[LOGIN] Initial password detected, navigating to change password');
        navigate('/reset-password', { 
          state: { 
            flow: 'first-time', 
            userType,
            fromLogin: true 
          } 
        });
        toast({
          title: "Setup Your Account",
          description: "Please change your initial password to continue.",
        });
      } else {
        // Navigate to appropriate dashboard
        const dashboardUrl = userType === 'admin' ? '/admin-dashboard' : '/vendor-dashboard';
        console.log('[LOGIN] Navigating to dashboard:', dashboardUrl);
        navigate(dashboardUrl);
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${username}!`,
        });
      }
    } catch (error: any) {
      console.error("[LOGIN] Login failed with error:", error);
      
      // Clear any stored token on login failure
      localStorage.removeItem('jwtToken');
      setToken(null);
      setUser(null);
      
      const errorMessage = error.response?.data?.message || error.message || 'Invalid username or password.';
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    console.log('[CHANGE PASSWORD] Starting password change');
    try {
      const response = await axiosInstance.post('/admin/auth/change-password', {
        oldPassword,
        newPassword
      });
      
      console.log('[CHANGE PASSWORD] Password change response:', response.data);
      
      const { jwtToken, username, isInitialPassword } = response.data;
      
      // Update token and user state
      localStorage.setItem('jwtToken', jwtToken);
      setToken(jwtToken);
      setUser({ username, isInitialPassword });
      
      toast({
        title: "Password Changed",
        description: "Your password has been successfully updated.",
      });
      
      // Navigate to dashboard after successful password change
      navigate('/admin-dashboard');
      
    } catch (error: any) {
      console.error("[CHANGE PASSWORD] Password change failed:", error);
      const errorMessage = error.response?.data?.message || 'Failed to change password.';
      toast({
        title: "Password Change Failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    console.log('[AUTH] Logging out user');
    localStorage.removeItem('jwtToken');
    setToken(null);
    setUser(null);
    navigate('/login');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    isAuthenticated: !!token,
    token,
    user,
    login,
    logout,
    changePassword,
    isLoading,
  };

  console.log('[AUTH] AuthProvider render state:', {
    loading: isLoading,
    hasToken: !!token,
    hasUser: !!user,
    isAuthenticated: !!token,
    username: user?.username
  });

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};
