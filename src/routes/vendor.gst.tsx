import { createFileRoute } from "@tanstack/react-router";
import { Receipt } from "lucide-react";
import { PageHeader, PanelCard, Pill, PrimaryButton } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/vendor/gst")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="GST Details" description="Tax registration & compliance" icon={Receipt} />
      <PanelCard>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Legal entity name", "Sunrise Books Pvt. Ltd."],
            ["GSTIN", "29ABCDE1234F1Z5"],
            ["PAN", "ABCDE1234F"],
            ["State of registration", "Karnataka"],
            ["HSN code (default)", "4901"],
            ["Place of supply", "Bengaluru"],
          ].map(([k, v]) => (
            <label key={k}>
              <div className="text-[11px] font-bold uppercase text-muted-foreground">{k}</div>
              <input defaultValue={v} className="mt-1 w-full rounded-2xl border border-border bg-white/70 px-3 py-2 text-sm" />
            </label>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Pill tone="leaf">Verified</Pill>
          <PrimaryButton>Save</PrimaryButton>
        </div>
      </PanelCard>
    </div>
  );
}
