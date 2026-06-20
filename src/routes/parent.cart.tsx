import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingCart, Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { PageHeader, PanelCard, PrimaryButton } from "@/components/dashboard/page-shell";
import { useCart, useUpdateCartQty, useRemoveFromCart, calcTotals } from "@/lib/api";

export const Route = createFileRoute("/parent/cart")({ component: Page });

function Page() {
  const { data: cart = [], isLoading } = useCart();
  const updateQty = useUpdateCartQty();
  const remove = useRemoveFromCart();

  const items = cart.map((r) => ({
    product_id: r.product_id,
    name: r.product.name,
    vendor: r.product.vendor,
    price: r.product.price,
    image: r.product.image,
    quantity: r.quantity,
  }));
  const totals = calcTotals(items);

  // Group by vendor
  const byVendor = cart.reduce<Record<string, typeof cart>>((acc, r) => {
    (acc[r.product.vendor] = acc[r.product.vendor] || []).push(r);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <PageHeader title="My Cart" description="Multi-vendor checkout in one go" icon={ShoppingCart} />

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : cart.length === 0 ? (
        <PanelCard>
          <div className="py-12 text-center">
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <Link to="/parent/products" className="mt-4 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background">
              Browse products
            </Link>
          </div>
        </PanelCard>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {Object.entries(byVendor).map(([vendor, rows]) => (
              <PanelCard key={vendor} title={vendor}>
                <ul className="divide-y divide-border/60">
                  {rows.map((r) => (
                    <li key={r.id} className="flex items-center justify-between gap-3 py-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <img src={r.product.image} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                        <div className="min-w-0">
                          <div className="truncate text-sm font-bold">{r.product.name}</div>
                          <div className="text-[11px] text-muted-foreground">₹{r.product.price} each</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 rounded-full border border-border bg-white/70 px-2 py-1">
                          <button
                            onClick={() => updateQty.mutate({ id: r.id, quantity: r.quantity - 1 })}
                            className="rounded-full p-1 hover:bg-muted"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold">{r.quantity}</span>
                          <button
                            onClick={() => updateQty.mutate({ id: r.id, quantity: r.quantity + 1 })}
                            className="rounded-full p-1 hover:bg-muted"
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="w-20 text-right text-sm font-bold">
                          ₹{(r.quantity * r.product.price).toLocaleString("en-IN")}
                        </div>
                        <button
                          onClick={() => remove.mutate(r.id)}
                          className="rounded-full p-2 text-muted-foreground hover:bg-muted"
                          aria-label="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </PanelCard>
            ))}
          </div>

          <PanelCard title="Summary">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">₹{totals.subtotal.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="font-bold">{totals.shipping === 0 ? "Free" : `₹${totals.shipping}`}</span></div>
              <div className="flex justify-between"><span>GST (5%)</span><span className="font-bold">₹{totals.tax.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between border-t border-border pt-2 font-display text-lg font-bold">
                <span>Total</span><span>₹{totals.total.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <Link to="/parent/checkout" className="mt-3 block">
              <PrimaryButton>Proceed to Checkout</PrimaryButton>
            </Link>
          </PanelCard>
        </div>
      )}
    </div>
  );
}
