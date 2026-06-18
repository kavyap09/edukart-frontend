import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { AuthShell, Field, SubmitButton } from "@/components/auth/AuthShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth/parent/register")({
  head: () => ({ meta: [{ title: "Parent Registration — EduKart" }] }),
  component: ParentRegister,
});

function ParentRegister() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    signIn({
      email: String(fd.get("email") || ""),
      name: String(fd.get("name") || "Parent"),
      role: "parent",
    });
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
        bullets: ["Sign up free in 30 seconds", "Add your child's school & grade", "Get the official kit instantly"],
      }}
      footer={<>Already registered? <Link to="/auth/parent/login" className="font-semibold text-foreground hover:underline">Sign in</Link></>}
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <Field label="Full name" name="name" placeholder="Priya Sharma" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" name="email" type="email" placeholder="you@example.com" />
          <Field label="Phone" name="phone" type="tel" placeholder="+91 98xxxxxxxx" />
        </div>
        <Field label="Password" name="password" type="password" placeholder="At least 8 characters" />
        <SubmitButton accent="sky">Create account</SubmitButton>
      </form>
    </AuthShell>
  );
}
