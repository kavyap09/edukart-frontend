import { createFileRoute } from "@tanstack/react-router";
import { School } from "lucide-react";
import { PageHeader, PanelCard, Pill, DataTable } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/admin/schools")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Manage Schools" description="All schools on the platform" icon={School} />
      <PanelCard>
        <DataTable
          columns={["School", "City", "Board", "Parents", "Kits", "Status"]}
          rows={[
            ["Greenwood High", "Bengaluru", "CBSE", "1,248", "9", <Pill tone="leaf">Active</Pill>],
            ["St. Mary's Academy", "Mumbai", "ICSE", "984", "7", <Pill tone="leaf">Active</Pill>],
            ["Sunrise Public", "Pune", "CBSE", "612", "8", <Pill tone="leaf">Active</Pill>],
            ["Heritage Intl.", "Delhi", "IB", "420", "5", <Pill tone="sunny">Onboarding</Pill>],
          ]}
        />
      </PanelCard>
    </div>
  );
}
