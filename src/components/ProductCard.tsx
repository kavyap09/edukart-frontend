import { Link } from "@tanstack/react-router";
import { Star, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);
  return (
    <Link
      to="/marketplace/$productId"
      params={{ productId: p.id }}
      className="hover-lift group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-soft)] ring-1 ring-border/60 transition-all"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {off > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--tangerine)] px-2 py-0.5 text-[11px] font-bold text-[var(--tangerine-foreground)] shadow">
            {off}% OFF
          </span>
        )}
        {p.stock < 50 && p.stock > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-bold text-foreground backdrop-blur">
            Only {p.stock} left
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{p.category}</div>
        <h3 className="line-clamp-2 font-display text-sm font-bold leading-snug text-foreground">{p.name}</h3>
        <div className="text-xs text-muted-foreground">by {p.vendor}</div>
        <div className="flex items-center gap-1 text-xs">
          <span className="inline-flex items-center gap-0.5 rounded-md bg-[var(--leaf)]/30 px-1.5 py-0.5 font-bold text-foreground">
            {p.rating} <Star className="h-3 w-3 fill-current" />
          </span>
          <span className="text-muted-foreground">({p.reviews})</span>
        </div>
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <div className="font-display text-lg font-bold text-foreground">₹{p.price}</div>
            {p.mrp > p.price && (
              <div className="text-xs text-muted-foreground line-through">₹{p.mrp}</div>
            )}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); }}
            className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background transition-transform hover:scale-105"
          >
            <ShoppingCart className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </Link>
  );
}
