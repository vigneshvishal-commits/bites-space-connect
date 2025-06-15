
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import axiosInstance from '@/api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [email, setEmail] = useState('');
  const [flow, setFlow] = useState('login'); // 'login' or 'forgot-password'
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);
  const navigate = useNavigate();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials({ ...credentials, [id]: value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
        toast({ title: "Error", description: "Username and password are required.", variant: "destructive" });
        return;
    }
    await login(credentials, isAdmin ? 'admin' : 'vendor');
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsForgotPasswordLoading(true);
      try {
          const endpoint = isAdmin ? '/admin/auth/forgot-password' : '/vendor/auth/forgot-password';
          await axiosInstance.post(endpoint, { email });
          toast({
              title: "Request Sent",
              description: "If an account with that email exists, a password reset code has been sent.",
          });
          navigate('/reset-password', { state: { flow: 'forgot', email: email, userType: isAdmin ? 'admin' : 'vendor' }});
          setFlow('login');
          setEmail('');
      } catch (error: any) {
          toast({
              title: "Error",
              description: error.response?.data?.message || "An unexpected error occurred.",
              variant: "destructive",
          });
      } finally {
        setIsForgotPasswordLoading(false);
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src="/lovable-uploads/b3787bd3-143a-4cb2-9fdf-8228781e5bf4.png" 
            alt="Bites Space Logo" 
            className="w-24 h-24 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Welcome to Bites Space
          </h1>
        </motion.div>

        {flow === 'login' && (
          <motion.div
            className="flex bg-white rounded-lg p-1 mb-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={() => setIsAdmin(true)}
              className={`flex-1 py-3 px-4 rounded-md transition-all duration-300 font-medium ${
                isAdmin 
                  ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setIsAdmin(false)}
              className={`flex-1 py-3 px-4 rounded-md transition-all duration-300 font-medium ${
                !isAdmin 
                  ? 'bg-green-600 text-white shadow-md transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Vendor
            </button>
          </motion.div>
        )}

        <motion.div
          key={flow}
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800">
                {flow === 'login' 
                    ? `${isAdmin ? 'Admin' : 'Vendor'} Login`
                    : 'Forgot Password'
                }
              </CardTitle>
              <p className="text-gray-600 text-sm">
                {flow === 'login'
                    ? 'Enter your credentials to continue'
                    : 'Enter your email to reset your password'
                }
              </p>
            </CardHeader>
            <CardContent>
              {flow === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input id="username" value={credentials.username} onChange={handleInputChange} className="pl-10 h-12" placeholder="Enter username" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input id="password" type={showPassword ? 'text' : 'password'} value={credentials.password} onChange={handleInputChange} className="pl-10 pr-10 h-12" placeholder="Enter password" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400">
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <button type="button" onClick={() => setFlow('forgot-password')} className="text-sm font-medium text-blue-600 hover:underline">
                      Forgot Password?
                    </button>
                  </div>
                  <Button type="submit" className={`w-full h-12 ${isAdmin ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`} disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-6">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <div className="relative mt-2">
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12" placeholder="Enter your email" required />
                        </div>
                    </div>
                    <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700" disabled={isForgotPasswordLoading}>
                        {isForgotPasswordLoading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                    <div className="text-center">
                        <button type="button" onClick={() => setFlow('login')} className="text-sm font-medium text-blue-600 hover:underline">
                            Back to Login
                        </button>
                    </div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
