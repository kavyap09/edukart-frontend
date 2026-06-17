import { createFileRoute } from "@tanstack/react-router";
import { Package2 } from "lucide-react";
import { PageHeader, PanelCard, Pill, DataTable } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/admin/orders")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Manage Orders" description="All marketplace orders" icon={Package2} />
      <PanelCard>
        <DataTable
          columns={["Order #", "Parent", "Vendors", "Items", "Total", "Status"]}
          rows={[
            ["#EDU-10293", "Priya R.", "3", "8", "₹3,153", <Pill tone="sky">In transit</Pill>],
            ["#EDU-10291", "Arjun M.", "1", "2", "₹540", <Pill tone="leaf">Delivered</Pill>],
            ["#EDU-10288", "Sneha T.", "2", "9", "₹3,420", <Pill tone="sunny">Processing</Pill>],
            ["#EDU-10285", "Rahul V.", "1", "1", "₹180", <Pill tone="leaf">Delivered</Pill>],
            ["#EDU-10277", "Anita J.", "2", "4", "₹1,120", <Pill tone="tangerine">Cancelled</Pill>],
          ]}
        />
      </PanelCard>
    </div>
  );
}
