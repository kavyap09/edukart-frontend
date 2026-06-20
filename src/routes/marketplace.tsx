import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { ProductCard } from "@/components/ProductCard";
import { useProducts, CATEGORIES } from "@/lib/api";
import { useAuth, DASHBOARD_PATH } from "@/lib/auth";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — EduKart" },
      {
        name: "description",
        content:
          "Browse books, uniforms, bags, stationery and more from verified school vendors.",
      },
    ],
  }),
  component: Marketplace,
});

function Marketplace() {
  const { user } = useAuth();
  const { data: products, isLoading } = useProducts();
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("popular");

  const list = useMemo(() => {
    let arr = products ?? [];
    if (cat !== "All") arr = arr.filter((p) => p.category === cat);
    if (q.trim()) {
      const s = q.toLowerCase();
      arr = arr.filter(
        (p) => p.name.toLowerCase().includes(s) || p.vendor.toLowerCase().includes(s),
      );
    }
    const sorted = [...arr];
    if (sort === "low") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "high") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [cat, q, sort, products]);

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="px-4 pb-20 sm:px-6">
        <section className="mx-auto mt-8 max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-block rounded-full bg-white/70 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground backdrop-blur">
                Marketplace
              </span>
              <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
                Trusted school supplies, in one place
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {isLoading
                  ? "Loading products…"
                  : `Showing ${list.length} products from verified vendors`}
              </p>
            </div>
            {user ? (
              <Link
                to={DASHBOARD_PATH[user.role]}
                className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:scale-105"
              >
                Go to dashboard
              </Link>
            ) : (
              <Link
                to="/auth/parent/login"
                className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:scale-105"
              >
                Sign in to buy
              </Link>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-3xl glass-card p-3">
            <div className="relative flex min-w-[220px] flex-1 items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search books, bags, uniforms…"
                className="w-full rounded-full border border-border/60 bg-white/80 py-2.5 pl-9 pr-4 text-sm outline-none focus:shadow-md"
              />
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs">
              <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
              <label className="sr-only" htmlFor="sort">
                Sort
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent text-sm font-semibold outline-none"
              >
                <option value="popular">Most popular</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                  cat === c
                    ? "bg-foreground text-background"
                    : "border border-border bg-white/70 text-foreground hover:bg-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="mt-12 flex items-center justify-center rounded-3xl glass-card p-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : list.length === 0 ? (
            <div className="mt-12 rounded-3xl glass-card p-12 text-center">
              <p className="text-sm text-muted-foreground">No products match your search.</p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {list.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
