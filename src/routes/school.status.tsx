import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";
import { PageHeader, PanelCard, Pill, DataTable } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/school/status")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Parent Purchase Status" description="See who has completed the official kit" icon={ClipboardCheck} />
      <PanelCard>
        <DataTable
          columns={["Parent", "Child", "Grade", "Kit", "Status"]}
          rows={[
            ["Priya Ramesh", "Aanya", "4-A", "78%", <Pill tone="sunny">In progress</Pill>],
            ["Arjun Mehta", "Vihaan", "4-B", "100%", <Pill tone="leaf">Complete</Pill>],
            ["Sneha Thomas", "Diya", "4-A", "42%", <Pill tone="tangerine">Pending</Pill>],
            ["Rahul Verma", "Kabir", "4-C", "100%", <Pill tone="leaf">Complete</Pill>],
            ["Anita Joshi", "Mira", "4-B", "12%", <Pill tone="tangerine">Pending</Pill>],
          ]}
        />
      </PanelCard>
    </div>
  );
}
