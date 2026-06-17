import { createFileRoute } from "@tanstack/react-router";
import { Undo2 } from "lucide-react";
import { PageHeader, PanelCard, Pill, DataTable } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/admin/returns")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Returns & Refunds" description="Open and resolved cases" icon={Undo2} />
      <PanelCard>
        <DataTable
          columns={["Case #", "Order", "Vendor", "Reason", "Amount", "Status"]}
          rows={[
            ["RT-0921", "#EDU-10262", "Brightline", "Size mismatch", "₹1,490", <Pill tone="sunny">Open</Pill>],
            ["RT-0918", "#EDU-10241", "Sunrise Books", "Wrong edition", "₹240", <Pill tone="leaf">Refunded</Pill>],
            ["RT-0905", "#EDU-10202", "Studyo", "Damaged box", "₹280", <Pill tone="leaf">Refunded</Pill>],
            ["RT-0898", "#EDU-10188", "Footzy", "Late delivery", "₹1,290", <Pill tone="tangerine">Disputed</Pill>],
          ]}
        />
      </PanelCard>
    </div>
  );
}
