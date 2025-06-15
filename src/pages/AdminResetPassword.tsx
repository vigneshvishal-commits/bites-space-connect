
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminResetPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { resetAdminPassword, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }
    const success = await resetAdminPassword(email, token, newPassword);
    if (success) {
      setMessage("Password reset successful. You can now log in.");
    } else {
      setError("Reset failed. Check the code and try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-2 focus:border-blue-500"
                placeholder="Registered Email"
                required
              />
            </div>
            <div>
              <Input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="h-12 border-2 focus:border-blue-500"
                placeholder="Reset Code"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-12 border-2 focus:border-blue-500"
                placeholder="New Password"
                required
              />
            </div>
            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full h-12 text-white bg-blue-600" disabled={loading}>
              {loading ? "Processing..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminResetPassword;
