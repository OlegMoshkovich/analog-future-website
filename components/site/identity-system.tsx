import "./identity-system.css";

/* Extract the light artwork's alpha without relying on SVG difference blending. */
function Artwork({ project, crop, label, thin = false }: {
  project: "cadence" | "coolbuilding";
  crop: string;
  label: string;
  thin?: boolean;
}) {
  const id = `identity-${project}-${crop.replaceAll(" ", "-")}`;
  const height = project === "cadence" ? 734 : 720;
  const [x, y, width, cropHeight] = crop.split(" ").map(Number);
  return <svg className="identity-artwork" viewBox={crop} role="img" aria-label={label}>
    <defs><clipPath id={`${id}-crop`}><rect x={x} y={y} width={width} height={cropHeight} /></clipPath><filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
      <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  3 3 3 0 -1.44" result="mask" />
      {thin && <feMorphology in="mask" operator="erode" radius="1.3" result="thin-mask" />}
      <feComposite in="SourceGraphic" in2={thin ? "thin-mask" : "mask"} operator="in" />
    </filter></defs>
    <g clipPath={`url(#${id}-crop)`}><image href={`/assets/projects/${project}-figma/identity@2x.png`} width="2716" height={height} filter={`url(#${id})`} /></g>
  </svg>;
}

export function IdentitySystem({ project }: { project: "cadence" | "coolbuilding" }) {
  const cadence = project === "cadence";
  const colors = cadence ? [["Cadence blue", "#6C95EF"], ["Charcoal", "#0D0D10"]] : [["Cobalt blue", "#2F52FF"], ["Warm concrete", "#C7C4BE"]];
  return <div className="identity-system">
    <div className="identity-system__cell identity-system__mark">
      <Artwork project={project} crop={cadence ? "175 215 290 320" : "55 120 540 450"} label={cadence ? "Cadence brand mark" : "Coolbuilding floor-plan monogram"} />
      <p className="project-kicker">{cadence ? "Brand mark" : "Illustration"}</p>
    </div>
    <div className="identity-system__cell identity-system__palette">
      {colors.map(([name, hex]) => <div key={hex}><span style={{background:hex}} /><p>{name}<br />{hex}</p></div>)}
    </div>
    <div className="identity-system__cell identity-system__type">
      <Artwork project={project} crop={cadence ? "1450 165 280 190" : "1490 150 300 195"} label={cadence ? "Marmelad type specimen" : "Neue Montreal type specimen"} />
      <p className="project-kicker">{cadence ? "Marmelad" : "Neue Montreal"}</p>
      <p>{cadence ? "Title / Regular" : "Regular / Medium"}</p>
      <p>{cadence && <>Karla / Secondary<br />Regular / Medium<br /></>}ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz</p>
    </div>
    <div className="identity-system__cell identity-system__detail">
      <Artwork project={project} crop={cadence ? "2135 180 330 300" : "2115 75 520 410"} label={cadence ? "Cadence category icons" : "Twelve column grid"} thin={cadence} />
      <p className="project-kicker">{cadence ? "Cadence category icons" : "Twelve column grid"}</p>
    </div>
  </div>;
}
