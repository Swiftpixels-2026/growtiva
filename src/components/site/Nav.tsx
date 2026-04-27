import { useEffect, useState } from "react";

const links = [
  { label: "Issues", href: "#issues" },
  { label: "Categories", href: "#categories" },
  { label: "Community", href: "#community" },
  { label: "Advertise", href: "#advertise" },
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-foreground/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="font-serif text-lg md:text-xl tracking-tight">
          Growtiva <span className="italic text-accent">Africa</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] tracking-wide link-underline">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#newsletter"
          className="hidden md:inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase border border-foreground px-5 py-2.5 hover:bg-foreground hover:text-background transition-colors"
        >
          Join the Inner Circle
        </a>

        <button
          aria-label="Menu"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-px w-6 bg-foreground transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-foreground transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-foreground/10 px-6 py-8 flex flex-col gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-serif text-2xl">
              {l.label}
            </a>
          ))}
          <a
            href="#newsletter"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center text-[12px] tracking-[0.2em] uppercase border border-foreground px-5 py-3"
          >
            Join the Inner Circle
          </a>
        </div>
      )}
    </header>
  );
};

export default Nav;
