"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart, type CartItem } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductTag from "./ProductTag";
import { FiHeart, FiShoppingCart, FiSearch, FiShare2 } from "react-icons/fi";
import { resolveImageSrc, PLACEHOLDER } from "@/lib/images";

interface Product {
  id: number;
  name: string;
  image_url: string | null;
  storage_key: string | null;
  tag: string | null;
  category?: string;
  product_images: { storage_key: string | null; image_url?: string | null }[];
  variants: {
    id: number;
    price: number;
    color: string | null;
    size: string | null;
    image_url: string | null;
    storage_key?: string | null;
  }[];
}

export default function ProductCard({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { addToCart } = useCart();
  const { toggleWish, isWishlisted } = useWishlist(); // Add this line

  const galleryImage = product.product_images?.find((img) =>
    Boolean(resolveImageSrc(img)),
  );

  const featuredImage =
    resolveImageSrc({
      storage_key: galleryImage?.storage_key ?? product.storage_key,
      image_url: galleryImage?.image_url ?? product.image_url,
    }) ?? PLACEHOLDER;

  // Segunda foto del producto: se muestra al pasar el cursor (crossfade)
  const hoverImage =
    (product.product_images ?? [])
      .map((img) => resolveImageSrc(img))
      .find((src) => Boolean(src) && src !== featuredImage) ?? null;

  const minPrice =
    product.variants.length > 0
      ? Math.min(...product.variants.map((v) => v.price))
      : 0;

  const handleAddToCart = () => {
    if (product.variants.length === 0) {
      alert(
        "Este producto no tiene variantes disponibles para añadir al carrito.",
      );
      return;
    }

    // For the main page, we add the first variant by default
    const variantToAdd = product.variants[0];

    const variantImage =
      resolveImageSrc({
        storage_key: variantToAdd?.storage_key ?? null,
        image_url: variantToAdd?.image_url ?? null,
      }) ?? featuredImage ?? PLACEHOLDER;

    const itemToAdd: Omit<CartItem, "quantity"> = {
      id: variantToAdd.id,
      productId: product.id,
      name: product.name,
      price: variantToAdd.price,
      image: variantImage,
      color: variantToAdd.color,
      size: variantToAdd.size,
    };

    addToCart(itemToAdd);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/product/${product.id}`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: product.name, url });
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert("Enlace copiado al portapapeles.");
      }
    } catch {
      /* El usuario canceló o el navegador no permite compartir */
    }
  };

  return (
    <div
      className={`product-card group relative w-full flex flex-col ${className}`}
    >
      <Link href={`/product/${product.id}`} className="block flex-1">
        <div className="flex h-full flex-col">
          <div className="px-[15px] pt-[30px]">
            <div className="relative w-full pt-[100%]">
            <Image
              src={featuredImage ?? PLACEHOLDER}
              alt={product.name}
              fill
              className={`object-cover transition-opacity duration-500 ease-out ${
                hoverImage ? "md:group-hover:opacity-0" : "product-zoom-img"
              }`}
              sizes="(max-width: 620px) 100vw, (max-width: 900px) 50vw, 33vw"
            />

            {hoverImage && (
              <Image
                src={hoverImage}
                alt={`${product.name} — vista alternativa`}
                fill
                className="product-alt-img object-cover"
                sizes="(max-width: 620px) 100vw, (max-width: 900px) 50vw, 33vw"
              />
            )}

            {product.tag && <ProductTag tag={product.tag} />}
            </div>
          </div>
          <div className="flex flex-col px-[15px] pt-[20px] pb-[26px]">
            {product.category && (
              <div className="product-card-cat">{product.category}</div>
            )}
            <h3 className="product-card-name line-clamp-2">{product.name}</h3>
            <span className="product-card-price">
              {minPrice > 0 ? `S/ ${minPrice.toFixed(2)}` : "Consultar precio"}
            </span>
          </div>
        </div>
      </Link>

      {/* Barra de acciones: aparece al pasar el cursor */}
      <div className="product-action-bar" role="group" aria-label="Acciones del producto">
        {minPrice > 0 ? (
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label="Añadir al carrito"
            title="Añadir al carrito"
          >
            <FiShoppingCart size={18} />
          </button>
        ) : (
          <a
            href={`https://api.whatsapp.com/send?phone=51947432228&text=${encodeURIComponent(
              `Hola, me interesa la pieza "${product.name}". ¿Me pasan el precio?`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar precio por WhatsApp"
            title="Consultar precio"
          >
            <FiShoppingCart size={18} />
          </a>
        )}
        <Link
          href={`/product/${product.id}`}
          aria-label="Ver producto"
          title="Ver producto"
        >
          <FiSearch size={18} />
        </Link>
        <button
          type="button"
          onClick={handleShare}
          aria-label="Compartir"
          title="Compartir"
        >
          <FiShare2 size={18} />
        </button>
        <button
          type="button"
          onClick={() => toggleWish(product.id)}
          aria-label="Añadir a favoritos"
          title="Añadir a favoritos"
          className={isWishlisted(product.id) ? "is-active" : undefined}
        >
          <FiHeart
            size={18}
            fill={isWishlisted(product.id) ? "currentColor" : "none"}
          />
        </button>
      </div>
    </div>
  );
}
