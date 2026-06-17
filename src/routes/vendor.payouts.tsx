import { createFileRoute } from "@tanstack/react-router";
import { BadgeDollarSign } from "lucide-react";
import { PageHeader, PanelCard, Pill, DataTable, StatCard } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/vendor/payouts")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Payout Status" description="Weekly settlements to your bank" icon={BadgeDollarSign} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Pending" value="₹46,200" icon={BadgeDollarSign} tone="sunny" />
        <StatCard label="In transit" value="₹12,800" icon={BadgeDollarSign} tone="sky" />
        <StatCard label="Paid (30d)" value="₹2.4L" icon={BadgeDollarSign} tone="leaf" />
        <StatCard label="Held" value="₹3,400" icon={BadgeDollarSign} tone="tangerine" />
      </div>
      <PanelCard>
        <DataTable
          columns={["Cycle", "Window", "Amount", "UTR", "Status"]}
          rows={[
            ["W26", "10-16 Jun", "₹46,200", "—", <Pill tone="sunny">Pending</Pill>],
            ["W25", "03-09 Jun", "₹52,180", "HDFC2026061211", <Pill tone="leaf">Paid</Pill>],
            ["W24", "27-02 Jun", "₹38,940", "HDFC2026060511", <Pill tone="leaf">Paid</Pill>],
            ["W23", "20-26 May", "₹3,400",  "—", <Pill tone="tangerine">Hold</Pill>],
          ]}
        />
      </PanelCard>
    </div>
  );
}
