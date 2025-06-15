
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { forgotAdminPassword, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    const success = await forgotAdminPassword(email);
    if (success) {
      setMessage("If an account with that email exists, a reset code has been sent.");
    } else {
      setError("Failed to send reset email. Check your address and try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800">Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-2 focus:border-blue-500"
                placeholder="Enter your registered admin email"
                required
              />
            </div>
            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full h-12 text-white bg-blue-600" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Code"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminForgotPassword;
