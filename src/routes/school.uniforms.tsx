import { createFileRoute } from "@tanstack/react-router";
import { Shirt } from "lucide-react";
import { PageHeader, PanelCard, Pill, DataTable } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/school/uniforms")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Recommended Uniforms" description="Approved suppliers and items" icon={Shirt} />
      <PanelCard>
        <DataTable
          columns={["Item", "Supplier", "Grades", "Price", "Status"]}
          rows={[
            ["Summer Shirt + Trouser", "Brightline Uniforms", "1-5", "₹1,490", <Pill tone="leaf">Approved</Pill>],
            ["Winter Blazer", "Brightline Uniforms", "1-12", "₹2,290", <Pill tone="leaf">Approved</Pill>],
            ["PE T-shirt & Shorts", "Sportzy", "1-12", "₹890", <Pill tone="leaf">Approved</Pill>],
            ["Pinafore", "Brightline Uniforms", "1-3", "₹1,190", <Pill tone="sunny">Review</Pill>],
          ]}
        />
      </PanelCard>
    </div>
  );
}
