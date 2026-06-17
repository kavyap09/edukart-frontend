import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Store, Users, School as SchoolIcon, Package2, BadgeDollarSign, ArrowRight } from "lucide-react";
import { PageHeader, StatCard, PanelCard, Pill, DataTable, PrimaryButton } from "@/components/dashboard/page-shell";
import { TrendChart, DonutChart } from "@/components/dashboard/charts";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const gmv = [
  { name: "Jan", value: 120 }, { name: "Feb", value: 180 },
  { name: "Mar", value: 240 }, { name: "Apr", value: 220 },
  { name: "May", value: 320 }, { name: "Jun", value: 410 },
];
const mix = [
  { name: "Books", value: 38 },
  { name: "Uniforms", value: 24 },
  { name: "Stationery", value: 22 },
  { name: "Bags", value: 16 },
];

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Marketplace Control Center"
        description="Health of vendors, schools, parents and revenue."
        icon={ShieldCheck}
        actions={
          <Link to="/admin/approvals">
            <PrimaryButton>Review Approvals</PrimaryButton>
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Vendors" value="248" delta="+12" icon={Store} tone="tangerine" />
        <StatCard label="Schools" value="86" delta="+4" icon={SchoolIcon} tone="leaf" />
        <StatCard label="Parents" value="14,920" delta="+5%" icon={Users} tone="sky" />
        <StatCard label="GMV (lakh ₹)" value="₹4.10 Cr" delta="+18%" icon={BadgeDollarSign} tone="sunny" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <PanelCard className="lg:col-span-2" title="GMV trend (₹ lakh)">
          <TrendChart data={gmv} color="#FFD54F" />
        </PanelCard>
        <PanelCard title="Category mix">
          <DonutChart data={mix} />
        </PanelCard>
      </div>

      <PanelCard
        title="Pending vendor approvals"
        actions={
          <Link to="/admin/approvals" className="inline-flex items-center gap-1 text-xs font-bold hover:underline">
            Review all <ArrowRight className="h-3 w-3" />
          </Link>
        }
      >
        <DataTable
          columns={["Vendor", "Category", "GST", "Submitted", "Status"]}
          rows={[
            ["Aastha Books", "Books", "Verified", "2 days ago", <Pill tone="sunny">Pending</Pill>],
            ["Brightline Uniforms", "Uniforms", "Verified", "1 day ago", <Pill tone="sunny">Pending</Pill>],
            ["Studyo Stationery", "Stationery", "Missing", "5 hr ago", <Pill tone="tangerine">Hold</Pill>],
            ["Footzy Shoes", "Footwear", "Verified", "3 hr ago", <Pill tone="sunny">Pending</Pill>],
          ]}
        />
      </PanelCard>

      <PanelCard title="Quick package counts">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Orders today", "1,284", Package2],
            ["Refunds (open)", "23", BadgeDollarSign],
            ["New schools", "+4", SchoolIcon],
            ["Suspensions", "2", ShieldCheck],
          ].map(([label, value, Icon]) => {
            const I = Icon as typeof Package2;
            return (
              <div key={label as string} className="rounded-2xl border border-border/60 bg-white/70 p-4">
                <I className="h-5 w-5 text-muted-foreground" />
                <div className="mt-2 font-display text-xl font-bold">{value as string}</div>
                <div className="text-xs text-muted-foreground">{label as string}</div>
              </div>
            );
          })}
        </div>
      </PanelCard>
    </div>
  );
}
