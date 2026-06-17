import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, X } from "lucide-react";
import { PageHeader, PanelCard, Pill, DataTable } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/admin/approvals")({ component: Page });

const actions = (
  <div className="flex justify-end gap-2">
    <button className="rounded-full bg-[var(--leaf)]/40 px-3 py-1 text-xs font-bold hover:bg-[var(--leaf)]/60"><span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Approve</span></button>
    <button className="rounded-full bg-[var(--tangerine)]/40 px-3 py-1 text-xs font-bold hover:bg-[var(--tangerine)]/60"><span className="inline-flex items-center gap-1"><X className="h-3 w-3" /> Reject</span></button>
  </div>
);

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Approve / Reject Vendors" description="Review onboarding submissions" icon={CheckCircle2} />
      <PanelCard>
        <DataTable
          columns={["Vendor", "Category", "GST", "KYC", "Submitted", ""]}
          rows={[
            ["Aastha Books", "Books", <Pill tone="leaf">Verified</Pill>, <Pill tone="leaf">OK</Pill>, "2 days ago", actions],
            ["Brightline Uniforms", "Uniforms", <Pill tone="leaf">Verified</Pill>, <Pill tone="leaf">OK</Pill>, "1 day ago", actions],
            ["Studyo Stationery", "Stationery", <Pill tone="tangerine">Missing</Pill>, <Pill tone="sunny">Review</Pill>, "5 hr ago", actions],
            ["Footzy Shoes", "Footwear", <Pill tone="leaf">Verified</Pill>, <Pill tone="leaf">OK</Pill>, "3 hr ago", actions],
          ]}
        />
      </PanelCard>
    </div>
  );
}
