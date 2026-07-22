// app/store/page.tsx

import { getProducts } from "@/app/lib/action/products";
import Store from "./Store";
import type { Product } from "@/app/lib/store-data";

export const metadata = {
  title: "Academy Store | Lakhisarai Physical Academy",
  description:
    "Shop training essentials, fitness accessories, sportswear and study materials for Army, Police, SSC GD and other government exam prep.",
};

export default async function StorePage() {
  let dbProducts: Awaited<ReturnType<typeof getProducts>> = [];
  let productsError = false;

  try {
    dbProducts = await getProducts();
  } catch (err) {
    console.error("Failed to load products:", err);
    productsError = true;
  }

  const products: Product[] = dbProducts.map((p) => ({
    name: p.name,
    category: p.category,
    price: p.price,
    originalPrice: p.original_price ?? undefined,
    rating: p.rating ?? undefined,
    availability: p.availability,
    offer: p.offer ?? undefined,
    imageUrl: p.image_url ?? undefined,
  }));

  return <Store products={products} productsError={productsError} />;
}