import { createFileRoute } from "@tanstack/react-router";
import { Wallet, Sparkles } from "lucide-react";
import { PageHeader, PanelCard, Pill, PrimaryButton } from "@/components/dashboard/page-shell";
import { BarsChart } from "@/components/dashboard/charts";

export const Route = createFileRoute("/parent/budget")({ component: Page });

const compare = [
  { name: "Original", value: 4820 },
  { name: "Optimized", value: 3260 },
];

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="AI Budget Optimizer" description="Get the same kit for less — every term." icon={Wallet} />
      <div className="grid gap-6 lg:grid-cols-3">
        <PanelCard className="lg:col-span-2" title="Term budget" description="Set a cap; AI tunes vendors, brands and bundles.">
          <div className="mb-4 flex items-center gap-3">
            <input type="range" min={1000} max={8000} defaultValue={3500} className="flex-1 accent-[var(--sky)]" />
            <div className="rounded-full bg-foreground px-3 py-1 text-sm font-bold text-background">₹3,500</div>
          </div>
          <BarsChart data={compare} color="#81C784" />
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm">
              <Pill tone="leaf">- 32%</Pill> savings vs original kit
            </div>
            <PrimaryButton>Apply to cart</PrimaryButton>
          </div>
        </PanelCard>
        <PanelCard title="What changed">
          <ul className="space-y-2 text-sm">
            {[
              ["Switched brand: Math workbook", "- ₹120"],
              ["Bundled stationery from Studyo", "- ₹260"],
              ["Used school bag from last year", "- ₹1,290"],
              ["Removed duplicate uniform set", "- ₹890"],
            ].map(([k, v]) => (
              <li key={k} className="flex items-center justify-between rounded-2xl border border-border/60 bg-white/70 px-3 py-2">
                <span className="font-semibold">{k}</span>
                <Pill tone="leaf">{v}</Pill>
              </li>
            ))}
          </ul>
          <div className="mt-3 rounded-2xl bg-[var(--sunny)]/30 p-3 text-xs">
            <Pill tone="sunny"><Sparkles className="h-3 w-3" /></Pill>
            <p className="mt-2 font-semibold">AI re-runs daily as new vendor offers go live.</p>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}
