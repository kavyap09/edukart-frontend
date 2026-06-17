import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { PageHeader, PanelCard, StatCard } from "@/components/dashboard/page-shell";
import { TrendChart, BarsChart, DonutChart } from "@/components/dashboard/charts";

export const Route = createFileRoute("/admin/revenue")({ component: Page });

const gmv = Array.from({ length: 12 }, (_, i) => ({ name: ["J","F","M","A","M","J","J","A","S","O","N","D"][i], value: 80 + Math.round(Math.random()*220) }));
const byCity = [
  { name: "Blr", value: 240 }, { name: "Mum", value: 200 }, { name: "Del", value: 180 }, { name: "Pun", value: 140 }, { name: "Hyd", value: 110 },
];
const share = [
  { name: "Books", value: 38 }, { name: "Uniforms", value: 22 }, { name: "Stationery", value: 18 }, { name: "Bags", value: 12 }, { name: "Other", value: 10 },
];

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Revenue Analytics" description="Marketplace-wide performance" icon={BarChart3} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="GMV (YTD)" value="₹4.10 Cr" delta="+18%" icon={BarChart3} tone="sunny" />
        <StatCard label="Take rate" value="9.2%" icon={BarChart3} tone="leaf" />
        <StatCard label="Avg AOV" value="₹620" delta="+₹40" icon={BarChart3} tone="sky" />
        <StatCard label="Active vendors" value="248" delta="+12" icon={BarChart3} tone="tangerine" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <PanelCard className="lg:col-span-2" title="GMV by month (₹ lakh)"><TrendChart data={gmv} color="#FFD54F" height={260} /></PanelCard>
        <PanelCard title="Category share"><DonutChart data={share} /></PanelCard>
      </div>
      <PanelCard title="Top cities"><BarsChart data={byCity} color="#4FC3F7" /></PanelCard>
    </div>
  );
}
