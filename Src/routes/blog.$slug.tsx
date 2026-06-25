import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs, breadcrumbJsonLd, type Crumb } from "@/components/Breadcrumbs";
import { getPost, posts, products, type Product, type Post } from "@/lib/data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    const title = post ? `${post.title} — Cool Gadgets Hub` : "Article — Cool Gadgets Hub";
    const desc = post?.excerpt ?? "Read the full article on Cool Gadgets Hub.";
    const isReview = post?.category === "Review";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        ...(post?.cover ? [{ property: "og:image", content: post.cover }, { name: "twitter:image", content: post.cover }] : []),
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: post ? [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": isReview ? "Review" : "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.cover,
            datePublished: post.date,
            author: { "@type": "Person", name: post.author.name },
            publisher: { "@type": "Organization", name: "Cool Gadgets Hub" },
            ...(isReview && post.relatedProducts?.[0]
              ? {
                  itemReviewed: (() => {
                    const p = products.find((x) => x.slug === post.relatedProducts![0]);
                    return p ? { "@type": "Product", name: p.title, image: p.image } : undefined;
                  })(),
                  reviewRating: { "@type": "Rating", ratingValue: 4.5, bestRating: 5 },
                }
              : {}),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbJsonLd([
            { label: "Home", to: "/" },
            { label: "Blog", to: "/blog" },
            { label: post.title, to: `/blog/${params.slug}` },
          ])),
        },
      ] : [],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-primary hover:underline">Back to blog</Link>
      </div>
    </Layout>
  ),
});

function PostPage() {
  const { post } = Route.useLoaderData() as { post: Post };
  
  const productRefs: Product[] = (post.relatedProducts ?? [])
    .map((s: string): Product | undefined => products.find((p) => p.slug === s))
    .filter((p: Product | undefined): p is Product => Boolean(p));
  const related: Post[] = posts.filter((p: Post) => p.slug !== post.slug).slice(0, 3);

  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 pt-6">
        <Breadcrumbs items={[
          { label: "Home", to: "/" },
          { label: "Blog", to: "/blog" },
          { label: post.title, to: `/blog/${post.slug}` },
        ]} />
      </div>
      <article className="mx-auto max-w-3xl px-4 pb-16 pt-6">
        <span className="inline-block rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">{post.category}</span>
        <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
        <div className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
          <img src={post.author.avatar} alt={post.author.name} loading="lazy" decoding="async" className="h-9 w-9 rounded-full object-cover" />
          <div>
            <p className="font-medium text-foreground">{post.author.name}</p>
            <p className="text-xs">{post.date} · {post.readTime}</p>
          </div>
        </div>

        <div className="mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-secondary">
          <img src={post.cover} alt={post.title} fetchPriority="high" decoding="async" className="h-full w-full object-cover" />
        </div>

        <div className="prose prose-neutral mt-10 max-w-none text-foreground">
          <p className="text-lg text-muted-foreground">{post.excerpt}</p>
          <p className="mt-6">{post.content}</p>
        </div>

        {productRefs.length > 0 && (
          <section className="mt-14 rounded-2xl border border-border bg-secondary/40 p-6">
            <h2 className="font-display text-lg font-semibold">Products mentioned</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {productRefs.map((p) => p && (
                <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="flex items-center gap-3 rounded-xl bg-background p-3 hover:bg-card">
                  <img src={p.image} alt={p.title} className="h-16 w-16 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <p className="truncate font-medium">{p.title}</p>
                    <p className="text-sm text-muted-foreground">{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-14 flex items-start gap-5 rounded-2xl border border-border p-6">
          <img src={post.author.avatar} alt={post.author.name} className="h-16 w-16 shrink-0 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="font-display text-base font-semibold">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">{post.author.role}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {post.author.name} has been covering consumer tech for nearly a decade, with a focus on hands-on long-term testing.
            </p>
          </div>
        </section>
      </article>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold">Related posts</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card hover:-translate-y-1 transition">
              <div className="aspect-[16/10] overflow-hidden bg-secondary">
                <img src={p.cover} alt={p.title} className="h-full w-full object-cover transition group-hover:scale-105" />
              </div>
              <div className="p-5">
                <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">{p.category}</span>
                <h3 className="mt-3 font-display text-base font-semibold group-hover:text-primary">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {productRefs.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20">
          <h2 className="text-2xl font-bold">Shop the gadgets</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productRefs.map((p) => p && <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}
    </Layout>
  );
}
