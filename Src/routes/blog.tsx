import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { posts } from "@/lib/data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Cool Gadgets Hub" },
      { name: "description", content: "Reviews, comparisons, and top 10 lists for the best tech gadgets." },
      { property: "og:title", content: "Blog — Cool Gadgets Hub" },
      { property: "og:description", content: "Reviews, comparisons, and top 10 lists." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogLayout,
});

function BlogLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/blog/$slug");
  if (isChild) return <Outlet />;

  return (
    <Layout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <p className="text-sm font-medium text-primary">Blog</p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Reviews, comparisons, and buying guides</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Long-form coverage from our editors. No fluff, just hands-on experience with the gadgets we cover.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-secondary">
                <img src={p.cover} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">{p.category}</span>
                <h2 className="mt-3 font-display text-lg font-semibold leading-snug group-hover:text-primary">{p.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <img src={p.author.avatar} alt={p.author.name} className="h-6 w-6 rounded-full object-cover" />
                  {p.author.name} · {p.date} · {p.readTime}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
