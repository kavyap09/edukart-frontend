import { createFileRoute } from "@tanstack/react-router";
import { Truck, CheckCircle2, Package, MapPin } from "lucide-react";
import { PageHeader, PanelCard, Pill, DataTable } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/parent/orders")({ component: Page });

const steps = [
  { label: "Placed", icon: CheckCircle2, done: true },
  { label: "Packed", icon: Package, done: true },
  { label: "Shipped", icon: Truck, done: true },
  { label: "Out for delivery", icon: MapPin, done: false },
  { label: "Delivered", icon: CheckCircle2, done: false },
];

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Order Tracking" description="Live updates across vendors" icon={Truck} />

      <PanelCard title="Order #EDU-10293" actions={<Pill tone="sky">In transit</Pill>}>
        <div className="relative grid grid-cols-5 gap-2">
          {steps.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${s.done ? "[background:var(--gradient-leaf)] text-white" : "bg-muted text-muted-foreground"}`}>
                <s.icon className="h-4 w-4" />
              </div>
              <div className="mt-2 text-[11px] font-bold">{s.label}</div>
              {i < steps.length - 1 && (
                <div className={`absolute top-5 h-0.5 ${s.done ? "bg-[var(--leaf)]" : "bg-border"}`} style={{ left: `${(i/(steps.length-1))*100 + 10}%`, width: `${100/(steps.length-1) - 10}%` }} />
              )}
            </div>
          ))}
        </div>
      </PanelCard>

      <PanelCard title="All orders">
        <DataTable
          columns={["Order", "Vendors", "Items", "Total", "Status"]}
          rows={[
            ["#EDU-10293", "3", "8", "₹3,153", <Pill tone="sky">In transit</Pill>],
            ["#EDU-10285", "1", "1", "₹180", <Pill tone="leaf">Delivered</Pill>],
            ["#EDU-10271", "2", "5", "₹1,420", <Pill tone="leaf">Delivered</Pill>],
            ["#EDU-10262", "4", "12", "₹4,820", <Pill tone="tangerine">Returned</Pill>],
          ]}
        />
      </PanelCard>
    </div>
  );
}
