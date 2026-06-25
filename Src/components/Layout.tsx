import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Search, Zap, Twitter, Youtube, Instagram, Github } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DisclosureBanner />
      <Header open={open} setOpen={setOpen} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function DisclosureBanner() {
  return (
    <div className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-2 text-center text-xs">
        As an Amazon Associate we earn from qualifying purchases.{" "}
        <Link to="/affiliate-disclosure" className="underline underline-offset-2 hover:opacity-80">
          Learn more
        </Link>
      </div>
    </div>
  );
}

function Header({ open, setOpen }: { open: boolean; setOpen: (b: boolean) => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 sm:gap-6">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline">Cool Gadgets Hub</span>
        </Link>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative mx-auto w-full max-w-md min-w-0"
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search gadgets…"
            className="h-10 w-full rounded-full border border-input bg-secondary pl-9 pr-4 text-sm outline-none ring-ring transition focus:bg-background focus:ring-2"
          />
        </form>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-foreground bg-secondary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-md border border-border md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-5 w-5" />
            </span>
            Cool Gadgets Hub
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Honest reviews and curated picks for the gadgets worth your money.
          </p>
        </div>
        <FooterCol title="Explore" links={[
          { to: "/", label: "Home" },
          { to: "/blog", label: "Blog" },
          { to: "/about", label: "About Us" },
          { to: "/contact", label: "Contact" },
        ]} />
        <FooterCol title="Legal" links={[
          { to: "/privacy-policy", label: "Privacy Policy" },
          { to: "/affiliate-disclosure", label: "Affiliate Disclosure" },
        ]} />
        <div>
          <h4 className="font-display text-sm font-semibold">Follow</h4>
          <div className="mt-3 flex gap-2">
            {[Twitter, Youtube, Instagram, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-9 w-9 place-items-center rounded-md border border-border bg-background transition hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Cool Gadgets Hub. All rights reserved.</p>
          <p>Made with care for gadget lovers everywhere.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="hover:text-foreground">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
