"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";

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

/**
 * Cuántas piezas se muestran por categoría en el home.
 * Tres columnas × dos filas = seis, igual que el prototipo aprobado.
 * El resto se ve en "Ver todos".
 */
const VISIBLES_POR_CATEGORIA = 6;

export default function ProductCarousels({
  products,
}: {
  products: Product[];
}) {
  const groupedProducts = products.reduce(
    (acc, product) => {
      (acc[product.category] = acc[product.category] || []).push(product);
      return acc;
    },
    {} as Record<string, Product[]>,
  );

  return (
    <div id="carousels-wrapper">
      {Object.entries(groupedProducts).map(([category, items]) => (
        <div key={category} className="mb-20 reveal">
          <div className="flex justify-between items-end mb-7">
            <h2 className="title-font text-2xl font-medium tracking-tight">
              {category}
            </h2>
            <Link
              href={`/search?category=${encodeURIComponent(category)}`}
              className="product-ver-todos"
            >
              Ver todos →
            </Link>
          </div>
          <div className="product-grid">
            {items.slice(0, VISIBLES_POR_CATEGORIA).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                className="reveal-soft"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
