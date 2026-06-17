import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Plus } from "lucide-react";
import { PageHeader, PanelCard, Pill, GhostButton, PrimaryButton } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/parent/addresses")({ component: Page });

const addr = [
  { label: "Home", line: "12, Lotus Apartments, Indiranagar, Bengaluru 560038", default: true },
  { label: "Office", line: "9th Floor, Prestige Tower, MG Road, Bengaluru 560001", default: false },
  { label: "Grandparents", line: "Plot 42, Lakshmi Nagar, Chennai 600061", default: false },
];

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Saved Addresses"
        description="Manage delivery locations for faster checkout"
        icon={MapPin}
        actions={<PrimaryButton><span className="flex items-center gap-1"><Plus className="h-4 w-4" /> New address</span></PrimaryButton>}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {addr.map((a) => (
          <PanelCard key={a.label}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2"><div className="font-display text-lg font-bold">{a.label}</div>{a.default && <Pill tone="leaf">Default</Pill>}</div>
                <p className="mt-1 text-sm text-muted-foreground">{a.line}</p>
              </div>
              <div className="flex flex-col gap-2">
                <GhostButton>Edit</GhostButton>
                {!a.default && <GhostButton>Set default</GhostButton>}
              </div>
            </div>
          </PanelCard>
        ))}
      </div>
    </div>
  );
}
