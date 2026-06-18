import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BookOpen } from "lucide-react";

export function AuthShell({
  title, subtitle, accent = "sky", side, children, footer,
}: {
  title: string;
  subtitle: string;
  accent?: "sky" | "leaf" | "tangerine" | "sunny";
  side: { eyebrow: string; heading: string; bullets: string[] };
  children: ReactNode;
  footer: ReactNode;
}) {
  const grad: Record<string, string> = {
    sky: "var(--gradient-sky)",
    leaf: "var(--gradient-leaf)",
    tangerine: "var(--gradient-tangerine)",
    sunny: "var(--gradient-sunny)",
  };
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />

      <div className="mx-auto grid min-h-screen max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:py-12">
        {/* left brand panel */}
        <aside className="relative hidden overflow-hidden rounded-[2rem] p-10 lg:flex lg:flex-col lg:justify-between" style={{ background: grad[accent] }}>
          <Link to="/" className="flex items-center gap-2 text-white">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/25 backdrop-blur">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold">EduKart</span>
          </Link>
          <div className="text-white">
            <div className="text-xs font-bold uppercase tracking-widest opacity-80">{side.eyebrow}</div>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight xl:text-4xl">{side.heading}</h2>
            <ul className="mt-6 space-y-3 text-sm">
              {side.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-xs text-white/80">© {new Date().getFullYear()} EduKart</div>
        </aside>

        {/* right card */}
        <div className="flex flex-col justify-center">
          <div className="mx-auto w-full max-w-md">
            <Link to="/" className="mb-6 inline-flex items-center gap-2 lg:hidden">
              <div className="grid h-9 w-9 place-items-center rounded-2xl" style={{ background: grad[accent] }}>
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold">EduKart</span>
            </Link>

            <div className="rounded-3xl glass-card p-6 sm:p-8">
              <h1 className="font-display text-2xl font-bold sm:text-3xl">{title}</h1>
              <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
              <div className="mt-6">{children}</div>
            </div>

            <div className="mt-5 text-center text-sm text-muted-foreground">{footer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Field({
  label, name, type = "text", placeholder, required = true,
}: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-foreground">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-white/70 px-4 py-2.5 text-sm outline-none transition-shadow placeholder:text-muted-foreground/70 focus:border-foreground/30 focus:shadow-md"
      />
    </label>
  );
}

export function SubmitButton({
  children, accent = "sky",
}: { children: ReactNode; accent?: "sky" | "leaf" | "tangerine" | "sunny" }) {
  const grad: Record<string, string> = {
    sky: "var(--gradient-sky)",
    leaf: "var(--gradient-leaf)",
    tangerine: "var(--gradient-tangerine)",
    sunny: "var(--gradient-sunny)",
  };
  return (
    <button
      type="submit"
      className="w-full rounded-full px-5 py-3 text-sm font-bold text-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]"
      style={{ background: grad[accent] }}
    >
      {children}
    </button>
  );
}
