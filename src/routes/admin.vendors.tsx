import { createFileRoute } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { PageHeader, PanelCard, Pill, DataTable } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/admin/vendors")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Manage Vendors" description="All approved vendors" icon={Store} />
      <PanelCard>
        <DataTable
          columns={["Vendor", "Category", "Rating", "Orders (30d)", "GMV", "Status"]}
          rows={[
            ["Sunrise Books", "Books", "4.7★", "1,284", "₹4.2L", <Pill tone="leaf">Active</Pill>],
            ["Aastha Books", "Books", "4.5★", "812", "₹2.1L", <Pill tone="leaf">Active</Pill>],
            ["Brightline Uniforms", "Uniforms", "4.6★", "540", "₹6.4L", <Pill tone="leaf">Active</Pill>],
            ["Footzy Shoes", "Footwear", "4.2★", "320", "₹3.1L", <Pill tone="sunny">Watch</Pill>],
            ["Studyo Stationery", "Stationery", "4.8★", "1,012", "₹2.6L", <Pill tone="leaf">Active</Pill>],
          ]}
        />
      </PanelCard>
    </div>
  );
}
