import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Cool Gadgets Hub" },
      { name: "description", content: "How Cool Gadgets Hub collects, uses, and protects your data." },
      { property: "og:title", content: "Privacy Policy — Cool Gadgets Hub" },
      { property: "og:description", content: "How we collect, use, and protect your data." },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-20">
        <p className="text-sm font-medium text-primary">Legal</p>
        <h1 className="mt-2 text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: March 2026</p>

        <div className="prose prose-neutral mt-10 max-w-none space-y-6 text-foreground">
          <Section title="Information we collect">
            We collect information you submit through forms (such as email addresses for our newsletter and contact form) and standard analytics data including IP address, browser type, pages visited, and referring URLs.
          </Section>
          <Section title="How we use information">
            We use your information to send you content you've requested, respond to your questions, improve the site, and analyze aggregate trends. We do not sell your personal data.
          </Section>
          <Section title="Cookies">
            We use cookies for analytics and to remember preferences. You can disable cookies in your browser settings; some features may stop working.
          </Section>
          <Section title="Third-party services">
            We use third-party services for analytics, email delivery, and affiliate tracking. Each has its own privacy policy.
          </Section>
          <Section title="Your rights">
            You can request access to, correction of, or deletion of your personal data at any time by emailing privacy@coolgadgetshub.com.
          </Section>
          <Section title="Contact">
            Questions about this policy? Email us at privacy@coolgadgetshub.com.
          </Section>
        </div>
      </article>
    </Layout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-muted-foreground">{children}</p>
    </section>
  );
}
