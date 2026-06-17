import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Send } from "lucide-react";
import { PageHeader, PanelCard, Pill, PrimaryButton } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/school/notify")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Notify Parents" description="Push announcements, kit updates and deadlines" icon={Megaphone} />
      <div className="grid gap-6 lg:grid-cols-3">
        <PanelCard className="lg:col-span-2" title="Compose">
          <input placeholder="Subject" className="mb-3 w-full rounded-2xl border border-border bg-white/70 px-4 py-2 text-sm" />
          <textarea rows={6} placeholder="Message to parents…" className="w-full rounded-2xl border border-border bg-white/70 px-4 py-2 text-sm" />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Pill tone="sky">Grade 4</Pill>
            <Pill tone="leaf">Email</Pill>
            <Pill tone="tangerine">App</Pill>
            <Pill tone="sunny">SMS</Pill>
            <div className="ml-auto"><PrimaryButton><span className="flex items-center gap-1"><Send className="h-4 w-4" /> Send</span></PrimaryButton></div>
          </div>
        </PanelCard>
        <PanelCard title="Recent broadcasts">
          <ul className="space-y-3 text-sm">
            <li><div className="font-bold">Kit list updated</div><div className="text-[11px] text-muted-foreground">Sent to 312 parents · 2 days ago</div></li>
            <li><div className="font-bold">Uniform fitting drive</div><div className="text-[11px] text-muted-foreground">Sent to 540 parents · 1 week ago</div></li>
            <li><div className="font-bold">Welcome to 2026-27</div><div className="text-[11px] text-muted-foreground">Sent to 1,248 parents · 3 weeks ago</div></li>
          </ul>
        </PanelCard>
      </div>
    </div>
  );
}
