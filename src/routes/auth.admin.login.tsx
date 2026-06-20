import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { AuthShell, Field, SubmitButton } from "@/components/auth/AuthShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — EduKart" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const { signInDemo } = useAuth();
  const navigate = useNavigate();
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    signInDemo({ email, name: email.split("@")[0], role: "admin" });
    navigate({ to: "/admin" });
  }
  return (
    <AuthShell
      title="Admin sign in"
      subtitle="Authorised personnel only."
      accent="sunny"
      side={{
        eyebrow: "Platform admin",
        heading: "Oversee the entire EduKart marketplace.",
        bullets: ["Approve vendors & schools", "Review listings & orders", "Marketplace analytics"],
      }}
      footer={<>Need access? <Link to="/contact" className="font-semibold text-foreground hover:underline">Contact platform team</Link></>}
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <Field label="Admin email" name="email" type="email" placeholder="admin@edukart.app" />
        <Field label="Password" name="password" type="password" placeholder="••••••••" />
        <SubmitButton accent="sunny">Sign in</SubmitButton>
      </form>
    </AuthShell>
  );
}
