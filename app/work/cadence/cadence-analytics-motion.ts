export type AnalyticsView = "overview" | "hours" | "spend" | "mood";

type ReelLayout = {
  value: string;
  top: number;
  height: number;
  baseline: number;
  size: number;
  color: string;
  slots: ReadonlyArray<readonly [left: number, width: number]>;
};

// All coordinates are in the original 631 × 866 screenshots.
export const cardFill = "#1f1f23";
export const focusAreas: Record<AnalyticsView, readonly [number, number, number, number]> = {
  overview: [142, 539, 177, 115],
  hours: [205, 410, 276, 250],
  spend: [175, 384, 194, 118],
  mood: [185, 425, 309, 226],
};

export const reelLayouts: Record<Exclude<AnalyticsView, "mood">, ReelLayout> = {
  overview: {
    value: "6072", top: 570, height: 56, baseline: 622, size: 75, color: "#f2f2f2",
    slots: [[144, 37], [181, 37], [218, 36], [254, 38]],
  },
  hours: {
    value: "1704", top: 520, height: 34, baseline: 552, size: 45, color: "#f2f2f2",
    slots: [[274, 16], [290, 22], [312, 21], [333, 25]],
  },
  spend: {
    value: "1926150", top: 422, height: 38, baseline: 455, size: 45, color: "#6c95ef",
    slots: [[201, 15], [216, 23], [247, 23], [270, 23], [293, 15], [316, 22], [338, 25]],
  },
};

export function measureReel(target: string, index: number, pitch: number) {
  const direction = index % 2 === 0 ? 1 : -1;
  const steps = 7 + index % 4;
  return {
    travel: direction * pitch * steps,
    overshoot: -direction * 2,
    duration: 1080 + index * 90,
    rows: Array.from({ length: steps }, (_, row) => {
      const distance = steps - row;
      return {
        offset: -direction * pitch * distance,
        digit: (Number(target) + 10 - direction * distance) % 10,
      };
    }),
  };
}

const moodPoints = [
  [191.3, 546.5], [212.2, 503.5], [233, 460.5], [254.2, 503.4],
  [274, 503.5], [294.3, 590.6], [311.2, 502.6], [332.6, 631.1],
  [350.2, 546.6], [370.2, 503.4], [389, 503.5], [411.2, 446.5],
  [428.7, 503.5], [449.7, 546.3], [469.8, 503.4], [489.3, 461.5],
] as const;

export const moodDuration = 1480 + (moodPoints.length - 1) * 22;

export function measureMood(elapsed: number) {
  return moodPoints.map(([x, y], index) => {
    const progress = Math.min(1, Math.max(0, (elapsed - index * 22) / 1480));
    const remaining = 1 - progress;
    const drift = (546.5 - y) * remaining ** 2.6;
    const wave = Math.sin(progress * Math.PI * 4.6 - index * 0.5) * 29 * remaining ** 1.45;
    return { x, y: y + drift + wave };
  });
}
