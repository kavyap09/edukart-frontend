import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { QrCode, Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import { PageHeader, PanelCard, PrimaryButton } from "@/components/dashboard/page-shell";
import { useCreateOrder, calcTotals, type OrderItem, type ShippingAddress } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/parent/payment")({ component: Page });

const DRAFT_KEY = "edukart.checkout-draft";

type Draft = { items: OrderItem[]; address: ShippingAddress };

function Page() {
  const navigate = useNavigate();
  const createOrder = useCreateOrder();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [status, setStatus] = useState<"idle" | "paying" | "done">("idle");

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) setDraft(JSON.parse(raw));
    } catch {}
  }, []);

  const totals = useMemo(() => (draft ? calcTotals(draft.items) : null), [draft]);

  const qrUrl = useMemo(() => {
    if (!totals) return "";
    const upi = `upi://pay?pa=edukart@upi&pn=EduKart&am=${totals.total}&cu=INR&tn=EduKart%20Order`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(upi)}`;
  }, [totals]);

  if (!draft || !totals) {
    return (
      <div className="space-y-6">
        <PageHeader title="Payment" description="Complete your order" icon={QrCode} />
        <PanelCard>
          <div className="py-12 text-center">
            <p className="text-sm text-muted-foreground">No checkout in progress.</p>
            <Link to="/parent/cart" className="mt-4 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background">
              Back to cart
            </Link>
          </div>
        </PanelCard>
      </div>
    );
  }

  const pay = async () => {
    setStatus("paying");
    // simulate payment latency
    await new Promise((r) => setTimeout(r, 1400));
    try {
      const order = await createOrder.mutateAsync({
        items: draft.items,
        shipping_address: draft.address,
      });
      sessionStorage.removeItem(DRAFT_KEY);
      setStatus("done");
      toast.success("Payment successful");
      navigate({ to: "/parent/invoice/$orderId", params: { orderId: order.id } });
    } catch (e: any) {
      setStatus("idle");
      toast.error(e?.message || "Payment failed");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Pay & Confirm" description="Scan the QR or simulate a successful payment" icon={QrCode} />

      <div className="grid gap-6 lg:grid-cols-2">
        <PanelCard title="Scan to pay (UPI)">
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="rounded-3xl bg-white p-4 shadow-[var(--shadow-soft)] ring-1 ring-border/60">
              <img src={qrUrl} alt="UPI QR" width={260} height={260} />
            </div>
            <div className="text-center">
              <div className="font-display text-2xl font-bold">₹{totals.total.toLocaleString("en-IN")}</div>
              <div className="text-xs text-muted-foreground">Pay to <span className="font-semibold">edukart@upi</span></div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" /> Demo gateway · no real charge
            </div>
            <PrimaryButton onClick={pay}>
              {status === "paying" ? (
                <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Confirming payment…</span>
              ) : status === "done" ? (
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Paid</span>
              ) : (
                "Simulate payment success"
              )}
            </PrimaryButton>
          </div>
        </PanelCard>

        <PanelCard title="Order summary">
          <ul className="mb-3 max-h-56 space-y-2 overflow-y-auto pr-1 text-sm">
            {draft.items.map((i) => (
              <li key={i.product_id} className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <img src={i.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <div className="truncate font-semibold">{i.name}</div>
                    <div className="text-[11px] text-muted-foreground">Qty {i.quantity}</div>
                  </div>
                </div>
                <div className="font-bold">₹{(i.price * i.quantity).toLocaleString("en-IN")}</div>
              </li>
            ))}
          </ul>
          <div className="space-y-1.5 border-t border-border pt-3 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">₹{totals.subtotal.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className="font-bold">{totals.shipping === 0 ? "Free" : `₹${totals.shipping}`}</span></div>
            <div className="flex justify-between"><span>GST (5%)</span><span className="font-bold">₹{totals.tax.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between border-t border-border pt-2 font-display text-lg font-bold">
              <span>Total</span><span>₹{totals.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-border/60 bg-white/60 p-3 text-xs">
            <div className="font-semibold">Shipping to</div>
            <div className="text-muted-foreground">
              {draft.address.full_name}, {draft.address.phone}<br />
              {draft.address.line1}, {draft.address.city}, {draft.address.state} {draft.address.pincode}
            </div>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}
