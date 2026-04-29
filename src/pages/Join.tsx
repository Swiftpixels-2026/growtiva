import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import collage from "@/assets/community-collage-2.jpg";

const Join = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "", city: "", why: "" });

  useEffect(() => {
    document.title = "Join the Inner Circle — Growtiva Africa";
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />
      <section className="pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-12 gap-10 md:gap-16">
          <div className="col-span-12 lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={collage} alt="Inner Circle members" className="w-full h-full object-cover" width={1080} height={1344} />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <span className="eyebrow">The Inner Circle</span>
            <h1 className="font-serif text-4xl md:text-6xl mt-6 leading-[1.02]">
              An invitation to <span className="italic text-accent">join</span>
            </h1>
            <div className="rule my-8 max-w-[120px]" />

            {submitted ? (
              <div className="border border-foreground/15 p-8 md:p-12 animate-fade-in">
                <span className="eyebrow">Received</span>
                <h2 className="font-serif text-3xl md:text-4xl mt-4">Welcome to the waitlist.</h2>
                <p className="mt-5 text-foreground/75 max-w-md leading-relaxed">
                  Your request has been recorded. The editorial team reviews
                  applications weekly. If your work aligns with the Circle, you'll
                  hear from us directly within seven days.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link to="/" className="inline-flex items-center bg-foreground text-background px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors">
                    Return Home
                  </Link>
                  <Link to="/directory" className="inline-flex items-center border border-foreground px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-foreground hover:text-background transition-colors">
                    Explore Directory
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <p className="text-foreground/75 max-w-xl leading-relaxed">
                  Membership is curated. Tell us a little about yourself and the
                  work you are building. We respond to every application.
                </p>

                <form onSubmit={onSubmit} className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-xl">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role / Company</Label>
                    <Input id="role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="why">Why the Inner Circle?</Label>
                    <Textarea id="why" rows={4} value={form.why} onChange={(e) => setForm({ ...form, why: e.target.value })} />
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" className="inline-flex items-center bg-foreground text-background px-8 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors">
                      Submit Application
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Join;
