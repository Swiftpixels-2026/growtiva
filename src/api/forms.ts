import { getToken } from "./auth";

const API_BASE = "https://api.swiftpixelsstudio.com";

type ApiResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

// ─── Subscribe ────────────────────────────────────────────────────────────────
export async function submitSubscriber(data: {
  email: string;
  name?: string;
}): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/growtiva/subscribers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection.",
    };
  }
}

// ─── Reading Room ────────────────────────────────────────────────────────────
export async function submitReadingRoom(data: {
  email: string;
}): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/growtiva/reading-room`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection.",
    };
  }
}


// ─── Advert Request ───────────────────────────────────────────────────────────
export async function submitAdvertRequest(data: {
  full_name: string;
  email: string;
  business_name: string;
  ad_type: string;
  budget: string;
  want_hard_copy: boolean;
  additional_details?: string;
}): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/growtiva/advert-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection.",
    };
  }
}

// ─── Profile ──────────────────────────────────────────────────────────────────
export async function submitProfile(data: {
  full_name: string;
  phone: string;
  email: string;
}): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/growtiva/profiles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection.",
    };
  }
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export async function submitContact(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/growtiva/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection.",
    };
  }
}

// ─── Inner Circle ─────────────────────────────────────────────────────────────
export async function submitInnerCircle(data: {
  name: string;
  email: string;
  role: string;
  city: string;
  why: string;
}): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/growtiva/inner-circle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection.",
    };
  }
}

// ─── Listings ─────────────────────────────────────────────────────────────────
export async function submitListing(data: {
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
  tags?: string[];
}): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/growtiva/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection.",
    };
  }
}

// ─── Applications ─────────────────────────────────────────────────────────────
export async function submitApplication(data: {
  name: string;
  email: string;
  business: string;
  category: string;
  city: string;
  note: string;
}): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/growtiva/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection.",
    };
  }
}

// ─── Letters ──────────────────────────────────────────────────────────────────
export async function submitLetter(data: {
  name: string;
  email: string;
  city: string;
  subject: string;
  body: string;
}): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/growtiva/letters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection.",
    };
  }
}

// ─── Events (RSVP) ────────────────────────────────────────────────────────────
export async function submitEventRsvp(data: {
  name: string;
  email: string;
  title: string;
  note: string;
}): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/growtiva/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection.",
    };
  }
}
