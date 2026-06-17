import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { PageHeader, PanelCard, Pill, DataTable } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/vendor/inventory")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Inventory" description="Real-time stock across warehouses" icon={Boxes} />
      <PanelCard>
        <DataTable
          columns={["SKU", "Warehouse", "On hand", "Reserved", "Reorder", "Status"]}
          rows={[
            ["SB-0001", "BLR-Hub", "128", "12", "30", <Pill tone="leaf">OK</Pill>],
            ["SB-0014", "BLR-Hub", "42", "4", "20", <Pill tone="leaf">OK</Pill>],
            ["SB-0102", "BLR-Hub", "8", "3", "20", <Pill tone="tangerine">Reorder</Pill>],
            ["SB-0211", "BLR-Hub", "0", "0", "50", <Pill tone="muted">Out</Pill>],
          ]}
        />
      </PanelCard>
    </div>
  );
}
