import { useState } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "growtiva.subscribers";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) || trimmed.length > 255) {
      toast.error("Please enter a valid email.");
      return;
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      if (!list.includes(trimmed)) list.push(trimmed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      /* ignore storage errors */
    }
    setSubmittedEmail(trimmed);
    setEmail("");
  };

  const unsubscribe = () => {
    if (!submittedEmail) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      const next = list.filter((e) => e !== submittedEmail);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    toast.success("You've been unsubscribed.");
    setSubmittedEmail(null);
  };

  return (
    <section id="newsletter" className="py-20 sm:py-28 md:py-40 bg-[#0b0b0c] text-white">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-10 text-center">
        {submittedEmail ? (
          <div className="animate-fade-up">
            <span className="text-[10px] tracking-[0.3em] uppercase text-accent">You're In</span>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mt-6 leading-[1.02]">
              Welcome to the <span className="italic text-accent">Inner Circle</span>
            </h2>
            <p className="mt-8 text-white/70 max-w-xl mx-auto">
              We've added <span className="text-white">{submittedEmail}</span> to the list.
              The next edition will land in your inbox first.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[12px] tracking-[0.22em] uppercase">
              <button
                onClick={unsubscribe}
                className="border border-white/40 px-6 py-3 hover:bg-white hover:text-[#0b0b0c] transition-colors"
              >
                Unsubscribe
              </button>
              <button
                onClick={() => setSubmittedEmail(null)}
                className="hover:text-accent transition-colors"
              >
                Manage Preferences →
              </button>
            </div>
          </div>
        ) : (
          <>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/60">Newsletter</span>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mt-6 leading-[1.02]">
              Get each issue <span className="italic text-accent">first</span>
            </h2>
            <p className="mt-8 text-white/70 max-w-xl mx-auto">
              Be the first to access new editions, curated stories, and opportunities.
              No noise. Just signal.
            </p>

            <form onSubmit={submit} className="mt-14 max-w-xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-0 border-b border-white/30 pb-2">
              <input
                type="email"
                required
                maxLength={255}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-white placeholder:text-white/40 px-2 py-3 text-base outline-none"
              />
              <button
                type="submit"
                className="text-[12px] tracking-[0.22em] uppercase px-6 py-3 hover:text-accent transition-colors"
              >
                Subscribe →
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
