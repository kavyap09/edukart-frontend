import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { PageHeader, PanelCard, Pill, PrimaryButton } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/parent/kit")({ component: Page });

const kit = [
  { name: "NCERT Maths Class 4", vendor: "Sunrise Books", price: 240, picked: true },
  { name: "Marigold English Reader", vendor: "Aastha Books", price: 180, picked: true },
  { name: "EVS Looking Around", vendor: "Sunrise Books", price: 210, picked: true },
  { name: "Hindi Rimjhim", vendor: "Aastha Books", price: 160, picked: false },
  { name: "Grade 4 Uniform Set", vendor: "Brightline", price: 1490, picked: false },
  { name: "Geometry Box Pro", vendor: "Studyo", price: 280, picked: true },
  { name: "School Bag 18\"", vendor: "Footzy", price: 1290, picked: false },
];

function Page() {
  const total = kit.filter((k) => k.picked).reduce((s, k) => s + k.price, 0);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Official Kit — Grade 4"
        description="Curated by Greenwood High for the 2026 academic year."
        icon={BookOpen}
        actions={<PrimaryButton>Add all to cart</PrimaryButton>}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <PanelCard className="lg:col-span-2" title="Items in this kit">
          <ul className="divide-y divide-border/60">
            {kit.map((item) => (
              <li key={item.name} className="flex items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.picked ? "bg-[var(--leaf)]/40" : "bg-muted"}`}>
                    <CheckCircle2 className={`h-4 w-4 ${item.picked ? "text-foreground" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <div className="text-sm font-bold">{item.name}</div>
                    <div className="text-[11px] text-muted-foreground">by {item.vendor}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">₹{item.price}</div>
                  {item.picked && <Pill tone="leaf">In cart</Pill>}
                </div>
              </li>
            ))}
          </ul>
        </PanelCard>

        <PanelCard title="Kit summary">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Items selected</span><span className="font-bold">{kit.filter(k=>k.picked).length}/{kit.length}</span></div>
            <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">₹{total}</span></div>
            <div className="flex justify-between text-[var(--leaf-foreground)]"><span>AI savings</span><span className="font-bold">- ₹240</span></div>
            <div className="mt-2 flex justify-between border-t border-border pt-2 font-display text-lg font-bold">
              <span>Total</span><span>₹{total - 240}</span>
            </div>
          </div>
          <PrimaryButton>Proceed to checkout</PrimaryButton>
        </PanelCard>
      </div>
    </div>
  );
}
