import { withAffiliateTag } from "@/lib/affiliate";
import { Link } from "@tanstack/react-router";
import { Star, ExternalLink } from "lucide-react";
import type { Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="relative aspect-[4/3] overflow-hidden bg-secondary"
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium backdrop-blur">
          {product.price}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        <h3 className="mt-2 font-display text-base font-semibold leading-snug">
          <Link to="/products/$slug" params={{ slug: product.slug }} className="hover:text-primary">
            {product.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.shortDescription}</p>
        <div className="mt-5 flex items-center gap-2">
          <a
            href={withAffiliateTag(product.amazonUrl)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            View on Amazon <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <Link
            to="/products/$slug"
            params={{ slug: product.slug }}
            className="rounded-lg border border-border px-3 py-2.5 text-sm font-medium hover:bg-secondary"
          >
            Review
          </Link>
        </div>
      </div>
    </article>
  );
}

export function RatingStars({ rating, reviewCount }: { rating: number; reviewCount?: number }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${filled ? "fill-[var(--rating)] text-[var(--rating)]" : "text-border"}`}
            />
          );
        })}
      </div>
      <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
      {reviewCount != null && <span>({reviewCount.toLocaleString()})</span>}
    </div>
  );
}
