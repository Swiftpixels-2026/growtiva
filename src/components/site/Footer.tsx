import { Link } from "react-router-dom";
import Social from "./Social";

const Footer = () => {
  return (
    <footer className="border-t border-foreground/15 py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <Link to="/" className="font-serif text-2xl">
              Growtiva <span className="italic text-accent">Africa</span>
            </Link>
            <p className="mt-5 max-w-sm text-foreground/70 text-sm leading-relaxed">
              A digital magazine for Africa's next generation of builders.
            </p>
            <Social className="mt-8 text-foreground/70" />
          </div>

          <nav className="col-span-6 md:col-span-2 flex flex-col gap-3 text-sm">
            <span className="eyebrow mb-2">Read</span>
            <a href="/#issues" className="link-underline w-fit">Issues</a>
            <a href="/#categories" className="link-underline w-fit">Categories</a>
            <a href="/#latest" className="link-underline w-fit">Latest</a>
          </nav>

          <nav className="col-span-6 md:col-span-2 flex flex-col gap-3 text-sm">
            <span className="eyebrow mb-2">Discover</span>
            <Link to="/directory" className="link-underline w-fit">Directory</Link>
            <Link to="/events" className="link-underline w-fit">Events</Link>
            <Link to="/letters" className="link-underline w-fit">Letters</Link>
            <a href="/#advertise" className="link-underline w-fit">Advertise</a>
          </nav>

          <nav className="col-span-12 md:col-span-3 flex flex-col gap-3 text-sm">
            <span className="eyebrow mb-2">Africa</span>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                ["nigeria", "Nigeria"],
                ["kenya", "Kenya"],
                ["south-africa", "South Africa"],
                ["ghana", "Ghana"],
                ["morocco", "Morocco"],
                ["egypt", "Egypt"],
                ["senegal", "Senegal"],
              ].map(([slug, name]) => (
                <Link key={slug} to={`/africa/${slug}`} className="link-underline w-fit">{name}</Link>
              ))}
            </div>
            <a href="mailto:hello@growtivaafrica.com" className="link-underline w-fit break-all mt-2">hello@growtivaafrica.com</a>
          </nav>
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground tracking-wide">
          <span>© {new Date().getFullYear()} Growtiva Africa. All rights reserved.</span>
          <span className="tracking-[0.22em] uppercase">Made for the next generation</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
