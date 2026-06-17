import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { PageHeader, PanelCard, Pill } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/parent/notifications")({ component: Page });

const items: Array<[string, string, "leaf"|"sky"|"tangerine"|"sunny"]> = [
  ["Your Grade 4 NCERT bundle is out for delivery.", "10 min ago", "leaf"],
  ["Greenwood High added 2 new books to the official list.", "2 hr ago", "sky"],
  ["Save 15% on uniforms — ends Sunday.", "1 day ago", "tangerine"],
  ["AI Optimizer found ₹420 savings in your cart.", "2 days ago", "sunny"],
  ["Invoice INV-2026-0231 is ready to download.", "3 days ago", "leaf"],
];

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Notifications" description="Stay on top of orders, schools and offers" icon={Bell} />
      <PanelCard>
        <ul className="divide-y divide-border/60">
          {items.map(([t, when, tone], i) => (
            <li key={i} className="flex items-start justify-between gap-3 py-3">
              <div className="flex items-start gap-3">
                <Pill tone={tone}>•</Pill>
                <div>
                  <div className="text-sm font-semibold">{t}</div>
                  <div className="text-[11px] text-muted-foreground">{when}</div>
                </div>
              </div>
              <button className="text-xs font-bold text-muted-foreground hover:text-foreground">Mark read</button>
            </li>
          ))}
        </ul>
      </PanelCard>
    </div>
  );
}
