import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** /intake is deliberately absent — it is a working document, not a page. */
const routes = ["", "/about", "/forum", "/record", "/join", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: route === "" || route === "/forum" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/join" ? 0.8 : 0.6,
  }));
}
