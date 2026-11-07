import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartModal from "@/components/CartModal";
import ScrollReveal from "@/components/ScrollReveal";
import { Providers } from "@/context/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Espacio Vivo | Espejos, Vidrio y Estructuras Metálicas",
  description:
    "Espejos, mamparas de vidrio templado y estructuras metálicas a medida en Huancayo. Fabricación propia y acabados que resisten la humedad.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Espacio Vivo | Espejos, Vidrio y Estructuras Metálicas",
    description:
      "Espejos, mamparas de vidrio templado y estructuras metálicas a medida en Huancayo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://deco-estilos.vercel.app" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper/swiper-bundle.min.css"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Marca el documento como "con JavaScript" antes de pintar.
            Sin esta clase, el CSS no oculta nada: si JS falla, el
            contenido se ve completo en lugar de quedar en blanco. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');`,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} font-sans pt-16 bg-[#F6F3EE] min-h-screen`}
      >
        <Providers>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main id="main-content">{children}</main>
          <Footer />
          <CartModal />
          <WhatsAppButton />
          <ScrollReveal />
        </Providers>
      </body>
    </html>
  );
}
