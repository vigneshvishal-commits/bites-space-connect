import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { loginAdmin, loading, isInitialPassword } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const success = await loginAdmin(username, password);
    if (!success) {
      setError("Invalid username or password.");
    } else if (isInitialPassword) {
      navigate("/admin-change-password");
    } else {
      navigate("/admin-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800">Admin Login</CardTitle>
          <p className="text-gray-600 text-sm">Enter your admin credentials</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 border-2 focus:border-blue-500 transition-colors"
                placeholder="Username"
                required
              />
            </div>
            <div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-2 focus:border-blue-500 transition-colors"
                placeholder="Password"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <div className="flex justify-end mt-2">
            <Link to="/admin-forgot-password" className="text-blue-600 hover:underline text-sm">
              Forgot Password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
// WARNING: src/pages/Login.tsx is now a long file. You should consider refactoring it after this change.
