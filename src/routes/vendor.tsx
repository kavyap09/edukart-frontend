import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/vendor")({
  head: () => ({ meta: [{ title: "Vendor Panel — EduKart" }] }),
  component: () => <DashboardLayout role="vendor" />,
});
