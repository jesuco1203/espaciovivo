import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Catálogo Espacio Vivo",
  description:
    "Colecciones de espejos, mamparas y estructuras metálicas. Consulta precio por WhatsApp.",
};

type Coleccion = {
  nombre: string;
  carpeta: string;
  imagenes: string[];
  descripcion: string;
};

const COLECCIONES: Coleccion[] = [
  {
    nombre: "Galería de Espejos & Estilos Mixtos",
    carpeta: "galeria",
    imagenes: ["galeria-01", "galeria-02", "galeria-03", "galeria-04"],
    descripcion:
      "Composiciones de espejo en paredes completas. Reflejan la amplitud del ambiente y multiplican la luz natural.",
  },
  {
    nombre: "Espejos Verticales & de Viento",
    carpeta: "verticales",
    imagenes: ["verticales-01", "verticales-02", "verticales-03", "verticales-04"],
    descripcion:
      "Piezas de formato alto y estrecho. Perfectas para pasillos y recibidores donde el espacio es corto.",
  },
  {
    nombre: "Línea Orgánica & Formas Naturales",
    carpeta: "organica",
    imagenes: ["organica-01", "organica-02", "organica-03", "organica-04", "organico-01"],
    descripcion:
      "Contornos suaves, sin aristas. Formas que acompañan la decoración cálida y el mobiliario de madera.",
  },
  {
    nombre: "Diseños Especiales & Atelier a Medida",
    carpeta: "especiales",
    imagenes: ["especiales-01", "especiales-02", "especiales-03", "especiales-04"],
    descripcion:
      "Diseños fuera de catálogo. Se fabrican con las medidas y el acabado que pida el proyecto.",
  },
  {
    nombre: "Espejos Circulares & Iluminación Led",
    carpeta: "circulares",
    imagenes: ["circulares-01", "circulares-02", "circulares-03", "circulares-04", "led-01"],
    descripcion:
      "Espejos con luz integrada. Iluminan el rostro sin sombras y sirven de lámpara de ambiente.",
  },
  {
    nombre: "Murales de Diseño y Galería",
    carpeta: "murales",
    imagenes: ["murales-01", "murales-02", "murales-03", "murales-04", "closet-01"],
    descripcion:
      "Murales y revestimientos de espejo que cubren muros enteros, incluidos frentes de clóset.",
  },
  {
    nombre: "Revestimiento de Espejo Modulado",
    carpeta: "revestimiento",
    imagenes: ["revestimiento-01", "revestimiento-02", "revestimiento-03", "revestimiento-04"],
    descripcion:
      "Paneles modulados que se adaptan a cualquier pared. Se instalan sin obra y sin romper el ambiente.",
  },
  {
    nombre: "Mamparas y Cristalería",
    carpeta: "mamparas",
    imagenes: ["mamparas-01", "mamparas-02", "mamparas-03", "mamparas-04"],
    descripcion:
      "Mamparas de baño en vidrio templado. Herrajes en acero inoxidable y sellado anti-humedad.",
  },
];

const WHATSAPP = "51947432228";

function urlImagen(nombre: string) {
  return `/images/catalogo-whatsapp/${nombre}.jpg`;
}

function urlWhatsApp(nombre: string) {
  const texto = encodeURIComponent(
    `Hola, me interesa la colección "${nombre}". ¿Me pasan el precio?`,
  );
  return `https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${texto}`;
}

export default function CatalogoPage() {
  const total = COLECCIONES.reduce((n, c) => n + c.imagenes.length, 0);

  return (
    <main className="min-h-screen bg-[#F6F3EE]">
      <div className="mx-auto max-w-[1320px] px-6 py-16 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.14em] text-[#8a8378] transition-colors hover:text-[#B08D57]"
        >
          <FiArrowLeft size={14} /> Volver al inicio
        </Link>

        <header className="mt-8 mb-14 max-w-[720px]">
          <h1 className="title-font text-[clamp(2rem,4.6vw,3.6rem)] font-normal leading-[1.06] tracking-tight text-[#1A1A1A]">
            Colecciones <span className="text-[#8a8378]">de espejo</span>
          </h1>
          <p className="mt-5 max-w-[560px] text-[15px] leading-relaxed text-[#5f5951]">
            {COLECCIONES.length} líneas de trabajo, {total} imágenes de ambientes
            reales. Todas se fabrican a medida. Consulta el precio de la que te
            interese por WhatsApp.
          </p>
        </header>

        <div className="grid gap-14 md:grid-cols-2 md:gap-x-10 md:gap-y-16">
          {COLECCIONES.map((col) => (
            <section key={col.carpeta} id={col.carpeta}>
              <div className="mb-5 flex items-end justify-between gap-4">
                <h2 className="title-font text-[22px] font-medium leading-tight tracking-tight text-[#1A1A1A]">
                  {col.nombre}
                </h2>
                <a
                  href={urlWhatsApp(col.nombre)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="product-ver-todos whitespace-nowrap"
                >
                  Consultar precio →
                </a>
              </div>

              <div className="mb-5 grid grid-cols-2 gap-2.5">
                {col.imagenes.map((img, i) => (
                  <figure
                    key={img}
                    className={
                      i === 0
                        ? "col-span-2 overflow-hidden rounded-[3px] border border-[#e2ded6]"
                        : "overflow-hidden rounded-[3px] border border-[#e2ded6]"
                    }
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={urlImagen(img)}
                      alt={`${col.nombre} — ambiente ${i + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
                    />
                  </figure>
                ))}
              </div>

              <p className="text-[13.5px] leading-relaxed text-[#6f695f]">
                {col.descripcion}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-20 border-t border-[#e2ded6] pt-10 text-center">
          <p className="text-[14px] text-[#6f695f]">
            ¿No encuentras lo que buscas? Se fabrica a medida.
          </p>
          <a
            href={`https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${encodeURIComponent(
              "Hola, quiero cotizar una pieza a medida.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] px-7 py-3.5 text-[13px] uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#B08D57]"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
