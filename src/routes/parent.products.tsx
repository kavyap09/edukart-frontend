import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag, Heart } from "lucide-react";
import { PageHeader, PanelCard, Pill } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/parent/products")({ component: Page });

const cats = ["All", "Books", "Uniforms", "Bags", "Stationery", "Shoes", "Lab Kits"];
const products = Array.from({ length: 9 }, (_, i) => ({
  name: ["Maths Workbook", "Sketch Set", "PE Shoes", "Lab Goggles", "Notebook Pack", "Water Bottle", "School Bag", "Hindi Reader", "Crayons 24"][i],
  vendor: ["Sunrise", "Studyo", "Footzy", "Aastha", "Studyo", "Brightline", "Footzy", "Aastha", "Studyo"][i],
  price: [220, 350, 1290, 480, 180, 290, 1390, 160, 130][i],
  tag: ["Best Seller", "AI Pick", "New", "Lab", "Bundle", "Eco", "Trending", "School Approved", "Kid Fav"][i],
}));

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Browse Products" description="Across 240+ verified vendors" icon={ShoppingBag} />
      <PanelCard>
        <div className="mb-4 flex flex-wrap gap-2">
          {cats.map((c, i) => (
            <button key={c} className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${i===0?"bg-foreground text-background":"border border-border bg-white/70 hover:bg-muted"}`}>{c}</button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.name} className="hover-lift overflow-hidden rounded-3xl border border-border/60 bg-white/70">
              <div className="relative h-36 [background:var(--gradient-sky)]">
                <Pill tone="sunny"><span className="ml-2">{p.tag}</span></Pill>
                <button className="absolute right-3 top-3 rounded-full bg-white/80 p-2 hover:scale-110"><Heart className="h-4 w-4" /></button>
              </div>
              <div className="p-4">
                <div className="text-sm font-bold">{p.name}</div>
                <div className="text-[11px] text-muted-foreground">by {p.vendor}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-display text-lg font-bold">₹{p.price}</div>
                  <button className="rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background hover:scale-105">Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}
