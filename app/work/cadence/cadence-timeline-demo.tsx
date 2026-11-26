"use client";

import { useEffect, useId, useRef, useState } from "react";

const featureImage = "/assets/projects/cadence-figma/feature@2x.png";
const colors = ["#2440b3", "#ba6578", "#e89f85", "#7838e7", "#71a100", "#754f49", "#bd74a9", "#686499", "#35722e"];
const day = [0, 0, 0, 0, 0, 0, 8, 2, 1, 1, 1, 1, 1, 0, 0, 0, 3, 2, 1, 4, 5, 6, 7, 8];
const dwell = 880;
const slide = 740;
const stepDuration = dwell + slide;

function DailyTimeline() {
  const viewport = useRef<SVGGElement>(null);
  const clipId = useId();
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const node = viewport.current;
    if (!node || !("IntersectionObserver" in window)) return;

    let visible = false;
    let frame = 0;
    let elapsed = 0;
    let previous: number | undefined;

    const tick = (now: number) => {
      if (previous !== undefined) elapsed += Math.min(now - previous, 50);
      previous = now;
      setTime(elapsed);
      frame = requestAnimationFrame(tick);
    };

    const updatePlayback = () => {
      cancelAnimationFrame(frame);
      previous = undefined;
      if (motion.matches) {
        elapsed = 0;
        setTime(null);
      } else if (visible && !document.hidden) {
        frame = requestAnimationFrame(tick);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    }, { threshold: 0.35 });
    observer.observe(node);
    motion.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener("change", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
    };
  }, []);

  const elapsed = time ?? 0;
  const currentHour = Math.floor(elapsed / stepDuration) + 16;
  const stepTime = elapsed % stepDuration;
  const progress = Math.max(0, (stepTime - dwell) / slide);
  const offset = progress * progress * (3 - 2 * progress);
  const category = day[currentHour % 24];
  const highlight = Math.min(1, stepTime / 200) * (1 - offset);
  const label = (hour: number) => String(hour % 24).padStart(2, "0");

  return (
    <g ref={viewport} aria-hidden="true">
      <defs><clipPath id={clipId}><rect x="155" y="231" width="479" height="452" /></clipPath></defs>
      <rect x="155" y="231" width="479" height="452" fill="transparent" />
      {time !== null && <>
        <g clipPath={`url(#${clipId})`}>
          <rect x="155" y="231" width="479" height="452" fill="#18181b" />
          {Array.from({ length: 13 }, (_, index) => {
            const position = index - 6 - offset;
            const hour = currentHour + index - 6;
            const distance = Math.abs(position);
            const focus = Math.exp(-0.88 * distance * distance);
            const height = 318 + 59 * focus;
            const width = 43 + 7 * focus;
            const center = 400 + position * 47;
            const selectedColor = colors[day[hour % 24]];

            return (
              <g key={hour}>
                <text x={center} y="258" textAnchor="middle" fill="#dedee5" opacity={0.35 + 0.55 * focus}
                  fontSize={13 + 3 * focus}>{label(hour)}</text>
                <rect x={center - width / 2} y={470 - height / 2} width={width} height={height} rx="15"
                  fill={hour <= currentHour ? selectedColor : "none"}
                  fillOpacity={hour === currentHour ? Math.min(1, 0.8 + stepTime / 450) : 1}
                  stroke={hour > currentHour ? "#3a3a46" : undefined} />
              </g>
            );
          })}
        </g>
        <rect x="239" y="690" width="307" height="32" fill="#18181b" />
        <text x="394" y="715" textAnchor="middle" fill="#f5f4f7" fontSize="19">
          What did you do at {label(currentHour)}:00?
        </text>
        <rect x={197 + (category % 3) * 139} y={765 + Math.floor(category / 3) * 68} width="119" height="40" rx="20"
          fill={colors[category]} fillOpacity={highlight * 0.12}
          stroke={colors[category]} strokeWidth="2" strokeOpacity={highlight * 0.85} />
      </>}
    </g>
  );
}

const yearMonths = [
  ["February", 28], ["March", 31], ["April", 30], ["May", 31], ["June", 30], ["July", 31],
  ["August", 31], ["September", 30], ["October", 31], ["November", 30], ["December", 31],
] as const;
const yearColors = ["#2440b3", "#ba6578", "#174b08", "#6ca000", "#754f49", "#686499", "#528bc1"];
const monthHeight = 628;

function yearColor(month: number, day: number, hour: number) {
  const variation = (day * 19 + month * 29 + hour * 11 + day * hour) % 23;
  const wake = 5 + (day + month) % 3;
  const afternoon = 15 + (day + month * 2) % 4;
  if (hour < wake || hour >= 21 + (day + month) % 3) return yearColors[0];
  if (hour < wake + 2) return yearColors[variation > 16 ? 3 : 2];
  if (hour < afternoon && (day + month) % 7 < 5) return yearColors[variation > 18 ? 2 : 1];
  return yearColors[2 + (variation + month) % 5];
}

function YearMonth({ name, days, month }: { name: string; days: number; month: number }) {
  const paths = new Map(yearColors.map(color => [color, ""]));
  for (let day = 0; day < days; day++) {
    for (let hour = 0; hour < 24; hour++) {
      const color = yearColor(month, day, hour);
      const x = (1467 + hour * 17.1).toFixed(1);
      const y = (243 + day * 17.1).toFixed(1);
      paths.set(color, paths.get(color) + `M${x} ${y}h15.7v15.7h-15.7z`);
    }
  }

  return (
    <g transform={`translate(0 ${(month + 1) * monthHeight})`}>
      <text x="1465" y="194" fontSize="34" fill="#f5f4f7">{name}</text>
      {[0, 6, 12, 18, 22].map(hour => (
        <text key={hour} x={1467 + hour * 17.1} y="237" fill="#909099" fontSize="12">
          {String(hour).padStart(2, "0")}
        </text>
      ))}
      {Array.from({ length: days }, (_, day) => (
        <text key={day} x="1434" y={255 + day * 17.1} fill="#92929a" fontSize="12">
          {String(day + 1).padStart(2, "0")}
        </text>
      ))}
      {Array.from(paths, ([color, path]) => <path key={color} d={path} fill={color} />)}
    </g>
  );
}

function YearTimeline() {
  const clipId = useId();
  const januaryId = useId();
  const monthsId = useId();

  return (
    <g className="cadence-year-demo" style={{ "--year-scroll": `-${(yearMonths.length + 1) * monthHeight}px` } as React.CSSProperties} aria-hidden="true">
      <defs>
        <clipPath id={clipId}><rect x="1416" y="155" width="478" height="836" /></clipPath>
        <clipPath id={januaryId}><rect x="1416" y="155" width="478" height={monthHeight} /></clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect x="1416" y="155" width="478" height="836" fill="#18181b" />
        <g className="cadence-year-demo__months">
          <g id={monthsId}>
            <image href={featureImage} width="2046" height="1384" clipPath={`url(#${januaryId})`} />
            {yearMonths.map(([name, days], month) => (
              <YearMonth key={name} name={name} days={days} month={month} />
            ))}
          </g>
          <use href={`#${monthsId}`} y={(yearMonths.length + 1) * monthHeight} />
        </g>
      </g>
    </g>
  );
}

const views = {
  all: { crop: "0 0 2046 1384", label: "Cadence daily, weekly, and yearly views" },
  daily: { crop: "72 40 620 1120", label: "Cadence Daily View logging activities on a timeline" },
  yearly: { crop: "1348 40 620 1120", label: "Cadence Yearly View showing activity patterns across months" },
} as const;

export function CadenceTimelineDemo({ view = "all" }: { view?: keyof typeof views }) {
  return (
    <svg viewBox={views[view].crop} className="cadence-timeline-demo__artwork" role="img" aria-label={views[view].label}>
      <image href={featureImage} width="2046" height="1384" aria-hidden="true" />
      {view !== "yearly" && <DailyTimeline />}
      {view !== "daily" && <YearTimeline />}
    </svg>
  );
}
