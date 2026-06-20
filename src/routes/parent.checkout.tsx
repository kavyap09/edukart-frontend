import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CreditCard, MapPin, Loader2 } from "lucide-react";
import { PageHeader, PanelCard, PrimaryButton } from "@/components/dashboard/page-shell";
import { useCart, calcTotals, type ShippingAddress, type OrderItem } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/parent/checkout")({ component: Page });

const DRAFT_KEY = "edukart.checkout-draft";

function Page() {
  const { user } = useAuth();
  const { data: cart = [], isLoading } = useCart();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const items: OrderItem[] = cart.map((r) => ({
    product_id: r.product_id,
    name: r.product.name,
    vendor: r.product.vendor,
    price: r.product.price,
    image: r.product.image,
    quantity: r.quantity,
  }));
  const totals = calcTotals(items);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (items.length === 0) return;
    const fd = new FormData(e.currentTarget);
    const address: ShippingAddress = {
      full_name: String(fd.get("full_name") || user?.name || ""),
      phone: String(fd.get("phone") || ""),
      line1: String(fd.get("line1") || ""),
      city: String(fd.get("city") || ""),
      state: String(fd.get("state") || ""),
      pincode: String(fd.get("pincode") || ""),
    };
    setBusy(true);
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ items, address }));
    navigate({ to: "/parent/payment" });
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Checkout" description="Secure · GST-compliant" icon={CreditCard} />

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : items.length === 0 ? (
        <PanelCard>
          <div className="py-12 text-center">
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <Link to="/parent/products" className="mt-4 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background">
              Browse products
            </Link>
          </div>
        </PanelCard>
      ) : (
        <form className="grid gap-6 lg:grid-cols-3" onSubmit={onSubmit}>
          <div className="space-y-6 lg:col-span-2">
            <PanelCard title="Delivery address" actions={<MapPin className="h-4 w-4 text-muted-foreground" />}>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Full name" name="full_name" defaultValue={user?.name ?? ""} />
                <Field label="Phone" name="phone" placeholder="+91 98xxxxxxxx" />
                <div className="sm:col-span-2">
                  <Field label="Address" name="line1" placeholder="Flat / building / street" />
                </div>
                <Field label="City" name="city" />
                <Field label="State" name="state" />
                <Field label="PIN code" name="pincode" placeholder="560038" />
              </div>
            </PanelCard>

            <PanelCard title="Items">
              <ul className="divide-y divide-border/60">
                {items.map((it) => (
                  <li key={it.product_id} className="flex items-center justify-between gap-3 py-3 text-sm">
                    <div className="flex min-w-0 items-center gap-3">
                      <img src={it.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <div className="truncate font-bold">{it.name}</div>
                        <div className="text-[11px] text-muted-foreground">{it.vendor} · Qty {it.quantity}</div>
                      </div>
                    </div>
                    <div className="font-bold">₹{(it.price * it.quantity).toLocaleString("en-IN")}</div>
                  </li>
                ))}
              </ul>
            </PanelCard>
          </div>

          <PanelCard title="Order summary">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Items ({items.reduce((s, i) => s + i.quantity, 0)})</span><span className="font-bold">₹{totals.subtotal.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="font-bold">{totals.shipping === 0 ? "Free" : `₹${totals.shipping}`}</span></div>
              <div className="flex justify-between"><span>GST (5%)</span><span className="font-bold">₹{totals.tax.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between border-t border-border pt-2 font-display text-lg font-bold">
                <span>Total</span><span>₹{totals.total.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <PrimaryButton>{busy ? "Loading…" : "Continue to Payment"}</PrimaryButton>
          </PanelCard>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold">{label}</span>
      <input
        name={name}
        required
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-white/70 px-4 py-2.5 text-sm outline-none focus:shadow-md"
      />
    </label>
  );
}
