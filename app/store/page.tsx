import { getProducts } from "@/app/lib/action/products";
import Store from "./Store";
import type { Product } from "@/app/lib/store-data";

export default async function StorePage() {
  const dbProducts = await getProducts();

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

  return <Store products={products} />;
}