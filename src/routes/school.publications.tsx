import { createFileRoute } from "@tanstack/react-router";
import { Library } from "lucide-react";
import { PageHeader, PanelCard, Pill } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/school/publications")({ component: Page });

const pubs = [
  ["NCERT", "Govt. of India", "leaf"],
  ["Oxford University Press", "Premium", "sky"],
  ["S Chand", "Workbook", "sunny"],
  ["Ratna Sagar", "Languages", "tangerine"],
] as const;

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Recommended Publications" description="Pin trusted publishers for vendor sourcing" icon={Library} />
      <PanelCard>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pubs.map(([n, k, t]) => (
            <div key={n} className="hover-lift rounded-3xl border border-border/60 bg-white/70 p-4">
              <div className="h-16 rounded-2xl [background:var(--gradient-sky)]" />
              <div className="mt-2 font-bold">{n}</div>
              <div className="text-[11px] text-muted-foreground">{k}</div>
              <div className="mt-2"><Pill tone={t as any}>Preferred</Pill></div>
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}
