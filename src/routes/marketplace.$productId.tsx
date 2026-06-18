import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, ShoppingCart, Heart, Truck, ShieldCheck, RotateCcw, ArrowLeft } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, similarProducts } from "@/lib/products";

export const Route = createFileRoute("/marketplace/$productId")({
  head: ({ params }) => {
    const p = getProduct(params.productId);
    return {
      meta: [
        { title: p ? `${p.name} — EduKart` : "Product — EduKart" },
        { name: "description", content: p?.description ?? "Product on EduKart marketplace." },
        ...(p ? [{ property: "og:image", content: p.image }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Product not found</h1>
        <Link to="/marketplace" className="mt-6 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background">
          Back to marketplace
        </Link>
      </div>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product: p } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const similar = similarProducts(p.id);
  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Link to="/marketplace" className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to marketplace
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* gallery */}
          <div className="space-y-3">
            <div className="overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-soft)] ring-1 ring-border/60">
              <img src={p.gallery[active]} alt={p.name} className="aspect-square w-full object-cover" />
            </div>
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
          </div>

          {/* info */}
          <div className="space-y-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{p.category}</div>
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
              <span className="text-xs font-semibold" style={{ color: p.stock > 0 ? "var(--leaf-foreground)" : "var(--destructive)" }}>
                {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
              </span>
            </div>

            <div className="rounded-3xl glass-card p-5">
              <div className="flex items-end gap-3">
                <div className="font-display text-4xl font-bold">₹{p.price}</div>
                {p.mrp > p.price && (
                  <>
                    <div className="text-base text-muted-foreground line-through">₹{p.mrp}</div>
                    <div className="rounded-full bg-[var(--tangerine)] px-2 py-0.5 text-xs font-bold text-[var(--tangerine-foreground)]">{off}% off</div>
                  </>
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-transform hover:scale-105">
                  <ShoppingCart className="h-4 w-4" /> Add to cart
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-6 py-3 text-sm font-bold text-foreground hover:bg-white">
                  <Heart className="h-4 w-4" /> Wishlist
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
                  {p.grade && (<><dt className="text-muted-foreground">Grade</dt><dd className="font-semibold">{p.grade}</dd></>)}
                  {p.subject && (<><dt className="text-muted-foreground">Subject</dt><dd className="font-semibold">{p.subject}</dd></>)}
                  {p.publication && (<><dt className="text-muted-foreground">Publication</dt><dd className="font-semibold">{p.publication}</dd></>)}
                  <dt className="text-muted-foreground">Vendor</dt><dd className="font-semibold">{p.vendor}</dd>
                </dl>
              </div>
            )}

            <div className="rounded-3xl glass-card p-5">
              <h3 className="font-display font-bold">Description</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
            </div>
          </div>
        </div>

        {/* reviews */}
        <section className="mt-12 rounded-3xl glass-card p-6">
          <h2 className="font-display text-xl font-bold">Ratings & reviews</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-[auto_1fr]">
            <div className="text-center">
              <div className="font-display text-5xl font-bold">{p.rating}</div>
              <div className="mt-1 flex justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(p.rating) ? "fill-[var(--tangerine)] text-[var(--tangerine)]" : "text-muted-foreground"}`} />
                ))}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{p.reviews} reviews</div>
            </div>
            <div className="space-y-4">
              {[
                { n: "Anita R.", q: "Exactly as described. Delivered in 2 days. My child loves it!" },
                { n: "Rohan K.", q: "Good quality and fair price. Will buy again next year." },
              ].map((r) => (
                <div key={r.n} className="rounded-2xl bg-white/70 p-4 ring-1 ring-border/60">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-sm">{r.n}</div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-[var(--tangerine)] text-[var(--tangerine)]" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{r.q}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* similar */}
        {similar.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold">Similar products</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {similar.map((s) => <ProductCard key={s.id} p={s} />)}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
