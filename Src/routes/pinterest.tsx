import { withAffiliateTag } from "@/lib/affiliate";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink, Star, Heart, Share2, ChevronDown, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { products } from "@/lib/data";

const FAQS = [
  { q: "Are these gadgets worth the price?", a: "Every product is hand-tested by our editors for at least two weeks. We only feature gadgets that justify their price tag through real performance, durability, and design." },
  { q: "Do you make money from these links?", a: "Yes — as an Amazon Associate we earn from qualifying purchases. Our reviews are never influenced by commissions; we recommend the same gear we use ourselves." },
  { q: "How often is this list updated?", a: "We refresh the picks weekly and re-test the top three contenders in every category each quarter to keep recommendations current." },
  { q: "Where do you ship from?", a: "We don't ship anything — clicking through takes you straight to Amazon, where you get Prime shipping, returns, and warranty on every item." },
  { q: "Can I save these to Pinterest?", a: "Absolutely. Hover any image on desktop or long-press on mobile to pin it. Each pin links straight back to the full review." },
];

const TESTIMONIALS = [
  { name: "Sasha M.", text: "Pinned the smart ring review and finally bought one — best sleep tracker I've ever owned.", rating: 5 },
  { name: "Daniel R.", text: "I trust their picks more than any YouTube channel. Three purchases, zero regrets.", rating: 5 },
  { name: "Priya K.", text: "The comparison tables saved me hours. Bought the projector and it's gorgeous.", rating: 5 },
];

export const Route = createFileRoute("/pinterest")({
  head: () => ({
    meta: [
      { title: "20 Coolest Gadgets to Pin in 2026 — Cool Gadgets Hub" },
      { name: "description", content: "The ultimate Pinterest-worthy gadget gift guide for 2026. Smart home, audio, wearables and more — all tested, all pinnable, all linked to Amazon." },
      { property: "og:title", content: "20 Coolest Gadgets to Pin in 2026" },
      { property: "og:description", content: "A visual gadget guide built for Pinterest. Tap, pin, shop." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/pinterest" },
      { property: "og:image", content: products[0]?.image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: products[0]?.image },
      // Pinterest-specific
      { name: "pinterest-rich-pin", content: "true" },
    ],
    links: [{ rel: "canonical", href: "/pinterest" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbJsonLd([
          { label: "Home", to: "/" },
          { label: "Pinterest Gadget Guide", to: "/pinterest" },
        ])),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: PinterestLanding,
});

function PinterestLanding() {
  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <Breadcrumbs items={[
          { label: "Home", to: "/" },
          { label: "Pinterest Gadget Guide", to: "/pinterest" },
        ]} />
      </div>

      <Hero />
      <SocialProofStrip />
      <PinGrid />
      <CTA />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </Layout>
  );
}

function Hero() {
  const hero = products[0];
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.96_0.06_20),transparent_60%)]" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.1fr_1fr] md:items-center md:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E60023]/10 px-3 py-1 text-xs font-semibold text-[#E60023]">
            <Sparkles className="h-3.5 w-3.5" /> Pinterest Gadget Guide 2026
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            20 Coolest Gadgets <span className="text-[#E60023]">Worth Pinning</span> This Year
          </h1>
          <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
            A visual, mobile-first guide to the gadgets blowing up on Pinterest. Tap any image to pin it, shop it, or read the full review.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#picks" className="inline-flex items-center gap-2 rounded-full bg-[#E60023] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E60023]/30 transition hover:-translate-y-0.5 hover:bg-[#cc001f]">
              See the 20 picks
            </a>
            <a href={withAffiliateTag(hero.amazonUrl)} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-6 py-3.5 text-sm font-bold transition hover:bg-foreground hover:text-background">
              Shop #1 pick <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-7 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-[var(--rating)] text-[var(--rating)]" />)}
            </div>
            <span><strong className="text-foreground">12,400+</strong> readers shopped this guide</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-[#E60023]/20 via-pink-200/40 to-transparent blur-2xl" />
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
            <div className="aspect-[2/3] overflow-hidden bg-secondary">
              <img src={hero.image} alt={hero.title} fetchPriority="high" decoding="async" width={600} height={900} className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-[#E60023] px-2.5 py-1 text-xs font-bold text-white">Top pick</span>
                <span className="text-xl font-bold">{hero.price}</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold">{hero.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{hero.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialProofStrip() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4">
        {[
          { stat: "12.4K+", label: "Pins shared" },
          { stat: "4.9★", label: "Reader rating" },
          { stat: "200+", label: "Gadgets tested" },
          { stat: "Free", label: "Prime shipping" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-bold sm:text-3xl">{s.stat}</p>
            <p className="text-xs text-muted-foreground sm:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PinGrid() {
  return (
    <section id="picks" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#E60023]/10 px-3 py-1 text-xs font-semibold text-[#E60023]">
          <Heart className="h-3.5 w-3.5 fill-[#E60023]" /> Most-pinned this month
        </span>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">The 20 coolest gadgets to pin</h2>
        <p className="mt-3 text-muted-foreground">Tall, vertical cards built for Pinterest. Tap any pin to read the full review or shop on Amazon.</p>
      </div>

      <div className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {[...products, ...products, ...products].slice(0, 20).map((p, i) => (
          <PinCard key={`${p.slug}-${i}`} product={p} tall={i % 3 === 0} />
        ))}
      </div>
    </section>
  );
}

function PinCard({ product, tall }: { product: typeof products[number]; tall?: boolean }) {
  return (
    <article className="group relative break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-xl">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className={`block overflow-hidden bg-secondary ${tall ? "aspect-[2/3]" : "aspect-[3/4]"}`}
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition group-hover:opacity-100">
        <button aria-label="Save to Pinterest" className="grid h-9 w-9 place-items-center rounded-full bg-[#E60023] text-white shadow-lg hover:bg-[#cc001f]">
          <Heart className="h-4 w-4 fill-white" />
        </button>
        <button aria-label="Share" className="grid h-9 w-9 place-items-center rounded-full bg-white text-foreground shadow-lg hover:bg-secondary">
          <Share2 className="h-4 w-4" />
        </button>
      </div>
      <span className="absolute left-3 top-3 rounded-full bg-background/95 px-2.5 py-1 text-xs font-bold backdrop-blur">
        {product.price}
      </span>
      <div className="p-4">
        <h3 className="font-display text-sm font-bold leading-snug">
          <Link to="/products/$slug" params={{ slug: product.slug }} className="hover:text-[#E60023]">
            {product.title}
          </Link>
        </h3>
        <a
          href={withAffiliateTag(product.amazonUrl)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#E60023] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#cc001f]"
        >
          Shop on Amazon <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#E60023] to-[#ff4d6d] p-8 text-white sm:p-12">
        <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">📌 Save this guide to your gadget board</h2>
            <p className="mt-2 text-white/90">Get every weekly update delivered straight to your inbox — plus exclusive deals our readers see first.</p>
          </div>
          <a href="#picks" className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#E60023] shadow-lg transition hover:-translate-y-0.5">
            Browse the picks
          </a>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">What 12,400+ pinners say</h2>
        <p className="mt-3 text-muted-foreground">Real readers, real purchases, real reviews.</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-[var(--rating)] text-[var(--rating)]" />)}
            </div>
            <blockquote className="mt-3 text-sm leading-relaxed">"{t.text}"</blockquote>
            <figcaption className="mt-4 text-xs font-semibold text-muted-foreground">— {t.name}</figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[var(--success)]" /> Independent reviews</span>
        <span className="inline-flex items-center gap-1.5"><Truck className="h-4 w-4 text-[var(--success)]" /> Prime shipping</span>
        <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-[var(--rating)] text-[var(--rating)]" /> 4.9 average rating</span>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="text-center text-3xl font-bold sm:text-4xl">Frequently asked questions</h2>
      <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-display text-sm font-semibold sm:text-base">{f.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && <div className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="rounded-3xl border border-border bg-foreground p-10 text-center text-background sm:p-16">
        <h2 className="text-3xl font-bold sm:text-4xl">Ready to upgrade your tech?</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-background/80 sm:text-base">
          Start with our #1 most-pinned gadget of the year — over 2,100 5-star reviews on Amazon.
        </p>
        <a
          href={withAffiliateTag(products[0].amazonUrl)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#E60023] px-8 py-4 text-base font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-[#cc001f]"
        >
          Shop the #1 pick <ExternalLink className="h-4 w-4" />
        </a>
        <p className="mt-4 text-xs text-background/60">As an Amazon Associate we earn from qualifying purchases.</p>
      </div>
    </section>
  );
}
