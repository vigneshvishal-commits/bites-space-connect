
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <aside className="w-64 bg-white shadow-lg rounded-lg flex flex-col justify-between p-6 mr-8">
        <div>
          <h2 className="font-bold text-xl text-blue-600 mb-4">Admin Menu</h2>
          <ul className="space-y-4">
            <li>
              <Button
                onClick={() => navigate("/admin-dashboard")}
                variant="link"
                className="text-blue-600"
              >
                Dashboard
              </Button>
            </li>
            <li>
              <Button
                onClick={() => navigate("/admin-change-password")}
                variant="link"
                className="text-blue-600"
              >
                Change Password
              </Button>
            </li>
          </ul>
        </div>
        <Button
          onClick={handleLogout}
          className="bg-red-500 text-white mt-8"
        >
          Logout
        </Button>
      </aside>
      <main className="flex-1 flex flex-col items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Welcome, {username}!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">This is your admin dashboard. Use the menu to navigate.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
