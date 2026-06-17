import { createFileRoute } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { PageHeader, PanelCard, Pill, DataTable } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/admin/products")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Manage Products" description="Search across all vendors" icon={Package} />
      <PanelCard>
        <DataTable
          columns={["SKU", "Product", "Vendor", "Category", "Price", "Status"]}
          rows={[
            ["SB-0001", "NCERT Maths Class 4", "Sunrise Books", "Books", "₹240", <Pill tone="leaf">Live</Pill>],
            ["AB-0902", "Marigold English Reader", "Aastha Books", "Books", "₹180", <Pill tone="leaf">Live</Pill>],
            ["BL-1201", "Grade 4 Uniform Set", "Brightline", "Uniforms", "₹1,490", <Pill tone="leaf">Live</Pill>],
            ["ST-0102", "Geometry Box Pro", "Studyo", "Stationery", "₹280", <Pill tone="sunny">Review</Pill>],
            ["FT-3301", "PE Shoes", "Footzy", "Shoes", "₹1,290", <Pill tone="leaf">Live</Pill>],
          ]}
        />
      </PanelCard>
    </div>
  );
}
