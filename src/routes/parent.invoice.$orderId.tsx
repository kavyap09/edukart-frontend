import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Printer, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { PageHeader, PanelCard, Pill, PrimaryButton } from "@/components/dashboard/page-shell";
import { useOrder } from "@/lib/api";

export const Route = createFileRoute("/parent/invoice/$orderId")({ component: Page });

function Page() {
  const { orderId } = Route.useParams();
  const { data: order, isLoading } = useOrder(orderId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-6">
        <PageHeader title="Invoice" icon={FileText} />
        <PanelCard>
          <div className="py-12 text-center">
            <p className="text-sm text-muted-foreground">Invoice not found.</p>
            <Link to="/parent/orders" className="mt-4 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background">
              Back to orders
            </Link>
          </div>
        </PanelCard>
      </div>
    );
  }

  const date = new Date(order.created_at).toLocaleDateString("en-IN", { dateStyle: "long" });
  const addr = order.shipping_address;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoice"
        description={`Order #${order.order_number}`}
        icon={FileText}
        actions={
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/70 px-4 py-2 text-xs font-bold hover:bg-muted"
          >
            <Printer className="h-3.5 w-3.5" /> Print / save PDF
          </button>
        }
      />

      <PanelCard>
        <div className="rounded-3xl bg-[var(--leaf)]/20 p-4 text-sm">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="h-4 w-4 text-[var(--leaf-foreground)]" /> Payment received · order confirmed
          </div>
          <p className="mt-1 text-xs text-muted-foreground">A copy of this invoice is available under Orders.</p>
        </div>
      </PanelCard>

      <div id="invoice" className="rounded-3xl bg-white p-6 sm:p-10 shadow-[var(--shadow-soft)] ring-1 ring-border/60 print:shadow-none print:ring-0">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-2xl text-white" style={{ background: "var(--gradient-sky)" }}>
                <span className="font-display text-lg font-bold">E</span>
              </div>
              <div>
                <div className="font-display text-xl font-bold">EduKart</div>
                <div className="text-[11px] text-muted-foreground">AI school marketplace</div>
              </div>
            </div>
          </div>
          <div className="text-right text-sm">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tax Invoice</div>
            <div className="mt-1 font-display text-lg font-bold">#{order.order_number}</div>
            <div className="text-xs text-muted-foreground">{date}</div>
            <div className="mt-2"><Pill tone={order.status === "paid" ? "leaf" : "sky"}>{order.status}</Pill></div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Billed to</div>
            <div className="mt-1 text-sm font-semibold">{order.customer_name}</div>
            <div className="text-xs text-muted-foreground">{order.customer_email}</div>
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Ship to</div>
            <div className="mt-1 text-sm font-semibold">{addr.full_name}</div>
            <div className="text-xs text-muted-foreground">
              {addr.line1}<br />{addr.city}, {addr.state} {addr.pincode}<br />{addr.phone}
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-2">Item</th>
                <th className="py-2 pr-2">Vendor</th>
                <th className="py-2 pr-2 text-right">Qty</th>
                <th className="py-2 pr-2 text-right">Price</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((it, i) => (
                <tr key={i} className="border-b border-border/60">
                  <td className="py-3 pr-2 font-semibold">{it.name}</td>
                  <td className="py-3 pr-2 text-muted-foreground">{it.vendor}</td>
                  <td className="py-3 pr-2 text-right">{it.quantity}</td>
                  <td className="py-3 pr-2 text-right">₹{it.price.toLocaleString("en-IN")}</td>
                  <td className="py-3 text-right font-bold">₹{(it.price * it.quantity).toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 ml-auto max-w-xs space-y-1.5 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">₹{order.subtotal.toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span className="font-bold">{order.shipping === 0 ? "Free" : `₹${order.shipping}`}</span></div>
          <div className="flex justify-between"><span>GST</span><span className="font-bold">₹{order.tax.toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between border-t border-border pt-2 font-display text-lg font-bold">
            <span>Grand total</span><span>₹{order.total.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <p className="mt-8 text-center text-[11px] text-muted-foreground">
          Thank you for shopping with EduKart. This is a system-generated invoice.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 print:hidden">
        <Link to="/parent/orders" className="inline-flex items-center gap-1 rounded-full border border-border bg-white/70 px-4 py-2 text-xs font-bold hover:bg-muted">
          <ArrowLeft className="h-3.5 w-3.5" /> All orders
        </Link>
        <Link to="/parent/products">
          <PrimaryButton>Continue shopping</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
