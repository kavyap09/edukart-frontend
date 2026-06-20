import { Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { Menu, X, Search, Bell, ArrowLeft, LogOut } from "lucide-react";
import { useState } from "react";
import { ROLE_CONFIG, type Role } from "./nav-config";
import { useAuth } from "@/lib/auth";

const accentBg: Record<string, string> = {
  sky: "bg-[var(--sky)]",
  leaf: "bg-[var(--leaf)]",
  tangerine: "bg-[var(--tangerine)]",
  sunny: "bg-[var(--sunny)]",
};
const accentGrad: Record<string, string> = {
  sky: "[background:var(--gradient-sky)]",
  leaf: "[background:var(--gradient-leaf)]",
  tangerine: "[background:var(--gradient-tangerine)]",
  sunny: "[background:var(--gradient-sunny)]",
};

export function DashboardLayout({ role }: { role: Role }) {
  const cfg = ROLE_CONFIG[role];
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const displayName = user?.name || `${role} demo`;
  const displayInitial = (user?.name?.[0] ?? role[0]).toUpperCase();
  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden font-sans text-foreground"
      style={{ background: "var(--gradient-hero), var(--color-background)" }}
    >
      {/* mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between gap-2 px-4 py-3 lg:hidden glass-card rounded-none">
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="rounded-full p-2 hover:bg-muted"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-display text-lg font-bold">{cfg.label}</span>
        <Link to="/" className="text-xs font-semibold text-muted-foreground hover:text-foreground">
          ← Home
        </Link>
      </div>

      <div className="mx-auto flex max-w-[1500px] gap-6 px-3 py-4 sm:px-6 lg:py-6">
        {/* sidebar */}
        <aside
          className={[
            "fixed inset-y-0 left-0 z-50 w-72 transform p-3 transition-transform lg:sticky lg:top-6 lg:z-0 lg:h-[calc(100vh-3rem)] lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <div className="flex h-full flex-col rounded-3xl glass-card p-4">
            <div className="mb-4 flex items-start justify-between">
              <Link to="/" className="flex items-center gap-2">
                <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${accentGrad[cfg.accent]} shadow-md`}>
                  <span className="font-display text-lg font-bold text-white">E</span>
                </div>
                <div>
                  <div className="font-display text-base font-bold leading-tight">EduKart</div>
                  <div className="text-[11px] text-muted-foreground">{cfg.tagline}</div>
                </div>
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 hover:bg-muted lg:hidden"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="-mr-2 flex-1 overflow-y-auto pr-2">
              <ul className="space-y-1">
                {cfg.items.map((item) => {
                  const active =
                    pathname === item.to ||
                    (item.to !== `/${role}` && pathname.startsWith(item.to));
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className={[
                          "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-all",
                          active
                            ? `${accentBg[cfg.accent]} text-foreground shadow-md`
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        ].join(" ")}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-3 rounded-2xl border border-border/60 bg-white/60 p-3">
              <div className="text-[11px] font-semibold text-muted-foreground">Signed in as</div>
              <div className="truncate text-sm font-bold">{displayName}</div>
              {user?.email && (
                <div className="truncate text-[11px] text-muted-foreground">{user.email}</div>
              )}
              <div className="mt-2 flex items-center justify-between gap-2">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/80 hover:text-foreground"
                >
                  <ArrowLeft className="h-3 w-3" /> Home
                </Link>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/80 hover:text-foreground"
                >
                  <LogOut className="h-3 w-3" /> Sign out
                </button>
              </div>
            </div>
          </div>
        </aside>

        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* main */}
        <main className="min-w-0 flex-1 space-y-6">
          <header className="hidden items-center justify-between gap-4 rounded-3xl glass-card px-5 py-3 lg:flex">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder={`Search in ${cfg.label.toLowerCase()}…`}
                className="w-full rounded-full border border-border/60 bg-white/70 py-2 pl-9 pr-4 text-sm outline-none transition-shadow focus:shadow-md"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="relative rounded-full p-2 hover:bg-muted">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--tangerine)]" />
              </button>
              <div className="flex items-center gap-2 rounded-full bg-white/70 px-2 py-1 pr-3 shadow-sm">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${accentGrad[cfg.accent]} font-display text-sm font-bold text-white`}>
                  {displayInitial}
                </div>
                <span className="text-sm font-semibold">{displayName}</span>
              </div>
            </div>
          </header>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
