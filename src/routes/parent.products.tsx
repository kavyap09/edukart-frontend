import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ShoppingBag, Search, Loader2 } from "lucide-react";
import { PageHeader, PanelCard } from "@/components/dashboard/page-shell";
import { ProductCard } from "@/components/ProductCard";
import { useProducts, CATEGORIES } from "@/lib/api";

export const Route = createFileRoute("/parent/products")({ component: Page });

function Page() {
  const { data: products = [], isLoading } = useProducts();
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    let arr = products;
    if (cat !== "All") arr = arr.filter((p) => p.category === cat);
    if (q.trim()) {
      const s = q.toLowerCase();
      arr = arr.filter((p) => p.name.toLowerCase().includes(s) || p.vendor.toLowerCase().includes(s));
    }
    return arr;
  }, [cat, q, products]);

  return (
    <div className="space-y-6">
      <PageHeader title="Browse Products" description="Live catalog from verified vendors" icon={ShoppingBag} />
      <PanelCard>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="relative flex min-w-[220px] flex-1 items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-full border border-border/60 bg-white/80 py-2.5 pl-9 pr-4 text-sm outline-none focus:shadow-md"
            />
          </div>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                cat === c
                  ? "bg-foreground text-background"
                  : "border border-border bg-white/70 hover:bg-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : list.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">No products match your filters.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </PanelCard>
    </div>
  );
}
