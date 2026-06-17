import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { PageHeader, PanelCard, StatCard } from "@/components/dashboard/page-shell";
import { TrendChart, BarsChart, DonutChart } from "@/components/dashboard/charts";

export const Route = createFileRoute("/vendor/revenue")({ component: Page });

const monthly = Array.from({ length: 12 }, (_, i) => ({ name: ["J","F","M","A","M","J","J","A","S","O","N","D"][i], value: 30000 + Math.round(Math.random()*70000) }));
const sources = [
  { name: "Schools", value: 56 }, { name: "Direct parents", value: 30 }, { name: "Bundles", value: 14 },
];
const cat = [
  { name: "Books", value: 320 }, { name: "Stationery", value: 240 }, { name: "Bundles", value: 180 }, { name: "Misc", value: 80 },
];

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Revenue Dashboard" description="Yearly performance and projections" icon={BarChart3} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="MTD revenue" value="₹2.1L" delta="+18%" icon={BarChart3} tone="tangerine" />
        <StatCard label="YTD revenue" value="₹12.4L" delta="+24%" icon={BarChart3} tone="leaf" />
        <StatCard label="Refund rate" value="1.4%" icon={BarChart3} tone="sky" />
        <StatCard label="AOV" value="₹620" delta="+₹40" icon={BarChart3} tone="sunny" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <PanelCard className="lg:col-span-2" title="Monthly revenue"><TrendChart data={monthly} color="#FFB74D" height={260} /></PanelCard>
        <PanelCard title="Revenue sources"><DonutChart data={sources} /></PanelCard>
      </div>
      <PanelCard title="By category"><BarsChart data={cat} color="#81C784" /></PanelCard>
    </div>
  );
}
