import { createFileRoute } from "@tanstack/react-router";
import { Users, Plus } from "lucide-react";
import { PageHeader, PanelCard, Pill, PrimaryButton } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/school/classes")({ component: Page });

const classes = Array.from({ length: 12 }, (_, i) => ({
  grade: i + 1,
  sections: ["A", "B", i < 8 ? "C" : null].filter(Boolean),
  students: 90 + i * 8,
}));

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Classes & Grades"
        description="Create grade levels and sections"
        icon={Users}
        actions={<PrimaryButton><span className="flex items-center gap-1"><Plus className="h-4 w-4" /> Add grade</span></PrimaryButton>}
      />
      <PanelCard>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((c) => (
            <div key={c.grade} className="hover-lift rounded-3xl border border-border/60 bg-white/70 p-4">
              <div className="flex items-center justify-between">
                <div className="font-display text-2xl font-bold">Grade {c.grade}</div>
                <Pill tone="leaf">{c.students} students</Pill>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {c.sections.map((s) => (
                  <span key={s as string} className="rounded-full bg-[var(--sky)]/30 px-2 py-0.5 text-xs font-bold">Sec {s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}
