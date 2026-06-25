import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Cool Gadgets Hub" },
      { name: "description", content: "Meet the team behind Cool Gadgets Hub and learn how we test and recommend gadgets." },
      { property: "og:title", content: "About Us — Cool Gadgets Hub" },
      { property: "og:description", content: "Meet the team behind Cool Gadgets Hub." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-20">
        <p className="text-sm font-medium text-primary">About Us</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">We obsess over gadgets so you don't have to.</h1>
        <div className="prose prose-neutral mt-8 max-w-none text-foreground">
          <p className="text-lg text-muted-foreground">
            Cool Gadgets Hub started in 2024 with a simple idea: gadget reviews should be honest, hands-on, and easy to read. Today we test hundreds of products a year across audio, smart home, wearables, laptops, and accessories.
          </p>
          <h2 className="mt-10 text-2xl font-bold">How we test</h2>
          <p className="text-muted-foreground">
            Every gadget we recommend is used by a member of our team for at least two weeks of normal daily life. We buy most of our review units at retail so our coverage stays independent.
          </p>
          <h2 className="mt-10 text-2xl font-bold">How we make money</h2>
          <p className="text-muted-foreground">
            When you buy through our links we earn a small commission at no extra cost to you. This funds our testing and keeps the site ad-light. Editorial decisions are always made independently of any affiliate relationship.
          </p>
        </div>
      </article>
    </Layout>
  );
}
