import { MetadataRoute } from "next";

function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && !envUrl.includes("localhost")) {
    return envUrl.replace(/\/$/, "");
  }
  return "https://www.lakhisaraiphysicalacademy.com";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  const mainRoutes = [
    "",
    "/about",
    "/about/founderanddirector",
    "/about/ourstory",
    "/about/whatwetrain",
    "/about/facilities",
    "/courses",
    "/courses/programs",
    "/courses/schedule",
    "/courses/facilities",
    "/courses/fees-admission",
    "/courses/faq",
    "/admission-form",
    "/hostel",
    "/hostel/facilities",
    "/hostel/gallery",
    "/hostel/fees",
    "/hostel/rules",
    "/hostel/faq",
    "/blogs",
    "/blogs/categories",
    "/blogs/articles",
    "/blogs/topics",
    "/events",
    "/events/upcoming",
    "/events/past",
    "/events/categories",
    "/events/gallery",
    "/result",
    "/store",
    "/resources",
    "/notification",
    "/notification/updates",
    "/jobs",
    "/youtube-video",
    "/contact",
  ];

  return mainRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/courses") || route === "/about" ? 0.9 : 0.8,
  }));
}
