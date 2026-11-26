"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import "./mobile-screenshot-carousel.css";

type Screenshot = {
  title: string;
  src: string;
  alt: string;
  crop: string;
  width: number;
  height: number;
};

export function MobileScreenshotCarousel({ id, label, slides, artwork }: {
  id: string;
  label: string;
  slides: readonly Screenshot[];
  artwork?: Readonly<Record<number, ReactNode>>;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const moveTo = (index: number) => {
    const track = viewport.current;
    if (!track) return;
    const first = track.children[0] as HTMLElement;
    const slide = track.children[index] as HTMLElement;
    track.scrollTo({
      left: slide.offsetLeft - first.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  const updateActive = () => {
    const track = viewport.current;
    if (!track) return;
    const first = track.children[0] as HTMLElement;
    const distances = Array.from(track.children, slide =>
      Math.abs((slide as HTMLElement).offsetLeft - first.offsetLeft - track.scrollLeft));
    setActive(distances.indexOf(Math.min(...distances)));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    const target = event.key === "ArrowRight" ? Math.min(active + 1, slides.length - 1)
      : event.key === "ArrowLeft" ? Math.max(active - 1, 0)
      : event.key === "Home" ? 0 : event.key === "End" ? slides.length - 1 : null;
    if (target === null) return;
    event.preventDefault();
    moveTo(target);
  };

  return (
    <div className="mobile-screenshot-carousel" role="region" aria-roledescription="carousel" aria-label={label} data-no-motion>
      <div className="mobile-screenshot-carousel__viewport" id={id} ref={viewport}
        tabIndex={0} aria-label={`${label}. Swipe or use the arrow keys to browse.`}
        onScroll={updateActive} onKeyDown={onKeyDown}>
        {slides.map((slide, index) => (
          <figure className="mobile-screenshot-carousel__slide" key={slide.title}
            role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}>
            <figcaption>{slide.title}</figcaption>
            {artwork?.[index] ?? <svg viewBox={slide.crop} className="mobile-screenshot-carousel__artwork" role="img" aria-label={slide.alt}>
              <image href={slide.src} width={slide.width} height={slide.height} />
            </svg>}
          </figure>
        ))}
      </div>
      <div className="mobile-screenshot-carousel__controls">
        <button type="button" onClick={() => moveTo(active - 1)} disabled={active === 0}
          aria-label={`Previous ${label.toLowerCase()} image`} aria-controls={id}>←</button>
        <div className="mobile-screenshot-carousel__dots">
          {slides.map((slide, index) => (
            <button key={slide.title} type="button" onClick={() => moveTo(index)}
              aria-label={`Show ${slide.title}`} aria-pressed={index === active} aria-controls={id}>
              <span />
            </button>
          ))}
        </div>
        <span className="mobile-screenshot-carousel__count" aria-live="polite" aria-atomic="true">{active + 1} / {slides.length}</span>
        <button type="button" onClick={() => moveTo(active + 1)} disabled={active === slides.length - 1}
          aria-label={`Next ${label.toLowerCase()} image`} aria-controls={id}>→</button>
      </div>
    </div>
  );
}
