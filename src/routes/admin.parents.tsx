import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { PageHeader, PanelCard, Pill, DataTable } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/admin/parents")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Manage Parents" description="Search, support and moderate parent accounts" icon={Users} />
      <PanelCard>
        <DataTable
          columns={["Parent", "City", "Children", "Orders", "GMV", "Status"]}
          rows={[
            ["Priya Ramesh", "Bengaluru", "1", "12", "₹18,420", <Pill tone="leaf">Active</Pill>],
            ["Arjun Mehta", "Bengaluru", "2", "8", "₹9,840", <Pill tone="leaf">Active</Pill>],
            ["Sneha Thomas", "Bengaluru", "1", "5", "₹4,210", <Pill tone="leaf">Active</Pill>],
            ["Rahul Verma", "Bengaluru", "3", "21", "₹32,180", <Pill tone="sunny">Watch</Pill>],
          ]}
        />
      </PanelCard>
    </div>
  );
}
