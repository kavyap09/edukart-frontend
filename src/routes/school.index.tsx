import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutDashboard, Users, BookOpen, Megaphone, ClipboardCheck, ArrowRight } from "lucide-react";
import { PageHeader, StatCard, PanelCard, Pill, DataTable, PrimaryButton } from "@/components/dashboard/page-shell";
import { BarsChart, TrendChart } from "@/components/dashboard/charts";

export const Route = createFileRoute("/school/")({
  component: SchoolDashboard,
});

const adoption = [
  { name: "Gr 1", value: 92 }, { name: "Gr 2", value: 88 },
  { name: "Gr 3", value: 81 }, { name: "Gr 4", value: 76 },
  { name: "Gr 5", value: 70 }, { name: "Gr 6", value: 65 },
];
const trend = [
  { name: "W1", value: 120 }, { name: "W2", value: 240 },
  { name: "W3", value: 380 }, { name: "W4", value: 510 },
  { name: "W5", value: 620 }, { name: "W6", value: 740 },
];

function SchoolDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Greenwood High — Admin Console"
        description="Manage academic years, kits and parent communications."
        icon={LayoutDashboard}
        actions={
          <Link to="/school/notify">
            <PrimaryButton>Notify Parents</PrimaryButton>
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Active Grades" value="12" icon={Users} tone="leaf" />
        <StatCard label="Official Kits" value="9" delta="+2" icon={BookOpen} tone="sky" />
        <StatCard label="Parent Adoption" value="78%" delta="+12%" icon={ClipboardCheck} tone="tangerine" />
        <StatCard label="Notifications Sent" value="1,248" icon={Megaphone} tone="sunny" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <PanelCard className="lg:col-span-2" title="Parent purchase adoption by grade">
          <BarsChart data={adoption} color="#81C784" />
        </PanelCard>
        <PanelCard title="Cumulative orders this term">
          <TrendChart data={trend} color="#81C784" />
        </PanelCard>
      </div>

      <PanelCard
        title="Recent activity"
        actions={
          <Link to="/school/status" className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:underline">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        }
      >
        <DataTable
          columns={["Grade", "Kit", "Adoption", "Status"]}
          rows={[
            ["Grade 1", "NCERT + Stationery", "92%", <Pill tone="leaf">Healthy</Pill>],
            ["Grade 4", "NCERT + Uniform", "76%", <Pill tone="sunny">Watch</Pill>],
            ["Grade 6", "Adv. Science Set", "65%", <Pill tone="tangerine">Push</Pill>],
            ["Grade 8", "Lab Kit + Books", "58%", <Pill tone="tangerine">Push</Pill>],
          ]}
        />
      </PanelCard>
    </div>
  );
}
