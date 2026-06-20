import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthShell, Field, SubmitButton } from "@/components/auth/AuthShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth/parent/register")({
  head: () => ({ meta: [{ title: "Parent Registration — EduKart" }] }),
  component: ParentRegister,
});

function ParentRegister() {
  const { signUpWithPassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");
    if (!name || !email || password.length < 6) {
      return setError("Enter your name, email and a password (min 6 chars).");
    }
    setBusy(true);
    const { error: err } = await signUpWithPassword(email, password, name);
    setBusy(false);
    if (err) return setError(err);
    navigate({ to: "/parent" });
  }

  return (
    <AuthShell
      title="Create your parent account"
      subtitle="Join thousands of parents shopping smarter for their kids."
      accent="sky"
      side={{
        eyebrow: "Parent panel",
        heading: "Skip the back-to-school chaos.",
        bullets: [
          "Sign up free in 30 seconds",
          "Add your child's school & grade",
          "Get the official kit instantly",
        ],
      }}
      footer={
        <>
          Already registered?{" "}
          <Link to="/auth/parent/login" className="font-semibold text-foreground hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <Field label="Full name" name="name" placeholder="Priya Sharma" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" name="email" type="email" placeholder="you@example.com" />
          <Field label="Phone" name="phone" type="tel" placeholder="+91 98xxxxxxxx" required={false} />
        </div>
        <Field label="Password" name="password" type="password" placeholder="At least 6 characters" />
        {error && <p className="text-xs text-destructive">{error}</p>}
        <SubmitButton accent="sky">{busy ? "Creating account…" : "Create account"}</SubmitButton>
      </form>
    </AuthShell>
  );
}
