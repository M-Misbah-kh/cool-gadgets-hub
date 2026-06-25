import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/affiliate-disclosure")({
  head: () => ({
    meta: [
      { title: "Affiliate Disclosure — Cool Gadgets Hub" },
      { name: "description", content: "How affiliate links work on Cool Gadgets Hub and our editorial independence." },
      { property: "og:title", content: "Affiliate Disclosure — Cool Gadgets Hub" },
      { property: "og:description", content: "How affiliate links work on our site." },
      { property: "og:url", content: "/affiliate-disclosure" },
    ],
    links: [{ rel: "canonical", href: "/affiliate-disclosure" }],
  }),
  component: Disclosure,
});

function Disclosure() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-20">
        <p className="text-sm font-medium text-primary">Legal</p>
        <h1 className="mt-2 text-4xl font-bold">Affiliate Disclosure</h1>
        <div className="mt-8 space-y-5 text-muted-foreground">
          <p>
            Cool Gadgets Hub is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to amazon.com.
          </p>
          <p>
            We also participate in select affiliate programs with other retailers. When you click a link to a retailer and make a purchase, we may earn a small commission at no additional cost to you.
          </p>
          <p>
            Editorial coverage is never influenced by these relationships. We recommend products based on our own testing and research, and we routinely include products from retailers we have no affiliate relationship with when they're the best pick.
          </p>
          <p>
            If you have any questions about our affiliate practices, email us at hello@coolgadgetshub.com.
          </p>
        </div>
      </article>
    </Layout>
  );
}
