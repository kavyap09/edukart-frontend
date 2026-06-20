import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type Role = "parent" | "school" | "vendor" | "admin";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

type AuthCtx = {
  user: AuthUser | null;
  loading: boolean;
  /** Parent: real Supabase email + password sign in */
  signInWithPassword: (email: string, password: string) => Promise<{ error: string | null }>;
  /** Parent: real Supabase email + password sign up */
  signUpWithPassword: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<{ error: string | null }>;
  /** School / vendor / admin: demo sign-in stored client-side */
  signInDemo: (u: { email: string; name: string; role: Exclude<Role, "parent"> }) => void;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({
  user: null,
  loading: true,
  signInWithPassword: async () => ({ error: "not-ready" }),
  signUpWithPassword: async () => ({ error: "not-ready" }),
  signInDemo: () => {},
  signOut: async () => {},
});

const DEMO_KEY = "edukart.demo-auth";

function readDemoUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DEMO_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

async function buildParentUser(supaUser: User): Promise<AuthUser> {
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", supaUser.id)
    .maybeSingle();
  return {
    id: supaUser.id,
    email: profile?.email ?? supaUser.email ?? "",
    name:
      profile?.full_name ||
      (supaUser.user_metadata?.full_name as string | undefined) ||
      (supaUser.email ? supaUser.email.split("@")[0] : "Parent"),
    role: "parent",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const apply = async (session: Session | null) => {
      if (session?.user) {
        const u = await buildParentUser(session.user);
        if (mounted) setUser(u);
      } else {
        if (mounted) setUser(readDemoUser());
      }
      if (mounted) setLoading(false);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      void apply(session);
    });

    supabase.auth.getSession().then(({ data }) => {
      void apply(data.session);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signInWithPassword: AuthCtx["signInWithPassword"] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signUpWithPassword: AuthCtx["signUpWithPassword"] = async (email, password, fullName) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
        data: { full_name: fullName },
      },
    });
    if (error) return { error: error.message };
    // Auto-confirm email is on; sign the user in immediately.
    const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
    return { error: signInErr?.message ?? null };
  };

  const signInDemo: AuthCtx["signInDemo"] = (u) => {
    const next: AuthUser = { id: `demo-${u.role}`, ...u };
    localStorage.setItem(DEMO_KEY, JSON.stringify(next));
    setUser(next);
  };

  const signOut: AuthCtx["signOut"] = async () => {
    localStorage.removeItem(DEMO_KEY);
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <Ctx.Provider
      value={{ user, loading, signInWithPassword, signUpWithPassword, signInDemo, signOut }}
    >
      {children}
    </Ctx.Provider>
  );
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
