import { createFileRoute } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { PageHeader, PanelCard, Pill } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/school/stationery")({ component: Page });

const items = [
  { name: "Geometry Box Pro", v: "Studyo", p: 280, tone: "leaf",      bg: "[background:var(--gradient-leaf)]" },
  { name: "Notebook Pack (10)", v: "Studyo", p: 360, tone: "sky",     bg: "[background:var(--gradient-sky)]" },
  { name: "Watercolour 24", v: "Studyo", p: 290, tone: "tangerine",   bg: "[background:var(--gradient-tangerine)]" },
  { name: "Crayons 24", v: "Studyo", p: 130, tone: "sunny",           bg: "[background:var(--gradient-sunny)]" },
  { name: "Pencil Set Premium", v: "Studyo", p: 120, tone: "leaf",    bg: "[background:var(--gradient-leaf)]" },
  { name: "Erasers + Sharpeners", v: "Studyo", p: 90, tone: "sky",    bg: "[background:var(--gradient-sky)]" },
] as const;

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Recommended Stationery" description="Approved per-grade stationery bundle" icon={Pencil} />
      <PanelCard>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.name} className="hover-lift overflow-hidden rounded-3xl border border-border/60 bg-white/70">
              <div className={`h-24 ${it.bg}`} />
              <div className="p-4">
                <div className="text-sm font-bold">{it.name}</div>
                <div className="text-[11px] text-muted-foreground">by {it.v}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-display text-lg font-bold">₹{it.p}</div>
                  <Pill tone={it.tone}>Approved</Pill>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}
