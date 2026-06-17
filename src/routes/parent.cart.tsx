import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { PageHeader, PanelCard, Pill, PrimaryButton } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/parent/cart")({ component: Page });

const vendors = [
  { name: "Sunrise Books", items: [{ name: "NCERT Maths Class 4", qty: 1, price: 240 }, { name: "EVS Looking Around", qty: 1, price: 210 }] },
  { name: "Studyo Stationery", items: [{ name: "Geometry Box Pro", qty: 1, price: 280 }, { name: "Notebook Pack (10)", qty: 2, price: 180 }] },
  { name: "Brightline Uniforms", items: [{ name: "Grade 4 Uniform Set", qty: 1, price: 1490 }] },
];

function Page() {
  const total = vendors.flatMap(v=>v.items).reduce((s,i)=>s+i.qty*i.price,0);
  return (
    <div className="space-y-6">
      <PageHeader title="Multi-vendor Cart" description="One checkout · multiple verified vendors" icon={ShoppingCart} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {vendors.map((v) => (
            <PanelCard key={v.name} title={v.name} actions={<Pill tone="sky">Free shipping</Pill>}>
              <ul className="divide-y divide-border/60">
                {v.items.map((it) => (
                  <li key={it.name} className="flex items-center justify-between gap-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl [background:var(--gradient-sky)]" />
                      <div>
                        <div className="text-sm font-bold">{it.name}</div>
                        <div className="text-[11px] text-muted-foreground">₹{it.price} each</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 rounded-full border border-border bg-white/70 px-2 py-1">
                        <button className="rounded-full p-1 hover:bg-muted"><Minus className="h-3 w-3" /></button>
                        <span className="w-6 text-center text-sm font-bold">{it.qty}</span>
                        <button className="rounded-full p-1 hover:bg-muted"><Plus className="h-3 w-3" /></button>
                      </div>
                      <div className="w-16 text-right text-sm font-bold">₹{it.qty * it.price}</div>
                      <button className="rounded-full p-2 text-muted-foreground hover:bg-muted"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </li>
                ))}
              </ul>
            </PanelCard>
          ))}
        </div>
        <PanelCard title="Summary">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">₹{total}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className="font-bold">Free</span></div>
            <div className="flex justify-between text-[var(--leaf-foreground)]"><span>AI savings</span><span className="font-bold">- ₹320</span></div>
            <div className="flex justify-between border-t border-border pt-2 font-display text-lg font-bold"><span>Total</span><span>₹{total - 320}</span></div>
          </div>
          <Link to="/parent/checkout" className="mt-3 block"><PrimaryButton>Proceed to Checkout</PrimaryButton></Link>
        </PanelCard>
      </div>
    </div>
  );
}
