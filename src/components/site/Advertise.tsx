import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ChevronDown } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().min(1, "Company is required").max(120),
  adType: z.string().min(1, "Please select what you want to advertise"),
  budget: z.string().min(1, "Please select a budget"),
  pageSize: z.string().min(1, "Please select a page size"),
  hardCopy: z.string().min(1, "Please choose hard copy preference"),
  quantity: z.coerce.number().int().min(0).max(100000),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FormState = {
  name: string;
  email: string;
  company: string;
  adType: string;
  budget: string;
  pageSize: string;
  hardCopy: string;
  quantity: string;
  message: string;
};

const empty: FormState = {
  name: "", email: "", company: "",
  adType: "", budget: "", pageSize: "", hardCopy: "No", quantity: "0",
  message: "",
};

const inputClass = "bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40 transition-colors";

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
    <section id="advertise" className="py-20 sm:py-28 md:py-40 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8 md:gap-16">
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
            <div className="mt-10 grid grid-cols-2 gap-6 max-w-md">
              <div>
                <span className="eyebrow">Half Page</span>
                <div className="font-serif text-2xl mt-2">₦75,000</div>
                <div className="text-sm text-foreground/60 mt-1">or $80</div>
              </div>
              <div>
                <span className="eyebrow">Full Page</span>
                <div className="font-serif text-2xl mt-2">₦150,000</div>
                <div className="text-sm text-foreground/60 mt-1">or $120</div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:pt-4">
            {submitted ? (
              <div className="border border-foreground/15 p-8 sm:p-10 md:p-14 bg-secondary/30 animate-fade-up">
                <span className="eyebrow text-accent">Request Received</span>
                <h3 className="font-serif text-3xl md:text-4xl mt-5 leading-tight">
                  Thank you, {submitted.name.split(" ")[0]}.
                </h3>
                <p className="mt-6 text-foreground/75 max-w-lg leading-relaxed">
                  We've received your media kit request for{" "}
                  <span className="text-foreground">{submitted.company}</span> and will be
                  in touch at <span className="text-foreground">{submitted.email}</span> within 48 hours.
                </p>

                <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
                  <div><dt className="eyebrow">Type</dt><dd className="mt-2">{submitted.adType}</dd></div>
                  <div><dt className="eyebrow">Budget</dt><dd className="mt-2">{submitted.budget}</dd></div>
                  <div><dt className="eyebrow">Page Size</dt><dd className="mt-2">{submitted.pageSize}</dd></div>
                  <div><dt className="eyebrow">Hard Copies</dt><dd className="mt-2">{submitted.hardCopy} {submitted.hardCopy === "Yes" ? `· ${submitted.quantity} copies` : ""}</dd></div>
                  {submitted.message && (
                    <div className="sm:col-span-2">
                      <dt className="eyebrow">Notes</dt>
                      <dd className="mt-2 text-foreground/80 whitespace-pre-wrap">{submitted.message}</dd>
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
              <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input required maxLength={120} placeholder="Name *" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                <input required type="email" maxLength={255} placeholder="Work email *" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                <input required maxLength={120} placeholder="Company *" value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className={`md:col-span-2 ${inputClass}`} />

                <label className="block">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/60">What do you want to advertise? *</span>
                  <select required value={form.adType}
                    onChange={(e) => setForm({ ...form, adType: e.target.value })}
                    className={`${inputClass} w-full mt-1`}>
                    <option value="">Select...</option>
                    <option>Job</option>
                    <option>Service</option>
                    <option>Event</option>
                    <option>Business</option>
                    <option>Product Launch</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/60">Budget *</span>
                  <select required value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className={`${inputClass} w-full mt-1`}>
                    <option value="">Select...</option>
                    <option>Under ₦75,000</option>
                    <option>₦75,000 – ₦150,000</option>
                    <option>₦150,000 – ₦500,000</option>
                    <option>₦500,000 – ₦1,000,000</option>
                    <option>Above ₦1,000,000</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/60">Page Size *</span>
                  <select required value={form.pageSize}
                    onChange={(e) => setForm({ ...form, pageSize: e.target.value })}
                    className={`${inputClass} w-full mt-1`}>
                    <option value="">Select...</option>
                    <option>Half Page (₦75,000 / $80)</option>
                    <option>Full Page (₦150,000 / $120)</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/60">Hard copy print? *</span>
                  <select required value={form.hardCopy}
                    onChange={(e) => setForm({ ...form, hardCopy: e.target.value })}
                    className={`${inputClass} w-full mt-1`}>
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </label>

                {form.hardCopy === "Yes" && (
                  <label className="block md:col-span-2">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/60">Number of hard copies</span>
                    <input
                      type="number"
                      min={0}
                      max={100000}
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                      className={`${inputClass} w-full mt-1`}
                      placeholder="e.g. 50"
                    />
                  </label>
                )}

                <textarea maxLength={1000} rows={3} placeholder="Anything else we should know?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`md:col-span-2 ${inputClass} resize-none`} />

                <button type="submit" disabled={sending}
                  className="md:col-span-2 mt-4 inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50 w-full sm:w-fit">
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
