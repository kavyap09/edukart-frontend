import { createFileRoute, Link } from "@tanstack/react-router";
import {
  School,
  Users,
  Store,
  Sparkles,
  Wallet,
  ShoppingBag,
  Search,
  Package,
  BookOpen,
  Backpack,
  Shirt,
  Footprints,
  Pencil,
  Palette,
  FlaskConical,
  Star,
  ArrowRight,
  Bot,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Menu,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import heroImg from "@/assets/hero.png";

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
      <Nav />
      <Hero />
      <Panels />
      <AIFeatures />
      <HowItWorks />
      <Categories />
      <Testimonials />
      <Footer />
    </div>
  );
}

/* NAV */
const NAV_LINKS: Array<{ label: string; to?: string; href?: string }> = [
  { label: "Home", href: "#home" },
  { label: "Parents", to: "/parent" },
  { label: "Schools", to: "/school" },
  { label: "Vendors", to: "/vendor" },
  { label: "Admin", to: "/admin" },
  { label: "About", href: "#about" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6">
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between gap-4 rounded-full px-4 py-3 glass-card sm:px-6">
        <a href="#" className="flex items-center gap-2">
          <Logo />
          <span className="font-display text-xl font-bold text-foreground">EduKart</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((l) =>
            l.to ? (
              <Link key={l.label} to={l.to} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
                {l.label}
              </a>
            ),
          )}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link to="/parent" className="rounded-full px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted">Login</Link>
          <Link to="/parent" className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-transform hover:scale-105">Open Dashboard</Link>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Menu" className="rounded-full p-2 md:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-3xl px-4 py-4 glass-card md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) =>
              l.to ? (
                <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-muted">
                  {l.label}
                </Link>
              ) : (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-muted">
                  {l.label}
                </a>
              ),
            )}
            <Link to="/parent" onClick={() => setOpen(false)} className="rounded-xl bg-foreground px-3 py-2 text-sm font-semibold text-background">Open Dashboard</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <div className="grid h-10 w-10 place-items-center rounded-2xl shadow-[var(--shadow-soft)]" style={{ background: "var(--gradient-sky)" }}>
      <BookOpen className="h-5 w-5 text-white" />
    </div>
  );
}

/* HERO */
function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden px-4 pt-12 pb-20 sm:px-6 sm:pt-16 lg:pt-24">
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
            <PillButton variant="sky">Explore Schools <ArrowRight className="h-4 w-4" /></PillButton>
            <PillButton variant="sunny">Become a Vendor</PillButton>
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
          <FloatingBadge className="left-2 top-10 sm:-left-4" icon={<BookOpen className="h-4 w-4" />} bg="var(--gradient-leaf)" label="Books delivered" />
          <FloatingBadge className="right-2 top-32 sm:-right-2" icon={<Wallet className="h-4 w-4" />} bg="var(--gradient-tangerine)" label="Best price found" />
          <FloatingBadge className="bottom-8 left-6 sm:-left-6" icon={<Bot className="h-4 w-4" />} bg="var(--gradient-sky)" label="AI kit ready" />
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
      <div aria-hidden className="animate-blob absolute bottom-0 left-1/3 -z-10 h-72 w-72 rounded-full opacity-40 blur-3xl" style={{ background: "var(--gradient-leaf)", animationDelay: "4s" }} />
    </>
  );
}

function PillButton({ children, variant = "sky" }: { children: ReactNode; variant?: "sky" | "sunny" | "leaf" | "tangerine" }) {
  const map: Record<string, string> = {
    sky: "var(--gradient-sky)",
    sunny: "var(--gradient-sunny)",
    leaf: "var(--gradient-leaf)",
    tangerine: "var(--gradient-tangerine)",
  };
  return (
    <button className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]" style={{ background: map[variant] }}>
      {children}
    </button>
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

function FloatingBadge({ icon, label, bg, className = "" }: { icon: ReactNode; label: string; bg: string; className?: string }) {
  return (
    <div className={`absolute hidden items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-foreground shadow-[var(--shadow-soft)] backdrop-blur sm:inline-flex ${className}`}
      style={{ background: "color-mix(in oklab, white 75%, transparent)" }}>
      <span className="grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: bg }}>{icon}</span>
      {label}
    </div>
  );
}

/* PANELS */
function Panels() {
  const data = [
    { icon: <School className="h-7 w-7" />, emoji: "🏫", title: "School Panel", grad: "var(--gradient-sky)", features: ["Create grade-wise school kits", "Recommend books & publications", "Approve school supplies", "Notify parents instantly"], cta: "School Login" },
    { icon: <Users className="h-7 w-7" />, emoji: "👨‍👩‍👧", title: "Parent Panel", grad: "var(--gradient-sunny)", features: ["Select school & grade", "View complete school kit", "Compare vendor prices", "One-click purchase", "Order tracking"], cta: "Parent Login", featured: true },
    { icon: <Store className="h-7 w-7" />, emoji: "🏪", title: "Vendor Panel", grad: "var(--gradient-leaf)", features: ["Register your store", "Upload products", "Manage inventory", "Receive orders", "Revenue dashboard"], cta: "Vendor Login" },
  ];
  return (
    <section className="relative px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Three panels, one platform" title="Built for everyone in the school journey" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {data.map((p) => (
            <article key={p.title} className={`hover-lift relative flex flex-col rounded-3xl p-7 glass-card ${p.featured ? "md:-translate-y-4" : ""}`}>
              <div className="mb-6 flex items-center justify-between">
                <div className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-[var(--shadow-soft)]" style={{ background: p.grad }}>{p.icon}</div>
                <span className="text-3xl" aria-hidden>{p.emoji}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">{p.title}</h3>
              <ul className="mt-4 flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.grad }} />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5" style={{ background: p.grad }}>
                {p.cta} <ArrowRight className="h-4 w-4" />
              </button>
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

/* AI FEATURES */
function AIFeatures() {
  const items = [
    { icon: <Bot className="h-6 w-6" />, emoji: "🤖", title: "Generate Complete School Kit", desc: "AI assembles every book, notebook and supply for your child's grade in seconds.", grad: "var(--gradient-sky)" },
    { icon: <Wallet className="h-6 w-6" />, emoji: "💰", title: "AI Budget Optimizer", desc: "Set a budget and we'll find the smartest mix of quality and savings.", grad: "var(--gradient-sunny)" },
    { icon: <ShoppingBag className="h-6 w-6" />, emoji: "🛍️", title: "Best Vendor Recommendation", desc: "Compare verified vendors by price, rating and delivery time instantly.", grad: "var(--gradient-leaf)" },
    { icon: <Search className="h-6 w-6" />, emoji: "📚", title: "Smart Product Search", desc: "Find the exact edition, ISBN or brand your school recommends.", grad: "var(--gradient-tangerine)" },
    { icon: <Package className="h-6 w-6" />, emoji: "📦", title: "Smart Bundle Suggestions", desc: "Combine items into bundles that save more and ship together.", grad: "var(--gradient-sky)" },
  ];
  return (
    <section id="ai" className="relative px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="AI Smart Shopping Assistant" title="Let AI do the back-to-school heavy lifting" sub="From kit generation to vendor matching, EduKart's assistant makes every step effortless." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <article key={it.title} className={`hover-lift rounded-3xl p-6 glass-card ${i === 0 ? "lg:row-span-2 lg:p-8" : ""}`}>
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-[var(--shadow-soft)]" style={{ background: it.grad }}>{it.icon}</div>
                <span className="text-2xl" aria-hidden>{it.emoji}</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-foreground">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
              {i === 0 && (
                <div className="mt-6 rounded-2xl border border-border bg-white/60 p-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Grade 5 Kit</span>
                    <span className="rounded-full bg-leaf px-2 py-0.5 text-xs font-bold text-leaf-foreground">Ready</span>
                  </div>
                  <div className="mt-3 space-y-2 text-muted-foreground">
                    <Row k="Books (12)" v="₹2,340" />
                    <Row k="Stationery (24)" v="₹980" />
                    <Row k="Uniform set" v="₹1,650" />
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3 font-bold text-foreground">
                    <span>Total saved</span>
                    <span className="text-leaf-foreground">₹612</span>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex items-center justify-between"><span>{k}</span><span className="font-semibold text-foreground">{v}</span></div>;
}

/* HOW IT WORKS */
function HowItWorks() {
  const steps = [
    { icon: <School className="h-5 w-5" />, t: "School uploads list", grad: "var(--gradient-sky)" },
    { icon: <Store className="h-5 w-5" />, t: "Vendors list products", grad: "var(--gradient-leaf)" },
    { icon: <Users className="h-5 w-5" />, t: "Parents pick grade", grad: "var(--gradient-sunny)" },
    { icon: <Bot className="h-5 w-5" />, t: "AI builds the kit", grad: "var(--gradient-tangerine)" },
    { icon: <ShoppingBag className="h-5 w-5" />, t: "Parent orders", grad: "var(--gradient-sky)" },
    { icon: <Package className="h-5 w-5" />, t: "Vendor delivers", grad: "var(--gradient-leaf)" },
  ];
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="How it works" title="Six simple steps from list to doorstep" />
        <div className="relative mt-14">
          <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-0.5 bg-gradient-to-r from-sky via-sunny to-leaf md:block" />
          <ol className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {steps.map((s, i) => (
              <li key={s.t} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-white text-foreground shadow-[var(--shadow-soft)]">
                  <span className="grid h-12 w-12 place-items-center rounded-full text-white" style={{ background: s.grad }}>{s.icon}</span>
                </div>
                <div className="mt-3 font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">Step {i + 1}</div>
                <div className="mt-1 text-sm font-semibold text-foreground">{s.t}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* CATEGORIES */
function Categories() {
  const cats = [
    { icon: <BookOpen className="h-6 w-6" />, t: "Books", emoji: "📚", grad: "var(--gradient-sky)" },
    { icon: <Backpack className="h-6 w-6" />, t: "School Bags", emoji: "🎒", grad: "var(--gradient-sunny)" },
    { icon: <Shirt className="h-6 w-6" />, t: "Uniforms", emoji: "👕", grad: "var(--gradient-leaf)" },
    { icon: <Footprints className="h-6 w-6" />, t: "Shoes", emoji: "👟", grad: "var(--gradient-tangerine)" },
    { icon: <Pencil className="h-6 w-6" />, t: "Stationery", emoji: "✏️", grad: "var(--gradient-sky)" },
    { icon: <Palette className="h-6 w-6" />, t: "Art Supplies", emoji: "🎨", grad: "var(--gradient-sunny)" },
    { icon: <FlaskConical className="h-6 w-6" />, t: "Science Kits", emoji: "🧪", grad: "var(--gradient-leaf)" },
    { icon: <Sparkles className="h-6 w-6" />, t: "More", emoji: "✨", grad: "var(--gradient-tangerine)" },
  ];
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Featured categories" title="Shop everything in one trusted marketplace" />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {cats.map((c) => (
            <a key={c.t} href="#" className="hover-lift group relative overflow-hidden rounded-3xl p-6 glass-card">
              <div aria-hidden className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60" style={{ background: c.grad }} />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-[var(--shadow-soft)]" style={{ background: c.grad }}>{c.icon}</div>
                <div className="mt-5 flex items-center justify-between">
                  <div className="font-display text-lg font-bold text-foreground">{c.t}</div>
                  <span className="text-2xl" aria-hidden>{c.emoji}</span>
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Shop now →</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* TESTIMONIALS */
function Testimonials() {
  const items = [
    { name: "Priya Shah", role: "Parent · Mumbai", rating: 5, q: "I ordered my daughter's entire Grade 4 kit in 5 minutes. EduKart saved me hours of running to bookstores.", grad: "var(--gradient-sky)" },
    { name: "Greenfield Academy", role: "School · Bengaluru", rating: 5, q: "We upload our booklist once and every parent gets the right kit. Approvals and notifications are seamless.", grad: "var(--gradient-leaf)" },
    { name: "Sunrise Stationers", role: "Vendor · Pune", rating: 5, q: "Our orders tripled in one season. The vendor dashboard makes inventory and revenue effortless.", grad: "var(--gradient-sunny)" },
  ];
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Loved by everyone" title="Parents, schools and vendors love EduKart" />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {items.map((t) => (
            <figure key={t.name} className="hover-lift flex flex-col rounded-3xl p-7 glass-card">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-tangerine text-tangerine" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground">&ldquo;{t.q}&rdquo;</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <div className="grid h-10 w-10 place-items-center rounded-full font-display text-sm font-bold text-white" style={{ background: t.grad }}>
                  {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* FOOTER */
function Footer() {
  const cols = [
    { h: "Company", l: ["About", "Careers", "Press", "Blog"] },
    { h: "Support", l: ["Contact", "FAQ", "Help Center", "Shipping"] },
    { h: "Legal", l: ["Privacy Policy", "Terms", "Cookie Policy", "Refunds"] },
  ];
  return (
    <footer id="contact" className="relative mt-12 px-4 pb-10 sm:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-6 py-12 sm:px-10" style={{ background: "var(--gradient-hero)" }}>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#" className="flex items-center gap-2">
              <Logo />
              <span className="font-display text-xl font-bold text-foreground">EduKart</span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">The AI-powered school marketplace. Everything your child needs, all in one place.</p>
            <div className="mt-5 flex gap-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full bg-white/70 text-foreground transition-all hover:-translate-y-0.5 hover:bg-white">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">{c.h}</h4>
              <ul className="mt-4 space-y-2">
                {c.l.map((x) => (
                  <li key={x}><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{x}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-foreground/10 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} EduKart. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Made with ❤️ for schools, parents and vendors.</p>
        </div>
      </div>
    </footer>
  );
}
