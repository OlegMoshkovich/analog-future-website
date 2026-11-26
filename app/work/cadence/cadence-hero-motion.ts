const sliceCount = 19;
const markWidth = 181;
const wordmarkAspectRatio = 313 / 73;

const markBars = [
  { x: 0, width: 31, height: 117, gradient: "blue" },
  { x: 37, width: 32, height: 155, gradient: "inner" },
  { x: 73, width: 35, height: 189, gradient: "center" },
  { x: 113, width: 32, height: 155, gradient: "inner" },
  { x: 150, width: 31, height: 117, gradient: "blue" },
];
const markStart = (sliceCount - markBars.length) / 2;
type LogoBar = (typeof markBars)[number];
export const heroSlices: Array<LogoBar | undefined> = Array.from(
  { length: sliceCount },
  (_, index) => markBars[index - markStart],
);

const fillStart = 160;
const fillEnd = 3330;
const logoStart = 3510;
const logoEnd = 4600;
const holdEnd = 6740;
const duration = 7400;

function blend(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

function ease(value: number) {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
}

export function measureCadenceHero(width: number, height: number) {
  const wordmarkWidth = Math.min(300, Math.max(width * 0.27, Math.min(160, width * 0.48)));
  const logoScale = wordmarkWidth * 0.35 / markWidth;
  const gap = wordmarkWidth * 0.1;
  const lockupLeft = (width - markWidth * logoScale - gap - wordmarkWidth) / 2;
  const rowWidth = Math.min(width * 0.87, Math.max(336, width * 0.64), 760);

  return {
    viewBox: `0 0 ${width} ${height}`,
    centerY: height / 2,
    rowLeft: (width - rowWidth) / 2,
    step: rowWidth / sliceCount,
    peakHeight: Math.min(height * 0.72, rowWidth * 0.5),
    logoScale,
    lockupLeft,
    wordmarkX: lockupLeft + markWidth * logoScale + gap,
    wordmarkWidth,
    wordmarkHeight: wordmarkWidth / wordmarkAspectRatio,
  };
}

export function cadenceLogoBar(mark: LogoBar, layout: ReturnType<typeof measureCadenceHero>) {
  const width = mark.width * layout.logoScale;
  const height = mark.height * layout.logoScale;
  return { x: layout.lockupLeft + mark.x * layout.logoScale, y: layout.centerY - height / 2, width, height, rx: width * 0.31 };
}

export function animateCadenceHero(stage: HTMLElement) {
  const artwork = stage.querySelector("svg");
  const halo = artwork?.querySelector("ellipse");
  const wordmark = artwork?.querySelector("image");
  const playback = stage.querySelector("button");
  if (!artwork || !halo || !wordmark || !playback) return;

  const bars = Array.from(artwork.querySelectorAll("rect"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let layout = measureCadenceHero(stage.clientWidth, stage.clientHeight);
  let frame = 0;
  let previousTime: number | undefined;
  let elapsed = 280;
  stage.removeAttribute("data-no-motion");
  let lastSceneTime = -1;
  let visible = !("IntersectionObserver" in window);
  let paused = false;

  const draw = (time: number) => {
    const sceneTime = Math.min(time, logoEnd);
    const sceneOpacity = ease(time / 250) * (1 - ease((time - holdEnd) / 450));
    const reveal = ease((sceneTime - logoStart - 320) / 740);

    artwork.style.opacity = String(sceneOpacity);
    if (sceneTime === lastSceneTime) return;
    lastSceneTime = sceneTime;

    const { centerY, rowLeft, step, peakHeight, logoScale, lockupLeft, wordmarkHeight } = layout;
    wordmark.setAttribute("opacity", String(reveal));
    wordmark.setAttribute("y", String(centerY + wordmarkHeight * blend(-0.42, -0.5, reveal)));

    const fillProgress = ease((sceneTime - fillStart) / (fillEnd - fillStart));
    const crest = blend(3.7, sliceCount + 0.45, fillProgress);
    const waveStrength = 1 - ease((sceneTime - fillEnd + 490) / 490);
    const gather = ease((sceneTime - logoStart) / (logoEnd - logoStart));
    const fade = ease((sceneTime - logoStart) / 770);
    const logoCenter = lockupLeft + markWidth * logoScale / 2;

    halo.setAttribute("cx", String(rowLeft + (crest + 0.5) * step));
    halo.setAttribute("cy", String(centerY));
    halo.setAttribute("rx", String(step * 1.6));
    halo.setAttribute("ry", String(peakHeight * 0.64));
    halo.setAttribute("opacity", String(waveStrength * 0.54));

    bars.forEach((bar, index) => {
      const mark = heroSlices[index];
      const position = (index + 0.5) / sliceCount;
      const envelope = Math.pow(Math.sin(Math.PI * position), 0.77);
      const distance = index - crest;
      const swell = Math.exp(-0.095 * distance * distance) * waveStrength;
      const highlight = Math.exp(-2.6 * distance * distance) * waveStrength;
      const filled = ease(crest - index - 0.45);
      const centerX = rowLeft + (index + 0.5) * step;
      const restHeight = peakHeight * blend(0.2, 0.59, envelope);
      const barHeight = blend(restHeight, peakHeight, swell);
      const barWidth = step * blend(0.82, 0.88, swell);
      const targetX = mark ? lockupLeft + (mark.x + mark.width / 2) * logoScale : logoCenter;
      const width = blend(barWidth, mark ? mark.width * logoScale : 0, gather);
      const height = blend(barHeight, mark ? mark.height * logoScale : barHeight * 0.3, gather);
      const x = blend(centerX, targetX, gather) - width / 2;

      bar.setAttribute("x", String(x));
      bar.setAttribute("y", String(centerY - height / 2));
      bar.setAttribute("width", String(width));
      bar.setAttribute("height", String(height));
      bar.setAttribute("rx", String(width * blend(0.17, 0.31, gather)));
      bar.setAttribute("opacity", String(mark ? 1 : 1 - fade));
      bar.setAttribute("fill-opacity", String(blend(filled * blend(0.38, 0.95, Math.max(envelope, swell)), 1, gather)));
      bar.setAttribute("stroke-opacity", String(blend((0.08 + envelope * 0.23) * (1 - filled * 0.6), 0.92, highlight) * (1 - fade)));
      bar.setAttribute("stroke-width", String(Math.max(0.7, step * (0.034 + 0.05 * highlight))));
    });
  };

  const measure = () => {
    layout = measureCadenceHero(stage.clientWidth, stage.clientHeight);
    artwork.setAttribute("viewBox", layout.viewBox);
    wordmark.setAttribute("x", String(layout.wordmarkX));
    wordmark.setAttribute("width", String(layout.wordmarkWidth));
    wordmark.setAttribute("height", String(layout.wordmarkHeight));
    lastSceneTime = -1;
    draw(reducedMotion.matches ? logoEnd : elapsed);
  };

  function tick(now: number) {
    if (previousTime !== undefined) elapsed = (elapsed + now - previousTime) % duration;
    previousTime = now;
    draw(elapsed);
    frame = requestAnimationFrame(tick);
  }

  const updatePlayback = () => {
    cancelAnimationFrame(frame);
    previousTime = undefined;
    playback.hidden = reducedMotion.matches;
    draw(reducedMotion.matches ? logoEnd : elapsed);
    if (!reducedMotion.matches && !paused && visible && !document.hidden) {
      frame = requestAnimationFrame(tick);
    }
  };

  const togglePlayback = () => {
    paused = !paused;
    playback.toggleAttribute("data-paused", paused);
    playback.setAttribute("aria-label", paused ? "Resume animation" : "Pause animation");
    updatePlayback();
  };

  const intersection = visible ? null : new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updatePlayback();
  });
  const resize = new ResizeObserver(measure);
  measure();
  updatePlayback();
  intersection?.observe(stage);
  resize.observe(stage);
  playback.addEventListener("click", togglePlayback);
  document.addEventListener("visibilitychange", updatePlayback);
  reducedMotion.addEventListener("change", updatePlayback);

  return () => {
    cancelAnimationFrame(frame);
    intersection?.disconnect();
    resize.disconnect();
    playback.removeEventListener("click", togglePlayback);
    document.removeEventListener("visibilitychange", updatePlayback);
    reducedMotion.removeEventListener("change", updatePlayback);
  };
}
