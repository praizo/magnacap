import type { MetadataRoute } from "next";
import { company, navigation } from "@/content/site";
import { serviceHref, servicePages } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  // External menu entries (LILY) are skipped; the /lily page itself is still listed.
  const pages = navigation.filter((item) => item.href.startsWith("/"));
  const serviceRoutes = servicePages.map((service) => ({ href: serviceHref(service.slug) }));
  return [{ href: "/" }, ...pages, ...serviceRoutes, { href: "/lily" }].map((item) => ({
    url: new URL(item.href, company.url).toString(),
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}

// Generated once at build time, so it also works in the static export (`npm run build:static`).
export const dynamic = "force-static";
