import { createFileRoute } from "@tanstack/react-router";
import { Package2 } from "lucide-react";
import { PageHeader, PanelCard, Pill, DataTable } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/vendor/orders")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Orders" description="Confirm, pack and ship parent orders" icon={Package2} />
      <PanelCard>
        <DataTable
          columns={["Order #", "Parent", "Items", "Total", "ETA", "Status"]}
          rows={[
            ["#EDU-10293", "Priya R.", "5", "₹1,860", "Fri", <Pill tone="sky">To pack</Pill>],
            ["#EDU-10291", "Arjun M.", "2", "₹540", "Today", <Pill tone="tangerine">Confirm</Pill>],
            ["#EDU-10288", "Sneha T.", "9", "₹3,420", "Sat", <Pill tone="sky">To pack</Pill>],
            ["#EDU-10285", "Rahul V.", "1", "₹180", "—", <Pill tone="leaf">Delivered</Pill>],
            ["#EDU-10277", "Anita J.", "4", "₹1,120", "—", <Pill tone="muted">Cancelled</Pill>],
          ]}
        />
      </PanelCard>
    </div>
  );
}
