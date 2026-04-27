import { useState } from "react";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) || trimmed.length > 255) {
      toast.error("Please enter a valid email.");
      return;
    }
    toast.success("You're on the list. Look out for the next edition.");
    setEmail("");
  };

  return (
    <section id="newsletter" className="py-32 md:py-48 bg-foreground text-background">
      <div className="max-w-[900px] mx-auto px-6 md:px-10 text-center">
        <span className="eyebrow text-background/60">Newsletter</span>
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mt-6 leading-[1.02]">
          Get each issue <span className="italic text-accent">first</span>
        </h2>
        <p className="mt-8 text-background/70 max-w-xl mx-auto">
          Be the first to access new editions, curated stories, and opportunities.
          No noise. Just signal.
        </p>

        <form onSubmit={submit} className="mt-14 max-w-xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-0 border-b border-background/30 pb-2">
          <input
            type="email"
            required
            maxLength={255}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-transparent text-background placeholder:text-background/40 px-2 py-3 text-base outline-none"
          />
          <button
            type="submit"
            className="text-[12px] tracking-[0.22em] uppercase px-6 py-3 hover:text-accent transition-colors"
          >
            Subscribe →
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
