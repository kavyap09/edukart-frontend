import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { AuthShell, Field, SubmitButton } from "@/components/auth/AuthShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth/school/register")({
  head: () => ({ meta: [{ title: "School Registration — EduKart" }] }),
  component: SchoolRegister,
});

function SchoolRegister() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    signIn({
      email: String(fd.get("email") || ""),
      name: String(fd.get("schoolName") || "School"),
      role: "school",
    });
    navigate({ to: "/school" });
  }
  return (
    <AuthShell
      title="Register your school"
      subtitle="Free for verified educational institutions."
      accent="leaf"
      side={{
        eyebrow: "School onboarding",
        heading: "Give every parent the official kit — instantly.",
        bullets: ["Verified school profile", "Upload booklists & uniforms", "Free for all schools"],
      }}
      footer={<>Already registered? <Link to="/auth/school/login" className="font-semibold text-foreground hover:underline">Sign in</Link></>}
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <Field label="School name" name="schoolName" placeholder="Greenfield Academy" />
        <Field label="Address" name="address" placeholder="Street, City, State, PIN" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Contact person" name="contact" placeholder="Principal / Admin name" />
          <Field label="Phone" name="phone" type="tel" placeholder="+91 98xxxxxxxx" />
        </div>
        <Field label="Official email" name="email" type="email" placeholder="admin@school.edu" />
        <Field label="Password" name="password" type="password" placeholder="At least 8 characters" />
        <SubmitButton accent="leaf">Register school</SubmitButton>
      </form>
    </AuthShell>
  );
}
