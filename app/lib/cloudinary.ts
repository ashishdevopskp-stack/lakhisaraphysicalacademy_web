/**
 * Cloudinary Helper Utilities for Lakhisarai Physical Academy
 * Implements automatic format (AVIF/WebP) and quality optimization (q_auto, f_auto)
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";

export interface CloudinaryOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "limit" | "thumb" | "scale";
  quality?: "auto" | "auto:good" | "auto:eco" | number;
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
  gravity?: "auto" | "face" | "center";
}

/**
 * Returns an optimized Cloudinary image URL given a public ID or full URL.
 */
export function getCloudinaryUrl(
  publicIdOrUrl: string,
  options: CloudinaryOptions = {}
): string {
  if (!publicIdOrUrl) return "/images/placeholder.jpg";

  // If it's already a full URL that is NOT cloudinary, return as-is
  if (publicIdOrUrl.startsWith("http") && !publicIdOrUrl.includes("cloudinary.com")) {
    return publicIdOrUrl;
  }

  // Extract public_id if full Cloudinary URL is passed
  let publicId = publicIdOrUrl;
  if (publicIdOrUrl.includes("res.cloudinary.com")) {
    const parts = publicIdOrUrl.split("/upload/");
    if (parts.length > 1) {
      // Remove any existing transformation string if present
      const pathAfterUpload = parts[1];
      const subParts = pathAfterUpload.split("/");
      // If first subpart contains commas or underscores (transformations), strip it
      if (subParts[0].includes(",") || subParts[0].includes("f_") || subParts[0].includes("q_")) {
        publicId = subParts.slice(1).join("/");
      } else {
        publicId = pathAfterUpload;
      }
    }
  }

  const {
    width,
    height,
    crop = "limit",
    quality = "auto",
    format = "auto",
    gravity = "auto",
  } = options;

  const transforms: string[] = [`f_${format}`, `q_${quality}`];

  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width || height) {
    transforms.push(`c_${crop}`);
    if (crop === "fill" || crop === "thumb") {
      transforms.push(`g_${gravity}`);
    }
  }

  const transformString = transforms.join(",");
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformString}/${publicId}`;
}

/**
 * Custom Next.js Image loader function for Cloudinary
 */
export function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  return getCloudinaryUrl(src, {
    width,
    quality: quality ? quality : "auto",
    format: "auto",
  });
}
