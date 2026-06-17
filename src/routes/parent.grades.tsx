import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { PageHeader, PanelCard, Pill } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/parent/grades")({ component: Page });

const grades = Array.from({ length: 12 }, (_, i) => i + 1);

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Select your child's grade" description="Greenwood High · CBSE" icon={GraduationCap} />
      <PanelCard>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {grades.map((g) => (
            <Link
              key={g}
              to="/parent/kit"
              className="hover-lift group rounded-3xl border border-border/60 bg-white/70 p-5 text-center"
            >
              <div className="font-display text-3xl font-bold">{g}</div>
              <div className="text-xs font-semibold text-muted-foreground">Grade {g}</div>
              {g === 4 && <div className="mt-2"><Pill tone="leaf">Current</Pill></div>}
            </Link>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}
