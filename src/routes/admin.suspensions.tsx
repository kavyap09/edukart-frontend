import { createFileRoute } from "@tanstack/react-router";
import { PauseCircle, PlayCircle } from "lucide-react";
import { PageHeader, PanelCard, Pill } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/admin/suspensions")({ component: Page });

const vendors = [
  ["Quickshop Books", "High refund rate", true],
  ["Speedy Uniforms", "Late shipments", true],
  ["Greenleaf Stationery", "Reinstated last week", false],
  ["Trailblazer Footwear", "Compliance review", false],
] as const;

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Suspend / Reinstate Vendors" description="Enforce marketplace quality" icon={PauseCircle} />
      <PanelCard>
        <ul className="space-y-2">
          {vendors.map(([n, r, suspended]) => (
            <li key={n} className="flex items-center justify-between rounded-2xl border border-border/60 bg-white/70 p-4">
              <div>
                <div className="font-bold">{n}</div>
                <div className="text-[11px] text-muted-foreground">{r}</div>
              </div>
              <div className="flex items-center gap-2">
                {suspended ? <Pill tone="tangerine">Suspended</Pill> : <Pill tone="leaf">Active</Pill>}
                <button className="inline-flex items-center gap-1 rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-bold hover:bg-muted">
                  {suspended ? (<><PlayCircle className="h-3 w-3" /> Reinstate</>) : (<><PauseCircle className="h-3 w-3" /> Suspend</>)}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </PanelCard>
    </div>
  );
}
