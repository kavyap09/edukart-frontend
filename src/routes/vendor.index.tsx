import { createFileRoute, Link } from "@tanstack/react-router";
import { Package2, BadgeDollarSign, Boxes, Star, Package, ArrowRight } from "lucide-react";
import { PageHeader, StatCard, PanelCard, Pill, DataTable, PrimaryButton } from "@/components/dashboard/page-shell";
import { TrendChart, BarsChart } from "@/components/dashboard/charts";

export const Route = createFileRoute("/vendor/")({
  component: VendorDashboard,
});

const revenue = [
  { name: "Mon", value: 4200 }, { name: "Tue", value: 5100 },
  { name: "Wed", value: 4800 }, { name: "Thu", value: 6200 },
  { name: "Fri", value: 7400 }, { name: "Sat", value: 9100 },
  { name: "Sun", value: 6700 },
];
const top = [
  { name: "Books", value: 320 },
  { name: "Bags", value: 180 },
  { name: "Uniform", value: 220 },
  { name: "Stationery", value: 260 },
  { name: "Shoes", value: 90 },
];

function VendorDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Sunrise Books & Stationery"
        description="Performance across the EduKart marketplace."
        icon={Package}
        actions={
          <Link to="/vendor/products">
            <PrimaryButton>Add Product</PrimaryButton>
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Today's Orders" value="48" delta="+8" icon={Package2} tone="sky" />
        <StatCard label="Revenue (7d)" value="₹43,500" delta="+12%" icon={BadgeDollarSign} tone="leaf" />
        <StatCard label="In Stock SKUs" value="312" icon={Boxes} tone="tangerine" />
        <StatCard label="Avg Rating" value="4.7★" delta="+0.1" icon={Star} tone="sunny" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <PanelCard className="lg:col-span-2" title="Revenue this week">
          <TrendChart data={revenue} color="#FFB74D" />
        </PanelCard>
        <PanelCard title="Units sold by category">
          <BarsChart data={top} color="#4FC3F7" />
        </PanelCard>
      </div>

      <PanelCard
        title="Latest orders"
        actions={
          <Link to="/vendor/orders" className="inline-flex items-center gap-1 text-xs font-bold hover:underline">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        }
      >
        <DataTable
          columns={["Order #", "Parent", "Items", "Total", "Status"]}
          rows={[
            ["#EDU-10293", "Priya R.", "5 items", "₹1,860", <Pill tone="leaf">Packed</Pill>],
            ["#EDU-10291", "Arjun M.", "2 items", "₹540", <Pill tone="sky">Confirmed</Pill>],
            ["#EDU-10288", "Sneha T.", "9 items", "₹3,420", <Pill tone="tangerine">Awaiting</Pill>],
            ["#EDU-10285", "Rahul V.", "1 item", "₹180", <Pill tone="leaf">Delivered</Pill>],
          ]}
        />
      </PanelCard>
    </div>
  );
}
