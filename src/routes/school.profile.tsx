import { createFileRoute } from "@tanstack/react-router";
import { UserCog } from "lucide-react";
import { PageHeader, PanelCard, Pill, PrimaryButton } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/school/profile")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="School Profile" description="Public information for parents and vendors" icon={UserCog} />
      <div className="grid gap-6 lg:grid-cols-3">
        <PanelCard className="lg:col-span-2" title="Basic details">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["School name", "Greenwood High"],
              ["Board", "CBSE"],
              ["Established", "1998"],
              ["City", "Bengaluru"],
              ["Principal", "Dr. Lakshmi Iyer"],
              ["Contact", "admin@greenwoodhigh.in"],
            ].map(([k, v]) => (
              <label key={k} className="block">
                <div className="text-[11px] font-bold uppercase text-muted-foreground">{k}</div>
                <input defaultValue={v} className="mt-1 w-full rounded-2xl border border-border bg-white/70 px-3 py-2 text-sm" />
              </label>
            ))}
          </div>
          <PrimaryButton>Save changes</PrimaryButton>
        </PanelCard>
        <PanelCard title="Verification">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between"><span>Email verified</span><Pill tone="leaf">Yes</Pill></li>
            <li className="flex items-center justify-between"><span>Affiliation document</span><Pill tone="leaf">Approved</Pill></li>
            <li className="flex items-center justify-between"><span>GSTIN</span><Pill tone="sky">Optional</Pill></li>
            <li className="flex items-center justify-between"><span>Logo</span><Pill tone="sunny">Pending</Pill></li>
          </ul>
        </PanelCard>
      </div>
    </div>
  );
}
