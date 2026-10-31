type Point = [number, number];
type Curve = [number, number, number, number, number, number];

export type DotIllustration = {
  id: string;
  title: string;
  description: string;
  points: Point[];
  labels: Point[];
  outline: string;
  opening: string;
  details: string;
  shadeOpacity: number;
};

// Lay out the numbers once, keeping them clear of nearby dots and labels.
function labelPoints(points: Point[]): Point[] {
  const labels: Point[] = [];
  const occupied: { x: number; y: number; width: number }[] = [];
  points.forEach(([x, y], index) => {
    const before = points[(index + points.length - 1) % points.length];
    const after = points[(index + 1) % points.length];
    const angle = Math.atan2(before[0] - after[0], after[1] - before[1]);
    const width = String(index + 1).length * 6.5 + 3;
    let best: Point = [x, y];
    let bestCost = Infinity;
    for (const distance of [17, 23, 30, 38, 46, 54]) {
      for (const turn of [0, .4, -.4, .8, -.8, 1.2, -1.2]) {
        const lx = x + Math.cos(angle + turn) * distance;
        const ly = y + Math.sin(angle + turn) * distance;
        if (lx - width / 2 < 10 || lx + width / 2 > 740 || ly < 152 || ly > 918) continue;
        const overlaps = occupied.reduce((sum, box) => sum +
          (Math.abs(lx - box.x) < (width + box.width) / 2 + 2 && Math.abs(ly - box.y) < 14 ? 1 : 0), 0);
        const dots = points.filter(point => Math.abs(lx - point[0]) < width / 2 + 2 && Math.abs(ly - point[1]) < 8).length;
        const cost = overlaps * 100 + dots * 60 + distance + Math.abs(turn) * 5;
        if (cost < bestCost) { bestCost = cost; best = [lx, ly]; }
      }
    }
    labels.push(best);
    occupied.push({ x: best[0], y: best[1], width });
  });
  return labels;
}

function illustration(input: Omit<DotIllustration, "labels">): DotIllustration {
  return { ...input, labels: labelPoints(input.points) };
}

// An original trace of the branching tree from the first study.
const treeContour: Point[] = [
  [343,884],[355,859],[367,833],[382,805],[401,780],[421,755],
  [442,733],[466,711],[492,692],[515,675],[530,658],[538,633],
  [538,609],[548,584],[530,572],[505,564],[478,562],[450,564],
  [422,562],[398,557],[392,535],[387,514],[370,494],[365,478],
  [367,457],[371,440],[355,430],[336,432],[318,433],[294,432],
  [273,426],[252,418],[239,406],[223,401],[209,405],[192,402],
  [178,413],[158,419],[144,433],[121,438],[120,457],[101,466],
  [83,481],[63,488],[52,499],[42,522],[38,499],[41,479],
  [56,463],[73,451],[91,442],[110,433],[125,418],[145,414],
  [160,398],[180,392],[189,374],[196,345],[208,365],[227,382],
  [239,398],[249,413],[273,421],[298,425],[320,419],[337,417],
  [345,407],[337,382],[331,363],[325,349],[310,343],[301,334],
  [279,329],[271,302],[289,315],[308,324],[321,333],[336,344],
  [341,363],[350,389],[356,410],[368,418],[389,422],[406,424],
  [429,417],[447,402],[459,392],[464,367],[458,345],[469,323],
  [458,304],[464,285],[442,283],[441,263],[433,242],[418,239],
  [424,220],[408,219],[393,211],[376,219],[368,207],[372,180],
  [384,192],[400,190],[405,206],[424,204],[429,184],[435,204],
  [446,219],[439,239],[450,257],[448,276],[470,283],[469,301],
  [480,322],[471,345],[485,365],[486,383],[482,404],[497,417],
  [514,434],[531,443],[548,452],[555,434],[566,418],[581,405],
  [599,394],[619,390],[632,403],[641,382],[658,368],[661,348],
  [678,330],[686,308],[711,295],[702,320],[686,338],[680,355],
  [664,373],[655,393],[648,413],[642,433],[636,454],[628,473],
  [624,498],[613,520],[603,546],[588,568],[576,588],[574,611],
  [578,638],[589,658],[606,671],[613,684],[592,696],[572,711],
  [547,727],[526,747],[507,770],[483,799],[459,829],[440,853],
  [433,877],[410,880],[390,881],[366,888],
];
const treePoints = [...treeContour.slice(101), ...treeContour.slice(0, 101)];
const tree = illustration({
  id: "tree",
  title: "Connect-the-dots bonsai",
  description: "A branching bonsai formed by numbered dots, a pencil outline, and a shaded trunk.",
  points: treePoints,
  outline: "M" + treePoints.map(point => point.join(",")).join(" L") + " Z",
  opening: "M389,442 L402,447 L425,432 L450,422 L475,414 L495,431 L514,445 L535,456 L548,473 L549,497 L557,518 L556,540 L544,555 L519,549 L489,547 L461,550 L432,549 L410,546 L404,527 L399,505 L384,486 L386,466 Z",
  details: "",
  shadeOpacity: .88,
});

// Sample hand-drawn Bézier contours at even distances. The numbered dots and
// pencil follow the same continuous curve, with no browser geometry required.
function curvedIllustration(input: {
  id: string; title: string; description: string; start: Point; curves: Curve[]; details: string;
}): DotIllustration {
  const dense: Point[] = [input.start];
  let from = input.start;
  for (const [a, b, c, d, x, y] of input.curves) {
    for (let step = 1; step <= 32; step++) {
      const t = step / 32;
      const s = 1 - t;
      dense.push([
        s ** 3 * from[0] + 3 * s ** 2 * t * a + 3 * s * t ** 2 * c + t ** 3 * x,
        s ** 3 * from[1] + 3 * s ** 2 * t * b + 3 * s * t ** 2 * d + t ** 3 * y,
      ]);
    }
    from = [x, y];
  }
  const distances = [0];
  for (let i = 1; i < dense.length; i++) {
    distances.push(distances[i - 1] + Math.hypot(dense[i][0] - dense[i - 1][0], dense[i][1] - dense[i - 1][1]));
  }
  const total = distances[distances.length - 1];
  const count = Math.round(total / 22);
  const points: Point[] = [];
  let segment = 1;
  for (let i = 0; i < count; i++) {
    const distance = i / count * total;
    while (segment < distances.length - 1 && distances[segment] < distance) segment++;
    const fraction = (distance - distances[segment - 1]) / (distances[segment] - distances[segment - 1]);
    points.push([
      dense[segment - 1][0] + fraction * (dense[segment][0] - dense[segment - 1][0]),
      dense[segment - 1][1] + fraction * (dense[segment][1] - dense[segment - 1][1]),
    ]);
  }
  return illustration({
    id: input.id, title: input.title, description: input.description, points,
    outline: `M${input.start.join(",")} ` + input.curves.map(curve => `C${curve.join(",")}`).join(" ") + " Z",
    opening: "", details: input.details, shadeOpacity: .12,
  });
}

const swallow = curvedIllustration({
  id: "swallow",
  title: "Connect-the-dots swallow",
  description: "A swallow in flight, with a forked tail and sweeping wings, revealed by a slow pencil line.",
  start: [626,397],
  curves: [
    [642,392,658,387,674,383], [666,392,657,401,649,410],
    [646,430,628,449,603,455], [566,475,547,495,525,521],
    [573,546,597,594,611,660], [546,636,491,607,448,572],
    [421,609,388,637,352,654], [305,714,257,774,210,833],
    [220,773,231,712,241,652], [203,676,165,700,128,723],
    [178,676,229,628,279,581], [263,552,241,535,216,522],
    [163,490,123,445,96,389], [179,400,240,431,299,472],
    [339,454,369,439,398,431], [419,344,450,259,507,183],
    [517,275,508,361,477,434], [519,426,551,420,576,401],
    [594,388,613,384,626,397],
  ],
  details: "M611,409 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0 M600,429 Q566,444 535,469 M299,472 Q367,519 448,572 M398,431 Q430,449 477,434 M414,433 Q458,340 489,232 M436,437 Q479,348 501,267 M216,522 Q280,536 343,562 M140,413 Q216,459 281,504 M167,421 Q230,453 305,486 M352,654 Q347,608 376,578 M241,652 Q298,625 342,588 M461,558 Q522,584 583,631 M479,539 Q533,563 575,601",
});

export const dotIllustrations: DotIllustration[] = [tree, swallow];

const storageKey = "analog-future-studio-drawings-v1";

// A shuffled deck gives every drawing a turn and prevents repeats at the join
// between decks. Storage is optional so restricted/private browsers still work.
export function nextDotIllustration(storage: Pick<Storage, "getItem" | "setItem"> | null, random = Math.random): DotIllustration {
  const ids = dotIllustrations.map(drawing => drawing.id);
  let last: string | undefined;
  let remaining: string[] = [];
  try {
    const saved = JSON.parse(storage?.getItem(storageKey) || "null");
    if (saved && typeof saved === "object") {
      last = ids.includes(saved.last) ? saved.last : undefined;
      if (Array.isArray(saved.remaining)) remaining = [...new Set<string>(saved.remaining.filter((id: unknown) => typeof id === "string" && ids.includes(id) && id !== last))];
    }
  } catch { /* Drawing selection still works when storage is unavailable. */ }
  if (!remaining.length) {
    remaining = [...ids];
    for (let i = remaining.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
    }
    if (remaining[0] === last) [remaining[0], remaining[1]] = [remaining[1], remaining[0]];
  }
  const id = remaining.shift()!;
  try { storage?.setItem(storageKey, JSON.stringify({ last: id, remaining })); }
  catch { /* A completed illustration never depends on writable storage. */ }
  return dotIllustrations.find(drawing => drawing.id === id)!;
}
