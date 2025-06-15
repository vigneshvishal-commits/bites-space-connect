
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { loginAdmin, isLoading, error } = useAuth();
  const navigate = useNavigate();
  
  const [isAdmin, setIsAdmin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    password: ''
  });

  const validateForm = () => {
    const errors = { username: '', password: '' };
    let isValid = true;
    if (!credentials.username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    }
    if (!credentials.password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    }
    setValidationErrors(errors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (isAdmin) {
      try {
        await loginAdmin(credentials.username, credentials.password);
        // Navigation is handled within loginAdmin
      } catch (e) {
        // Error toast is handled in loginAdmin
        console.error(e);
      }
    } else {
      // Placeholder for vendor login
      alert("Vendor login is not implemented yet.");
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

        <motion.div
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800">
                {`${isAdmin ? 'Admin' : 'Vendor'} Login`}
              </CardTitle>
              <p className="text-gray-600 text-sm">
                Enter your credentials to continue
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="username" className="text-gray-700 font-medium">Username</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      value={credentials.username}
                      onChange={(e) => {
                        setCredentials({...credentials, username: e.target.value});
                        setValidationErrors({...validationErrors, username: ''});
                      }}
                      className={`pl-10 h-12 border-2 transition-all duration-300 ${
                        validationErrors.username 
                          ? 'border-red-500 animate-pulse' 
                          : credentials.username 
                            ? 'border-green-500' 
                            : 'border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="Enter username"
                      required
                    />
                    {credentials.username && !validationErrors.username && (
                      <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-green-500" />
                    )}
                    {(validationErrors.username || error) && (
                      <AlertCircle className="absolute right-3 top-3 h-5 w-5 text-red-500" />
                    )}
                  </div>
                  {validationErrors.username && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.username}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={credentials.password}
                      onChange={(e) => {
                        setCredentials({...credentials, password: e.target.value});
                        setValidationErrors({...validationErrors, password: ''});
                      }}
                      className={`pl-10 pr-10 h-12 border-2 transition-all duration-300 ${
                        validationErrors.password 
                          ? 'border-red-500 animate-pulse' 
                          : credentials.password 
                            ? 'border-green-500' 
                            : 'border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="Enter password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-10 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    {credentials.password && !validationErrors.password && (
                      <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-green-500" />
                    )}
                    {(validationErrors.password || error) && (
                      <AlertCircle className="absolute right-3 top-3 h-5 w-5 text-red-500" />
                    )}
                  </div>
                  {validationErrors.password && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
                  )}
                </div>
                
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                
                <Button 
                  type="submit" 
                  className={`w-full h-12 text-white font-medium text-lg transition-all duration-300 transform hover:scale-105 ${
                    isAdmin ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    'Sign In'
                  )}
                </Button>
                 {error && (
                    <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
                 )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
