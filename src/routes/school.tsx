import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/school")({
  head: () => ({ meta: [{ title: "School Panel — EduKart" }] }),
  component: () => <DashboardLayout role="school" />,
});
