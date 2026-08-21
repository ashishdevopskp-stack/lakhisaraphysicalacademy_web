import { MetadataRoute } from "next";
import { getBlogs } from "./lib/action/blogs";
import { getResults } from "./lib/action/results";

function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && !envUrl.includes("localhost") && !envUrl.includes("127.0.0.1")) {
    return envUrl.replace(/\/$/, "");
  }
  return "https://www.lakhisaraiphysicalacademy.com";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    "/reviews",
    "/store",
    "/resources",
    "/notification",
    "/notification/updates",
    "/jobs",
    "/youtube-video",
    "/contact",
  ];

  const staticEntries: MetadataRoute.Sitemap = mainRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/courses") || route === "/about" ? 0.9 : 0.8,
  }));

  try {
    const [blogs, results] = await Promise.all([getBlogs(), getResults()]);

    const blogEntries: MetadataRoute.Sitemap = (blogs || []).map((blog) => ({
      url: `${baseUrl}/blogs/${blog.id}`,
      lastModified: blog.created_at ? new Date(blog.created_at) : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    const resultEntries: MetadataRoute.Sitemap = (results || []).map((result) => ({
      url: `${baseUrl}/result/${result.id}`,
      lastModified: result.created_at ? new Date(result.created_at) : new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    return [...staticEntries, ...blogEntries, ...resultEntries];
  } catch {
    return staticEntries;
  }
}

