// src/api/growtiva/admin.ts
// Copy to your Growtiva frontend at: src/api/admin.ts

const API_BASE = import.meta.env.VITE_API_URL || 'https://api.swiftpixelsstudio.com';
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET || '';

const adminHeaders = {
  'Content-Type': 'application/json',
  'x-admin-secret': ADMIN_SECRET,
};

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...adminHeaders, ...(options?.headers || {}) },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
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
  subscribers:    number;
  advertRequests: number;
  profiles:       number;
  contactMessages: number;
};

export const getStats = () =>
  apiFetch<GrootivaStats>('/api/growtiva/admin/stats');

// ─── Subscribers ──────────────────────────────────────────────────────────────
export type Subscriber = {
  _id: string;
  email: string;
  name?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export const getSubscribers = (params?: { active?: boolean; page?: number; limit?: number }) => {
  const q = new URLSearchParams(params as Record<string, string>).toString();
  return apiFetch<PaginatedResponse<Subscriber>>(`/api/growtiva/subscribers${q ? `?${q}` : ''}`);
};
export const getSubscriber   = (id: string) => apiFetch<Subscriber>(`/api/growtiva/subscribers/${id}`);
export const updateSubscriber = (id: string, updates: { active?: boolean; name?: string }) =>
  apiFetch(`/api/growtiva/subscribers/${id}`, { method: 'PATCH', body: JSON.stringify(updates) });
export const deleteSubscriber = (id: string) =>
  apiFetch(`/api/growtiva/subscribers/${id}`, { method: 'DELETE' });

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
  status: 'new' | 'reviewing' | 'quoted' | 'accepted' | 'rejected';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
};

export const getAdvertRequests = (params?: { status?: string; page?: number; limit?: number }) => {
  const q = new URLSearchParams(params as Record<string, string>).toString();
  return apiFetch<PaginatedResponse<AdvertRequest>>(`/api/growtiva/advert-requests${q ? `?${q}` : ''}`);
};
export const getAdvertRequest   = (id: string) => apiFetch<AdvertRequest>(`/api/growtiva/advert-requests/${id}`);
export const updateAdvertRequest = (id: string, updates: { status?: AdvertRequest['status']; adminNotes?: string }) =>
  apiFetch(`/api/growtiva/advert-requests/${id}`, { method: 'PATCH', body: JSON.stringify(updates) });
export const deleteAdvertRequest = (id: string) =>
  apiFetch(`/api/growtiva/advert-requests/${id}`, { method: 'DELETE' });

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
  return apiFetch<PaginatedResponse<Profile>>(`/api/growtiva/profiles${q ? `?${q}` : ''}`);
};
export const getProfile   = (id: string) => apiFetch<Profile>(`/api/growtiva/profiles/${id}`);
export const updateProfile = (id: string, updates: { fullName?: string; phone?: string; email?: string }) =>
  apiFetch(`/api/growtiva/profiles/${id}`, { method: 'PATCH', body: JSON.stringify(updates) });
export const deleteProfile = (id: string) =>
  apiFetch(`/api/growtiva/profiles/${id}`, { method: 'DELETE' });

// ─── Contact Messages ─────────────────────────────────────────────────────────
export type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
};

export const getContactMessages = (params?: { status?: string; page?: number; limit?: number }) => {
  const q = new URLSearchParams(params as Record<string, string>).toString();
  return apiFetch<PaginatedResponse<ContactMessage>>(`/api/growtiva/contact${q ? `?${q}` : ''}`);
};
export const getContactMessage   = (id: string) => apiFetch<ContactMessage>(`/api/growtiva/contact/${id}`);
export const updateContactMessage = (id: string, updates: { status?: ContactMessage['status']; adminNotes?: string }) =>
  apiFetch(`/api/growtiva/contact/${id}`, { method: 'PATCH', body: JSON.stringify(updates) });
export const deleteContactMessage = (id: string) =>
  apiFetch(`/api/growtiva/contact/${id}`, { method: 'DELETE' });
