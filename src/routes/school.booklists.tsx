import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Plus, Trash2 } from "lucide-react";
import { PageHeader, PanelCard, Pill, PrimaryButton, GhostButton } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/school/booklists")({ component: Page });

const books = [
  ["NCERT Mathematics Class 4", "Compulsory"],
  ["Marigold English Reader", "Compulsory"],
  ["EVS Looking Around", "Compulsory"],
  ["Hindi Rimjhim", "Compulsory"],
  ["Atlas of India", "Recommended"],
  ["GK Workbook 4", "Optional"],
];

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Official Book Lists" description="Curated per grade — visible to all linked parents" icon={BookOpen} actions={<PrimaryButton><span className="flex items-center gap-1"><Plus className="h-4 w-4" /> Add book</span></PrimaryButton>} />
      <div className="grid gap-6 lg:grid-cols-3">
        <PanelCard className="lg:col-span-2" title="Grade 4 — 2026-27">
          <ul className="divide-y divide-border/60">
            {books.map(([t, k]) => (
              <li key={t} className="flex items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl [background:var(--gradient-leaf)]" />
                  <div>
                    <div className="text-sm font-bold">{t}</div>
                    <div className="text-[11px] text-muted-foreground">ISBN auto-detected</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Pill tone={k === "Compulsory" ? "leaf" : k === "Recommended" ? "sky" : "sunny"}>{k}</Pill>
                  <button className="rounded-full p-2 text-muted-foreground hover:bg-muted"><Trash2 className="h-4 w-4" /></button>
                </div>
              </li>
            ))}
          </ul>
        </PanelCard>
        <PanelCard title="Switch grade">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
              <GhostButton key={g}>G{g}</GhostButton>
            ))}
          </div>
        </PanelCard>
      </div>
    </div>
  );
}
