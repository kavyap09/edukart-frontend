import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { AuthShell, Field, SubmitButton } from "@/components/auth/AuthShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth/school/login")({
  head: () => ({ meta: [{ title: "School Login — EduKart" }] }),
  component: SchoolLogin,
});

function SchoolLogin() {
  const { signInDemo } = useAuth();
  const navigate = useNavigate();
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    signInDemo({ email, name: email.split("@")[0], role: "school" });
    navigate({ to: "/school" });
  }
  return (
    <AuthShell
      title="School sign in"
      subtitle="Manage book lists, kits and parent purchase progress."
      accent="leaf"
      side={{
        eyebrow: "School panel",
        heading: "One booklist. Every parent gets the right kit.",
        bullets: ["Grade-wise kit builder", "Parent purchase progress tracker", "Notify parents instantly"],
      }}
      footer={<>New school? <Link to="/auth/school/register" className="font-semibold text-foreground hover:underline">Register your school</Link></>}
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <Field label="School email" name="email" type="email" placeholder="admin@school.edu" />
        <Field label="Password" name="password" type="password" placeholder="••••••••" />
        <SubmitButton accent="leaf">Sign in</SubmitButton>
      </form>
    </AuthShell>
  );
}
