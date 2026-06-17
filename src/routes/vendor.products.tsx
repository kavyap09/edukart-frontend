import { createFileRoute } from "@tanstack/react-router";
import { Package, Plus } from "lucide-react";
import { PageHeader, PanelCard, Pill, PrimaryButton, DataTable } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/vendor/products")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Management"
        description="Add, edit and publish SKUs"
        icon={Package}
        actions={<PrimaryButton><span className="flex items-center gap-1"><Plus className="h-4 w-4" /> Add product</span></PrimaryButton>}
      />
      <PanelCard>
        <DataTable
          columns={["SKU", "Name", "Category", "Price", "Stock", "Status"]}
          rows={[
            ["SB-0001", "NCERT Maths Class 4", "Books", "₹240", "128", <Pill tone="leaf">Live</Pill>],
            ["SB-0014", "Hindi Rimjhim", "Books", "₹160", "42", <Pill tone="leaf">Live</Pill>],
            ["SB-0102", "Geometry Box Pro", "Stationery", "₹280", "8", <Pill tone="tangerine">Low stock</Pill>],
            ["SB-0211", "Notebook Pack (10)", "Stationery", "₹180", "0", <Pill tone="muted">Draft</Pill>],
          ]}
        />
      </PanelCard>
    </div>
  );
}
