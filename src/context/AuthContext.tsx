
import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";

interface AuthContextType {
  jwt: string | null;
  username: string | null;
  isInitialPassword: boolean | null;
  loading: boolean;
  loginAdmin: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  changeAdminPassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  forgotAdminPassword: (email: string) => Promise<boolean>;
  resetAdminPassword: (email: string, token: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jwt, setJwt] = useState<string | null>(localStorage.getItem("jwtToken"));
  const [username, setUsername] = useState<string | null>(localStorage.getItem("adminUsername") || null);
  const [isInitialPassword, setIsInitialPassword] = useState<boolean | null>(
    localStorage.getItem("isInitialPassword") === "true"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (jwt) localStorage.setItem("jwtToken", jwt);
    else localStorage.removeItem("jwtToken");
    if (username) localStorage.setItem("adminUsername", username);
    else localStorage.removeItem("adminUsername");
    localStorage.setItem("isInitialPassword", String(isInitialPassword));
  }, [jwt, username, isInitialPassword]);

  const loginAdmin = async (username: string, password: string) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/admin/auth/login", {
        username,
        password,
      });
      setJwt(res.data.jwtToken);
      setUsername(res.data.username);
      setIsInitialPassword(res.data.isInitialPassword);
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setJwt(null);
    setUsername(null);
    setIsInitialPassword(null);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("adminUsername");
    localStorage.removeItem("isInitialPassword");
  };

  const changeAdminPassword = async (oldPassword: string, newPassword: string) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/admin/auth/change-password", {
        oldPassword,
        newPassword,
      });
      setJwt(res.data.jwtToken);
      setUsername(res.data.username);
      setIsInitialPassword(false);
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      return false;
    }
  };

  const forgotAdminPassword = async (email: string) => {
    setLoading(true);
    try {
      await axiosInstance.post("/admin/auth/forgot-password", { email });
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      return false;
    }
  };

  const resetAdminPassword = async (email: string, token: string, newPassword: string) => {
    setLoading(true);
    try {
      await axiosInstance.post("/admin/auth/reset-password", { email, token, newPassword });
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        jwt,
        username,
        isInitialPassword: !!isInitialPassword,
        loading,
        loginAdmin,
        logout,
        changeAdminPassword,
        forgotAdminPassword,
        resetAdminPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
