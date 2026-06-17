import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download } from "lucide-react";
import { PageHeader, PanelCard, Pill, DataTable } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/vendor/invoices")({ component: Page });

const btn = (
  <button className="inline-flex items-center gap-1 rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-bold hover:bg-muted">
    <Download className="h-3 w-3" /> PDF
  </button>
);

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Invoice Generation" description="Auto-generated GST invoices for every order" icon={FileText} />
      <PanelCard>
        <DataTable
          columns={["Invoice #", "Order", "Buyer", "Amount", "GST", "Status", ""]}
          rows={[
            ["SB/2026/0231", "#EDU-10293", "Priya R.", "₹1,860", "₹126", <Pill tone="leaf">Issued</Pill>, btn],
            ["SB/2026/0228", "#EDU-10288", "Sneha T.", "₹3,420", "₹231", <Pill tone="leaf">Issued</Pill>, btn],
            ["SB/2026/0221", "#EDU-10285", "Rahul V.", "₹180",   "₹12",  <Pill tone="leaf">Issued</Pill>, btn],
          ]}
        />
      </PanelCard>
    </div>
  );
}
