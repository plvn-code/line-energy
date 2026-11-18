import type { MetadataRoute } from "next";
import { objects } from "@/lib/objects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/obiekty", "/posluhy", "/kalkuliator", "/kredyt", "/pro-nas", "/faq", "/kontakty"];
  return [...pages, ...objects.map((o) => `/obiekty/${o.slug}`)].map((p) => ({ url: site.url + p }));
}
