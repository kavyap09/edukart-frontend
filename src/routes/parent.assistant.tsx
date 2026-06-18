import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bot, Sparkles, Check, ShoppingCart } from "lucide-react";
import { PageHeader, PanelCard } from "@/components/dashboard/page-shell";

export const Route = createFileRoute("/parent/assistant")({
  head: () => ({ meta: [{ title: "AI School Kit Generator — EduKart" }] }),
  component: KitGenerator,
});

const SCHOOLS = [
  "Greenfield Academy, Bengaluru",
  "Sunrise International School, Mumbai",
  "DPS, New Delhi",
  "St. Mary's School, Pune",
];
const GRADES = ["Nursery", "LKG", "UKG", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8"];

type KitItem = { name: string; qty: number; price: number; vendor: string };

function buildKit(grade: string): KitItem[] {
  const base: KitItem[] = [
    { name: "Mathematics Textbook", qty: 1, price: 280, vendor: "Sunrise Publications" },
    { name: "English Coursebook", qty: 1, price: 320, vendor: "Oxford India" },
    { name: "EVS / Science Textbook", qty: 1, price: 260, vendor: "NCERT" },
    { name: "Notebook Pack (6)", qty: 1, price: 399, vendor: "Classmate" },
    { name: "Stationery Starter Kit", qty: 1, price: 549, vendor: "Camlin Kokuyo" },
    { name: "School Bag 22L", qty: 1, price: 1299, vendor: "Skybag Co." },
    { name: "Uniform Shirt (White)", qty: 2, price: 459, vendor: "Neat & Tidy Uniforms" },
    { name: "Black School Shoes", qty: 1, price: 899, vendor: "Stride Footwear" },
    { name: "Steel Water Bottle 750ml", qty: 1, price: 499, vendor: "HydroKids" },
    { name: "3-Compartment Lunch Box", qty: 1, price: 649, vendor: "Milton" },
  ];
  if (/[1-9]/.test(grade)) {
    base.push({ name: "Geometry Box", qty: 1, price: 199, vendor: "Camlin" });
  }
  return base;
}

function KitGenerator() {
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [kit, setKit] = useState<KitItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  function generate() {
    if (!school || !grade) return;
    setLoading(true);
    setKit(null);
    setTimeout(() => {
      setKit(buildKit(grade));
      setLoading(false);
    }, 700);
  }

  const total = kit ? kit.reduce((s, k) => s + k.price * k.qty, 0) : 0;

  return (
    <>
      <PageHeader
        title="AI School Kit Generator"
        description="Pick a school and grade. We'll assemble the complete recommended kit in seconds."
        icon={Bot}
      />

      <PanelCard>
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold">School</span>
            <select
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full rounded-2xl border border-border bg-white/80 px-4 py-2.5 text-sm outline-none focus:shadow-md"
            >
              <option value="">Select a school…</option>
              {SCHOOLS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold">Grade</span>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full rounded-2xl border border-border bg-white/80 px-4 py-2.5 text-sm outline-none focus:shadow-md"
            >
              <option value="">Select grade…</option>
              {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </label>
          <button
            onClick={generate}
            disabled={!school || !grade || loading}
            className="inline-flex h-[42px] items-center justify-center gap-2 rounded-full px-6 text-sm font-bold text-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 disabled:opacity-50"
            style={{ background: "var(--gradient-sky)" }}
          >
            <Sparkles className="h-4 w-4" />
            {loading ? "Generating…" : "Generate Kit"}
          </button>
        </div>
      </PanelCard>

      {kit && (
        <PanelCard
          title={`Recommended kit for ${grade}`}
          description={school}
          actions={
            <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background hover:scale-105">
              <ShoppingCart className="h-4 w-4" /> Add all to cart · ₹{total.toLocaleString()}
            </button>
          }
        >
          <ul className="divide-y divide-border/60">
            {kit.map((k) => (
              <li key={k.name} className="flex items-center justify-between gap-3 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--leaf)]/30 text-[var(--leaf-foreground)]">
                    <Check className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{k.name}</div>
                    <div className="text-xs text-muted-foreground">{k.vendor} · Qty {k.qty}</div>
                  </div>
                </div>
                <div className="shrink-0 font-display text-sm font-bold">₹{(k.price * k.qty).toLocaleString()}</div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3">
            <span className="text-sm font-semibold">Estimated total</span>
            <span className="font-display text-xl font-bold">₹{total.toLocaleString()}</span>
          </div>
        </PanelCard>
      )}

      {!kit && (
        <PanelCard>
          <div className="py-10 text-center text-sm text-muted-foreground">
            <Bot className="mx-auto h-10 w-10 text-foreground/40" />
            <p className="mt-3">Select your school and grade above to generate the kit.</p>
          </div>
        </PanelCard>
      )}
    </>
  );
}
