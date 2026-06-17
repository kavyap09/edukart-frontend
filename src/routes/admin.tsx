import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Panel — EduKart" }] }),
  component: () => <DashboardLayout role="admin" />,
});
