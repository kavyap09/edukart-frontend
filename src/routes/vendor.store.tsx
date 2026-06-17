import { createFileRoute } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { PageHeader, PanelCard, Pill, PrimaryButton } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/vendor/store")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Store Profile" description="How parents see your storefront" icon={Store} />
      <div className="grid gap-6 lg:grid-cols-3">
        <PanelCard className="lg:col-span-2" title="Brand">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-3xl [background:var(--gradient-tangerine)]" />
            <div className="flex-1">
              <input defaultValue="Sunrise Books & Stationery" className="w-full rounded-2xl border border-border bg-white/70 px-3 py-2 text-sm font-bold" />
              <textarea rows={3} defaultValue="Trusted neighbourhood vendor of NCERT & supplementary books for 18+ years." className="mt-2 w-full rounded-2xl border border-border bg-white/70 px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="mt-4"><PrimaryButton>Save profile</PrimaryButton></div>
        </PanelCard>
        <PanelCard title="Storefront health">
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>Profile completeness</span><Pill tone="leaf">94%</Pill></li>
            <li className="flex justify-between"><span>Avg response time</span><Pill tone="sky">3h</Pill></li>
            <li className="flex justify-between"><span>Cancel rate</span><Pill tone="leaf">0.8%</Pill></li>
            <li className="flex justify-between"><span>SLA score</span><Pill tone="sunny">A</Pill></li>
          </ul>
        </PanelCard>
      </div>
    </div>
  );
}
