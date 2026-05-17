import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  LogOut,
  Search,
  Image as ImageIcon,
  Users,
  Building2,
  Loader2,
  Mail,
  MapPin,
  Briefcase,
  BookOpen,
} from "lucide-react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { useDirectory } from "@/lib/businessesStore";
import { slugify } from "@/lib/slug";
import {
  login as apiLogin,
  logout as apiLogout,
  isAuthenticated,
} from "@/api/auth";
import { submitListing } from "@/api/forms";
import {
  getInnerCircleApplications,
  deleteInnerCircleApplication,
  type InnerCircleApplication,
  type PaginatedResponse,
  getSubscribers,
  deleteSubscriber,
  type Subscriber,
  getReadingRoomEmails,
  deleteReadingRoomEmail,
  type ReadingRoomEmail,
} from "@/api/admin";
import type { Business } from "@/data/content";

type AdminTab = "listings" | "inner-circle" | "subscribers" | "reading-room";

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
  const queryClient = useQueryClient();
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const { businesses, addBusiness, updateBusiness, deleteBusiness } =
    useDirectory();
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<Business>(emptyForm);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [tab, setTab] = useState<AdminTab>("listings");

  // Inner Circle state
  const [appQuery, setAppQuery] = useState("");

  useEffect(() => {
    document.title = "Admin — Growtiva Africa";
    if (isAuthenticated()) setAuthed(true);
  }, []);

  const { data: applicationsData, isLoading: appsLoading } = useQuery({
    queryKey: ["inner-circle-applications"],
    queryFn: () => getInnerCircleApplications({ limit: 100 }),
    enabled: authed && tab === "inner-circle",
  });

  const applications = useMemo(
    () => applicationsData?.data ?? [],
    [applicationsData],
  );

  // Subscribers state & queries
  const [subQuery, setSubQuery] = useState("");
  const { data: subscribersData, isLoading: subscribersLoading } = useQuery({
    queryKey: ["subscribers"],
    queryFn: () => getSubscribers({ limit: 100 }),
    enabled: authed && tab === "subscribers",
  });
  const subscribers = useMemo(
    () => subscribersData?.data ?? [],
    [subscribersData],
  );

  // Reading Room state & queries
  const [rrQuery, setRrQuery] = useState("");
  const { data: readingRoomData, isLoading: readingRoomLoading } = useQuery({
    queryKey: ["reading-room-emails"],
    queryFn: () => getReadingRoomEmails({ limit: 100 }),
    enabled: authed && tab === "reading-room",
  });
  const readingRoomEmails = useMemo(
    () => readingRoomData?.data ?? [],
    [readingRoomData],
  );

  const loginMutation = useMutation({
    mutationFn: (password: string) => apiLogin(password),
    onSuccess: (res) => {
      if (res.success) {
        setAuthed(true);
        toast.success("Welcome, editor.");
      } else {
        toast.error(res.error || "Incorrect password");
      }
    },
    onError: () => {
      toast.error("Network error. Please check your connection.");
    },
  });

  const saveListingMutation = useMutation({
    mutationFn: (
      payload: Parameters<typeof submitListing>[0] & {
        payload: Business;
        editingSlug: string | null;
      },
    ) => submitListing(payload),
    onSuccess: (res, variables) => {
      if (res.success) {
        const { payload, editingSlug } = variables;
        if (editingSlug) {
          updateBusiness(editingSlug, payload);
          toast.success(`Updated ${payload.name}`);
        } else {
          addBusiness(payload);
          toast.success(`Added ${payload.name}`);
        }
        setOpen(false);
      } else {
        toast.error(res.error || "Failed to save listing. Please try again.");
      }
    },
    onError: () => {
      toast.error("Network error. Please check your connection.");
    },
  });

  const removeApplicationMutation = useMutation({
    mutationFn: (id: string) => deleteInnerCircleApplication(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        ["inner-circle-applications"],
        (old: PaginatedResponse<InnerCircleApplication> | undefined) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.filter((a: InnerCircleApplication) => a._id !== id),
          };
        },
      );
      toast.success("Application removed");
    },
    onError: () => {
      toast.error("Failed to remove application.");
    },
  });

  const removeSubscriberMutation = useMutation({
    mutationFn: (id: string) => deleteSubscriber(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        ["subscribers"],
        (old: PaginatedResponse<Subscriber> | undefined) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.filter((s: Subscriber) => s._id !== id),
          };
        },
      );
      toast.success("Subscriber removed");
    },
    onError: () => {
      toast.error("Failed to remove subscriber.");
    },
  });

  const removeReadingRoomEmailMutation = useMutation({
    mutationFn: (id: string) => deleteReadingRoomEmail(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        ["reading-room-emails"],
        (old: PaginatedResponse<ReadingRoomEmail> | undefined) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.filter((r: ReadingRoomEmail) => r._id !== id),
          };
        },
      );
      toast.success("Email removed from Reading Room");
    },
    onError: () => {
      toast.error("Failed to remove email.");
    },
  });

  const tryLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(pw);
  };

  const handleLogout = async () => {
    await apiLogout();
    setAuthed(false);
    setPw("");
  };

  const removeApplication = async (app: InnerCircleApplication) => {
    if (!confirm(`Remove application from "${app.name}"?`)) return;
    removeApplicationMutation.mutate(app._id);
  };

  const removeSubscriber = async (sub: Subscriber) => {
    if (!confirm(`Remove subscriber "${sub.email}"?`)) return;
    removeSubscriberMutation.mutate(sub._id);
  };

  const removeReadingRoomEmail = async (item: ReadingRoomEmail) => {
    if (!confirm(`Remove email "${item.email}" from the Reading Room?`)) return;
    removeReadingRoomEmailMutation.mutate(item._id);
  };

  const filteredApps = useMemo(() => {
    const q = appQuery.trim().toLowerCase();
    if (!q) return applications;
    return applications.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q),
    );
  }, [applications, appQuery]);

  const filteredSubscribers = useMemo(() => {
    const q = subQuery.trim().toLowerCase();
    if (!q) return subscribers;
    return subscribers.filter(
      (s) =>
        s.email.toLowerCase().includes(q) ||
        (s.name && s.name.toLowerCase().includes(q)),
    );
  }, [subscribers, subQuery]);

  const filteredReadingRoomEmails = useMemo(() => {
    const q = rrQuery.trim().toLowerCase();
    if (!q) return readingRoomEmails;
    return readingRoomEmails.filter((r) => r.email.toLowerCase().includes(q));
  }, [readingRoomEmails, rrQuery]);

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

  const save = async (e: React.FormEvent) => {
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

    saveListingMutation.mutate({
      name: payload.name,
      category: payload.category,
      city: payload.city,
      country: payload.country,
      blurb: payload.blurb,
      services: payload.services,
      email: payload.email || "",
      phone: payload.phone || "",
      url: payload.url || undefined,
      image: payload.image || undefined,
      tags,
      payload,
      editingSlug,
    });
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
              disabled={loginMutation.isPending}
              className="bg-foreground text-background px-8 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginMutation.isPending ? "Signing in…" : "Sign in →"}
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
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="eyebrow">Admin Panel</span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl mt-4">
              {tab === "listings"
                ? "Manage businesses"
                : tab === "inner-circle"
                  ? "Inner Circle"
                  : tab === "subscribers"
                    ? "Subscribers"
                    : "Reading Room"}
            </h1>
            <p className="mt-3 text-foreground/65 text-sm">
              {tab === "listings"
                ? `${businesses.length} listings · changes saved on this device.`
                : tab === "inner-circle"
                  ? `${applications.length} applications received.`
                  : tab === "subscribers"
                    ? `${subscribers.length} newsletter subscribers.`
                    : `${readingRoomEmails.length} unlocked reading room readers.`}
            </p>
          </div>
          <div className="flex gap-3">
            {tab === "listings" && (
              <button
                onClick={openNew}
                className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 text-[11px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors"
              >
                <Plus size={14} /> New listing
              </button>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 border border-foreground/30 px-5 py-3 text-[11px] tracking-[0.22em] uppercase hover:border-foreground transition-colors"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="flex gap-1 border-b border-foreground/15 mb-8">
          <button
            onClick={() => setTab("listings")}
            className={`inline-flex items-center gap-2 px-5 py-3 text-[11px] tracking-[0.18em] uppercase transition-colors border-b-2 -mb-px ${
              tab === "listings"
                ? "border-foreground text-foreground"
                : "border-transparent text-foreground/50 hover:text-foreground/80"
            }`}
          >
            <Building2 size={14} /> Listings
          </button>
          <button
            onClick={() => setTab("inner-circle")}
            className={`inline-flex items-center gap-2 px-5 py-3 text-[11px] tracking-[0.18em] uppercase transition-colors border-b-2 -mb-px ${
              tab === "inner-circle"
                ? "border-foreground text-foreground"
                : "border-transparent text-foreground/50 hover:text-foreground/80"
            }`}
          >
            <Users size={14} /> Inner Circle
          </button>
          <button
            onClick={() => setTab("reading-room")}
            className={`inline-flex items-center gap-2 px-5 py-3 text-[11px] tracking-[0.18em] uppercase transition-colors border-b-2 -mb-px ${
              tab === "reading-room"
                ? "border-foreground text-foreground"
                : "border-transparent text-foreground/50 hover:text-foreground/80"
            }`}
          >
            <BookOpen size={14} /> Reading Room
          </button>
          <button
            onClick={() => setTab("subscribers")}
            className={`inline-flex items-center gap-2 px-5 py-3 text-[11px] tracking-[0.18em] uppercase transition-colors border-b-2 -mb-px ${
              tab === "subscribers"
                ? "border-foreground text-foreground"
                : "border-transparent text-foreground/50 hover:text-foreground/80"
            }`}
          >
            <Mail size={14} /> Email Subscribers
          </button>
        </div>

        {/* ── Listings Tab ── */}
        {tab === "listings" && (
          <>
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
                            <ImageIcon
                              size={16}
                              className="text-foreground/40"
                            />
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
          </>
        )}

        {/* ── Inner Circle Tab ── */}
        {tab === "inner-circle" && (
          <>
            <div className="relative max-w-md mb-6">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
              />
              <input
                value={appQuery}
                onChange={(e) => setAppQuery(e.target.value)}
                placeholder="Search name, email, city, role…"
                className="w-full bg-background border border-foreground/20 focus:border-foreground pl-10 pr-3 py-2.5 outline-none text-sm"
              />
            </div>

            {appsLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2
                  size={24}
                  className="animate-spin text-foreground/40"
                />
              </div>
            ) : filteredApps.length === 0 ? (
              <div className="border border-foreground/15 p-12 text-center text-foreground/60">
                No applications found.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredApps.map((app) => (
                  <div
                    key={app._id}
                    className="border border-foreground/15 p-5 flex flex-col gap-3 hover:border-foreground/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-lg leading-tight">
                          {app.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-foreground/60">
                          <Mail size={11} />
                          <span>{app.email}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeApplication(app)}
                        className="shrink-0 p-1.5 text-destructive/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
                        title="Remove application"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground/70">
                      <span className="inline-flex items-center gap-1">
                        <Briefcase size={11} /> {app.role}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={11} /> {app.city}
                      </span>
                    </div>

                    <p className="text-sm text-foreground/75 leading-relaxed line-clamp-3">
                      {app.why}
                    </p>

                    <div className="mt-auto pt-2 border-t border-foreground/10 text-[10px] tracking-[0.15em] uppercase text-foreground/40">
                      {new Date(app.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Subscribers Tab ── */}
        {tab === "subscribers" && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="relative max-w-md flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                />
                <input
                  value={subQuery}
                  onChange={(e) => setSubQuery(e.target.value)}
                  placeholder="Search name or email…"
                  className="w-full bg-background border border-foreground/20 focus:border-foreground pl-10 pr-3 py-2.5 outline-none text-sm"
                />
              </div>
              {filteredSubscribers.length > 0 && (
                <button
                  onClick={() => {
                    const emails = filteredSubscribers
                      .map((s) => s.email)
                      .join(", ");
                    navigator.clipboard.writeText(emails);
                    toast.success("All subscriber emails copied to clipboard!");
                  }}
                  className="inline-flex items-center gap-2 border border-foreground/30 px-4 py-2.5 text-[11px] tracking-[0.18em] uppercase hover:border-foreground hover:bg-foreground/5 transition-colors"
                >
                  <Mail size={12} /> Copy All Emails
                </button>
              )}
            </div>

            {subscribersLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2
                  size={24}
                  className="animate-spin text-foreground/40"
                />
              </div>
            ) : filteredSubscribers.length === 0 ? (
              <div className="border border-foreground/15 p-12 text-center text-foreground/60">
                No subscribers found.
              </div>
            ) : (
              <div className="border border-foreground/15 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/40 text-[10px] tracking-[0.22em] uppercase text-foreground/60">
                    <tr>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Joined Date</th>
                      <th className="text-right p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubscribers.map((sub) => (
                      <tr
                        key={sub._id}
                        className="border-t border-foreground/10 hover:bg-foreground/[0.01] transition-colors"
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-foreground/75">
                              {sub.email}
                            </span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(sub.email);
                                toast.success("Email copied!");
                              }}
                              className="text-foreground/40 hover:text-foreground p-1 rounded hover:bg-foreground/5 transition-all text-[10px]"
                              title="Copy email"
                            >
                              Copy
                            </button>
                          </div>
                        </td>
                        
                        <td className="p-3 text-foreground/60 text-xs">
                          {new Date(sub.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="p-3 text-right whitespace-nowrap">
                          <button
                            onClick={() => removeSubscriber(sub)}
                            className="inline-flex items-center gap-1 text-[10px] tracking-[0.22em] uppercase border border-destructive/40 text-destructive px-3 py-2 hover:bg-destructive hover:text-destructive-foreground transition-all"
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ── Reading Room Tab ── */}
        {tab === "reading-room" && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="relative max-w-md flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                />
                <input
                  value={rrQuery}
                  onChange={(e) => setRrQuery(e.target.value)}
                  placeholder="Search email…"
                  className="w-full bg-background border border-foreground/20 focus:border-foreground pl-10 pr-3 py-2.5 outline-none text-sm"
                />
              </div>
              {filteredReadingRoomEmails.length > 0 && (
                <button
                  onClick={() => {
                    const emails = filteredReadingRoomEmails
                      .map((r) => r.email)
                      .join(", ");
                    navigator.clipboard.writeText(emails);
                    toast.success(
                      "All Reading Room emails copied to clipboard!",
                    );
                  }}
                  className="inline-flex items-center gap-2 border border-foreground/30 px-4 py-2.5 text-[11px] tracking-[0.18em] uppercase hover:border-foreground hover:bg-foreground/5 transition-colors"
                >
                  <BookOpen size={12} /> Copy All Emails
                </button>
              )}
            </div>

            {readingRoomLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2
                  size={24}
                  className="animate-spin text-foreground/40"
                />
              </div>
            ) : filteredReadingRoomEmails.length === 0 ? (
              <div className="border border-foreground/15 p-12 text-center text-foreground/60">
                No Reading Room readers found.
              </div>
            ) : (
              <div className="border border-foreground/15 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/40 text-[10px] tracking-[0.22em] uppercase text-foreground/60">
                    <tr>
                      <th className="text-left p-3">Email Address</th>
                      <th className="text-left p-3">Unlocked At</th>
                      <th className="text-right p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReadingRoomEmails.map((item) => (
                      <tr
                        key={item._id}
                        className="border-t border-foreground/10 hover:bg-foreground/[0.01] transition-colors"
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-foreground/80">
                              {item.email}
                            </span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(item.email);
                                toast.success("Email copied!");
                              }}
                              className="text-foreground/40 hover:text-foreground p-1 rounded hover:bg-foreground/5 transition-all text-[10px]"
                              title="Copy email"
                            >
                              Copy
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-foreground/60 text-xs">
                          {new Date(item.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </td>
                        <td className="p-3 text-right whitespace-nowrap">
                          <button
                            onClick={() => removeReadingRoomEmail(item)}
                            className="inline-flex items-center gap-1 text-[10px] tracking-[0.22em] uppercase border border-destructive/40 text-destructive px-3 py-2 hover:bg-destructive hover:text-destructive-foreground transition-all"
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
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
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">
                  Name *
                </label>
                <input
                  required
                  placeholder="Business Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none w-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">
                  Category *
                </label>
                <input
                  required
                  placeholder="e.g. Design, Tech"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none w-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">
                  City *
                </label>
                <input
                  required
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none w-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">
                  Country *
                </label>
                <input
                  required
                  placeholder="Country"
                  value={form.country}
                  onChange={(e) =>
                    setForm({ ...form, country: e.target.value })
                  }
                  className="bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none w-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">
                  Tags
                </label>
                <input
                  placeholder="comma-separated"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none w-full"
                />
              </div>
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">
                  Short blurb *
                </label>
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
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">
                  Services *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="List the services offered..."
                  value={form.services}
                  onChange={(e) =>
                    setForm({ ...form, services: e.target.value })
                  }
                  className="bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none resize-none w-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={form.email ?? ""}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none w-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">
                  Phone
                </label>
                <input
                  placeholder="+123..."
                  value={form.phone ?? ""}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="bg-transparent border-b border-foreground/30 focus:border-foreground py-2 outline-none w-full"
                />
              </div>
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">
                  Website URL
                </label>
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
                disabled={saveListingMutation.isPending}
                className="px-5 py-3 text-[11px] tracking-[0.22em] uppercase bg-foreground text-background hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saveListingMutation.isPending
                  ? "Saving…"
                  : editingSlug
                    ? "Save changes"
                    : "Add listing"}
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
