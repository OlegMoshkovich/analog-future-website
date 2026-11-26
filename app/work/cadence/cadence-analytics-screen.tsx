"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import {
  cardFill, focusAreas, measureMood, measureReel, moodDuration, reelLayouts, type AnalyticsView,
} from "./cadence-analytics-motion";

function NumberReels({ view, screenshot }: {
  view: Exclude<AnalyticsView, "mood">;
  screenshot: string;
}) {
  const { value, top, height, baseline, size, color, slots } = reelLayouts[view];

  return (
    <g fill={color} fontFamily="Karla, sans-serif" fontWeight="200" fontSize={size}>
      {slots.map(([left, width], index) => {
        const reel = measureReel(value[index], index, height);
        const digitScale = Math.min(0.92, width / (size * 0.64));
        const motion = {
          "--cadence-reel-travel": `${reel.travel}px`,
          "--cadence-reel-overshoot": `${reel.overshoot}px`,
          "--cadence-reel-duration": `${reel.duration}ms`,
        } as CSSProperties;

        return (
          <svg key={left} x={left} y={top} width={width} height={height} overflow="hidden">
            <rect width={width} height={height} fill={cardFill} />
            <g className="cadence-analytics__reel" style={motion}>
              <g transform={`translate(${width / 2} 0) scale(${digitScale} 1)`}>
                {reel.rows.map(({ offset, digit }) => (
                  <text key={offset} x="0" y={baseline - top + offset} textAnchor="middle">{digit}</text>
                ))}
              </g>
              <svg width={width} height={height} overflow="hidden">
                <use href={screenshot} x={-left} y={-top} />
              </svg>
            </g>
          </svg>
        );
      })}
    </g>
  );
}

function HoursSweep() {
  return (
    <g fill={cardFill}>
      <circle className="cadence-analytics__ring-cover" cx="322.5" cy="544.5" r="90.5"
        transform="rotate(-90 322.5 544.5)" fill="none" stroke={cardFill}
        strokeWidth="49" pathLength="1" strokeDasharray="1 1" />
      <path className="cadence-analytics__callout-cover"
        d="M386 452 L408 434 H428 V408 H482 V458 H429 V440 H409 L389 455 Z" />
    </g>
  );
}

const initialMood = measureMood(0);

function MoodPlot() {
  const plot = useRef<SVGGElement>(null);

  useEffect(() => {
    const node = plot.current;
    const line = node?.querySelector("polyline");
    if (!node || !line) return;
    const dots = Array.from(node.querySelectorAll("circle"));
    let start: number | undefined;
    let frame = requestAnimationFrame(function draw(now) {
      start ??= now;
      const elapsed = now - start;
      const points = measureMood(elapsed);
      line.setAttribute("points", points.map(({ x, y }) => `${x},${y}`).join(" "));
      points.forEach(({ y }, index) => dots[index].setAttribute("cy", String(y)));
      if (elapsed < moodDuration) frame = requestAnimationFrame(draw);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <g ref={plot}>
      <rect x="185" y="425" width="309" height="226" fill={cardFill} />
      <path d="M186 460.5h306 M186 503.5h306 M186 546.5h306 M186 589.5h306 M186 632.5h306"
        fill="none" stroke="#29292e" strokeWidth="1" />
      <polyline points={initialMood.map(({ x, y }) => `${x},${y}`).join(" ")}
        fill="none" stroke="#6c95ef" strokeWidth="1.1" strokeLinejoin="round" />
      {initialMood.map(({ x, y }) => <circle key={x} cx={x} cy={y} r="3.4" fill="#6c95ef" />)}
    </g>
  );
}

export function CadenceAnalyticsScreen({ view, src, alt, width, height, crop }: {
  view: AnalyticsView;
  src: string;
  alt: string;
  width: number;
  height: number;
  crop?: string;
}) {
  const focus = useRef<SVGRectElement>(null);
  const imageId = useId();
  const [playing, setPlaying] = useState(false);
  const [x, y, focusWidth, focusHeight] = focusAreas[view];

  useEffect(() => {
    const target = focus.current;
    if (!target || !("IntersectionObserver" in window)) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let played = false;

    const update = () => {
      if (motion.matches) {
        setPlaying(false);
      } else if (inView && !played && !document.hidden) {
        played = true;
        setPlaying(true);
        observer.disconnect();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.intersectionRatio >= 0.65;
      update();
    }, { threshold: 0.65 });
    observer.observe(target);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);

    return () => {
      observer.disconnect();
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <svg viewBox={crop ?? `0 0 ${width} ${height}`} className="cadence-analytics__artwork" role="img" aria-label={alt}>
      <image id={imageId} href={src} width={width} height={height} />
      <rect ref={focus} x={x} y={y} width={focusWidth} height={focusHeight} fill="none" aria-hidden="true" />
      {playing && (
        <g className="cadence-analytics__motion" aria-hidden="true" pointerEvents="none"
          onAnimationEnd={event => {
            if (event.target === event.currentTarget) setPlaying(false);
          }}>
          {view === "hours" && <HoursSweep />}
          {view === "mood" ? <MoodPlot /> : <NumberReels view={view} screenshot={`#${imageId}`} />}
        </g>
      )}
    </svg>
  );
}
