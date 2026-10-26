import type { MetadataRoute } from "next";
import { company } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", company.url).toString(),
  };
}
