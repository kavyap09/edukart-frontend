import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download } from "lucide-react";
import { PageHeader, PanelCard, Pill, DataTable } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/parent/invoices")({ component: Page });

function btn() {
  return (
    <button className="inline-flex items-center gap-1 rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-bold hover:bg-muted">
      <Download className="h-3 w-3" /> PDF
    </button>
  );
}

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="GST Invoices" description="Download tax-compliant invoices for every order" icon={FileText} />
      <PanelCard>
        <DataTable
          columns={["Invoice #", "Order", "Date", "Amount", "GST", "Status", ""]}
          rows={[
            ["INV-2026-0231", "#EDU-10293", "12 Jun 2026", "₹3,153", "₹213", <Pill tone="leaf">Paid</Pill>, btn()],
            ["INV-2026-0218", "#EDU-10285", "08 Jun 2026", "₹180",  "₹12",  <Pill tone="leaf">Paid</Pill>, btn()],
            ["INV-2026-0190", "#EDU-10271", "01 Jun 2026", "₹1,420","₹98",  <Pill tone="leaf">Paid</Pill>, btn()],
            ["INV-2026-0162", "#EDU-10262", "24 May 2026", "₹4,820","₹325", <Pill tone="tangerine">Refunded</Pill>, btn()],
          ]}
        />
      </PanelCard>
    </div>
  );
}
