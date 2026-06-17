import { createFileRoute } from "@tanstack/react-router";
import { Bot, Send, Sparkles } from "lucide-react";
import { PageHeader, PanelCard, Pill } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/parent/assistant")({ component: Page });

const convo = [
  { from: "ai", text: "Hi Priya! I'm your EduKart Assistant. I can build kits, find best prices and answer school FAQs." },
  { from: "me", text: "What's pending in my Grade 4 list?" },
  { from: "ai", text: "You still need: Hindi Rimjhim, Grade 4 Uniform Set and the 18\" School Bag. Want me to add the cheapest verified options?" },
  { from: "me", text: "Yes, but keep total under ₹3,500." },
  { from: "ai", text: "Done ✨ I added 3 items totalling ₹2,940 (₹240 saved). Tap below to review your cart." },
];

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="AI Shopping Assistant" description="Conversational help for kits, pricing and policies." icon={Bot} />
      <div className="grid gap-6 lg:grid-cols-3">
        <PanelCard className="lg:col-span-2">
          <div className="space-y-3">
            {convo.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-3xl px-4 py-2.5 text-sm ${m.from === "me" ? "bg-foreground text-background" : "bg-white/80 border border-border/60"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-2">
            <input placeholder="Ask anything about your school shopping…" className="flex-1 bg-transparent text-sm outline-none" />
            <button className="rounded-full bg-foreground p-2 text-background hover:scale-105"><Send className="h-4 w-4" /></button>
          </div>
        </PanelCard>
        <PanelCard title="Suggested prompts">
          <div className="flex flex-col gap-2 text-sm">
            {["Build a budget kit under ₹3,000","Compare 2 vendors for uniforms","Explain return policy","Recommend eco-friendly stationery"].map(s => (
              <button key={s} className="rounded-2xl border border-border bg-white/70 px-3 py-2 text-left text-sm font-semibold hover:bg-muted">{s}</button>
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-[var(--sky)]/30 p-3 text-xs">
            <Pill tone="sky"><Sparkles className="h-3 w-3" /></Pill>
            <p className="mt-2 font-semibold">Tip: I learn your child's grade & school — answers stay personalised.</p>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}
