import {
  LayoutDashboard,
  School as SchoolIcon,
  BookOpen,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  Truck,
  Heart,
  MapPin,
  FileText,
  Bot,
  Users,
  Shirt,
  Pencil,
  ClipboardCheck,
  Store,
  Package,
  Boxes,
  BarChart3,
  Package2,
  BadgeDollarSign,
  ShieldCheck,
  CheckCircle2,
  Tag,
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
      { to: "/parent/products", label: "Browse Products", icon: ShoppingBag },
      { to: "/parent/wishlist", label: "Wishlist", icon: Heart },
      { to: "/parent/cart", label: "Cart", icon: ShoppingCart },
      { to: "/parent/checkout", label: "Checkout", icon: CreditCard },
      { to: "/parent/orders", label: "Orders", icon: Truck },
      { to: "/parent/invoices", label: "Invoices", icon: FileText },
    ],
  },
  school: {
    label: "School Panel",
    tagline: "Curate kits for every grade",
    accent: "leaf",
    items: [
      { to: "/school", label: "Dashboard", icon: LayoutDashboard },
      { to: "/school/classes", label: "Grades & Classes", icon: Users },
      { to: "/school/booklists", label: "Recommend Books", icon: BookOpen },
      { to: "/school/uniforms", label: "Recommend Uniforms", icon: Shirt },
      { to: "/school/stationery", label: "Recommend Stationery", icon: Pencil },
      { to: "/school/status", label: "Parent Purchase Progress", icon: ClipboardCheck },
    ],
  },
  vendor: {
    label: "Vendor Panel",
    tagline: "Grow your store with EduKart",
    accent: "tangerine",
    items: [
      { to: "/vendor", label: "Dashboard", icon: LayoutDashboard },
      { to: "/vendor/store", label: "Store Profile", icon: Store },
      { to: "/vendor/products", label: "Manage Products", icon: Package },
      { to: "/vendor/inventory", label: "Inventory", icon: Boxes },
      { to: "/vendor/orders", label: "Orders", icon: Package2 },
      { to: "/vendor/revenue", label: "Revenue Dashboard", icon: BarChart3 },
      { to: "/vendor/invoices", label: "Invoice History", icon: FileText },
      { to: "/vendor/payouts", label: "Payout Status", icon: BadgeDollarSign },
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
      { to: "/admin/vendors", label: "Manage Vendors", icon: Store },
      { to: "/admin/categories", label: "Categories", icon: Tag },
      { to: "/admin/products", label: "Products", icon: Package },
      { to: "/admin/orders", label: "Orders", icon: Package2 },
      { to: "/admin/revenue", label: "Analytics", icon: BarChart3 },
      { to: "/admin/security", label: "Security & Roles", icon: ShieldCheck },
    ],
  },
};
