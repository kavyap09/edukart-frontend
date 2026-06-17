import { createFileRoute } from "@tanstack/react-router";
import { Landmark } from "lucide-react";
import { PageHeader, PanelCard, Pill, PrimaryButton } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/vendor/bank")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Bank Details" description="Payouts and reconciliation" icon={Landmark} />
      <PanelCard>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Account holder", "Sunrise Books Pvt. Ltd."],
            ["Account number", "•••• •••• 4321"],
            ["IFSC", "HDFC0001234"],
            ["Bank", "HDFC Bank"],
            ["Branch", "Indiranagar, Bengaluru"],
            ["UPI (optional)", "sunrise@hdfc"],
          ].map(([k, v]) => (
            <label key={k}>
              <div className="text-[11px] font-bold uppercase text-muted-foreground">{k}</div>
              <input defaultValue={v} className="mt-1 w-full rounded-2xl border border-border bg-white/70 px-3 py-2 text-sm" />
            </label>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Pill tone="leaf">Penny drop verified</Pill>
          <PrimaryButton>Save</PrimaryButton>
        </div>
      </PanelCard>
    </div>
  );
}
