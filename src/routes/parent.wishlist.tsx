import { createFileRoute } from "@tanstack/react-router";
import { Heart, Trash2 } from "lucide-react";
import { PageHeader, PanelCard, Pill } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/parent/wishlist")({ component: Page });

const items = [
  ["Advanced Atlas", "Aastha Books", 540, "Books"],
  ["Lab Goggles", "Studyo", 480, "Lab"],
  ["Sports Shoes Pro", "Footzy", 1690, "Shoes"],
  ["Watercolour 24", "Studyo", 290, "Art"],
] as const;

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Wishlist" description="Save items for later · share with family" icon={Heart} />
      <PanelCard>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([n, v, p, t]) => (
            <div key={n} className="hover-lift overflow-hidden rounded-3xl border border-border/60 bg-white/70">
              <div className="h-28 [background:var(--gradient-tangerine)]" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-bold">{n}</div>
                    <div className="text-[11px] text-muted-foreground">by {v}</div>
                  </div>
                  <Pill tone="sunny">{t}</Pill>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-display text-lg font-bold">₹{p}</div>
                  <div className="flex gap-2">
                    <button className="rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background">Move to cart</button>
                    <button className="rounded-full p-2 hover:bg-muted"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}
