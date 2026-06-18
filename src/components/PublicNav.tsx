import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { useAuth, DASHBOARD_PATH } from "@/lib/auth";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Marketplace", to: "/marketplace" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function PublicNav() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6">
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between gap-4 rounded-full px-4 py-3 glass-card sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl shadow-[var(--shadow-soft)]" style={{ background: "var(--gradient-sky)" }}>
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">EduKart</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="text-sm font-semibold transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Link to={DASHBOARD_PATH[user.role]} className="rounded-full px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted">
                Dashboard
              </Link>
              <button onClick={signOut} className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-transform hover:scale-105">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/parent/login" className="rounded-full px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted">
                Login
              </Link>
              <Link to="/auth/parent/register" className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-transform hover:scale-105">
                Get started
              </Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} aria-label="Menu" className="rounded-full p-2 md:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-3xl px-4 py-4 glass-card md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-muted">
                {l.label}
              </Link>
            ))}
            {user ? (
              <Link to={DASHBOARD_PATH[user.role]} onClick={() => setOpen(false)} className="rounded-xl bg-foreground px-3 py-2 text-sm font-semibold text-background">
                Go to Dashboard
              </Link>
            ) : (
              <Link to="/auth/parent/login" onClick={() => setOpen(false)} className="rounded-xl bg-foreground px-3 py-2 text-sm font-semibold text-background">
                Login / Sign up
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
