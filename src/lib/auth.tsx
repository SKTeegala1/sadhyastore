import { useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { api, ApiError, resetCsrf } from "./api";
export type User = { id: string; email: string; fullName: string; isAdmin: boolean };
const Context = createContext<{
  user: User | null;
  loading: boolean;
  error: string;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
} | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const cache = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    for (const key of ["addresses", "orders", "admin-products", "admin-orders", "admin-slides"])
      cache.removeQueries({ queryKey: [key] });
    try {
      setUser(await api<User>("/auth/me"));
    } catch (e) {
      setUser(null);
      if (!(e instanceof ApiError && e.status === 401))
        setError("The account server is unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [cache]);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  async function logout() {
    await api("/auth/logout", { method: "POST" });
    resetCsrf();
    setUser(null);
    for (const key of ["addresses", "orders", "admin-products", "admin-orders", "admin-slides"])
      cache.removeQueries({ queryKey: [key] });
  }
  return (
    <Context.Provider value={{ user, loading, error, refresh, logout }}>
      {children}
    </Context.Provider>
  );
}
export function useAuth() {
  const value = useContext(Context);
  if (!value) throw new Error("AuthProvider required");
  return value;
}
