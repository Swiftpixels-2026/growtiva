// Map African countries to their primary currency for directory display.
export type Currency = { code: string; symbol: string; name: string };

export const COUNTRY_CURRENCY: Record<string, Currency> = {
  Nigeria: { code: "NGN", symbol: "₦", name: "Naira" },
  Kenya: { code: "KES", symbol: "KSh", name: "Shilling" },
  "South Africa": { code: "ZAR", symbol: "R", name: "Rand" },
  Ghana: { code: "GHS", symbol: "GH₵", name: "Cedi" },
  Morocco: { code: "MAD", symbol: "MAD", name: "Dirham" },
  Egypt: { code: "EGP", symbol: "E£", name: "Pound" },
  Rwanda: { code: "RWF", symbol: "RF", name: "Franc" },
  Senegal: { code: "XOF", symbol: "CFA", name: "CFA Franc" },
  "Côte d'Ivoire": { code: "XOF", symbol: "CFA", name: "CFA Franc" },
  Benin: { code: "XOF", symbol: "CFA", name: "CFA Franc" },
  Cameroon: { code: "XAF", symbol: "FCFA", name: "CFA Franc" },
  Ethiopia: { code: "ETB", symbol: "Br", name: "Birr" },
  Tanzania: { code: "TZS", symbol: "TSh", name: "Shilling" },
  Uganda: { code: "UGX", symbol: "USh", name: "Shilling" },
  "Sierra Leone": { code: "SLE", symbol: "Le", name: "Leone" },
};

export function currencyFor(country: string): Currency | null {
  return COUNTRY_CURRENCY[country] ?? null;
}
