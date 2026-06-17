import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, MapPin, Truck } from "lucide-react";
import { PageHeader, PanelCard, Pill, PrimaryButton } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/parent/checkout")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Checkout" description="Secure · GST-compliant · COD available" icon={CreditCard} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <PanelCard title="Delivery address" actions={<button className="text-xs font-bold text-foreground hover:underline">Change</button>}>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <div className="font-bold">Priya Ramesh · Home</div>
                <div className="text-muted-foreground">12, Lotus Apartments, Indiranagar, Bengaluru 560038</div>
              </div>
            </div>
          </PanelCard>

          <PanelCard title="Delivery options">
            {[
              ["Standard (Free)", "By Friday, 21 Jun", "leaf"],
              ["Express", "By Tomorrow · ₹49", "sky"],
              ["Pickup at School", "Sat 22 Jun · Free", "tangerine"],
            ].map(([t, s, tone], i) => (
              <label key={t as string} className="mb-2 flex cursor-pointer items-center justify-between rounded-2xl border border-border/60 bg-white/70 px-4 py-3 hover:shadow">
                <div className="flex items-center gap-3">
                  <input type="radio" name="ship" defaultChecked={i===0} />
                  <div>
                    <div className="text-sm font-bold">{t as string}</div>
                    <div className="text-[11px] text-muted-foreground">{s as string}</div>
                  </div>
                </div>
                <Truck className="h-4 w-4 text-muted-foreground" />
                <Pill tone={tone as any}>OK</Pill>
              </label>
            ))}
          </PanelCard>

          <PanelCard title="Payment">
            <div className="grid gap-2 sm:grid-cols-2">
              {["UPI", "Credit / Debit Card", "Net Banking", "Cash on Delivery"].map((p, i) => (
                <label key={p} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border/60 bg-white/70 px-4 py-3 hover:shadow">
                  <input type="radio" name="pay" defaultChecked={i===0} />
                  <span className="text-sm font-bold">{p}</span>
                </label>
              ))}
            </div>
          </PanelCard>
        </div>
        <PanelCard title="Order summary">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Items (8)</span><span className="font-bold">₹3,260</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className="font-bold">Free</span></div>
            <div className="flex justify-between"><span>GST</span><span className="font-bold">₹213</span></div>
            <div className="flex justify-between text-[var(--leaf-foreground)]"><span>AI savings</span><span className="font-bold">- ₹320</span></div>
            <div className="flex justify-between border-t border-border pt-2 font-display text-lg font-bold"><span>Total</span><span>₹3,153</span></div>
          </div>
          <PrimaryButton>Place Order</PrimaryButton>
        </PanelCard>
      </div>
    </div>
  );
}
