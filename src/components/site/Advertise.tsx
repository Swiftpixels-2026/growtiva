import { useState } from "react";
import { toast } from "sonner";

const Advertise = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.company.trim()) {
      toast.error("Please complete the required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      toast.error("Please enter a valid email.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      toast.success("Media kit request received. We'll be in touch within 48 hours.");
      setForm({ name: "", email: "", company: "", message: "" });
      setSending(false);
    }, 600);
  };

  return (
    <section id="advertise" className="py-32 md:py-48 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-10 md:gap-16">
          <div className="col-span-12 lg:col-span-5">
            <span className="eyebrow">Partnerships</span>
            <h2 className="font-serif text-4xl md:text-6xl mt-6 leading-[1.02]">
              Advertise with <span className="italic text-accent">Growtiva</span>
            </h2>
            <p className="mt-8 text-base text-foreground/80 leading-relaxed max-w-md">
              Partner with Growtiva Africa to reach a focused audience of ambitious,
              culturally aware Africans.
            </p>
            <p className="mt-5 text-base text-foreground/75 leading-relaxed max-w-md">
              Our digital editions and limited print runs offer brands a refined way to
              show up—alongside ideas, stories, and people that matter.
            </p>
            <p className="mt-8 italic text-foreground/60 max-w-md">
              Selective partnerships. Thoughtful placement. Long-term visibility.
            </p>
          </div>

          <form onSubmit={submit} className="col-span-12 lg:col-span-7 lg:pt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              required
              maxLength={120}
              placeholder="Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none placeholder:text-foreground/40 transition-colors"
            />
            <input
              required
              type="email"
              maxLength={255}
              placeholder="Work email *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none placeholder:text-foreground/40 transition-colors"
            />
            <input
              required
              maxLength={120}
              placeholder="Company *"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="md:col-span-2 bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none placeholder:text-foreground/40 transition-colors"
            />
            <textarea
              maxLength={1000}
              rows={3}
              placeholder="What kind of partnership are you exploring?"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="md:col-span-2 bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none placeholder:text-foreground/40 resize-none transition-colors"
            />
            <button
              type="submit"
              disabled={sending}
              className="md:col-span-2 mt-6 inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50 w-full sm:w-fit"
            >
              {sending ? "Sending…" : "Request Media Kit →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Advertise;
