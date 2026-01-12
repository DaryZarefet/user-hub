import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { User } from "../types";
import { apiServer } from "./apiServer";
import { Navigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (username: string, password: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const res = await apiServer.get<User>("/api/v1/users/me");
      setUser(res.data);
      <Navigate to="/dashboard" replace />;
      return { error: null };
    } catch (err: any) {
      setUser(null);
      <Navigate to="/" replace />;
      return { error: err };
    }
  };

  useEffect(() => {
    (async () => {
      await fetchCurrentUser();
    })();
  }, []);

  const signIn = async (username: string, password: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      await apiServer.post("/authentication", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const result = await fetchCurrentUser();
      setLoading(false);
      return result;
    } catch (error: any) {
      setLoading(false);
      return { error: error };
    }
  };

  const signUp = async (username: string, password: string) => {
    setLoading(true);
    try {
      await apiServer.post("/api/register", { username, password });
      const result = await signIn(username, password);
      setLoading(false);
      return result;
    } catch (error: any) {
      setLoading(false);
      return { error };
    }
  };

  return <AuthContext.Provider value={{ user, loading, signIn, signUp }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
