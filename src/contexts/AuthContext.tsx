
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/api/axiosInstance';
import { useToast } from "@/components/ui/use-toast";

// Define the User type based on expected profile data
interface User {
  username: string;
  name: string;
  role: string;
  lastLogin?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (credentials: any, userType: 'admin' | 'vendor') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchUserProfile = async () => {
    if (!localStorage.getItem('jwtToken')) return;
    try {
      const { data } = await axiosInstance.get<User>('/admin/auth/me');
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('jwtToken');
      if (storedToken) {
        setToken(storedToken);
        await fetchUserProfile();
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (credentials: any, userType: 'admin' | 'vendor') => {
    setIsLoading(true);
    const loginUrl = userType === 'admin' ? '/admin/auth/login' : '/vendor/auth/login';
    
    try {
      const response = await axiosInstance.post(loginUrl, credentials);
      const { jwtToken } = response.data;
      if (jwtToken) {
        localStorage.setItem('jwtToken', jwtToken);
        setToken(jwtToken);
        await fetchUserProfile();
        
        const dashboardUrl = userType === 'admin' ? '/admin-dashboard' : '/vendor-dashboard';
        navigate(dashboardUrl);

        toast({
            title: "Login Successful",
            description: "Welcome back!",
        });
      }
    } catch (error: any) {
        console.error("Login failed", error);
        const errorMessage = error.response?.data?.message || 'Invalid username or password.';
        toast({
            title: "Login Failed",
            description: errorMessage,
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  };

  const logout = () => {
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
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
