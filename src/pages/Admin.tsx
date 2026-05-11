import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  LogOut,
  Search,
  Image as ImageIcon,
} from "lucide-react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { useDirectory } from "@/lib/businessesStore";
import { slugify } from "@/lib/slug";
import type { Business } from "@/data/content";

const ADMIN_PASSWORD = "Systemoverhustle";
const SESSION_KEY = "growtiva:admin-session-v1";

const emptyForm: Business = {
  name: "",
  category: "",
  city: "",
  country: "",
  blurb: "",
  services: "",
  email: "",
  phone: "",
  url: "",
  image: "",
  tags: [],
};

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const { businesses, addBusiness, updateBusiness, deleteBusiness } =
    useDirectory();
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<Business>(emptyForm);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    document.title = "Admin — Growtiva Africa";
    if (sessionStorage.getItem(SESSION_KEY) === "1") setAuthed(true);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return businesses;
    return businesses.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.country.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q),
    );
  }, [businesses, query]);

  const tryLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      toast.success("Welcome, editor.");
    } else {
      toast.error("Incorrect password");
    }
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setPw("");
  };

  const openNew = () => {
    setEditingSlug(null);
    setForm(emptyForm);
    setTagsInput("");
    setOpen(true);
  };

  const openEdit = (b: Business) => {
    setEditingSlug(slugify(b.name));
    setForm({ ...b, tags: b.tags ?? [] });
    setTagsInput((b.tags ?? []).join(", "));
    setOpen(true);
  };

  const onImage = async (file?: File) => {
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image must be under 4MB");
      return;
    }
    const data = await fileToDataUrl(file);
    setForm((f) => ({ ...f, image: data }));
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.category.trim() ||
      !form.city.trim() ||
      !form.country.trim()
    ) {
      toast.error("Name, category, city, and country are required.");
      return;
    }
    if (!form.image) {
      toast.error("Please add an image.");
      return;
    }
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const payload: Business = { ...form, tags };
    if (editingSlug) {
      updateBusiness(editingSlug, payload);
      toast.success(`Updated ${payload.name}`);
    } else {
      addBusiness(payload);
      toast.success(`Added ${payload.name}`);
    }
    setOpen(false);
  };

  const remove = (b: Business) => {
    if (!confirm(`Remove "${b.name}" from the directory?`)) return;
    deleteBusiness(slugify(b.name));
    toast.success(`Removed ${b.name}`);
  };

  if (!authed) {
    return (
      <main className="bg-background text-foreground min-h-screen">
        <Nav />
        <section className="pt-32 sm:pt-40 pb-32 max-w-md mx-auto px-4 sm:px-6">
          <span className="eyebrow">Restricted</span>
          <h1 className="font-serif text-4xl sm:text-5xl mt-4">
            Editor access
          </h1>
          <p className="mt-4 text-foreground/70 text-sm">
            Enter the admin password to manage the business directory.
          </p>
          <form onSubmit={tryLogin} className="mt-10 flex flex-col gap-5">
            <input
              type="password"
              autoFocus
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Password"
              className="bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none placeholder:text-foreground/40"
            />
            <button
              type="submit"
              className="bg-foreground text-background px-8 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors"
            >
              Sign in →
            </button>
          </form>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />
      <section className="pt-28 sm:pt-32 pb-20 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="eyebrow">Admin · Directory</span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl mt-4">
              Manage businesses
            </h1>
            <p className="mt-3 text-foreground/65 text-sm">
              {businesses.length} listings · changes saved on this device.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 text-[11px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors"
            >
              <Plus size={14} /> New listing
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 border border-foreground/30 px-5 py-3 text-[11px] tracking-[0.22em] uppercase hover:border-foreground transition-colors"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>

        <div className="relative max-w-md mb-6">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, category, city…"
            className="w-full bg-background border border-foreground/20 focus:border-foreground pl-10 pr-3 py-2.5 outline-none text-sm"
          />
        </div>

        <div className="border border-foreground/15 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-[10px] tracking-[0.22em] uppercase text-foreground/60">
              <tr>
                <th className="text-left p-3">Image</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Location</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr
                  key={slugify(b.name)}
                  className="border-t border-foreground/10"
                >
                  <td className="p-3">
                    {b.image ? (
                      <img
                        src={b.image}
                        alt={b.name}
                        className="h-12 w-16 object-cover"
                      />
                    ) : (
                      <div className="h-12 w-16 bg-foreground/10 flex items-center justify-center">
                        <ImageIcon size={16} className="text-foreground/40" />
                      </div>
                    )}
                  </td>
                  <td className="p-3">
                    <Link
                      to={`/business/${slugify(b.name)}`}
                      className="font-serif text-base hover:text-accent"
                    >
                      {b.name}
                    </Link>
                    <div className="text-xs text-foreground/55 line-clamp-1 max-w-md">
                      {b.blurb}
                    </div>
                  </td>
                  <td className="p-3 text-foreground/75">{b.category}</td>
                  <td className="p-3 text-foreground/75">
                    {b.city}, {b.country}
                  </td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => openEdit(b)}
                      className="inline-flex items-center gap-1 text-[10px] tracking-[0.22em] uppercase border border-foreground/30 px-3 py-2 hover:border-foreground transition-colors mr-2"
                    >
                      <Pencil size={12} /> Edit
                    </button>
                    <button
                      onClick={() => remove(b)}
                      className="inline-flex items-center gap-1 text-[10px] tracking-[0.22em] uppercase border border-destructive/40 text-destructive px-3 py-2 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-foreground/60"
                  >
                    No listings.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={() => setOpen(false)}
        >
          <form
            onSubmit={save}
            onClick={(e) => e.stopPropagation()}
            className="bg-background w-full max-w-2xl border border-foreground/20 shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-5 border-b border-foreground/10 shrink-0">
              <h2 className="font-serif text-2xl">
                {editingSlug ? "Edit listing" : "New listing"}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto custom-scrollbar">
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">Name *</label>
                <input
                  required
                  placeholder="Business Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none w-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">Category *</label>
                <input
                  required
                  placeholder="e.g. Design, Tech"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none w-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">City *</label>
                <input
                  required
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none w-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">Country *</label>
                <input
                  required
                  placeholder="Country"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none w-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">Tags</label>
                <input
                  placeholder="comma-separated"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none w-full"
                />
              </div>
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">Short blurb *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="A concise description..."
                  value={form.blurb}
                  onChange={(e) => setForm({ ...form, blurb: e.target.value })}
                  className="bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none resize-none w-full"
                />
              </div>
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">Services *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="List the services offered..."
                  value={form.services}
                  onChange={(e) => setForm({ ...form, services: e.target.value })}
                  className="bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none resize-none w-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={form.email ?? ""}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none w-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">Phone</label>
                <input
                  placeholder="+123..."
                  value={form.phone ?? ""}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none w-full"
                />
              </div>
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">Website URL</label>
                <input
                  placeholder="https://..."
                  value={form.url ?? ""}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none w-full"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/60">
                  Image *
                </label>
                <div className="mt-2 flex items-center gap-4">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt="preview"
                      className="h-24 w-32 object-cover border border-foreground/15"
                    />
                  ) : (
                    <div className="h-24 w-32 bg-foreground/5 border border-foreground/15 flex items-center justify-center text-foreground/40">
                      <ImageIcon size={20} />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onImage(e.target.files?.[0])}
                    className="text-xs"
                  />
                </div>
                <input
                  placeholder="…or paste image URL"
                  value={form.image.startsWith("data:") ? "" : form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="mt-3 w-full bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t border-foreground/10 shrink-0">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-5 py-3 text-[11px] tracking-[0.22em] uppercase border border-foreground/30 hover:border-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-3 text-[11px] tracking-[0.22em] uppercase bg-foreground text-background hover:bg-accent hover:text-foreground transition-colors"
              >
                {editingSlug ? "Save changes" : "Add listing"}
              </button>
            </div>
          </form>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default Admin;
