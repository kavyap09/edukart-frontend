import { createFileRoute } from "@tanstack/react-router";
import { CalendarRange, Plus } from "lucide-react";
import { PageHeader, PanelCard, Pill, PrimaryButton, DataTable } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/school/years")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Academic Years"
        description="Roll forward kits and class lists by year"
        icon={CalendarRange}
        actions={<PrimaryButton><span className="flex items-center gap-1"><Plus className="h-4 w-4" /> New year</span></PrimaryButton>}
      />
      <PanelCard>
        <DataTable
          columns={["Year", "Start", "End", "Classes", "Status"]}
          rows={[
            ["2026-27", "Jun 2026", "Apr 2027", "12", <Pill tone="leaf">Active</Pill>],
            ["2025-26", "Jun 2025", "Apr 2026", "12", <Pill tone="muted">Archived</Pill>],
            ["2024-25", "Jun 2024", "Apr 2025", "11", <Pill tone="muted">Archived</Pill>],
          ]}
        />
      </PanelCard>
    </div>
  );
}
