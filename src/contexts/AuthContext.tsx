
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
    console.log("[AUTH] fetchUserProfile start");
    const storedToken = localStorage.getItem('jwtToken');
    if (!storedToken) {
      console.log("[AUTH] No JWT token in localStorage.");
      return;
    }
    try {
      const { data } = await axiosInstance.get<User>('/admin/auth/me');
      setUser(data);
      console.log("[AUTH] User profile fetched:", data);
    } catch (error) {
      console.error("[AUTH] Failed to fetch user profile:", error);
      // Clear invalid token
      localStorage.removeItem('jwtToken');
      setToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    console.log('[AUTH] AuthProvider useEffect running');
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('jwtToken');
      console.log('[AUTH] initializeAuth found token?', !!storedToken);
      if (storedToken) {
        setToken(storedToken);
        await fetchUserProfile();
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
      console.log('[LOGIN] Attempting login to', loginUrl, 'with credentials:', { username: credentials.username });
      const response = await axiosInstance.post(loginUrl, credentials);
      console.log('[LOGIN] Login response received:', response.data);
      
      const { jwtToken, requiresPasswordReset } = response.data;
      
      if (!jwtToken) {
        console.error('[LOGIN] No jwtToken in response');
        throw new Error('No authentication token received');
      }

      // Store token and update state
      localStorage.setItem('jwtToken', jwtToken);
      setToken(jwtToken);
      console.log('[LOGIN] Token stored successfully');

      if (requiresPasswordReset) {
        console.log('[LOGIN] Password reset required, navigating to reset page');
        navigate('/reset-password', { 
          state: { 
            flow: 'first-time', 
            userType,
            fromLogin: true 
          } 
        });
        toast({
          title: "Setup Your Account",
          description: "Please set your new password to continue.",
        });
      } else {
        // Fetch user profile first
        console.log('[LOGIN] Fetching user profile after successful login');
        await fetchUserProfile();
        
        // Navigate to appropriate dashboard
        const dashboardUrl = userType === 'admin' ? '/admin-dashboard' : '/vendor-dashboard';
        console.log('[LOGIN] Navigating to dashboard:', dashboardUrl);
        navigate(dashboardUrl);
        
        toast({
          title: "Login Successful",
          description: "Welcome back!",
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
    isLoading,
  };

  console.log('[AUTH] AuthProvider render state:', {
    loading: isLoading,
    hasToken: !!token,
    hasUser: !!user,
    isAuthenticated: !!token
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
