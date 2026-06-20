import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ShoppingBag, Truck, Wallet, Heart, ArrowRight, ShoppingCart } from "lucide-react";
import { PageHeader, StatCard, PanelCard, Pill, PrimaryButton } from "@/components/dashboard/page-shell";
import { useAuth } from "@/lib/auth";
import { useCart, useWishlist, useOrders } from "@/lib/api";

export const Route = createFileRoute("/parent/")({
  component: ParentDashboard,
});

function ParentDashboard() {
  const { user } = useAuth();
  const { data: cart = [] } = useCart();
  const { data: wishlist = [] } = useWishlist();
  const { data: orders = [] } = useOrders();

  const cartItems = cart.reduce((s, r) => s + r.quantity, 0);
  const cartTotal = cart.reduce((s, r) => s + r.quantity * r.product.price, 0);
  const totalSpent = orders.reduce((s, o) => s + o.total, 0);
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user?.name ?? "there"} 👋`}
        description="Here's a snapshot of your school shopping with EduKart."
        icon={Sparkles}
        actions={
          <Link to="/parent/products">
            <PrimaryButton>Browse products</PrimaryButton>
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Items in cart" value={String(cartItems)} delta={cartItems ? `₹${cartTotal}` : "Empty"} icon={ShoppingCart} tone="sky" />
        <StatCard label="Wishlist" value={String(wishlist.length)} icon={Heart} tone="tangerine" />
        <StatCard label="Total orders" value={String(orders.length)} icon={Truck} tone="leaf" />
        <StatCard label="Lifetime spend" value={`₹${totalSpent.toLocaleString("en-IN")}`} icon={Wallet} tone="sunny" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PanelCard title="Recent orders" actions={<Link to="/parent/orders" className="text-xs font-bold text-foreground hover:underline">View all</Link>}>
          {recentOrders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/60 bg-white/40 p-6 text-center text-sm text-muted-foreground">
              No orders yet. <Link to="/parent/products" className="font-semibold text-foreground hover:underline">Start shopping →</Link>
            </div>
          ) : (
            <ul className="space-y-3 text-sm">
              {recentOrders.map((o) => (
                <li key={o.id}>
                  <Link
                    to="/parent/invoice/$orderId"
                    params={{ orderId: o.id }}
                    className="flex items-center justify-between rounded-2xl border border-border/60 bg-white/60 px-4 py-3 hover-lift"
                  >
                    <div>
                      <div className="font-bold">#{o.order_number}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {new Date(o.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })} · {o.items.length} items
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Pill tone={o.status === "paid" ? "leaf" : "sky"}>{o.status}</Pill>
                      <div className="font-display font-bold">₹{o.total.toLocaleString("en-IN")}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </PanelCard>

        <PanelCard title="Quick links">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { to: "/parent/products", label: "Browse Products", icon: ShoppingBag },
              { to: "/parent/cart", label: "View Cart", icon: ShoppingCart },
              { to: "/parent/wishlist", label: "My Wishlist", icon: Heart },
              { to: "/parent/orders", label: "Track Orders", icon: Truck },
            ].map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="hover-lift flex items-center justify-between rounded-2xl border border-border/60 bg-white/70 p-4"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--sky)]/40">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-bold">{label}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </PanelCard>
      </div>
    </div>
  );
}
