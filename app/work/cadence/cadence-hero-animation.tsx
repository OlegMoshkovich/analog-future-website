"use client";

import { useId, useLayoutEffect, useRef } from "react";
import { animateCadenceHero, heroSlices, measureCadenceHero } from "./cadence-hero-motion";

const fallbackLayout = measureCadenceHero(1111, 458);
const gradients = [
  ["blue", "#4d73dd", "#34477e"],
  ["inner", "#5a7ee0", "#3a4c7e"],
  ["center", "#5d80e0", "#40517f"],
] as const;

export function CadenceHeroAnimation() {
  const stage = useRef<HTMLElement>(null);
  const gradientId = useId();

  useLayoutEffect(() => {
    const node = stage.current;
    if (node) return animateCadenceHero(node);
  }, []);

  return (
    <figure ref={stage} className="cadence-hero__media" data-no-motion="">
      <svg className="cadence-hero__artwork" viewBox={fallbackLayout.viewBox} role="img"
        aria-label="Blue timeslices swell in a wave and gather into the Cadence logo.">
        <defs>
          {gradients.map(([name, top, bottom]) => (
            <linearGradient key={name} id={`${gradientId}-${name}`} x2="0%" y2="100%">
              <stop stopColor={top} />
              <stop offset="1" stopColor={bottom} />
            </linearGradient>
          ))}
          <radialGradient id={`${gradientId}-halo`}>
            <stop stopColor="#7298ff" stopOpacity=".42" />
            <stop offset=".55" stopColor="#7298ff" stopOpacity=".14" />
            <stop offset="1" stopColor="#7298ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse fill={`url(#${gradientId}-halo)`} opacity="0" />
        {heroSlices.map((mark, index) => (
          <rect key={index} opacity="0" stroke="#83a3ff" strokeOpacity="0"
            fill={`url(#${gradientId}-${mark?.gradient ?? "blue"})`} />
        ))}
        <image href="/assets/projects/cadence-figma/wordmark.svg" opacity="0"
          x={fallbackLayout.wordmarkX} y={fallbackLayout.centerY - fallbackLayout.wordmarkHeight / 2}
          width={fallbackLayout.wordmarkWidth} height={fallbackLayout.wordmarkHeight} />
      </svg>
      <button className="cadence-hero__playback" type="button" aria-label="Pause animation" hidden />
    </figure>
  );
}
