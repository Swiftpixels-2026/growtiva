import { useEffect, useState } from "react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { LETTERS } from "@/data/community";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

const Letters = () => {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", city: "", subject: "", body: "" });

  useEffect(() => {
    document.title = "Reader Letters — Growtiva Africa";
    window.scrollTo(0, 0);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) || !form.body.trim()) {
      toast.error("Please add your name, email, and a letter.");
      return;
    }
    toast.success("Letter received. The editors read every submission.");
    setForm({ name: "", email: "", city: "", subject: "", body: "" });
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />
      <section className="pt-28 sm:pt-32 md:pt-40 pb-12 md:pb-20 border-b border-foreground/10">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-10">
          <span className="eyebrow">Correspondence</span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl mt-4 leading-[1.02]">{t("letters.title")}</h1>
          <p className="mt-6 max-w-xl text-foreground/75 text-base sm:text-lg">{t("letters.dek")}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-10 grid gap-10">
          {LETTERS.map((l) => (
            <article key={l.slug} className="border-l-2 border-accent pl-6">
              <div className="text-[11px] tracking-[0.22em] uppercase text-foreground/55">{l.date} · {l.city}, {l.country}</div>
              <h2 className="font-serif text-2xl md:text-3xl mt-2">{l.subject}</h2>
              <p className="mt-4 text-foreground/85 leading-relaxed font-serif text-lg">"{l.body}"</p>
              <div className="mt-3 text-sm text-foreground/60">— {l.from}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/40 border-t border-foreground/10">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-10">
          <span className="eyebrow">Write to us</span>
          <h2 className="font-serif text-3xl md:text-5xl mt-4">{t("letters.submit")}</h2>
          <p className="mt-4 text-foreground/70 max-w-xl">A response, a dispatch from your city, a quiet provocation. We read everything.</p>
          <form onSubmit={submit} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            <input required maxLength={120} placeholder="Your name *" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40" />
            <input required type="email" maxLength={255} placeholder="Email *" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40" />
            <input maxLength={120} placeholder="City, Country" value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40" />
            <input maxLength={140} placeholder="Subject" value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40" />
            <textarea required maxLength={2000} rows={6} placeholder="Your letter *" value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              className="md:col-span-2 bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40 resize-none" />
            <button type="submit"
              className="md:col-span-2 mt-2 inline-flex items-center justify-center bg-foreground text-background px-8 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors w-full sm:w-fit">
              Send letter →
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Letters;
