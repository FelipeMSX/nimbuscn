export const locales = ["en", "pt-br"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
    en: "English",
    "pt-br": "Português (BR)",
};

export function isLocale(value: string): value is Locale {
    return (locales as readonly string[]).includes(value);
}
