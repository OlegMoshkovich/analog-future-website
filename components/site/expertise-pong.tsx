"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { clamp, createPong, pongGeometry, resizePong, stepPong, type PongBounds, type PongMode, type PongState } from "./pong-engine";
import "./expertise-pong.css";

export function ExpertisePong() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null), rightRef = useRef<HTMLDivElement>(null), ballRef = useRef<HTMLDivElement>(null);
  const joinRef = useRef<HTMLButtonElement>(null);
  const gameRef = useRef<PongState | null>(null);
  const boundsRef = useRef<PongBounds>({ width: 1000, height: 400 });
  const modeRef = useRef<PongMode>("watch"), pausedRef = useRef(false);
  const keysRef = useRef({ up: false, down: false });
  const wakeRef = useRef<(() => void) | null>(null), paintRef = useRef<(() => void) | null>(null);
  const [mode, setMode] = useState<PongMode>("watch");
  const [paused, setPaused] = useState(false);
  const [rally, setRally] = useState(0);
  const [announcement, setAnnouncement] = useState("Watch the exchange, or join the rally.");

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    let frame = 0, previous = 0, visible = false, disposed = false;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const running = () => visible && !pausedRef.current && document.visibilityState !== "hidden" && !disposed;
    const paint = () => {
      const game = gameRef.current;
      if (!game || !leftRef.current || !rightRef.current || !ballRef.current) return;
      const g = pongGeometry(boundsRef.current);
      field.style.setProperty("--pong-paddle-height", `${g.paddleHeight}px`);
      for (const paddle of [leftRef.current, rightRef.current]) {
        paddle.style.left = "0px"; paddle.style.top = "0px";
      }
      leftRef.current.style.transform = `translate3d(${g.leftX}px,${game.left - g.paddleHeight / 2}px,0)`;
      rightRef.current.style.transform = `translate3d(${g.rightX}px,${game.right - g.paddleHeight / 2}px,0)`;
      const ball = ballRef.current;
      ball.style.left = "0px"; ball.style.top = "0px";
      ball.style.width = ball.style.height = `${g.radius * 2}px`;
      ball.style.transform = `translate3d(${game.x - g.radius}px,${game.y - g.radius}px,0)`;
    };
    const tick = (now: number) => {
      frame = 0;
      if (!running()) { previous = 0; return; }
      const dt = previous ? Math.min((now - previous) / 1000, .04) : 0;
      previous = now;
      const game = gameRef.current;
      if (game) {
        if (modeRef.current === "play") {
          const direction = Number(keysRef.current.down) - Number(keysRef.current.up);
          const g = pongGeometry(boundsRef.current);
          game.target = clamp(game.target + direction * boundsRef.current.height * 1.3 * dt,
            g.paddleHeight / 2 + 10, boundsRef.current.height - g.paddleHeight / 2 - 10);
        }
        const result = stepPong(game, boundsRef.current, modeRef.current, dt);
        if (result.hit || result.missed) setRally(game.rally);
        if (result.missed && modeRef.current === "play") setAnnouncement("Try another rally.");
      }
      paint();
      frame = window.requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!running()) {
        window.cancelAnimationFrame(frame);
        frame = 0; previous = 0;
      } else if (!frame) {
        previous = 0;
        frame = window.requestAnimationFrame(tick);
      }
    };
    const measure = () => {
      const bounds = { width: field.clientWidth, height: field.clientHeight };
      if (!bounds.width || !bounds.height) return;
      if (gameRef.current) resizePong(gameRef.current, boundsRef.current, bounds);
      else gameRef.current = createPong(bounds);
      boundsRef.current = bounds;
      paint();
    };
    const onPreference = () => {
      if (preference.matches) {
        pausedRef.current = true;
        setPaused(true);
        setAnnouncement("Rally paused. Select Play or Resume to begin.");
        wake();
      }
    };
    wakeRef.current = wake; paintRef.current = paint;
    measure(); onPreference();
    const resize = new ResizeObserver(measure);
    resize.observe(field);
    const intersection = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting; wake();
    }, { threshold: .15 });
    intersection.observe(field);
    document.addEventListener("visibilitychange", wake);
    preference.addEventListener("change", onPreference);
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      resize.disconnect(); intersection.disconnect();
      document.removeEventListener("visibilitychange", wake);
      preference.removeEventListener("change", onPreference);
      wakeRef.current = null; paintRef.current = null;
    };
  }, []);

  const changePause = (next: boolean) => {
    pausedRef.current = next; setPaused(next);
    setAnnouncement(next ? "Rally paused." : modeRef.current === "play" ? "You control the left paddle." : "The automatic rally is playing.");
    wakeRef.current?.();
  };
  const changeMode = (next: PongMode, focus = true) => {
    if (next === "play" && modeRef.current !== "play" && gameRef.current) gameRef.current.target = gameRef.current.left;
    modeRef.current = next; setMode(next);
    keysRef.current = { up: false, down: false };
    changePause(false);
    if (focus && next === "play") fieldRef.current?.focus({ preventScroll: true });
  };
  const restart = () => {
    gameRef.current = createPong(boundsRef.current);
    setRally(0);
    setAnnouncement("A new rally.");
    paintRef.current?.();
    wakeRef.current?.();
  };
  const movePaddle = (event: PointerEvent<HTMLDivElement>) => {
    if (modeRef.current !== "play" || !gameRef.current) return;
    if (event.pointerType !== "mouse" && !event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const rect = event.currentTarget.getBoundingClientRect();
    gameRef.current.target = event.clientY - rect.top;
  };
  const pointerDown = (event: PointerEvent<HTMLDivElement>) => {
    changeMode("play");
    event.currentTarget.setPointerCapture(event.pointerId);
    movePaddle(event);
  };
  const onKey = (event: KeyboardEvent<HTMLDivElement>, pressed: boolean) => {
    const key = event.key.toLowerCase();
    if (["arrowup", "arrowdown", "w", "s"].includes(key)) {
      event.preventDefault();
      if (pressed && (modeRef.current !== "play" || pausedRef.current)) changeMode("play", false);
      if (pressed && !event.repeat && gameRef.current) {
        gameRef.current.target += (key === "arrowup" || key === "w" ? -1 : 1) * boundsRef.current.height * .075;
      }
      keysRef.current[key === "arrowup" || key === "w" ? "up" : "down"] = pressed;
    } else if (pressed && event.key === " " && !event.repeat) {
      event.preventDefault(); changePause(!pausedRef.current);
    } else if (pressed && event.key === "Escape") {
      changeMode("watch", false); joinRef.current?.focus();
    }
  };

  return (
    <div className="expertise-pong" data-mode={mode} data-paused={paused ? "true" : "false"}>
      <header className="pong-teams">
        <h3>Storytelling</h3>
        <h3>Engineering</h3>
      </header>
      <div ref={fieldRef} className="pong-field" role="application" tabIndex={0}
        aria-label="Ping-pong between Storytelling and Engineering"
        aria-describedby="pong-instructions"
        onPointerDown={pointerDown} onPointerMove={movePaddle}
        onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
        onPointerCancel={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
        onKeyDown={event => onKey(event, true)} onKeyUp={event => onKey(event, false)}
        onBlur={() => { keysRef.current = { up: false, down: false }; }}>
        <div className="pong-paddle pong-paddle--left" ref={leftRef} aria-hidden="true" />
        <div className="pong-paddle pong-paddle--right" ref={rightRef} aria-hidden="true" />
        <div className="pong-ball" ref={ballRef} aria-hidden="true" />
      </div>
      <footer className="pong-footer">
        <output className="pong-rally" aria-label={`${rally} consecutive exchanges`}>Rally <span>{String(rally).padStart(2, "0")}</span></output>
        <p className="pong-hint" id="pong-instructions">{paused ? "A moment to think. Resume when ready." : mode === "play" ? "Move, drag, or use ↑ ↓. Esc to watch." : "Watch the exchange, or join the rally."}</p>
        <div className="pong-controls">
          <button className="pong-join" ref={joinRef} onClick={() => changeMode(modeRef.current === "watch" ? "play" : "watch")}>{mode === "watch" ? "Join the rally" : "Watch the rally"} <span aria-hidden="true">↗</span></button>
          <button className="pong-control-icon" onClick={() => changePause(!pausedRef.current)} aria-label={paused ? "Resume the rally" : "Pause the rally"}>{paused ? <span aria-hidden="true">▷</span> : <span aria-hidden="true">Ⅱ</span>}</button>
          <button className="pong-control-icon" onClick={restart} aria-label="Restart the rally"><span aria-hidden="true">↺</span></button>
        </div>
      </footer>
      <p className="pong-sr-only" role="status" aria-live="polite">{announcement}</p>
    </div>
  );
}
