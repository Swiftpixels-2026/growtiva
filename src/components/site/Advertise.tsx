import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().min(1, "Company is required").max(120),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FormState = { name: string; email: string; company: string; message: string };

const empty: FormState = { name: "", email: "", company: "", message: "" };

const Advertise = () => {
  const [form, setForm] = useState<FormState>(empty);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState<FormState | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    setSending(true);
    // Simulated submission — replace with real endpoint when backend is wired.
    setTimeout(() => {
      setSending(false);
      setSubmitted(form);
      toast.success("Media kit request received.");
    }, 700);
  };

  const reset = () => {
    setSubmitted(null);
    setForm(empty);
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

          <div className="col-span-12 lg:col-span-7 lg:pt-4">
            {submitted ? (
              <div className="border border-foreground/15 p-10 md:p-14 bg-secondary/30 animate-fade-up">
                <span className="eyebrow text-accent">Request Received</span>
                <h3 className="font-serif text-3xl md:text-4xl mt-5 leading-tight">
                  Thank you, {submitted.name.split(" ")[0]}.
                </h3>
                <p className="mt-6 text-foreground/75 max-w-lg leading-relaxed">
                  We've received your media kit request for{" "}
                  <span className="text-foreground">{submitted.company}</span> and will be
                  in touch at{" "}
                  <span className="text-foreground">{submitted.email}</span> within 48
                  hours.
                </p>

                <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
                  <div>
                    <dt className="eyebrow">Name</dt>
                    <dd className="mt-2 text-foreground">{submitted.name}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Company</dt>
                    <dd className="mt-2 text-foreground">{submitted.company}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="eyebrow">Email</dt>
                    <dd className="mt-2 text-foreground">{submitted.email}</dd>
                  </div>
                  {submitted.message && (
                    <div className="sm:col-span-2">
                      <dt className="eyebrow">Notes</dt>
                      <dd className="mt-2 text-foreground/80 whitespace-pre-wrap">
                        {submitted.message}
                      </dd>
                    </div>
                  )}
                </dl>

                <button
                  type="button"
                  onClick={reset}
                  className="mt-12 inline-flex items-center gap-3 text-[12px] tracking-[0.22em] uppercase link-underline"
                >
                  Submit another request →
                </button>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advertise;
