import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { AuthShell, Field, SubmitButton } from "@/components/auth/AuthShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth/vendor/register")({
  head: () => ({ meta: [{ title: "Vendor Registration — EduKart" }] }),
  component: VendorRegister,
});

function VendorRegister() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    signIn({
      email: String(fd.get("email") || ""),
      name: String(fd.get("storeName") || "Vendor"),
      role: "vendor",
    });
    navigate({ to: "/vendor" });
  }
  return (
    <AuthShell
      title="Register your store"
      subtitle="Tell us about your business — verification takes 1-2 business days."
      accent="tangerine"
      side={{
        eyebrow: "Vendor onboarding",
        heading: "Start selling on India's smartest school marketplace.",
        bullets: ["Zero listing fees", "Weekly automated payouts", "Inventory & order dashboard"],
      }}
      footer={<>Already registered? <Link to="/auth/vendor/login" className="font-semibold text-foreground hover:underline">Sign in</Link></>}
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Business details</div>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Field label="Store name" name="storeName" placeholder="Sunrise Stationers" />
            <Field label="GST Number" name="gst" placeholder="27ABCDE1234F1Z5" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" name="email" type="email" placeholder="store@example.com" />
          <Field label="Phone" name="phone" type="tel" placeholder="+91 98xxxxxxxx" />
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Bank details</div>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Field label="Account holder" name="accHolder" placeholder="As per bank records" />
            <Field label="Account number" name="accNo" placeholder="XXXXXXXXXXXX" />
            <Field label="IFSC code" name="ifsc" placeholder="HDFC0000000" />
            <Field label="Bank name" name="bank" placeholder="HDFC Bank" />
          </div>
        </div>
        <Field label="Password" name="password" type="password" placeholder="At least 8 characters" />
        <SubmitButton accent="tangerine">Submit for verification</SubmitButton>
      </form>
    </AuthShell>
  );
}
