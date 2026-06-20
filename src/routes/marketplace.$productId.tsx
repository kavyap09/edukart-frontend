import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { ProductCard } from "@/components/ProductCard";
import { useProduct, useProducts, useAddToCart, useToggleWishlist } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/marketplace/$productId")({
  head: ({ params }) => ({
    meta: [
      { title: `Product — EduKart` },
      { name: "description", content: "Product on EduKart marketplace." },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { productId } = Route.useParams();
  const { user } = useAuth();
  const { data: p, isLoading } = useProduct(productId);
  const { data: all } = useProducts();
  const [active, setActive] = useState(0);
  const addToCart = useAddToCart();
  const toggleWishlist = useToggleWishlist();
  const [busy, setBusy] = useState<"cart" | "wish" | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <PublicNav />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!p) {
    return (
      <div className="min-h-screen bg-background">
        <PublicNav />
        <div className="mx-auto max-w-xl px-6 py-24 text-center">
          <h1 className="font-display text-3xl font-bold">Product not found</h1>
          <Link
            to="/marketplace"
            className="mt-6 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
          >
            Back to marketplace
          </Link>
        </div>
      </div>
    );
  }

  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);
  const similar = (all ?? [])
    .filter((x) => x.id !== p.id && x.category === p.category)
    .slice(0, 4);
  const isParent = user?.role === "parent";

  const handleAdd = async () => {
    if (!isParent) return toast.info("Sign in as a parent to add to cart");
    setBusy("cart");
    try {
      await addToCart.mutateAsync({ productId: p.id });
      toast.success("Added to cart");
    } catch (e: any) {
      toast.error(e?.message || "Could not add");
    } finally {
      setBusy(null);
    }
  };

  const handleWish = async () => {
    if (!isParent) return toast.info("Sign in as a parent to save items");
    setBusy("wish");
    try {
      const { added } = await toggleWishlist.mutateAsync(p.id);
      toast.success(added ? "Added to wishlist" : "Removed from wishlist");
    } catch (e: any) {
      toast.error(e?.message || "Could not update wishlist");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to marketplace
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-3">
            <div className="overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-soft)] ring-1 ring-border/60">
              <img
                src={p.gallery[active] ?? p.image}
                alt={p.name}
                className="aspect-square w-full object-cover"
              />
            </div>
            {p.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {p.gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white ring-2 transition-all ${
                      active === i ? "ring-foreground" : "ring-border/60 hover:ring-foreground/40"
                    }`}
                  >
                    <img src={g} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {p.category}
              </div>
              <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">{p.name}</h1>
              <div className="mt-2 text-sm text-muted-foreground">
                Sold by <span className="font-semibold text-foreground">{p.vendor}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-md bg-[var(--leaf)]/30 px-2 py-1 text-xs font-bold">
                {p.rating} <Star className="h-3 w-3 fill-current" />
              </span>
              <span className="text-xs text-muted-foreground">{p.reviews} reviews</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span
                className="text-xs font-semibold"
                style={{ color: p.stock > 0 ? "var(--leaf-foreground)" : "var(--destructive)" }}
              >
                {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
              </span>
            </div>

            <div className="rounded-3xl glass-card p-5">
              <div className="flex items-end gap-3">
                <div className="font-display text-4xl font-bold">₹{p.price}</div>
                {p.mrp > p.price && (
                  <>
                    <div className="text-base text-muted-foreground line-through">₹{p.mrp}</div>
                    <div className="rounded-full bg-[var(--tangerine)] px-2 py-0.5 text-xs font-bold text-[var(--tangerine-foreground)]">
                      {off}% off
                    </div>
                  </>
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={handleAdd}
                  disabled={busy === "cart"}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-transform hover:scale-105 disabled:opacity-60"
                >
                  {busy === "cart" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ShoppingCart className="h-4 w-4" />
                  )}{" "}
                  Add to cart
                </button>
                <button
                  onClick={handleWish}
                  disabled={busy === "wish"}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-6 py-3 text-sm font-bold text-foreground hover:bg-white disabled:opacity-60"
                >
                  {busy === "wish" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Heart className="h-4 w-4" />
                  )}{" "}
                  Wishlist
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              {[
                { i: <Truck className="h-4 w-4" />, t: "Free delivery", s: "Orders above ₹499" },
                { i: <ShieldCheck className="h-4 w-4" />, t: "Verified vendor", s: "Quality checked" },
                { i: <RotateCcw className="h-4 w-4" />, t: "7-day returns", s: "Easy refunds" },
              ].map((b) => (
                <div key={b.t} className="rounded-2xl bg-white/80 p-3 ring-1 ring-border/60">
                  <div className="text-foreground">{b.i}</div>
                  <div className="mt-1 font-bold">{b.t}</div>
                  <div className="text-muted-foreground">{b.s}</div>
                </div>
              ))}
            </div>

            {(p.grade || p.subject || p.publication) && (
              <div className="rounded-3xl glass-card p-5">
                <h3 className="font-display font-bold">Specifications</h3>
                <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  {p.grade && (
                    <>
                      <dt className="text-muted-foreground">Grade</dt>
                      <dd className="font-semibold">{p.grade}</dd>
                    </>
                  )}
                  {p.subject && (
                    <>
                      <dt className="text-muted-foreground">Subject</dt>
                      <dd className="font-semibold">{p.subject}</dd>
                    </>
                  )}
                  {p.publication && (
                    <>
                      <dt className="text-muted-foreground">Publication</dt>
                      <dd className="font-semibold">{p.publication}</dd>
                    </>
                  )}
                  <dt className="text-muted-foreground">Vendor</dt>
                  <dd className="font-semibold">{p.vendor}</dd>
                </dl>
              </div>
            )}

            <div className="rounded-3xl glass-card p-5">
              <h3 className="font-display font-bold">Description</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold">Similar products</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {similar.map((s) => (
                <ProductCard key={s.id} p={s} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
