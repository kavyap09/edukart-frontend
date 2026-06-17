import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { PageHeader, PanelCard, Pill } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/admin/security")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Security & Roles" description="System health and admin team" icon={ShieldCheck} />
      <div className="grid gap-6 lg:grid-cols-2">
        <PanelCard title="System health">
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>Two-factor auth</span><Pill tone="leaf">Enforced</Pill></li>
            <li className="flex justify-between"><span>Audit logs</span><Pill tone="leaf">On</Pill></li>
            <li className="flex justify-between"><span>Rate limiting</span><Pill tone="leaf">On</Pill></li>
            <li className="flex justify-between"><span>PCI scope</span><Pill tone="sky">Tokenised</Pill></li>
          </ul>
        </PanelCard>
        <PanelCard title="Admin team">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between"><span>Lakshmi Iyer</span><Pill tone="sunny">Super admin</Pill></li>
            <li className="flex items-center justify-between"><span>Vivek Rao</span><Pill tone="sky">Ops</Pill></li>
            <li className="flex items-center justify-between"><span>Meera Sen</span><Pill tone="leaf">Finance</Pill></li>
            <li className="flex items-center justify-between"><span>Kabir Shah</span><Pill tone="tangerine">Support</Pill></li>
          </ul>
        </PanelCard>
      </div>
    </div>
  );
}
