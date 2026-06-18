import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Check } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { Field } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — EduKart" },
      { name: "description", content: "Get in touch with the EduKart team — for schools, vendors, parents and press." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">Get in touch</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">We'd love to hear from you — whether you're a school, vendor or parent.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <aside className="space-y-4">
            {[
              { i: <Mail className="h-5 w-5" />, t: "Email", s: "hello@edukart.app", g: "var(--gradient-sky)" },
              { i: <Phone className="h-5 w-5" />, t: "Phone", s: "+91 80 4000 1234", g: "var(--gradient-sunny)" },
              { i: <MapPin className="h-5 w-5" />, t: "Office", s: "Bengaluru · Mumbai · Delhi", g: "var(--gradient-leaf)" },
            ].map((c) => (
              <div key={c.t} className="flex items-start gap-3 rounded-3xl glass-card p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-white shadow-[var(--shadow-soft)]" style={{ background: c.g }}>{c.i}</div>
                <div className="min-w-0">
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{c.t}</div>
                  <div className="mt-0.5 truncate font-semibold">{c.s}</div>
                </div>
              </div>
            ))}
          </aside>

          <div className="rounded-3xl glass-card p-6 sm:p-8">
            {sent ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full text-white shadow-[var(--shadow-soft)]" style={{ background: "var(--gradient-leaf)" }}>
                  <Check className="h-6 w-6" />
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold">Message sent!</h2>
                <p className="mt-1 text-sm text-muted-foreground">We'll get back to you within 1 business day.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={onSubmit}>
                <h2 className="font-display text-xl font-bold">Send us a message</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your name" name="name" placeholder="Jane Doe" />
                  <Field label="Email" name="email" type="email" placeholder="you@example.com" />
                </div>
                <Field label="Subject" name="subject" placeholder="How can we help?" />
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-foreground">Message</span>
                  <textarea
                    name="message" required rows={5}
                    placeholder="Tell us a bit more…"
                    className="w-full rounded-2xl border border-border bg-white/70 px-4 py-2.5 text-sm outline-none transition-shadow placeholder:text-muted-foreground/70 focus:border-foreground/30 focus:shadow-md"
                  />
                </label>
                <button type="submit" className="w-full rounded-full px-5 py-3 text-sm font-bold text-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]" style={{ background: "var(--gradient-sky)" }}>
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
