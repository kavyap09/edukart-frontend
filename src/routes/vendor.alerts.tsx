import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { PageHeader, PanelCard, Pill, PrimaryButton } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/vendor/alerts")({ component: Page });

const alerts = [
  ["Geometry Box Pro", "Stock at 8 (reorder 20)", "tangerine"],
  ["Notebook Pack (10)", "Out of stock", "muted"],
  ["NCERT Hindi Rimjhim", "5 days to stock-out at current rate", "sunny"],
] as const;

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Low Stock Alerts" description="Stay ahead of demand spikes" icon={AlertTriangle} />
      <PanelCard>
        <ul className="space-y-2">
          {alerts.map(([n, m, t]) => (
            <li key={n} className="flex items-center justify-between rounded-2xl border border-border/60 bg-white/70 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--tangerine)]/40">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold">{n}</div>
                  <div className="text-[11px] text-muted-foreground">{m}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Pill tone={t as any}>Action needed</Pill>
                <PrimaryButton>Reorder</PrimaryButton>
              </div>
            </li>
          ))}
        </ul>
      </PanelCard>
    </div>
  );
}
