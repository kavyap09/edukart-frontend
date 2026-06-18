import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthShell, Field, SubmitButton } from "@/components/auth/AuthShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth/parent/login")({
  head: () => ({ meta: [{ title: "Parent Login — EduKart" }] }),
  component: ParentLogin,
});

function ParentLogin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    if (!email) return setError("Enter your email");
    signIn({ email, name: email.split("@")[0], role: "parent" });
    navigate({ to: "/parent" });
  }
  return (
    <AuthShell
      title="Welcome back, parent"
      subtitle="Sign in to view your school kits, orders and wishlist."
      accent="sky"
      side={{
        eyebrow: "Parent panel",
        heading: "Shop for your child in minutes, not hours.",
        bullets: ["AI-curated kits per school & grade", "Compare verified vendors", "Track orders end-to-end"],
      }}
      footer={<>New here? <Link to="/auth/parent/register" className="font-semibold text-foreground hover:underline">Create an account</Link></>}
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <Field label="Email" name="email" type="email" placeholder="you@example.com" />
        <Field label="Password" name="password" type="password" placeholder="••••••••" />
        {error && <p className="text-xs text-destructive">{error}</p>}
        <SubmitButton accent="sky">Sign in</SubmitButton>
      </form>
    </AuthShell>
  );
}
