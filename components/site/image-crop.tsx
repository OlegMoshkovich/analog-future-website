export function ImageCrop({ src, width, height, crop, alt, className = "", preserveAspectRatio = "xMidYMid meet" }: {
  src: string;
  width: number;
  height: number;
  crop: string;
  alt: string;
  className?: string;
  preserveAspectRatio?: string;
}) {
  return <svg className={`image-crop ${className}`.trim()} viewBox={crop} preserveAspectRatio={preserveAspectRatio} role="img" aria-label={alt}>
    <image href={src} width={width} height={height} />
  </svg>;
}

export function ColumnGrid() {
  return <svg className="identity-column-grid" viewBox="0 0 480 240" fill="none"
    stroke="currentColor" strokeWidth="1" role="img" aria-label="Twelve column layout grid">
    <rect x=".5" y=".5" width="479" height="239" />
    {Array.from({ length: 11 }, (_, i) => <path key={`v${i}`} d={`M${(i + 1) * 40} 0V240`} />)}
    {Array.from({ length: 3 }, (_, i) => <path key={`h${i}`} d={`M0 ${(i + 1) * 60}H480`} />)}
  </svg>;
}
