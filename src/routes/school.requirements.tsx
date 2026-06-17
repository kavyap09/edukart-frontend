import { createFileRoute } from "@tanstack/react-router";
import { ListChecks, CheckCircle2 } from "lucide-react";
import { PageHeader, PanelCard, Pill, PrimaryButton } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/school/requirements")({ component: Page });

const reqs = [
  ["Branded uniforms only from approved suppliers", true],
  ["NCERT books mandatory for Grades 1-8", true],
  ["No leather shoes; non-marking PE shoes required", true],
  ["Lab kits to be purchased by Grade 6 onwards", false],
  ["Hindi as third language from Grade 3", true],
] as const;

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="School Requirements" description="Centralised rules shown to parents and vendors" icon={ListChecks} actions={<PrimaryButton>Add rule</PrimaryButton>} />
      <PanelCard>
        <ul className="space-y-2">
          {reqs.map(([t, on], i) => (
            <li key={i} className="flex items-center justify-between rounded-2xl border border-border/60 bg-white/70 px-4 py-3">
              <div className="flex items-center gap-3 text-sm font-semibold">
                <CheckCircle2 className={`h-4 w-4 ${on ? "text-[var(--leaf-foreground)]" : "text-muted-foreground"}`} />
                {t}
              </div>
              <Pill tone={on ? "leaf" : "muted"}>{on ? "Active" : "Draft"}</Pill>
            </li>
          ))}
        </ul>
      </PanelCard>
    </div>
  );
}
