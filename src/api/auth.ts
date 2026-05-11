const API_BASE =
  import.meta.env.VITE_API_URL || "https://api.swiftpixelsstudio.com";

const TOKEN_KEY = "growtiva:auth-token";

export type AuthResponse = {
  success: boolean;
  token?: string;
  error?: string;
};

// ─── Login ────────────────────────────────────────────────────────────────────
export async function login(passkey: string): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/growtiva/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passkey }),
    });
    const data: AuthResponse = await res.json();
    if (data.success && data.token) {
      sessionStorage.setItem(TOKEN_KEY, data.token);
    }
    return data;
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection.",
    };
  }
}

// ─── Logout ───────────────────────────────────────────────────────────────────
export async function logout(): Promise<{ success: boolean }> {
  try {
    await fetch(`${API_BASE}/api/growtiva/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  } catch {
    // fire-and-forget — always clear locally
  }
  sessionStorage.removeItem(TOKEN_KEY);
  return { success: true };
}

// ─── Token helpers ────────────────────────────────────────────────────────────
export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
