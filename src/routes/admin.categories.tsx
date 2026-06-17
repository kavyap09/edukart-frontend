import { createFileRoute } from "@tanstack/react-router";
import { Tag, Plus } from "lucide-react";
import { PageHeader, PanelCard, Pill, PrimaryButton } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/admin/categories")({ component: Page });

const cats = ["Books","Uniforms","Stationery","Bags","Shoes","Lab Kits","Sports","Music","Art","Tech","Hostel","Eco"];

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Manage Categories" description="Taxonomy shown to parents and vendors" icon={Tag} actions={<PrimaryButton><span className="flex items-center gap-1"><Plus className="h-4 w-4" /> Add category</span></PrimaryButton>} />
      <PanelCard>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {cats.map((c, i) => (
            <div key={c} className="hover-lift rounded-3xl border border-border/60 bg-white/70 p-4">
              <div className="font-display text-lg font-bold">{c}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">{120 + i * 14} products</div>
              <div className="mt-2"><Pill tone={i % 4 === 0 ? "leaf" : i % 4 === 1 ? "sky" : i % 4 === 2 ? "sunny" : "tangerine"}>Active</Pill></div>
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}
