import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export type Product = {
  id: string;
  name: string;
  vendor: string;
  category: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  gallery: string[];
  description: string;
  grade: string | null;
  subject: string | null;
  publication: string | null;
};

export type OrderItem = {
  product_id: string;
  name: string;
  vendor: string;
  price: number;
  image: string;
  quantity: number;
};

export type ShippingAddress = {
  full_name: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
};

export type Order = {
  id: string;
  order_number: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shipping_address: ShippingAddress;
  customer_name: string;
  customer_email: string;
  status: string;
  created_at: string;
};

const normalizeProduct = (row: any): Product => ({
  id: row.id,
  name: row.name,
  vendor: row.vendor,
  category: row.category,
  price: row.price,
  mrp: row.mrp,
  rating: Number(row.rating),
  reviews: row.reviews,
  stock: row.stock,
  image: row.image,
  gallery: Array.isArray(row.gallery) ? (row.gallery as string[]) : [],
  description: row.description ?? "",
  grade: row.grade,
  subject: row.subject,
  publication: row.publication,
});

/* ---------- Products ---------- */

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []).map(normalizeProduct);
    },
    staleTime: 60_000,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data ? normalizeProduct(data) : null;
    },
    enabled: !!id,
  });
}

/* ---------- Cart ---------- */

export type CartRow = {
  id: string;
  product_id: string;
  quantity: number;
  product: Product;
};

export function useCart() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["cart", user?.id],
    enabled: !!user && user.role === "parent",
    queryFn: async (): Promise<CartRow[]> => {
      const { data, error } = await supabase
        .from("cart_items")
        .select("id, product_id, quantity, products(*)")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? [])
        .filter((r: any) => r.products)
        .map((r: any) => ({
          id: r.id,
          product_id: r.product_id,
          quantity: r.quantity,
          product: normalizeProduct(r.products),
        }));
    },
  });
}

export function useAddToCart() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
      if (!user) throw new Error("Sign in required");
      const { data: existing } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("product_id", productId)
        .maybeSingle();
      if (existing) {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: existing.quantity + quantity })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("cart_items")
          .insert({ user_id: user.id, product_id: productId, quantity });
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useUpdateCartQty() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      if (quantity <= 0) {
        const { error } = await supabase.from("cart_items").delete().eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("cart_items").update({ quantity }).eq("id", id);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useRemoveFromCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("cart_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useClearCart() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async () => {
      if (!user) return;
      const { error } = await supabase.from("cart_items").delete().eq("user_id", user.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}

/* ---------- Wishlist ---------- */

export type WishlistRow = {
  id: string;
  product_id: string;
  product: Product;
};

export function useWishlist() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["wishlist", user?.id],
    enabled: !!user && user.role === "parent",
    queryFn: async (): Promise<WishlistRow[]> => {
      const { data, error } = await supabase
        .from("wishlist_items")
        .select("id, product_id, products(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? [])
        .filter((r: any) => r.products)
        .map((r: any) => ({
          id: r.id,
          product_id: r.product_id,
          product: normalizeProduct(r.products),
        }));
    },
  });
}

export function useToggleWishlist() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (productId: string) => {
      if (!user) throw new Error("Sign in required");
      const { data: existing } = await supabase
        .from("wishlist_items")
        .select("id")
        .eq("product_id", productId)
        .maybeSingle();
      if (existing) {
        const { error } = await supabase.from("wishlist_items").delete().eq("id", existing.id);
        if (error) throw error;
        return { added: false };
      }
      const { error } = await supabase
        .from("wishlist_items")
        .insert({ user_id: user.id, product_id: productId });
      if (error) throw error;
      return { added: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wishlist"] }),
  });
}

export function useRemoveWishlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("wishlist_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wishlist"] }),
  });
}

/* ---------- Orders ---------- */

const normalizeOrder = (row: any): Order => ({
  id: row.id,
  order_number: row.order_number,
  items: Array.isArray(row.items) ? (row.items as OrderItem[]) : [],
  subtotal: row.subtotal,
  shipping: row.shipping,
  tax: row.tax,
  total: row.total,
  shipping_address: (row.shipping_address ?? {}) as ShippingAddress,
  customer_name: row.customer_name,
  customer_email: row.customer_email,
  status: row.status,
  created_at: row.created_at,
});

export function useOrders() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["orders", user?.id],
    enabled: !!user && user.role === "parent",
    queryFn: async (): Promise<Order[]> => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map(normalizeOrder);
    },
  });
}

export function useOrder(id: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["order", id],
    enabled: !!user && !!id,
    queryFn: async (): Promise<Order | null> => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data ? normalizeOrder(data) : null;
    },
  });
}

export type CheckoutInput = {
  items: OrderItem[];
  shipping_address: ShippingAddress;
};

export function calcTotals(items: OrderItem[]) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;
  return { subtotal, shipping, tax, total };
}

export function useCreateOrder() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: CheckoutInput): Promise<Order> => {
      if (!user) throw new Error("Sign in required");
      const totals = calcTotals(input.items);
      const { data, error } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          items: input.items as any,
          ...totals,
          shipping_address: input.shipping_address as any,
          customer_name: user.name,
          customer_email: user.email,
          status: "paid",
        })
        .select("*")
        .single();
      if (error) throw error;
      // clear cart on success
      await supabase.from("cart_items").delete().eq("user_id", user.id);
      qc.invalidateQueries({ queryKey: ["cart"] });
      qc.invalidateQueries({ queryKey: ["orders"] });
      return normalizeOrder(data);
    },
  });
}

export const CATEGORIES = [
  "All",
  "Books",
  "School Bags",
  "Uniforms",
  "Shoes",
  "Stationery",
  "Water Bottles",
  "Lunch Boxes",
  "Science Kits",
  "Art Supplies",
];
