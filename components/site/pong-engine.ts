export type PongBounds = { width: number; height: number };
export type PongMode = "watch" | "play";
export type PongState = {
  x: number; y: number; vx: number; vy: number;
  left: number; right: number; target: number;
  rally: number; time: number; serve: number;
};

export const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function pongGeometry({ width, height }: PongBounds) {
  const inset = clamp(width * .045, 18, 40);
  return {
    leftX: inset,
    rightX: width - inset - 8,
    paddleWidth: 8,
    paddleHeight: clamp(height * .22, 58, 88),
    radius: clamp(width * .009, 8, 11),
  };
}

export function createPong(bounds: PongBounds): PongState {
  return {
    x: bounds.width * .5, y: bounds.height * .26,
    vx: bounds.width * .42, vy: bounds.height * .16,
    left: bounds.height * .5, right: bounds.height * .5, target: bounds.height * .5,
    rally: 0, time: 0, serve: .6,
  };
}

export function resizePong(state: PongState, before: PongBounds, after: PongBounds) {
  const sx = after.width / before.width, sy = after.height / before.height;
  const g = pongGeometry(after);
  state.x = clamp(state.x * sx, g.radius, after.width - g.radius);
  state.y = clamp(state.y * sy, g.radius, after.height - g.radius);
  state.vx *= sx; state.vy *= sy;
  const min = g.paddleHeight / 2 + 10, max = after.height - min;
  state.left = clamp(state.left * sy, min, max);
  state.right = clamp(state.right * sy, min, max);
  state.target = clamp(state.target * sy, min, max);
}

export function stepPong(state: PongState, bounds: PongBounds, mode: PongMode, seconds: number) {
  const dt = clamp(seconds, 0, .04);
  const g = pongGeometry(bounds), half = g.paddleHeight / 2;
  const min = half + 10, max = bounds.height - min;
  const approach = (current: number, target: number, speed: number) =>
    clamp(current + clamp(target - current, -speed * dt, speed * dt), min, max);
  state.time += dt;
  state.left = approach(state.left,
    mode === "watch" ? state.y + Math.sin(state.time * 1.5) * half * .34 : state.target,
    bounds.height * (mode === "watch" ? .95 : 2.6));
  state.right = approach(state.right,
    state.y + Math.cos(state.time * 1.3) * half * .3, bounds.height * .9);

  if (state.serve > 0) {
    state.serve = Math.max(0, state.serve - dt);
    return { hit: false, missed: false };
  }

  const beforeX = state.x, beforeY = state.y;
  state.x += state.vx * dt;
  state.y += state.vy * dt;
  if (state.y < g.radius) {
    state.y = 2 * g.radius - state.y;
    state.vy = Math.abs(state.vy);
  } else if (state.y > bounds.height - g.radius) {
    state.y = 2 * (bounds.height - g.radius) - state.y;
    state.vy = -Math.abs(state.vy);
  }

  let hit = false;
  const bounce = (side: "left" | "right", centerX: number, paddleY: number) => {
    const portion = (centerX - beforeX) / (state.x - beforeX);
    const hitY = beforeY + (state.y - beforeY) * portion;
    if (Math.abs(hitY - paddleY) > half + g.radius) return;
    const impact = clamp((hitY - paddleY) / half, -1, 1);
    const angle = impact * Math.PI / 3;
    const speed = Math.min(Math.hypot(state.vx, state.vy) * 1.045, bounds.width * .7);
    const direction = side === "left" ? 1 : -1;
    state.x = centerX;
    state.vx = Math.cos(angle) * speed * direction;
    const vertical = Math.sin(angle) * speed;
    state.vy = Math.abs(vertical) < bounds.height * .10
      ? (state.vy < 0 ? -1 : 1) * bounds.height * .10 : vertical;
    state.rally += 1;
    hit = true;
  };
  const leftFace = g.leftX + g.paddleWidth + g.radius;
  const rightFace = g.rightX - g.radius;
  if (state.vx < 0 && beforeX >= leftFace && state.x <= leftFace) bounce("left", leftFace, state.left);
  else if (state.vx > 0 && beforeX <= rightFace && state.x >= rightFace) bounce("right", rightFace, state.right);

  if (state.x < -g.radius || state.x > bounds.width + g.radius) {
    const direction = state.x < 0 ? -1 : 1;
    state.x = bounds.width * .5;
    state.y = bounds.height * (.35 + Math.sin(state.time * 1.9) * .12);
    state.vx = direction * bounds.width * .42;
    state.vy = bounds.height * .16 * (Math.cos(state.time) < 0 ? -1 : 1);
    state.rally = 0;
    state.serve = .85;
    return { hit: false, missed: true };
  }
  return { hit, missed: false };
}
