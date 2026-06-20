import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Loader2 } from "lucide-react";
import { PageHeader, PanelCard, Pill, DataTable } from "@/components/dashboard/page-shell";
import { useOrders } from "@/lib/api";

export const Route = createFileRoute("/parent/invoices")({ component: Page });

function Page() {
  const { data: orders = [], isLoading } = useOrders();

  return (
    <div className="space-y-6">
      <PageHeader title="Invoices" description="Every order on EduKart comes with a GST invoice" icon={FileText} />
      <PanelCard>
        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : orders.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">No invoices yet.</p>
        ) : (
          <DataTable
            columns={["Invoice #", "Date", "Amount", "GST", "Status", ""]}
            rows={orders.map((o) => [
              o.order_number,
              new Date(o.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" }),
              `₹${o.total.toLocaleString("en-IN")}`,
              `₹${o.tax.toLocaleString("en-IN")}`,
              <Pill tone={o.status === "paid" ? "leaf" : "sky"}>{o.status}</Pill>,
              <Link
                to="/parent/invoice/$orderId"
                params={{ orderId: o.id }}
                className="inline-flex items-center rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-bold hover:bg-muted"
              >
                Open
              </Link>,
            ])}
          />
        )}
      </PanelCard>
    </div>
  );
}
