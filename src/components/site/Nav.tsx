import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Social from "./Social";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Issues", href: "/#issues", type: "anchor" as const },
  { label: "Categories", href: "/#categories", type: "anchor" as const },
  { label: "Directory", href: "/directory", type: "route" as const },
  { label: "Community", href: "/#community", type: "anchor" as const },
  { label: "Advertise", href: "/#advertise", type: "anchor" as const },
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderLink = (l: typeof links[number], onClick?: () => void, className?: string) =>
    l.type === "route" ? (
      <Link key={l.href} to={l.href} onClick={onClick} className={className}>
        {l.label}
      </Link>
    ) : (
      <a key={l.href} href={l.href} onClick={onClick} className={className}>
        {l.label}
      </a>
    );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-foreground/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="font-serif text-lg md:text-xl tracking-tight">
          Growtiva <span className="italic text-accent">Africa</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => renderLink(l, undefined, "text-[13px] tracking-wide link-underline"))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <Social className="hidden lg:flex text-foreground/70" size={16} />
          <ThemeToggle />
          <Link
            to="/join"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase border border-foreground px-5 py-2.5 hover:bg-foreground hover:text-background transition-colors"
          >
            Inner Circle
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Menu"
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-px w-6 bg-foreground transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-foreground transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>

      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-foreground/10 px-4 sm:px-6 py-8 flex flex-col gap-6">
          {links.map((l) => renderLink(l, () => setOpen(false), "font-serif text-2xl"))}
          <Link
            to="/join"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center text-[12px] tracking-[0.2em] uppercase border border-foreground px-5 py-3"
          >
            Join the Inner Circle
          </Link>
          <Social className="mt-4 text-foreground" />
        </div>
      )}
    </header>
  );
};

export default Nav;
