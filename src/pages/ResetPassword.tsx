
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Key, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import axiosInstance from '@/api/axiosInstance';
import { useAuth } from '@/hooks/useAuth';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuth();

  console.log('[RESET PASSWORD] Component mounted with location.state:', location.state);

  // Get state with proper defaults
  const locationState = location.state as any;
  const flow = locationState?.flow || 'forgot';
  const email = locationState?.email || '';
  const userType = locationState?.userType || 'admin';
  const fromLogin = locationState?.fromLogin || false;

  console.log('[RESET PASSWORD] Parsed state:', { flow, email, userType, fromLogin });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if accessing without proper context
  useEffect(() => {
    if (!locationState && !fromLogin) {
      console.log('[RESET PASSWORD] Invalid access, redirecting to login');
      navigate('/login');
    }
  }, [locationState, fromLogin, navigate]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[RESET PASSWORD] Form submitted with flow:', flow);

    if (password !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters long.", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    try {
      if (flow === 'first-time') {
        const endpoint = userType === 'admin' ? '/admin/auth/reset-password-on-login' : '/vendor/auth/reset-password-on-login';
        console.log('[RESET PASSWORD] First time reset, calling:', endpoint);
        
        await axiosInstance.post(endpoint, { newPassword: password });

        toast({
          title: "Password Set Successfully",
          description: "Please log in with your new password.",
        });
        
        // Log out to clear the temporary token and force re-login
        logout();
        
      } else { // 'forgot' flow
        if (!code) {
          toast({ title: "Error", description: "Reset code is required.", variant: "destructive" });
          setIsLoading(false);
          return;
        }
        
        const endpoint = userType === 'admin' ? '/admin/auth/reset-password' : '/vendor/auth/reset-password';
        console.log('[RESET PASSWORD] Forgot password reset, calling:', endpoint);
        
        await axiosInstance.post(endpoint, { email, code, newPassword: password });
        
        toast({
          title: "Password Reset Successful",
          description: "You can now log in with your new password.",
        });
        navigate('/login');
      }
    } catch (error: any) {
      console.error('[RESET PASSWORD] Error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/b3787bd3-143a-4cb2-9fdf-8228781e5bf4.png" 
            alt="Bites Space Logo" 
            className="w-24 h-24 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800">Bites Space</h1>
        </div>
        
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Reset Your Password
            </CardTitle>
            <p className="text-gray-600 text-sm">
              {flow === 'first-time' 
                ? 'Create a new password to secure your account.'
                : 'Enter the code from your email and a new password.'
              }
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-6">
              {flow === 'forgot' && (
                <div>
                  <Label htmlFor="code">Reset Code</Label>
                  <div className="relative mt-2">
                    <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input 
                      id="code" 
                      value={code} 
                      onChange={(e) => setCode(e.target.value)} 
                      className="pl-10 h-12" 
                      placeholder="Enter code" 
                      required 
                    />
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="password">New Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    id="password" 
                    type={showPassword ? 'text' : 'password'} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="pl-10 pr-10 h-12" 
                    placeholder="Enter new password" 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    id="confirmPassword" 
                    type={showPassword ? 'text' : 'password'} 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className="pl-10 pr-10 h-12" 
                    placeholder="Confirm new password" 
                    required 
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700" 
                disabled={isLoading}
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
              
              <div className="text-center">
                <button 
                  type="button" 
                  onClick={() => navigate('/login')} 
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Back to Login
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
