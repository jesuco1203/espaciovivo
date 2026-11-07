"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveal al hacer scroll — réplica del efecto de norumestudio.com.ar.
 *
 * Medido en el original:
 *   · IntersectionObserver con umbral 0.16
 *   · 24px de desplazamiento vertical
 *   · transición de 700ms ease
 *   · escalonado de 80ms por elemento dentro del mismo grupo (máximo 4)
 *
 * El CSS sólo oculta los elementos cuando <html> lleva la clase .js, que
 * añade el script en línea del layout. Así, si JavaScript no carga, el
 * contenido se ve completo y nunca queda una página en blanco.
 *
 * Se vuelve a ejecutar en cada cambio de ruta para que las páginas que se
 * navegan del lado del cliente también revelen su contenido.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const elementos = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, .reveal-soft"),
    ).filter((el) => !el.classList.contains("is-visible"));

    if (elementos.length === 0) return;

    // Sin soporte de IntersectionObserver: mostrar todo de inmediato.
    if (typeof IntersectionObserver === "undefined") {
      elementos.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    // Escalonado sólo para las tarjetas: los bloques de sección entran sin
    // retardo para que no se sientan lentos al hacer scroll.
    const contadorPorPadre = new WeakMap<Element, number>();
    elementos.forEach((el) => {
      if (!el.classList.contains("reveal-soft")) return;
      const padre = el.parentElement;
      if (!padre) return;
      const indice = contadorPorPadre.get(padre) ?? 0;
      contadorPorPadre.set(padre, indice + 1);
      const retardo = Math.min(indice, 4) * 80;
      if (retardo > 0) el.style.transitionDelay = `${retardo}ms`;
    });

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          const el = entrada.target as HTMLElement;
          el.classList.add("is-visible");
          // Una vez revelado no volvemos a observarlo: el efecto no se repite.
          observer.unobserve(el);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    elementos.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
