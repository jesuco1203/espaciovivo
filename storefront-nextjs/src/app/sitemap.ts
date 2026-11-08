import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("id");

  if (error) {
    console.error("Error fetching products for sitemap:", error);
    return [];
  }

  const productUrls = (products ?? []).map((product: { id: number }) => ({
    url: `https://espaciovivo.vip/product/${product.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: "https://espaciovivo.vip",
      lastModified: new Date(),
    },
    ...productUrls,
  ];
}
