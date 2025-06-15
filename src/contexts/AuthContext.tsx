
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
    if (!localStorage.getItem('jwtToken')) {
      console.log("[AUTH] No JWT token in localStorage.");
      return;
    }
    try {
      const { data } = await axiosInstance.get<User>('/admin/auth/me');
      setUser(data);
      console.log("[AUTH] User profile fetched:", data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
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
    setIsLoading(true);
    const loginUrl = userType === 'admin' ? '/admin/auth/login' : '/vendor/auth/login';
    try {
      console.log('[LOGIN] Attempting login to', loginUrl, 'with', credentials);
      const response = await axiosInstance.post(loginUrl, credentials);
      const { jwtToken, requiresPasswordReset } = response.data;
      console.log('[LOGIN] Got response', response.data);
      if (jwtToken) {
        localStorage.setItem('jwtToken', jwtToken);
        setToken(jwtToken);

        if (requiresPasswordReset) {
          // First-time setup, must reset password
          console.log('[LOGIN] requiresPasswordReset TRUE: navigating to /reset-password', { userType });
          navigate('/reset-password', { state: { flow: 'first-time', userType } });
          toast({
              title: "Setup Your Account",
              description: "Please set your new password to continue.",
          });
        } else {
          await fetchUserProfile();
          const dashboardUrl = userType === 'admin' ? '/admin-dashboard' : '/vendor-dashboard';
          console.log('[LOGIN] Navigation to main dashboard', dashboardUrl);
          navigate(dashboardUrl);
          toast({
              title: "Login Successful",
              description: "Welcome back!",
          });
        }
      } else {
        console.log('[LOGIN] No jwtToken returned!');
        toast({ title: "Error", description: "No token received.", variant: "destructive" });
      }
    } catch (error: any) {
        console.error("[LOGIN] Login failed", error);
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
    console.log('[AUTH] User logged out, navigating to /login');
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

  console.log('[AUTH] AuthProvider render: loading:', isLoading, 'token:', token, 'user:', user);

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : <div className="flex items-center justify-center min-h-screen">Loading Auth...</div>}
    </AuthContext.Provider>
  );
};

