"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Slider } from "@/components/ui/slider";
import mapStates from "@/lib/wecount-map.json";
import { MONTHS, NATIONAL, STATES, REPORT_URL, REPORTS_URL, changeBounds, countBounds, formatCount, formatChange, type StateSeries } from "@/lib/wecount-data";

const byName = new Map(STATES.map((state) => [state.name, state]));
const MAX_CHANGE = Math.max(...STATES.flatMap((state) => MONTHS.map((_, i) => Math.max(...changeBounds(state, i).map(Math.abs)))));
const MAP_WIDTH = 975;
const MAP_HEIGHT = 610;

function percentage(series: StateSeries, month: number) {
  const base = countBounds(series.values[0])[0];
  if (!base) return "Not available";
  const bounds = changeBounds(series, month).map((n) => 100 * n / base);
  const format = (n: number) => `${n < 0 ? "−" : n > 0 ? "+" : ""}${Math.abs(n).toFixed(1)}%`;
  return bounds[0] === bounds[1] ? format(bounds[0]) : `${format(bounds[0])} to ${format(bounds[1])}`;
}

function Trend({ series, month }: { series: StateSeries; month: number }) {
  const values = series.values.map((value) => value === "<10" ? null : value);
  const max = Math.max(...values.filter((value): value is number => value !== null), 1);
  const xy = (i: number, value: number) => [12 + i * (496 / 14), 86 - value / max * 62];
  let path = "";
  let previousWasExact = false;
  values.forEach((value, i) => {
    if (value === null) { previousWasExact = false; return; }
    const [x, y] = xy(i, value);
    path += `${previousWasExact ? "L" : "M"}${x},${y} `;
    previousWasExact = true;
  });
  return (
    <svg className="wc-trend" viewBox="0 0 520 110" role="img" aria-label={`${series.name}: monthly estimated abortions from April 2022 to June 2023. Hollow marks represent counts under 10.`}>
      <line x1="12" x2="508" y1="86" y2="86" className="wc-trend-baseline" />
      <line x1={xy(month, 0)[0]} x2={xy(month, 0)[0]} y1="12" y2="92" className="wc-trend-selected" />
      <path d={path} className="wc-trend-line" />
      {values.map((value, i) => <circle key={i} cx={xy(i, value ?? 0)[0]} cy={xy(i, value ?? 0)[1]} r={i === month ? 4.5 : 2.5} className={value === null ? "wc-trend-suppressed" : "wc-trend-dot"}><title>{`${MONTHS[i].label}: ${formatCount(series.values[i])}`}</title></circle>)}
    </svg>
  );
}

export default function WeCountExplorer() {
  const [month, setMonth] = useState(4);
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const sliderContainer = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; panX: number; panY: number; ratio: number } | null>(null);
  const dragged = useRef(false);
  const id = useId().replaceAll(":", "");
  const activeName = hovered ?? selected;
  const active = activeName ? byName.get(activeName) ?? NATIONAL : NATIONAL;
  const nationalChange = changeBounds(NATIONAL, month);
  const currentMonth = MONTHS[month];

  useEffect(() => {
    const thumb = sliderContainer.current?.querySelector('[role="slider"]');
    thumb?.setAttribute("aria-label", "Month");
    thumb?.setAttribute("aria-valuetext", currentMonth.label);
  }, [currentMonth.label]);

  const selectState = (name: string | null) => { setSelected(name); setHovered(null); };
  const adjustZoom = (amount: number) => {
    const next = Math.min(3, Math.max(1, Number((zoom + amount).toFixed(1))));
    setZoom(next);
    if (next === 1) setPan({ x: 0, y: 0 });
    else setPan((p) => ({ x: Math.max(-MAP_WIDTH * (next - 1) / 2, Math.min(MAP_WIDTH * (next - 1) / 2, p.x)), y: Math.max(-MAP_HEIGHT * (next - 1) / 2, Math.min(MAP_HEIGHT * (next - 1) / 2, p.y)) }));
  };

  return (
    <section className="wc-explorer" aria-labelledby="wc-map-title">
      <div className="wc-explorer-header"><p className="wc-kicker">Society of Family Planning</p><span className="wc-kicker">Historical data / 2022–2023</span></div>
      <h2 id="wc-map-title">ABORTION BAN<br />STATISTICS</h2>
      <div className="wc-timeline">
        <div className="wc-timeline-caption"><span className="wc-kicker">Explore by month</span><span className="wc-phase">{month < 2 ? "Before Dobbs" : month === 2 ? "Dobbs decision · 24 June 2022" : "After Dobbs"}</span></div>
        <div className="wc-month-labels">{MONTHS.map((m, i) => <button key={m.label} type="button" onClick={() => setMonth(i)} aria-label={m.label} aria-pressed={month === i} className={`wc-month ${i === 9 ? "wc-year-start" : ""}`}><span>{m.short}</span>{(i === 0 || i === 9) && <small>{m.year}</small>}</button>)}</div>
        <div ref={sliderContainer}><Slider className="wc-month-slider" value={[month]} min={0} max={14} step={1} onValueChange={([value]) => setMonth(value)} /></div>
        <div className="wc-current-month"><Button className="wc-step-button" variant="ghost" size="icon" type="button" disabled={month === 0} onClick={() => setMonth((m) => m - 1)} aria-label="Previous month"><ChevronLeft /></Button><strong aria-live="polite">{currentMonth.label}</strong><Button className="wc-step-button" variant="ghost" size="icon" type="button" disabled={month === 14} onClick={() => setMonth((m) => m + 1)} aria-label="Next month"><ChevronRight /></Button></div>
      </div>
      <div className="wc-map-layout">
        <aside className="wc-map-sidebar">
          <p className="wc-kicker">United States / {currentMonth.short} {currentMonth.year}</p>
          <div className="wc-national-stat"><strong>{formatCount(NATIONAL.values[month])}</strong><span>estimated clinician-provided<br />abortions this month</span></div>
          <div className="wc-national-change"><strong>{formatChange(nationalChange)}</strong><span>change compared with<br />April 2022</span></div>
          <div className="wc-legend"><p className="wc-kicker">Change from April 2022</p><div><span className="wc-glow wc-glow-increase" aria-hidden="true">+</span><span>Increase</span></div><div><span className="wc-glow wc-glow-decrease" aria-hidden="true">−</span><span>Decrease</span></div><p>Glow size reflects the magnitude of change. Each mark represents a state total.</p></div>
          <p className="wc-map-instruction">Select a month, then hover or select a state to explore its data.</p>
        </aside>
        <div className="wc-map-and-detail">
          <div className="wc-map-viewport">
            <svg className={`wc-map ${zoom > 1 ? "wc-map-zoomed" : ""}`} viewBox="0 0 975 610" role="group" aria-label={`United States abortion estimates, ${currentMonth.label}. Select a state for details.`}
              onPointerDown={(event) => { dragged.current = false; if (zoom <= 1) return; const rect = event.currentTarget.getBoundingClientRect(); drag.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y, ratio: MAP_WIDTH / rect.width }; }}
              onPointerMove={(event) => { const start = drag.current; if (!start) return; const dx = (event.clientX - start.x) * start.ratio; const dy = (event.clientY - start.y) * start.ratio; if (Math.abs(dx) + Math.abs(dy) > 5) { dragged.current = true; event.currentTarget.setPointerCapture(event.pointerId); setHovered(null); } setPan({ x: Math.max(-MAP_WIDTH * (zoom - 1) / 2, Math.min(MAP_WIDTH * (zoom - 1) / 2, start.panX + dx)), y: Math.max(-MAP_HEIGHT * (zoom - 1) / 2, Math.min(MAP_HEIGHT * (zoom - 1) / 2, start.panY + dy)) }); }}
              onPointerUp={(event) => { drag.current = null; if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }} onPointerCancel={() => { drag.current = null; }}>
              <title>State-by-state changes in abortion provision</title><desc>Yellow with a plus sign indicates an increase; green with a minus sign indicates a decrease. Values compare the selected month with April 2022. Alaska and Hawaii use labeled inset markers.</desc>
              <defs>{["increase", "decrease"].map((kind) => <radialGradient key={kind} id={`${id}-${kind}`}><stop offset="0%" className={`wc-gradient-${kind}`} stopOpacity=".95" /><stop offset="35%" className={`wc-gradient-${kind}`} stopOpacity=".65" /><stop offset="100%" className={`wc-gradient-${kind}`} stopOpacity="0" /></radialGradient>)}</defs>
              <g transform={`translate(${MAP_WIDTH / 2 + pan.x} ${MAP_HEIGHT / 2 + pan.y}) scale(${zoom}) translate(${-MAP_WIDTH / 2} ${-MAP_HEIGHT / 2})`}>
                <g className="wc-geography">{mapStates.filter((state) => state.path).map((state) => <path key={state.id} d={state.path} className={`wc-state ${state.name === activeName ? "wc-state-active" : ""}`} />)}</g>
                <g className="wc-state-glows" aria-hidden="true">{mapStates.map((state) => { const data = byName.get(state.name)!; const bounds = changeBounds(data, month); const amount = Math.max(Math.abs(bounds[0]), Math.abs(bounds[1])); if (!amount) return null; const kind = bounds[1] < 0 ? "decrease" : "increase"; const r = 76 * Math.sqrt(amount / MAX_CHANGE); return <g key={state.id}><circle cx={state.x} cy={state.y} r={r} fill={`url(#${id}-${kind})`} />{r > 13 && <text x={state.x} y={state.y + 5} className="wc-change-sign">{kind === "increase" ? "+" : "−"}</text>}</g>; })}</g>
                <g className="wc-state-hit-targets">{mapStates.map((state) => { const data = byName.get(state.name)!; const attrs = { role: "button", tabIndex: 0, "aria-label": `${state.name}: ${formatCount(data.values[month])} estimated abortions, ${formatChange(changeBounds(data, month))} compared with April 2022`, "aria-pressed": state.name === selected, className: "wc-state-target", onMouseEnter: () => { if (!drag.current) setHovered(state.name); }, onMouseLeave: () => setHovered(null), onFocus: () => setHovered(state.name), onBlur: () => setHovered(null), onClick: () => { if (!dragged.current) selectState(state.name); }, onKeyDown: (event: KeyboardEvent<SVGElement>) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectState(state.name); } } }; return state.path ? <path key={state.id} d={state.path} {...attrs}><title>{state.name}</title></path> : <g key={state.id}><rect x={state.x - 42} y={state.y - 29} width="84" height="55" rx="0" {...attrs} /><text x={state.x} y={state.y + 39} className="wc-inset-label">{state.name}</text></g>; })}</g>
                <text x="192" y="607" className="wc-inset-note">Inset markers · not to scale</text>
              </g>
            </svg>
            <div className="wc-zoom-controls"><span>{zoom.toFixed(1)}×</span><Button variant="ghost" size="icon" className="wc-zoom-button" type="button" disabled={zoom >= 3} onClick={() => adjustZoom(.5)} aria-label="Zoom in"><Plus /></Button><Button variant="ghost" size="icon" className="wc-zoom-button" type="button" disabled={zoom <= 1} onClick={() => adjustZoom(-.5)} aria-label="Zoom out"><Minus /></Button></div>
          </div>
          <div className="wc-state-detail" aria-label="Selected state details">
            <div className="wc-detail-heading"><label htmlFor="wc-state-select" className="wc-kicker">{activeName ? "State details" : "National overview"}</label><NativeSelect id="wc-state-select" value={selected ?? ""} onChange={(event) => selectState(event.target.value || null)} aria-label="Select a state"><NativeSelectOption value="">United States</NativeSelectOption>{STATES.map((state) => <NativeSelectOption key={state.name} value={state.name}>{state.name}</NativeSelectOption>)}</NativeSelect><p>{active.name}</p></div>
            <div className="wc-detail-values"><div><span>Estimated abortions</span><strong>{formatCount(active.values[month])}</strong></div><div><span>Change from April 2022</span><strong>{formatChange(changeBounds(active, month))}</strong></div><div><span>Percent change</span><strong>{percentage(active, month)}</strong></div></div>
            <div className="wc-detail-trend"><Trend series={active} month={month} /><span>Apr 2022 <span>Jun 2023</span></span></div>
            {active.values[month] === "<10" && <p className="wc-suppressed-note">The report gives this count as under 10. Change and percentage are shown as a range.</p>}
          </div>
        </div>
      </div>
      <footer className="wc-data-footer"><div><p>Reconstructed from historical #WeCount estimates, April 2022–June 2023.</p><p>Counts are rounded and include imputed estimates. Self-managed abortions are excluded. Map comparisons use April 2022; the report’s pre/post summaries use the April–May average.</p></div><a href={REPORT_URL} target="_blank" rel="noreferrer">Source report <span aria-hidden="true">↗</span></a><a href={REPORTS_URL} target="_blank" rel="noreferrer">All reports <span aria-hidden="true">↗</span></a></footer>
    </section>
  );
}
