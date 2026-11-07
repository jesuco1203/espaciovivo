import Link from "next/link";

/**
 * Hero cinematográfico.
 *
 * El video en bucle (17.9 s) recorre cuatro escenas del catálogo y el texto
 * cambia con él mediante @keyframes de CSS, sin una línea de JavaScript.
 *
 * Sincronización: cada texto dura lo mismo que el video y entra con un
 * retardo negativo de un cuarto de ciclo, así el titular cambia justo
 * cuando el video cambia de escena.
 */
export default function HeroCinematic() {
  return (
    <section id="inicio" className="hero-cinematic">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero-rotativo.mp4" type="video/mp4" />
      </video>

      <div className="hero-velo" />

      <div className="hero-textos">
        <article className="hero-slide">
          <div className="hero-ojo">Espejos con luz integrada</div>
          <h1>
            La luz que <em>multiplica</em> tu espacio.
          </h1>
          <p>
            Espejos retroiluminados con marco de metal, fabricados a medida para
            baños, recibidores y closets.
          </p>
          <div className="hero-acciones">
            <Link className="hero-btn hero-btn-oro" href="/#productos">
              Ver espejos
            </Link>
            <Link className="hero-btn hero-btn-borde" href="/#productos">
              Galería
            </Link>
          </div>
        </article>

        <article className="hero-slide">
          <div className="hero-ojo">Mamparas de vidrio templado</div>
          <h1>
            Vidrio que <em>ordena</em> el ambiente.
          </h1>
          <p>
            Mamparas plegables y corredizas en vidrio templado de 8 y 10 mm, con
            herrajes en acero inoxidable o negro mate.
          </p>
          <div className="hero-acciones">
            <Link className="hero-btn hero-btn-oro" href="/#productos">
              Ver mamparas
            </Link>
            <Link className="hero-btn hero-btn-borde" href="/#contacto">
              Medidas
            </Link>
          </div>
        </article>

        <article className="hero-slide">
          <div className="hero-ojo">Estructuras decorativas</div>
          <h1>
            Metal y espejo, <em>hechos a mano</em>.
          </h1>
          <p>
            Repisas, exhibidores y paneles en acero y aluminio. Piezas únicas que
            combinan estructura y reflejo.
          </p>
          <div className="hero-acciones">
            <Link className="hero-btn hero-btn-oro" href="/#productos">
              Ver estructuras
            </Link>
            <Link className="hero-btn hero-btn-borde" href="/#contacto">
              Proyectos
            </Link>
          </div>
        </article>

        <article className="hero-slide">
          <div className="hero-ojo">Proyectos a medida</div>
          <h1>
            Tu espacio, <em>tu medida</em>.
          </h1>
          <p>
            Diseñamos y fabricamos la pieza exacta que necesitas. Visita técnica
            sin costo en Huancayo.
          </p>
          <div className="hero-acciones">
            <Link className="hero-btn hero-btn-oro" href="/#contacto">
              Agendar visita
            </Link>
            <Link className="hero-btn hero-btn-borde" href="/#productos">
              Catálogo
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
