import { createContext, useContext, useState, ReactNode } from "react";
import type { User } from "../types";
import { apiServer } from "./apiServer";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (username: string, password: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(false);

  const signIn = async (username: string, password: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      const res = await apiServer.post("/authentication", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      try {
        const me = await apiServer.get<User>("/api/v1/users/me");
        setUser(me.data);
        console.log("Usuario:", me.data);
      } catch (e) {}
      setLoading(false);
      return { error: null };
    } catch (error: any) {
      setLoading(false);
      return { error };
    }
  };

  const signUp = async (username: string, password: string) => {
    setLoading(true);
    try {
      const res = await apiServer.post("/api/register", { username, password });
      await signIn(username, password);
      setLoading(false);
      return { error: null };
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
