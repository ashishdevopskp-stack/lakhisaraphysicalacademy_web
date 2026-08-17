export const HARDCODED_SITE_URL = "https://www.lakhisaraiphysicalacademy.com";

export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && !envUrl.includes("localhost") && !envUrl.includes("127.0.0.1")) {
    return envUrl.replace(/\/$/, "");
  }
  return HARDCODED_SITE_URL;
}
