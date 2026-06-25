import { useState } from "react";
import { Mail, Check } from "lucide-react";

export function Newsletter() {
  const [sent, setSent] = useState(false);
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-14 text-background sm:px-12">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative grid items-center gap-8 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-background/20 px-3 py-1 text-xs">
              <Mail className="h-3.5 w-3.5" /> Weekly drop
            </div>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Get the week's coolest gadgets in your inbox.
            </h2>
            <p className="mt-3 max-w-md text-sm text-background/70">
              Curated picks, honest reviews, and exclusive deal alerts. No spam — unsubscribe anytime.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              required
              type="email"
              placeholder="you@example.com"
              className="h-12 min-w-0 flex-1 rounded-full bg-background/10 px-5 text-sm text-background placeholder:text-background/50 outline-none ring-background/40 focus:ring-2"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              {sent ? (<><Check className="h-4 w-4" /> Subscribed</>) : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
