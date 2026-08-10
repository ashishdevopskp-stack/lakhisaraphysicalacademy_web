import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lakhisaraphysicalacademy.com";

  const routes = [
    "",
    "/about",
    "/courses",
    "/admission-form",
    "/blogs",
    "/events",
    "/result",
    "/resources",
    "/jobs",
    "/youtube-video",
    "/contact",
    "/hostel",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
