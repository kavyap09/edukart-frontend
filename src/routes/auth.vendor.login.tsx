import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { AuthShell, Field, SubmitButton } from "@/components/auth/AuthShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth/vendor/login")({
  head: () => ({ meta: [{ title: "Vendor Login — EduKart" }] }),
  component: VendorLogin,
});

function VendorLogin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    signIn({ email, name: email.split("@")[0], role: "vendor" });
    navigate({ to: "/vendor" });
  }
  return (
    <AuthShell
      title="Vendor sign in"
      subtitle="Manage your store, orders and revenue."
      accent="tangerine"
      side={{
        eyebrow: "Vendor panel",
        heading: "Reach 180K+ parents across 2,400 schools.",
        bullets: ["List products in minutes", "Receive verified school orders", "Track revenue & payouts"],
      }}
      footer={<>New vendor? <Link to="/auth/vendor/register" className="font-semibold text-foreground hover:underline">Register your store</Link></>}
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <Field label="Business email" name="email" type="email" placeholder="store@example.com" />
        <Field label="Password" name="password" type="password" placeholder="••••••••" />
        <SubmitButton accent="tangerine">Sign in</SubmitButton>
      </form>
    </AuthShell>
  );
}
