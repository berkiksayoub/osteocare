import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/contact/merci"],
    },
    sitemap: "https://ayoubberkiks.fr/sitemap.xml",
  };
}
