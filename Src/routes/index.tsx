import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Truck } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Newsletter } from "@/components/Newsletter";
import { categories, products } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cool Gadgets Hub — Discover the Coolest Gadgets Online" },
      { name: "description", content: "Curated reviews and top picks for the latest tech gadgets, smart home devices, wearables, and accessories." },
      { property: "og:title", content: "Cool Gadgets Hub — Discover the Coolest Gadgets Online" },
      { property: "og:description", content: "Curated reviews and top picks for the latest tech gadgets." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const [activeCat, setActiveCat] = useState<string>("all");
  const featured = products.filter((p) => p.featured);
  const trending = products.filter((p) => p.trending);
  const filtered = useMemo(
    () => (activeCat === "all" ? products : products.filter((p) => p.category === activeCat)),
    [activeCat]
  );

  return (
    <Layout>
      <Hero />
      <Trust />

      <Section
        eyebrow={<><Sparkles className="h-3.5 w-3.5" /> Editor's picks</>}
        title="Featured gadgets"
        subtitle="Hand-tested by our team and recommended without reservation."
      >
        <Grid>{featured.map((p) => <ProductCard key={p.slug} product={p} />)}</Grid>
      </Section>

      <Section
        eyebrow={<><TrendingUp className="h-3.5 w-3.5" /> Trending now</>}
        title="What people are buying"
        subtitle="The gadgets flying off the shelves this week."
      >
        <Grid>{trending.map((p) => <ProductCard key={p.slug} product={p} />)}</Grid>
      </Section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium text-primary">Browse</p>
            <h2 className="mt-1 text-3xl font-bold sm:text-4xl">Shop by category</h2>
          </div>
          <Link to="/blog" className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex sm:items-center sm:gap-1">
            View buying guides <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setActiveCat(c.slug)}
              className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition ${
                activeCat === c.slug
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-foreground/20"
              }`}
            >
              <span className="text-2xl">{c.icon}</span>
              <span className="font-display text-sm font-semibold">{c.name}</span>
              <span className="text-xs text-muted-foreground">{c.count} products</span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <Chip active={activeCat === "all"} onClick={() => setActiveCat("all")}>All</Chip>
          {categories.map((c) => (
            <Chip key={c.slug} active={activeCat === c.slug} onClick={() => setActiveCat(c.slug)}>
              {c.name}
            </Chip>
          ))}
        </div>

        <Grid className="mt-8">
          {filtered.map((p) => <ProductCard key={p.slug} product={p} />)}
        </Grid>
      </section>

      <Newsletter />
    </Layout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.95_0.05_260),transparent_60%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
            New picks every week
          </div>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Discover the <span className="text-primary">Coolest Gadgets</span> Online
          </h1>
          <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
            Independent reviews, head-to-head comparisons, and curated buying guides for the tech that actually deserves your money.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#featured" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90">
              Shop top picks <ArrowRight className="h-4 w-4" />
            </a>
            <Link to="/blog" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold hover:bg-secondary">
              Read the blog
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-accent/30 to-transparent blur-2xl" />
          <div className="grid grid-cols-2 gap-3">
            {products.slice(0, 4).map((p, i) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className={`overflow-hidden rounded-2xl border border-border bg-card ${i % 2 ? "translate-y-6" : ""}`}
              >
                <div className="aspect-square overflow-hidden bg-secondary">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="truncate text-xs font-semibold">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    { icon: ShieldCheck, title: "Independent reviews", text: "We never accept payment for positive coverage." },
    { icon: TrendingUp, title: "Tested & ranked", text: "Hands-on testing for every gadget we recommend." },
    { icon: Truck, title: "Best price links", text: "Always pointed at the best current deal." },
  ];
  return (
    <section id="featured" className="border-b border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-3">
        {items.map((i) => (
          <div key={i.title} className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-background text-primary">
              <i.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-sm font-semibold">{i.title}</p>
              <p className="text-sm text-muted-foreground">{i.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Section({
  eyebrow, title, subtitle, children,
}: { eyebrow: React.ReactNode; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="max-w-2xl">
        <p className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Grid({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}>{children}</div>;
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
        active ? "border-foreground bg-foreground text-background" : "border-border bg-background hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  );
}
