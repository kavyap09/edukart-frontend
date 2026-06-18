import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "parent" | "school" | "vendor" | "admin";

export type AuthUser = {
  email: string;
  name: string;
  role: Role;
};

type AuthCtx = {
  user: AuthUser | null;
  signIn: (u: AuthUser) => void;
  signOut: () => void;
};

const Ctx = createContext<AuthCtx>({ user: null, signIn: () => {}, signOut: () => {} });
const KEY = "edukart.auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);
  const signIn = (u: AuthUser) => {
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
  };
  const signOut = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };
  return <Ctx.Provider value={{ user, signIn, signOut }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  return useContext(Ctx);
}

export const DASHBOARD_PATH: Record<Role, string> = {
  parent: "/parent",
  school: "/school",
  vendor: "/vendor",
  admin: "/admin",
};
