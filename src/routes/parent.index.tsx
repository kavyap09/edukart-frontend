import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ShoppingBag, Truck, Wallet, BookOpen, ArrowRight, Bell } from "lucide-react";
import { PageHeader, StatCard, PanelCard, Pill, PrimaryButton } from "@/components/dashboard/page-shell";
import { TrendChart, DonutChart } from "@/components/dashboard/charts";

export const Route = createFileRoute("/parent/")({
  component: ParentDashboard,
});

const spend = [
  { name: "Jan", value: 1200 }, { name: "Feb", value: 800 },
  { name: "Mar", value: 1600 }, { name: "Apr", value: 1100 },
  { name: "May", value: 2200 }, { name: "Jun", value: 1700 },
];
const split = [
  { name: "Books", value: 42 }, { name: "Uniforms", value: 28 },
  { name: "Stationery", value: 18 }, { name: "Bags", value: 12 },
];

function ParentDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Welcome back, Priya 👋"
        description="Here's a quick snapshot of your child's school shopping."
        icon={Sparkles}
        actions={
          <Link to="/parent/kit">
            <PrimaryButton>View Official Kit</PrimaryButton>
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Active Orders" value="3" delta="+1 this week" icon={Truck} tone="sky" />
        <StatCard label="Kit Completion" value="78%" delta="On track" icon={BookOpen} tone="leaf" />
        <StatCard label="This Month Spend" value="₹4,820" icon={Wallet} tone="tangerine" />
        <StatCard label="Saved by AI" value="₹1,240" delta="-22%" icon={Sparkles} tone="sunny" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <PanelCard
          className="lg:col-span-2"
          title="Spending overview"
          description="Last 6 months across all vendors"
        >
          <TrendChart data={spend} />
        </PanelCard>

        <PanelCard title="Category split">
          <DonutChart data={split} />
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            {split.map((s, i) => (
              <div key={s.name} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: ["#4FC3F7", "#81C784", "#FFD54F", "#FFB74D"][i] }}
                />
                <span className="font-semibold">{s.name}</span>
                <span className="ml-auto text-muted-foreground">{s.value}%</span>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PanelCard title="Recommended next steps">
          <ul className="space-y-2 text-sm">
            {[
              ["Complete Grade 4 official kit", "kit"],
              ["Review multi-vendor cart", "cart"],
              ["Try AI Budget Optimizer", "budget"],
              ["Save delivery address", "addresses"],
            ].map(([label, slug]) => (
              <li key={slug as string}>
                <Link
                  to={`/parent/${slug}` as string}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-white/60 px-4 py-3 hover-lift"
                >
                  <span className="font-semibold">{label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </PanelCard>

        <PanelCard title="Recent notifications" actions={<Bell className="h-4 w-4 text-muted-foreground" />}>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Pill tone="leaf">Shipped</Pill>
              <span>Your Grade 4 NCERT bundle is out for delivery.</span>
            </li>
            <li className="flex items-start gap-3">
              <Pill tone="sky">School</Pill>
              <span>Greenwood High added 2 new books to the official list.</span>
            </li>
            <li className="flex items-start gap-3">
              <Pill tone="tangerine">Offer</Pill>
              <span>Save 15% on uniforms — ends Sunday.</span>
            </li>
            <li className="flex items-start gap-3">
              <Pill tone="sunny">AI</Pill>
              <span>Budget Optimizer found ₹420 in savings across your cart.</span>
            </li>
          </ul>
        </PanelCard>
      </div>

      <PanelCard title="Browse by need" description="Jump straight into your most-used flows">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: "/parent/products", label: "Browse Products", icon: ShoppingBag },
            { to: "/parent/orders", label: "Track Orders", icon: Truck },
            { to: "/parent/assistant", label: "Ask AI Assistant", icon: Sparkles },
            { to: "/parent/budget", label: "Optimize Budget", icon: Wallet },
          ].map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="hover-lift flex items-center gap-3 rounded-2xl border border-border/60 bg-white/70 p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sky)]/40">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-bold">{label}</span>
            </Link>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}
