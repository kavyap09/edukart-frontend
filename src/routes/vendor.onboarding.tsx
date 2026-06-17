import { createFileRoute } from "@tanstack/react-router";
import { Building2, CheckCircle2 } from "lucide-react";
import { PageHeader, PanelCard, Pill, PrimaryButton } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/vendor/onboarding")({ component: Page });

const steps = [
  ["Business details", true],
  ["GST verification", true],
  ["Bank account", true],
  ["Store profile", false],
  ["First 5 products", false],
  ["Go live", false],
] as const;

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Vendor Onboarding" description="Complete each step to start selling" icon={Building2} />
      <PanelCard>
        <ol className="space-y-3">
          {steps.map(([t, done], i) => (
            <li key={t} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-white/70 p-4">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full font-bold ${done ? "[background:var(--gradient-leaf)] text-white" : "bg-muted text-muted-foreground"}`}>
                {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              <div className="flex-1 text-sm font-bold">{t}</div>
              <Pill tone={done ? "leaf" : "sunny"}>{done ? "Done" : "Pending"}</Pill>
              {!done && <PrimaryButton>Continue</PrimaryButton>}
            </li>
          ))}
        </ol>
      </PanelCard>
    </div>
  );
}
