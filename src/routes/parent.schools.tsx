import { createFileRoute } from "@tanstack/react-router";
import { School as SchoolIcon, MapPin } from "lucide-react";
import { PageHeader, PanelCard, Pill, GhostButton } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/parent/schools")({ component: Page });

const schools = [
  { name: "Greenwood High", city: "Bengaluru", board: "CBSE", linked: true },
  { name: "St. Mary's Academy", city: "Mumbai", board: "ICSE", linked: false },
  { name: "Sunrise Public School", city: "Pune", board: "CBSE", linked: false },
  { name: "Heritage International", city: "Delhi", board: "IB", linked: false },
];

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Select your child's school" description="Search and link to load the official kit." icon={SchoolIcon} />
      <PanelCard>
        <input
          placeholder="Search by school name, city or board…"
          className="mb-4 w-full rounded-full border border-border bg-white/70 px-4 py-2.5 text-sm outline-none focus:shadow-md"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {schools.map((s) => (
            <div key={s.name} className="hover-lift flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-white/70 p-4">
              <div>
                <div className="font-display text-base font-bold">{s.name}</div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {s.city} · {s.board}
                </div>
              </div>
              {s.linked ? <Pill tone="leaf">Linked</Pill> : <GhostButton>Link</GhostButton>}
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}
