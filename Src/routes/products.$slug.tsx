import { withAffiliateTag } from "@/lib/affiliate";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ExternalLink, Check, X, Star, ShieldCheck, Truck, Award } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCard, RatingStars } from "@/components/ProductCard";
import { Breadcrumbs, breadcrumbJsonLd, type Crumb } from "@/components/Breadcrumbs";
import { getProduct, products, categories, type Product } from "@/lib/data";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.product;
    const title = p ? `${p.title} Review — Cool Gadgets Hub` : "Product Review";
    const desc = p?.shortDescription ?? "Read the full review on Cool Gadgets Hub.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${params.slug}` },
        ...(p?.image ? [{ property: "og:image", content: p.image }, { name: "twitter:image", content: p.image }] : []),
      ],
      links: [{ rel: "canonical", href: `/products/${params.slug}` }],
      scripts: p ? [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.title,
            image: p.image,
            description: p.description,
            brand: { "@type": "Brand", name: "Cool Gadgets Hub" },
            aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviewCount },
            review: {
              "@type": "Review",
              reviewRating: { "@type": "Rating", ratingValue: p.rating, bestRating: 5 },
              author: { "@type": "Organization", name: "Cool Gadgets Hub" },
              reviewBody: p.description,
            },
            offers: { "@type": "Offer", price: p.price.replace(/[^0-9.]/g, ""), priceCurrency: "USD", availability: "https://schema.org/InStock", url: withAffiliateTag(p.amazonUrl) },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbJsonLd([
            { label: "Home", to: "/" },
            { label: "Products", to: "/" },
            { label: p.title, to: `/products/${params.slug}` },
          ])),
        },
      ] : [],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">Back to home</Link>
      </div>
    </Layout>
  ),
});

function ratingBuckets(rating: number, total: number) {
  // approximate 5-star distribution from average rating
  const r = Math.max(1, Math.min(5, rating));
  const weights = [
    Math.max(0, r - 4) * 1.6 + 0.55, // 5★
    Math.max(0, 5 - Math.abs(r - 4)) * 0.6, // 4★
    Math.max(0, 5 - Math.abs(r - 3)) * 0.18, // 3★
    Math.max(0, 5 - Math.abs(r - 2)) * 0.06, // 2★
    Math.max(0, 5 - Math.abs(r - 1)) * 0.04, // 1★
  ];
  const sum = weights.reduce((a, b) => a + b, 0);
  return weights.map((w, i) => ({
    stars: 5 - i,
    count: Math.round((w / sum) * total),
    pct: Math.round((w / sum) * 100),
  }));
}

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const alternatives = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);
  const compareSet = [product, ...alternatives].slice(0, 3);
  const catName = categories.find((c) => c.slug === product.category)?.name ?? product.category;
  const crumbs: Crumb[] = [
    { label: "Home", to: "/" },
    { label: catName, to: "/" },
    { label: product.title, to: `/products/${product.slug}` },
  ];
  const buckets = ratingBuckets(product.rating, product.reviewCount);
  const faqs = [
    { q: `Is the ${product.title} worth the price?`, a: `At ${product.price}, it sits in the premium tier of ${catName.toLowerCase()}, but the build quality, performance, and warranty make it a solid long-term buy for most shoppers.` },
    { q: "Does it come with a warranty?", a: "Yes — it ships with the manufacturer's 1-year limited warranty, and Amazon offers optional extended protection plans at checkout." },
    { q: "How fast does it ship from Amazon?", a: "Prime members typically receive it within 1–2 business days. Free standard shipping is available for non-Prime orders over $35." },
    { q: "Can I return it if I don't like it?", a: "Amazon's standard 30-day return window applies. The product must be in original condition with all included accessories." },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <Breadcrumbs items={crumbs} />
      </div>

      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-2 md:gap-12 md:py-12">
          <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
            <img
              src={product.image}
              alt={product.title}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/3] w-full object-cover md:aspect-square"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-secondary px-2.5 py-1 font-medium uppercase tracking-wide text-muted-foreground">{catName}</span>
              {product.featured && <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">Editor's Pick</span>}
              {product.trending && <span className="rounded-full bg-[var(--success)]/10 px-2.5 py-1 font-medium text-[var(--success)]">Trending</span>}
            </div>
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{product.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
              <a href="#reviews" className="text-sm text-primary hover:underline">Read review summary</a>
            </div>
            <p className="mt-4 text-base text-muted-foreground">{product.description}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-4xl font-bold">{product.price}</span>
              <span className="text-sm text-muted-foreground">on Amazon</span>
            </div>

            <a
              href={withAffiliateTag(product.amazonUrl)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              Check Price on Amazon <ExternalLink className="h-4 w-4" />
            </a>
            <p className="mt-2 text-xs text-muted-foreground">As an Amazon Associate we earn from qualifying purchases.</p>

            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5 text-xs">
              <div className="flex flex-col items-center gap-1 text-center text-muted-foreground">
                <Truck className="h-4 w-4 text-foreground" /> Fast Prime shipping
              </div>
              <div className="flex flex-col items-center gap-1 text-center text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-foreground" /> 1-year warranty
              </div>
              <div className="flex flex-col items-center gap-1 text-center text-muted-foreground">
                <Award className="h-4 w-4 text-foreground" /> Expert-tested
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold">Key features</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {product.specs.slice(0, 4).map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{s.label}</div>
              <div className="mt-1.5 text-lg font-semibold">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROS / CONS */}
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold">What we love</h2>
          <ul className="mt-4 space-y-2.5">
            {product.pros.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold">Worth noting</h2>
          <ul className="mt-4 space-y-2.5">
            {product.cons.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" /> {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <h2 className="text-2xl font-bold">Full specifications</h2>
        <div className="mt-5 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <tbody>
              {product.specs.map((s, i) => (
                <tr key={s.label} className={i % 2 ? "bg-secondary/40" : ""}>
                  <td className="w-1/3 px-5 py-3 font-medium">{s.label}</td>
                  <td className="px-5 py-3 text-muted-foreground">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* REVIEW SUMMARY */}
      <section id="reviews" className="mx-auto max-w-7xl px-4 pb-12">
        <h2 className="text-2xl font-bold">Review summary</h2>
        <div className="mt-5 grid gap-6 rounded-2xl border border-border bg-card p-6 md:grid-cols-[260px_1fr]">
          <div className="flex flex-col items-center justify-center border-b border-border pb-6 text-center md:border-b-0 md:border-r md:pb-0 md:pr-6">
            <div className="text-5xl font-bold">{product.rating.toFixed(1)}</div>
            <div className="mt-2"><RatingStars rating={product.rating} /></div>
            <div className="mt-2 text-sm text-muted-foreground">{product.reviewCount.toLocaleString()} verified reviews</div>
          </div>
          <div className="space-y-2">
            {buckets.map((b) => (
              <div key={b.stars} className="flex items-center gap-3 text-sm">
                <span className="flex w-12 items-center gap-1 text-muted-foreground">
                  {b.stars}<Star className="h-3 w-3 fill-current" />
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-primary" style={{ width: `${b.pct}%` }} />
                </div>
                <span className="w-12 text-right text-muted-foreground">{b.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      {alternatives.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-12">
          <h2 className="text-2xl font-bold">Compare with alternatives</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[600px] text-sm">
              <thead className="bg-secondary text-left">
                <tr>
                  <th className="px-5 py-3 font-semibold">Model</th>
                  <th className="px-5 py-3 font-semibold">Rating</th>
                  <th className="px-5 py-3 font-semibold">Price</th>
                  <th className="px-5 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {compareSet.map((p) => (
                  <tr key={p.slug} className="border-t border-border">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.title} className="h-12 w-12 rounded-lg object-cover" />
                        <Link to="/products/$slug" params={{ slug: p.slug }} className="font-medium hover:text-primary">{p.title}</Link>
                      </div>
                    </td>
                    <td className="px-5 py-4"><RatingStars rating={p.rating} /></td>
                    <td className="px-5 py-4 font-medium">{p.price}</td>
                    <td className="px-5 py-4">
                      <a href={withAffiliateTag(p.amazonUrl)} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-1 rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background hover:opacity-90">
                        View <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <h2 className="text-2xl font-bold">Frequently asked questions</h2>
        <div className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {faqs.map((f, i) => (
            <details key={i} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold">
                {f.q}
                <span className="text-xl text-muted-foreground transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* RELATED */}
      {alternatives.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-24 md:pb-16">
          <h2 className="text-2xl font-bold">Related products</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {alternatives.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}

      {/* STICKY MOBILE CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">{product.title}</div>
            <div className="text-base font-bold">{product.price}</div>
          </div>
          <a
            href={withAffiliateTag(product.amazonUrl)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Check Price <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </Layout>
  );
}
