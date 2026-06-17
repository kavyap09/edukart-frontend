import {
  LayoutDashboard,
  School as SchoolIcon,
  GraduationCap,
  BookOpen,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  Truck,
  Heart,
  MapPin,
  FileText,
  Bell,
  Bot,
  Wallet,
  UserCog,
  CalendarRange,
  Users,
  Library,
  Shirt,
  Pencil,
  Megaphone,
  ClipboardCheck,
  ListChecks,
  Building2,
  Receipt,
  Landmark,
  Store,
  Package,
  Boxes,
  BarChart3,
  Package2,
  BadgeDollarSign,
  AlertTriangle,
  Star,
  ShieldCheck,
  CheckCircle2,
  Tag,
  Undo2,
  PauseCircle,
  type LucideIcon,
} from "lucide-react";

export type Role = "parent" | "school" | "vendor" | "admin";

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
};

export type RoleConfig = {
  label: string;
  tagline: string;
  accent: "sky" | "leaf" | "tangerine" | "sunny";
  items: NavItem[];
};

export const ROLE_CONFIG: Record<Role, RoleConfig> = {
  parent: {
    label: "Parent Panel",
    tagline: "Shop smart for your child",
    accent: "sky",
    items: [
      { to: "/parent", label: "Dashboard", icon: LayoutDashboard },
      { to: "/parent/schools", label: "Select School", icon: SchoolIcon },
      { to: "/parent/grades", label: "Select Grade", icon: GraduationCap },
      { to: "/parent/kit", label: "Official School Kit", icon: BookOpen },
      { to: "/parent/products", label: "Browse Products", icon: ShoppingBag },
      { to: "/parent/cart", label: "Multi-vendor Cart", icon: ShoppingCart },
      { to: "/parent/checkout", label: "Checkout", icon: CreditCard },
      { to: "/parent/orders", label: "Order Tracking", icon: Truck },
      { to: "/parent/wishlist", label: "Wishlist", icon: Heart },
      { to: "/parent/addresses", label: "Saved Addresses", icon: MapPin },
      { to: "/parent/invoices", label: "GST Invoices", icon: FileText },
      { to: "/parent/notifications", label: "Notifications", icon: Bell },
      { to: "/parent/assistant", label: "AI Shopping Assistant", icon: Bot },
      { to: "/parent/budget", label: "AI Budget Optimizer", icon: Wallet },
    ],
  },
  school: {
    label: "School Panel",
    tagline: "Curate kits for every grade",
    accent: "leaf",
    items: [
      { to: "/school", label: "Dashboard", icon: LayoutDashboard },
      { to: "/school/profile", label: "School Profile", icon: UserCog },
      { to: "/school/years", label: "Academic Years", icon: CalendarRange },
      { to: "/school/classes", label: "Classes & Grades", icon: Users },
      { to: "/school/booklists", label: "Official Book Lists", icon: BookOpen },
      { to: "/school/publications", label: "Recommended Publications", icon: Library },
      { to: "/school/uniforms", label: "Recommended Uniforms", icon: Shirt },
      { to: "/school/stationery", label: "Recommended Stationery", icon: Pencil },
      { to: "/school/notify", label: "Notify Parents", icon: Megaphone },
      { to: "/school/status", label: "Parent Purchase Status", icon: ClipboardCheck },
      { to: "/school/requirements", label: "School Requirements", icon: ListChecks },
    ],
  },
  vendor: {
    label: "Vendor Panel",
    tagline: "Grow your store with EduKart",
    accent: "tangerine",
    items: [
      { to: "/vendor", label: "Dashboard", icon: LayoutDashboard },
      { to: "/vendor/onboarding", label: "Onboarding", icon: Building2 },
      { to: "/vendor/gst", label: "GST Details", icon: Receipt },
      { to: "/vendor/bank", label: "Bank Details", icon: Landmark },
      { to: "/vendor/store", label: "Store Profile", icon: Store },
      { to: "/vendor/products", label: "Product Management", icon: Package },
      { to: "/vendor/inventory", label: "Inventory", icon: Boxes },
      { to: "/vendor/revenue", label: "Revenue Dashboard", icon: BarChart3 },
      { to: "/vendor/orders", label: "Orders", icon: Package2 },
      { to: "/vendor/payouts", label: "Payout Status", icon: BadgeDollarSign },
      { to: "/vendor/invoices", label: "Invoices", icon: FileText },
      { to: "/vendor/alerts", label: "Low Stock Alerts", icon: AlertTriangle },
      { to: "/vendor/reviews", label: "Reviews & Ratings", icon: Star },
    ],
  },
  admin: {
    label: "Admin Panel",
    tagline: "Oversee the entire marketplace",
    accent: "sunny",
    items: [
      { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { to: "/admin/approvals", label: "Approve Vendors", icon: CheckCircle2 },
      { to: "/admin/schools", label: "Manage Schools", icon: SchoolIcon },
      { to: "/admin/parents", label: "Manage Parents", icon: Users },
      { to: "/admin/vendors", label: "Manage Vendors", icon: Store },
      { to: "/admin/categories", label: "Categories", icon: Tag },
      { to: "/admin/products", label: "Products", icon: Package },
      { to: "/admin/orders", label: "Orders", icon: Package2 },
      { to: "/admin/returns", label: "Returns & Refunds", icon: Undo2 },
      { to: "/admin/revenue", label: "Revenue Analytics", icon: BarChart3 },
      { to: "/admin/suspensions", label: "Suspend / Reinstate", icon: PauseCircle },
      { to: "/admin/security", label: "Security & Roles", icon: ShieldCheck },
    ],
  },
};
