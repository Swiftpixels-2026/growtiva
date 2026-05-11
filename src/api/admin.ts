// src/api/growtiva/admin.ts
// Copy to your Growtiva frontend at: src/api/admin.ts

import { getToken } from "@/api/auth";

const API_BASE =
  import.meta.env.VITE_API_URL || "https://api.swiftpixelsstudio.com";
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET || "";

const adminHeaders = {
  "Content-Type": "application/json",
  "x-admin-secret": ADMIN_SECRET,
};

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...adminHeaders, ...(options?.headers || {}) },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

// ─── Stats ────────────────────────────────────────────────────────────────────
export type GrootivaStats = {
  subscribers: number;
  advertRequests: number;
  profiles: number;
  contactMessages: number;
};

export const getStats = () =>
  apiFetch<GrootivaStats>("/api/growtiva/admin/stats");

// ─── Subscribers ──────────────────────────────────────────────────────────────
export type Subscriber = {
  _id: string;
  email: string;
  name?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export const getSubscribers = (params?: {
  active?: boolean;
  page?: number;
  limit?: number;
}) => {
  const q = new URLSearchParams(params as Record<string, string>).toString();
  return apiFetch<PaginatedResponse<Subscriber>>(
    `/api/growtiva/subscribers${q ? `?${q}` : ""}`,
  );
};
export const getSubscriber = (id: string) =>
  apiFetch<Subscriber>(`/api/growtiva/subscribers/${id}`);
export const updateSubscriber = (
  id: string,
  updates: { active?: boolean; name?: string },
) =>
  apiFetch(`/api/growtiva/subscribers/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
export const deleteSubscriber = (id: string) =>
  apiFetch(`/api/growtiva/subscribers/${id}`, { method: "DELETE" });

// ─── Advert Requests ──────────────────────────────────────────────────────────
export type AdvertRequest = {
  _id: string;
  fullName: string;
  email: string;
  businessName: string;
  adType: string;
  budget: string;
  wantHardCopy: boolean;
  additionalDetails?: string;
  status: "new" | "reviewing" | "quoted" | "accepted" | "rejected";
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
};

export const getAdvertRequests = (params?: {
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const q = new URLSearchParams(params as Record<string, string>).toString();
  return apiFetch<PaginatedResponse<AdvertRequest>>(
    `/api/growtiva/advert-requests${q ? `?${q}` : ""}`,
  );
};
export const getAdvertRequest = (id: string) =>
  apiFetch<AdvertRequest>(`/api/growtiva/advert-requests/${id}`);
export const updateAdvertRequest = (
  id: string,
  updates: { status?: AdvertRequest["status"]; adminNotes?: string },
) =>
  apiFetch(`/api/growtiva/advert-requests/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
export const deleteAdvertRequest = (id: string) =>
  apiFetch(`/api/growtiva/advert-requests/${id}`, { method: "DELETE" });

// ─── Profiles ─────────────────────────────────────────────────────────────────
export type Profile = {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export const getProfiles = (params?: { page?: number; limit?: number }) => {
  const q = new URLSearchParams(params as Record<string, string>).toString();
  return apiFetch<PaginatedResponse<Profile>>(
    `/api/growtiva/profiles${q ? `?${q}` : ""}`,
  );
};

// ─── Inner Circle Applications ────────────────────────────────────────────────
export type InnerCircleApplication = {
  _id: string;
  name: string;
  email: string;
  role: string;
  city: string;
  why: string;
  createdAt: string;
  updatedAt: string;
};

export const getInnerCircleApplications = (params?: {
  page?: number;
  limit?: number;
}) => {
  const q = new URLSearchParams(params as Record<string, string>).toString();
  return apiFetch<PaginatedResponse<InnerCircleApplication>>(
    `/api/growtiva/inner-circle${q ? `?${q}` : ""}`,
    { headers: { Authorization: `Bearer ${getToken()}` } },
  );
};

export const deleteInnerCircleApplication = (id: string) =>
  apiFetch(`/api/growtiva/inner-circle/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });

// ─── Listings ─────────────────────────────────────────────────────────────────
export type Listing = {
  _id: string;
  name: string;
  category: string;
  city: string;
  country: string;
  blurb: string;
  services: string;
  email: string;
  phone: string;
  url?: string;
  image?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export const getListings = (params?: {
  search?: string;
  city?: string;
  category?: string;
  tags?: string; // comma-separated
  page?: number;
  limit?: number;
}) => {
  const q = new URLSearchParams(params as Record<string, string>).toString();
  return apiFetch<PaginatedResponse<Listing>>(
    `/api/growtiva/listings${q ? `?${q}` : ""}`,
  );
};

export const getAllTags = () =>
  apiFetch<{ tags: string[] }>("/api/growtiva/listings/tags");
