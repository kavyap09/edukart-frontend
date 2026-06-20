import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Loader2 } from "lucide-react";
import { PageHeader, PanelCard, Pill, DataTable } from "@/components/dashboard/page-shell";
import { useOrders } from "@/lib/api";

export const Route = createFileRoute("/parent/orders")({ component: Page });

function Page() {
  const { data: orders = [], isLoading } = useOrders();

  return (
    <div className="space-y-6">
      <PageHeader title="My Orders" description="Track every order placed on EduKart" icon={Truck} />
      <PanelCard>
        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : orders.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-muted-foreground">You haven't placed any orders yet.</p>
            <Link to="/parent/products" className="mt-4 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background">
              Start shopping
            </Link>
          </div>
        ) : (
          <DataTable
            columns={["Order", "Date", "Items", "Total", "Status", ""]}
            rows={orders.map((o) => [
              `#${o.order_number}`,
              new Date(o.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" }),
              String(o.items.reduce((s, i) => s + i.quantity, 0)),
              `₹${o.total.toLocaleString("en-IN")}`,
              <Pill tone={o.status === "paid" ? "leaf" : "sky"}>{o.status}</Pill>,
              <Link
                to="/parent/invoice/$orderId"
                params={{ orderId: o.id }}
                className="inline-flex items-center rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-bold hover:bg-muted"
              >
                View invoice
              </Link>,
            ])}
          />
        )}
      </PanelCard>
    </div>
  );
}
