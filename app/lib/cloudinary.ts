import crypto from "crypto";

/**
 * Cloudinary Helper Utilities for Lakhisarai Physical Academy
 * Implements automatic format (AVIF/WebP) and quality optimization (q_auto, f_auto)
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || "demo";

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

/**
 * Uploads an image file to Cloudinary from server actions using Signed API Key or Unsigned Upload Preset.
 */
export async function uploadToCloudinary(
  file: File,
  folder: string = "lakhisarai_academy"
): Promise<string | null> {
  let cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
  let apiKey = process.env.CLOUDINARY_API_KEY;
  let apiSecret = process.env.CLOUDINARY_API_SECRET;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // Fallback parsing from CLOUDINARY_URL if needed
  if ((!cloudName || !apiKey || !apiSecret) && process.env.CLOUDINARY_URL) {
    const match = process.env.CLOUDINARY_URL.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
    if (match) {
      if (!apiKey) apiKey = match[1];
      if (!apiSecret) apiSecret = match[2];
      if (!cloudName) cloudName = match[3];
    }
  }

  if (!cloudName) {
    console.warn("Cloudinary cloud name is not configured in environment variables.");
    return null;
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = `data:${file.type || "image/jpeg"};base64,${buffer.toString("base64")}`;

    const formData = new FormData();
    formData.append("file", base64Data);

    if (apiKey && apiSecret) {
      // Signed Upload
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
      const signature = crypto.createHash("sha1").update(paramsToSign).digest("hex");

      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("folder", folder);
      formData.append("signature", signature);
    } else if (uploadPreset) {
      // Unsigned Upload
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", folder);
    } else {
      console.warn("Neither CLOUDINARY_API_SECRET nor CLOUDINARY_UPLOAD_PRESET is configured.");
      return null;
    }

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errJson = await res.json();
      console.error("Cloudinary upload API error:", errJson);
      return null;
    }

    const data = await res.json();
    return data.secure_url || data.url;
  } catch (err) {
    console.error("uploadToCloudinary exception:", err);
    return null;
  }
}
