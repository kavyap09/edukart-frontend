import { createFileRoute, Link } from "@tanstack/react-router";
import {
  School, Users, Store, Sparkles, ShoppingBag, BookOpen,
  Backpack, Shirt, Footprints, Pencil, Palette, FlaskConical, ArrowRight, Bot,
  Facebook, Twitter, Instagram, Youtube,
} from "lucide-react";
import type { ReactNode } from "react";
import heroImg from "@/assets/hero.png";
import { PublicNav } from "@/components/PublicNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EduKart — Everything Your Child Needs, All in One Place" },
      { name: "description", content: "AI-powered school marketplace connecting schools, parents and vendors. Smart kits, best prices, one-click ordering." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <PublicNav />
      <Hero />
      <Panels />
      <AIKitCard />
      <Categories />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:pt-24">
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <Blobs />
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-foreground shadow-[var(--shadow-soft)] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            AI-powered school marketplace
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            Everything Your Child Needs,{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-sky)" }}>
              All in One Place.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0">
            EduKart connects schools, parents and trusted vendors. Generate complete grade-wise kits with AI, compare prices, and order in one click.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link to="/marketplace">
              <PillButton variant="sky">Browse Marketplace <ArrowRight className="h-4 w-4" /></PillButton>
            </Link>
            <Link to="/auth/vendor/register">
              <PillButton variant="sunny">Become a Vendor</PillButton>
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
            <Stat n="2,400+" l="Schools" />
            <Divider />
            <Stat n="180K+" l="Happy Parents" />
            <Divider />
            <Stat n="5,000+" l="Vendors" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-0 -z-10 rounded-[40%] blur-3xl" style={{ background: "var(--gradient-sunny)", opacity: 0.4 }} />
          <img src={heroImg} alt="Happy family with school supplies" width={1024} height={1024} className="animate-float h-auto w-full drop-shadow-2xl" />
        </div>
      </div>
    </section>
  );
}

function Blobs() {
  return (
    <>
      <div aria-hidden className="animate-blob absolute -top-20 -left-20 -z-10 h-72 w-72 rounded-full opacity-50 blur-3xl" style={{ background: "var(--gradient-sky)" }} />
      <div aria-hidden className="animate-blob absolute -right-20 top-40 -z-10 h-80 w-80 rounded-full opacity-40 blur-3xl" style={{ background: "var(--gradient-sunny)", animationDelay: "2s" }} />
    </>
  );
}

function PillButton({ children, variant = "sky" }: { children: ReactNode; variant?: "sky" | "sunny" }) {
  const map: Record<string, string> = { sky: "var(--gradient-sky)", sunny: "var(--gradient-sunny)" };
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]" style={{ background: map[variant] }}>
      {children}
    </span>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="text-center lg:text-left">
      <div className="font-display text-2xl font-bold text-foreground">{n}</div>
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{l}</div>
    </div>
  );
}
function Divider() { return <div className="h-8 w-px bg-border" />; }

function Panels() {
  const data = [
    { icon: <School className="h-7 w-7" />, title: "For Schools", grad: "var(--gradient-leaf)",
      features: ["Create grade-wise kits", "Recommend books, uniforms & stationery", "Track parent purchase progress"],
      loginTo: "/auth/school/login", registerTo: "/auth/school/register" },
    { icon: <Users className="h-7 w-7" />, title: "For Parents", grad: "var(--gradient-sky)", featured: true,
      features: ["Browse curated school kits", "Compare vendors & prices", "One-click checkout & tracking"],
      loginTo: "/auth/parent/login", registerTo: "/auth/parent/register" },
    { icon: <Store className="h-7 w-7" />, title: "For Vendors", grad: "var(--gradient-tangerine)",
      features: ["List products & manage inventory", "Receive orders from verified parents", "Track revenue & payouts"],
      loginTo: "/auth/vendor/login", registerTo: "/auth/vendor/register" },
  ];
  return (
    <section className="relative px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Three panels, one platform" title="Built for everyone in the school journey" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {data.map((p) => (
            <article key={p.title} className={`hover-lift relative flex flex-col rounded-3xl p-7 glass-card ${p.featured ? "md:-translate-y-4" : ""}`}>
              <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl text-white shadow-[var(--shadow-soft)]" style={{ background: p.grad }}>{p.icon}</div>
              <h3 className="font-display text-2xl font-bold text-foreground">{p.title}</h3>
              <ul className="mt-4 flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.grad }} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-2">
                <Link to={p.loginTo} className="flex-1 rounded-full border border-border bg-white/70 px-4 py-2.5 text-center text-sm font-bold text-foreground transition-colors hover:bg-white">Login</Link>
                <Link to={p.registerTo} className="flex-1 rounded-full px-4 py-2.5 text-center text-sm font-bold text-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5" style={{ background: p.grad }}>Sign up</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-block rounded-full bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground backdrop-blur">{eyebrow}</span>
      <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{sub}</p>}
    </div>
  );
}

function AIKitCard() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] glass-card p-8 sm:p-12">
          <div aria-hidden className="absolute -right-16 -top-16 h-60 w-60 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-sky)" }} />
          <div aria-hidden className="absolute -bottom-16 -left-16 h-60 w-60 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-sunny)" }} />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Bot className="h-3.5 w-3.5" /> AI School Kit Generator
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
                Pick a school and grade. Get the complete kit.
              </h2>
              <p className="mt-3 max-w-xl text-base text-muted-foreground">
                Our AI assembles books, uniforms, stationery and supplies — recommended by your child's school — into a ready-to-buy kit. No more checklists, no more guesswork.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/auth/parent/login" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]" style={{ background: "var(--gradient-sky)" }}>
                  Generate my kit <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/marketplace" className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-6 py-3 text-sm font-bold text-foreground hover:bg-white">
                  Browse marketplace
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-white/80 p-5 text-sm shadow-[var(--shadow-soft)] md:w-72">
              <div className="flex items-center justify-between">
                <span className="font-bold">Grade 5 · Sample Kit</span>
                <span className="rounded-full bg-[var(--leaf)]/40 px-2 py-0.5 text-[11px] font-bold">Ready</span>
              </div>
              <div className="mt-3 space-y-2 text-muted-foreground">
                <Row k="Books (12)" v="₹2,340" />
                <Row k="Stationery (24)" v="₹980" />
                <Row k="Uniform set" v="₹1,650" />
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 font-bold text-foreground">
                <span>You save</span>
                <span style={{ color: "var(--leaf-foreground)" }}>₹612</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex items-center justify-between"><span>{k}</span><span className="font-semibold text-foreground">{v}</span></div>;
}

function Categories() {
  const cats = [
    { icon: <BookOpen className="h-6 w-6" />, t: "Books", grad: "var(--gradient-sky)" },
    { icon: <Backpack className="h-6 w-6" />, t: "School Bags", grad: "var(--gradient-sunny)" },
    { icon: <Shirt className="h-6 w-6" />, t: "Uniforms", grad: "var(--gradient-leaf)" },
    { icon: <Footprints className="h-6 w-6" />, t: "Shoes", grad: "var(--gradient-tangerine)" },
    { icon: <Pencil className="h-6 w-6" />, t: "Stationery", grad: "var(--gradient-sky)" },
    { icon: <Palette className="h-6 w-6" />, t: "Art Supplies", grad: "var(--gradient-sunny)" },
    { icon: <FlaskConical className="h-6 w-6" />, t: "Science Kits", grad: "var(--gradient-leaf)" },
    { icon: <ShoppingBag className="h-6 w-6" />, t: "More", grad: "var(--gradient-tangerine)" },
  ];
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Shop by category" title="Everything your child needs, in one place" />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {cats.map((c) => (
            <Link key={c.t} to="/marketplace" className="hover-lift group relative overflow-hidden rounded-3xl p-6 glass-card">
              <div aria-hidden className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60" style={{ background: c.grad }} />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-[var(--shadow-soft)]" style={{ background: c.grad }}>{c.icon}</div>
                <div className="mt-5 font-display text-lg font-bold text-foreground">{c.t}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Shop now →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative mt-12 px-4 pb-10 sm:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-6 py-12 sm:px-10" style={{ background: "var(--gradient-hero)" }}>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-2xl shadow-[var(--shadow-soft)]" style={{ background: "var(--gradient-sky)" }}>
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">EduKart</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">The AI-powered school marketplace. Everything your child needs, all in one place.</p>
            <div className="mt-5 flex gap-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full bg-white/70 text-foreground transition-all hover:-translate-y-0.5 hover:bg-white">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">Company</h4>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">Marketplace</h4>
            <ul className="mt-4 space-y-2">
              <li><Link to="/marketplace" className="text-sm text-muted-foreground hover:text-foreground">Browse products</Link></li>
              <li><Link to="/auth/vendor/register" className="text-sm text-muted-foreground hover:text-foreground">Become a vendor</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">Account</h4>
            <ul className="mt-4 space-y-2">
              <li><Link to="/auth/parent/login" className="text-sm text-muted-foreground hover:text-foreground">Parent login</Link></li>
              <li><Link to="/auth/school/login" className="text-sm text-muted-foreground hover:text-foreground">School login</Link></li>
              <li><Link to="/auth/admin/login" className="text-sm text-muted-foreground hover:text-foreground">Admin</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-foreground/10 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} EduKart. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Made with ❤️ for schools, parents and vendors.</p>
        </div>
      </div>
    </footer>
  );
}
