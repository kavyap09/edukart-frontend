import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthShell, Field, SubmitButton } from "@/components/auth/AuthShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth/parent/login")({
  head: () => ({ meta: [{ title: "Parent Login — EduKart" }] }),
  component: ParentLogin,
});

function ParentLogin() {
  const { signInWithPassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");
    if (!email || !password) return setError("Enter email and password");
    setBusy(true);
    const { error: err } = await signInWithPassword(email, password);
    setBusy(false);
    if (err) return setError(err);
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
        bullets: [
          "AI-curated kits per school & grade",
          "Compare verified vendors",
          "Track orders end-to-end",
        ],
      }}
      footer={
        <>
          New here?{" "}
          <Link
            to="/auth/parent/register"
            className="font-semibold text-foreground hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <Field label="Email" name="email" type="email" placeholder="you@example.com" />
        <Field label="Password" name="password" type="password" placeholder="••••••••" />
        {error && <p className="text-xs text-destructive">{error}</p>}
        <SubmitButton accent="sky">{busy ? "Signing in…" : "Sign in"}</SubmitButton>
      </form>
    </AuthShell>
  );
}
