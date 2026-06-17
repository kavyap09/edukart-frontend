import { createFileRoute } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { PageHeader, PanelCard, Pill } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/school/stationery")({ component: Page });

const items = [
  ["Geometry Box Pro", "Studyo", 280, "leaf"],
  ["Notebook Pack (10)", "Studyo", 360, "sky"],
  ["Watercolour 24", "Studyo", 290, "tangerine"],
  ["Crayons 24", "Studyo", 130, "sunny"],
  ["Pencil Set Premium", "Studyo", 120, "leaf"],
  ["Erasers + Sharpeners", "Studyo", 90, "sky"],
] as const;

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Recommended Stationery" description="Approved per-grade stationery bundle" icon={Pencil} />
      <PanelCard>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([n, v, p, t]) => (
            <div key={n} className="hover-lift overflow-hidden rounded-3xl border border-border/60 bg-white/70">
              <div className={`h-24 [background:var(--gradient-${t === "leaf" ? "leaf" : t === "sky" ? "sky" : t === "tangerine" ? "tangerine" : "sunny"})]`} />
              <div className="p-4">
                <div className="text-sm font-bold">{n}</div>
                <div className="text-[11px] text-muted-foreground">by {v}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-display text-lg font-bold">₹{p}</div>
                  <Pill tone={t as any}>Approved</Pill>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}
