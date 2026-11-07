import ProductCarousels from "@/components/ProductCarousels";
import { Suspense } from "react";

interface Product {
  id: number;
  name: string;
  image_url: string | null;
  storage_key: string | null;
  product_images: { storage_key: string | null; image_url?: string | null }[];
  tag: string | null;
  category: string;
  variants: {
    id: number;
    price: number;
    color: string | null;
    size: string | null;
    image_url: string | null;
    storage_key?: string | null;
  }[];
}

interface MainContentProps {
  products: Product[];
}

export default function MainContent({ products }: MainContentProps) {
  return (
    <section id="productos" className="py-16">
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-10" id="product-section-container">
        <Suspense fallback={<div>Cargando productos...</div>}>
          <ProductCarousels products={products} />
        </Suspense>
      </div>
    </section>
  );
}
