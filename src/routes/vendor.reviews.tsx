import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { PageHeader, PanelCard, Pill, StatCard } from "@/components/dashboard/page-shell";
import { BarsChart } from "@/components/dashboard/charts";

export const Route = createFileRoute("/vendor/reviews")({ component: Page });

const dist = [
  { name: "5★", value: 412 }, { name: "4★", value: 124 },
  { name: "3★", value: 38 }, { name: "2★", value: 12 }, { name: "1★", value: 6 },
];
const recent = [
  ["Priya R.", 5, "Books arrived neatly packed, exactly as listed."],
  ["Arjun M.", 4, "Good quality but delivery took 3 days."],
  ["Sneha T.", 5, "Geometry box is premium and well-priced."],
] as const;

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reviews & Ratings" description="What parents say about your store" icon={Star} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Average rating" value="4.7★" icon={Star} tone="sunny" />
        <StatCard label="Total reviews" value="592" icon={Star} tone="sky" />
        <StatCard label="Response rate" value="92%" icon={Star} tone="leaf" />
        <StatCard label="Avg reply time" value="6h" icon={Star} tone="tangerine" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <PanelCard className="lg:col-span-2" title="Recent reviews">
          <ul className="divide-y divide-border/60">
            {recent.map(([n, r, c], i) => (
              <li key={i} className="py-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold">{n}</div>
                  <Pill tone="sunny">{"★".repeat(r)}</Pill>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{c}</p>
              </li>
            ))}
          </ul>
        </PanelCard>
        <PanelCard title="Rating distribution"><BarsChart data={dist} color="#FFD54F" /></PanelCard>
      </div>
    </div>
  );
}
