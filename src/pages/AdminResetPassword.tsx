
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Key, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

const AdminResetPassword = () => {
  const { resetAdminPassword, isLoading, error } = useAuth();
  const [formState, setFormState] = useState({ email: '', token: '', newPassword: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetAdminPassword(formState.email, formState.token, formState.newPassword);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-bold">Reset Your Password</CardTitle>
            <p className="text-center text-sm text-gray-600">Enter your email, the code you received, and a new password.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input id="email" type="email" value={formState.email} onChange={handleChange} className="pl-10 h-12" required />
                </div>
              </div>
              <div>
                <Label htmlFor="token">Reset Code</Label>
                <div className="relative mt-1">
                  <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input id="token" type="text" value={formState.token} onChange={handleChange} className="pl-10 h-12" required />
                </div>
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input id="newPassword" type="password" value={formState.newPassword} onChange={handleChange} className="pl-10 h-12" required />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full h-12" disabled={isLoading}>
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
               <Button variant="link" asChild className="w-full">
                <Link to="/login">Back to Login</Link>
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminResetPassword;
