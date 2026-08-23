import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
    site: "https://nimbuscn.dev",
    output: "static",
    i18n: {
        defaultLocale: "en",
        locales: ["en", "pt-br"],
        routing: {
            prefixDefaultLocale: false,
        },
    },
    integrations: [react(), mdx(), sitemap({ i18n: { defaultLocale: "en", locales: { en: "en", "pt-br": "pt-BR" } } })],
    vite: {
        plugins: [tailwindcss()],
    },
});
