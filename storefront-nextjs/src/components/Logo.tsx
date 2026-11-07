/**
 * Identidad de Espacio Vivo.
 *
 * El símbolo es un arco (umbral, espacio) con una hoja vertical (vida).
 * Geometría exacta, trazo uniforme de 10 px, dos colores de marca.
 * Se renderiza como SVG en línea: nítido a cualquier tamaño y sin
 * peticiones de red.
 */

export function LogoSymbol({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Espacio Vivo"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Arco: puerta / umbral */}
        <path
          d="M 60 190 L 60 100 A 60 60 0 0 1 180 100 L 180 190 Z"
          stroke="#1A1A1A"
          strokeWidth="10"
        />
        {/* Hoja: vida */}
        <path
          d="M 120 80 C 151 100, 151 140, 120 164 C 89 140, 89 100, 120 80 Z"
          stroke="#B08D57"
          strokeWidth="10"
        />
        {/* Nervadura central */}
        <path d="M 120 88 L 120 156" stroke="#B08D57" strokeWidth="5" />
        {/* Tallo */}
        <path d="M 120 164 L 120 180" stroke="#B08D57" strokeWidth="5" />
      </g>
    </svg>
  );
}

export default function Logo({
  size = 36,
  showWordmark = true,
  className = "",
}: {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoSymbol size={size} />
      {showWordmark && (
        <span className="title-font text-[13px] font-semibold uppercase leading-none tracking-[0.18em] text-[#1A1A1A]">
          Espacio Vivo
        </span>
      )}
    </span>
  );
}
