import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Trash2, ShoppingCart, Loader2 } from "lucide-react";
import { PageHeader, PanelCard, Pill } from "@/components/dashboard/page-shell";
import { useWishlist, useRemoveWishlist, useAddToCart } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/parent/wishlist")({ component: Page });

function Page() {
  const { data: items = [], isLoading } = useWishlist();
  const remove = useRemoveWishlist();
  const addToCart = useAddToCart();

  const moveToCart = async (productId: string, wishId: string) => {
    try {
      await addToCart.mutateAsync({ productId });
      await remove.mutateAsync(wishId);
      toast.success("Moved to cart");
    } catch (e: any) {
      toast.error(e?.message || "Could not move to cart");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Wishlist" description="Save items for later" icon={Heart} />
      <PanelCard>
        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-muted-foreground">Your wishlist is empty.</p>
            <Link to="/parent/products" className="mt-4 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background">
              Find something you love
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((r) => (
              <div key={r.id} className="hover-lift overflow-hidden rounded-3xl border border-border/60 bg-white/70">
                <Link to="/marketplace/$productId" params={{ productId: r.product.id }} className="block">
                  <img src={r.product.image} alt={r.product.name} className="h-36 w-full object-cover" />
                </Link>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-bold">{r.product.name}</div>
                      <div className="text-[11px] text-muted-foreground">by {r.product.vendor}</div>
                    </div>
                    <Pill tone="sunny">{r.product.category}</Pill>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="font-display text-lg font-bold">₹{r.product.price.toLocaleString("en-IN")}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => moveToCart(r.product.id, r.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background"
                      >
                        <ShoppingCart className="h-3 w-3" /> Move
                      </button>
                      <button onClick={() => remove.mutate(r.id)} className="rounded-full p-2 hover:bg-muted" aria-label="Remove">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </PanelCard>
    </div>
  );
}
