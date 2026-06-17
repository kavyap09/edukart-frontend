import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function PageHeader({
  title,
  description,
  icon: Icon,
  actions,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 rounded-3xl glass-card p-5 sm:p-6">
      <div className="flex items-center gap-3">
        {Icon ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 shadow-sm">
            <Icon className="h-6 w-6 text-foreground" />
          </div>
        ) : null}
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">{title}</h1>
          {description ? (
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "sky",
}: {
  label: string;
  value: string;
  delta?: string;
  icon: LucideIcon;
  tone?: "sky" | "leaf" | "tangerine" | "sunny";
}) {
  const grad: Record<string, string> = {
    sky: "[background:var(--gradient-sky)]",
    leaf: "[background:var(--gradient-leaf)]",
    tangerine: "[background:var(--gradient-tangerine)]",
    sunny: "[background:var(--gradient-sunny)]",
  };
  return (
    <div className="hover-lift rounded-3xl glass-card p-5">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${grad[tone]} text-white shadow`}>
          <Icon className="h-5 w-5" />
        </div>
        {delta ? (
          <span className="rounded-full bg-[var(--leaf)]/30 px-2 py-0.5 text-[11px] font-bold text-foreground">
            {delta}
          </span>
        ) : null}
      </div>
      <div className="mt-3 font-display text-2xl font-bold">{value}</div>
      <div className="text-xs font-semibold text-muted-foreground">{label}</div>
    </div>
  );
}

export function PanelCard({
  title,
  description,
  actions,
  children,
  className = "",
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-3xl glass-card p-5 sm:p-6 ${className}`}>
      {(title || actions) && (
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            {title ? <h2 className="font-display text-lg font-bold">{title}</h2> : null}
            {description ? (
              <p className="text-xs text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function Pill({
  children,
  tone = "sky",
}: {
  children: ReactNode;
  tone?: "sky" | "leaf" | "tangerine" | "sunny" | "muted";
}) {
  const map: Record<string, string> = {
    sky: "bg-[var(--sky)]/35 text-[var(--sky-foreground)]",
    leaf: "bg-[var(--leaf)]/35 text-[var(--leaf-foreground)]",
    tangerine: "bg-[var(--tangerine)]/35 text-[var(--tangerine-foreground)]",
    sunny: "bg-[var(--sunny)]/45 text-[var(--sunny-foreground)]",
    muted: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${map[tone]}`}>
      {children}
    </span>
  );
}

export function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border/60 bg-white/60">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            {columns.map((c) => (
              <th key={c} className="px-4 py-3 text-left font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border/60 transition-colors hover:bg-muted/40">
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-middle">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-border bg-white/70 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
    >
      {children}
    </button>
  );
}
