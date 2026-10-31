"use client";

import { useEffect, useRef, useState } from "react";
import { dotIllustrations, nextDotIllustration, type DotIllustration } from "./dot-illustrations";
import "./connect-the-dots.css";

const duration = 36000;
type DrawingState = "idle" | "playing" | "paused" | "complete" | "reduced";
type DrawingControls = { toggle: () => void; replay: () => void };

export function ConnectTheDots() {
  // Keep the server-rendered tree as the no-JavaScript fallback. Selection only
  // happens after hydration, once per visit (including React's effect replay).
  const [illustration, setIllustration] = useState(dotIllustrations[0]);
  const selected = useRef(false);
  useEffect(() => {
    if (selected.current) return;
    selected.current = true;
    let storage: Storage | null = null;
    try { storage = window.localStorage; } catch { /* Storage is optional. */ }
    setIllustration(nextDotIllustration(storage));
  }, []);
  return <DotDrawing key={illustration.id} illustration={illustration} />;
}

function DotDrawing({ illustration }: { illustration: DotIllustration }) {
  const { points, labels, outline, opening, details, shadeOpacity } = illustration;
  const figureRef = useRef<HTMLElement>(null);
  const controls = useRef<DrawingControls | null>(null);
  const [state, setState] = useState<DrawingState>("complete");

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;
    const traces = Array.from(figure.querySelectorAll<SVGPathElement>("[data-dot-trace]"));
    const path = traces[0];
    const shading = figure.querySelector<SVGGElement>("[data-dot-shading]");
    const pencil = figure.querySelector<SVGGElement>("[data-dot-pencil]");
    const detailLines = figure.querySelector<SVGPathElement>("[data-dot-details]");
    if (!path || !shading || !pencil || typeof window.IntersectionObserver !== "function") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const length = path.getTotalLength();
    let frame = 0;
    let elapsed = 0;
    let previous = 0;
    let visible = false;
    let paused = false;
    let complete = false;
    let disposed = false;

    const paint = (progress: number) => {
      figure.dataset.progress = progress.toFixed(3);
      for (const trace of traces) trace.setAttribute("stroke-dashoffset", String(1 - progress));
      shading.style.opacity = String(Math.max(0, Math.min(shadeOpacity, (progress - .68) / .32 * shadeOpacity)));
      if (detailLines) detailLines.style.opacity = String(Math.max(0, Math.min(1, (progress - .68) / .32)));
      const tip = path.getPointAtLength(progress * length);
      pencil.setAttribute("transform", `translate(${tip.x} ${tip.y})`);
    };
    const stop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
    };
    const tick = (now: number) => {
      if (disposed || !visible || paused || preference.matches) return;
      if (previous) elapsed += now - previous;
      previous = now;
      const progress = Math.min(1, elapsed / duration);
      paint(progress);
      if (progress === 1) {
        complete = true;
        frame = 0;
        setState("complete");
      } else frame = window.requestAnimationFrame(tick);
    };
    const play = () => {
      if (disposed || frame || !visible || paused || complete || preference.matches) return;
      previous = 0;
      setState("playing");
      frame = window.requestAnimationFrame(tick);
    };
    const onPreference = () => {
      stop();
      if (preference.matches) {
        paint(1);
        setState("reduced");
      } else {
        paint(Math.min(1, elapsed / duration));
        setState(complete ? "complete" : paused ? "paused" : "idle");
        play();
      }
    };
    controls.current = {
      toggle: () => {
        if (preference.matches || complete) return;
        paused = !paused;
        if (paused) { stop(); setState("paused"); }
        else play();
      },
      replay: () => {
        if (preference.matches) return;
        stop();
        elapsed = 0;
        complete = false;
        paused = false;
        paint(0);
        play();
      },
    };
    onPreference();
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) play();
      else {
        stop();
        if (!complete && !preference.matches) setState(paused || elapsed > 0 ? "paused" : "idle");
      }
    }, { threshold: .18 });
    observer.observe(figure);
    preference.addEventListener("change", onPreference);
    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      preference.removeEventListener("change", onPreference);
      controls.current = null;
    };
  }, [shadeOpacity]);

  return (
    <figure className="studio-dot-study" id="studio-dot-study" ref={figureRef} data-state={state} data-illustration={illustration.id} aria-labelledby="studio-dot-title">
      <div className="studio-dot-study__artwork">
        <svg className="studio-dot-study__drawing" viewBox="0 140 750 790" role="img" aria-labelledby="studio-dot-title studio-dot-description">
          <title id="studio-dot-title">{illustration.title}</title>
          <desc id="studio-dot-description">{illustration.description}</desc>
          <defs>
            <filter id="studio-dot-pencil-texture" x="-3%" y="-3%" width="106%" height="106%">
              <feTurbulence type="fractalNoise" baseFrequency=".075" numOctaves="3" seed="17" result="grain" />
              <feDisplacementMap in="SourceGraphic" in2="grain" scale="2.3" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <pattern id="studio-dot-hatching" width="5" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
              <path d="M0 0 V7 M3 0 V7" fill="none" stroke="#292a27" strokeWidth=".7" opacity=".6" />
            </pattern>
          </defs>
          <g data-dot-shading="" opacity={shadeOpacity} filter="url(#studio-dot-pencil-texture)">
            <path d={outline + " " + opening} fill="currentColor" fillRule="evenodd" />
            <path d={outline + " " + opening} fill="url(#studio-dot-hatching)" fillRule="evenodd" />
            {opening && <path d={opening} fill="none" stroke="currentColor" strokeWidth="1.2" />}
          </g>
          {details && <path className="studio-dot-study__details" data-dot-details="" d={details} opacity="1" />}
          <path className="studio-dot-study__trace studio-dot-study__trace--soft" data-dot-trace="" d={outline} pathLength="1" strokeDasharray="1" strokeDashoffset="0" filter="url(#studio-dot-pencil-texture)" />
          <path className="studio-dot-study__trace" data-dot-trace="" d={outline} pathLength="1" strokeDasharray="1" strokeDashoffset="0" />
          <g aria-hidden="true">
            {points.map(([x, y], index) => {
              return (
                <g className="studio-dot-study__point" data-major={index % 4 === 0 || index === points.length - 1 ? "" : undefined} key={index} transform={`translate(${x} ${y})`}>
                  <circle className="studio-dot-study__dot" r="1.5" />
                  <text className="studio-dot-study__number" x={labels[index][0] - x} y={labels[index][1] - y} textAnchor="middle" dominantBaseline="central">{index + 1}</text>
                </g>
              );
            })}
          </g>
          <g className="studio-dot-study__pencil" data-dot-pencil="" aria-hidden="true"><circle r="3" /></g>
        </svg>
      </div>
      <div className="studio-dot-study__controls">
        <button type="button" onClick={() => controls.current?.toggle()} disabled={state === "idle" || state === "complete" || state === "reduced"} aria-label={state === "paused" ? "Resume the drawing" : "Pause the drawing"}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {state === "paused" ? <path d="M7 4 20 12 7 20Z" /> : <path d="M8 5v14M16 5v14" />}
          </svg>
        </button>
        <button type="button" onClick={() => controls.current?.replay()} disabled={state === "reduced"} aria-label="Draw the illustration again">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6v6h-6M20 12a8 8 0 1 0-2.35 5.65" />
          </svg>
        </button>
      </div>
    </figure>
  );
}
