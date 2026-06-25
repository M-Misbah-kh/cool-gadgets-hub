import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageSquare, Send, Check } from "lucide-react";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Cool Gadgets Hub" },
      { name: "description", content: "Get in touch with the Cool Gadgets Hub team for tips, partnerships, and corrections." },
      { property: "og:title", content: "Contact — Cool Gadgets Hub" },
      { property: "og:description", content: "Get in touch with our team." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-primary">Contact</p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Let's talk gadgets.</h1>
          <p className="mt-4 text-muted-foreground">
            Have a tip, a question, or want us to review your product? Drop us a line and we'll get back within two business days.
          </p>
          <div className="mt-8 space-y-4">
            <Item icon={Mail} title="Email" text="hello@coolgadgetshub.com" />
            <Item icon={MessageSquare} title="Press & partnerships" text="press@coolgadgetshub.com" />
          </div>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="space-y-4 rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          <Field label="Name"><input required className="input" placeholder="Your name" /></Field>
          <Field label="Email"><input required type="email" className="input" placeholder="you@example.com" /></Field>
          <Field label="Subject"><input required className="input" placeholder="What's this about?" /></Field>
          <Field label="Message">
            <textarea required rows={5} className="input resize-none" placeholder="Tell us a bit more…" />
          </Field>
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
            {sent ? <><Check className="h-4 w-4" /> Message sent</> : <>Send message <Send className="h-4 w-4" /></>}
          </button>
          <style>{`.input{display:block;width:100%;height:2.75rem;border:1px solid var(--input);border-radius:0.5rem;padding:0 0.875rem;background:var(--background);font-size:.875rem;outline:none}.input:focus{box-shadow:0 0 0 2px var(--ring)}textarea.input{height:auto;padding:.75rem .875rem}`}</style>
        </form>
      </section>
    </Layout>
  );
}

function Item({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="font-display text-sm font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}
