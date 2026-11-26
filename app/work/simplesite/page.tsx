import type { Metadata } from "next";
import { CaseStudyFooter } from "@/components/site/case-study-footer";
import { ProjectNavigation } from "@/components/site/project-navigation";
import { MobileScreenshotCarousel } from "@/components/site/mobile-screenshot-carousel";
import { ImageCrop } from "@/components/site/image-crop";
import "../case-study-v2.css";
import "./simplesite.css";

export const metadata: Metadata = {
  title: "SimpleSite | Analog Future",
  description: "A field documentation system built for large, complex construction projects.",
};

const friction = [
  ["01", "Too much effort", "Complicated tools turn documenting into another task."],
  ["02", "Too little order", "Photos and notes pile up without a clear structure."],
  ["03", "Hard to find", "What was captured becomes difficult to recover when it matters."],
] as const;

const stages = [
  ["01", "Photo"],
  ["02", "Tag"],
  ["03", "Save"],
  ["04", "Analyze"],
] as const;

const metrics = [
  ["1,892", "Project records", "Munich database"],
  ["05", "Site languages", "German, English, Polish, Croatian, Bosnian"],
  ["Offline", "Field capture", "Syncs when connection returns"],
  ["Live", "iOS release", "Mobile and web product in use"],
] as const;

const scope = [
  "Product conception",
  "Workflow design",
  "UX/UI design",
  "AI integration",
  "Mobile + web development",
] as const;

const assetRoot = "/assets/projects/simplesite-figma";
const productArtwork = {
  src: `${assetRoot}/simplesite-product-flow@2x.png`,
  width: 2236,
  height: 1258,
};
const productSlides = [
  ["Photo", "30 0 540 1190"],
  ["Tag", "580 0 540 1190"],
  ["Save", "1125 0 540 1190"],
  ["Analyze", "1670 0 540 1190"],
].map(([title, crop]) => ({ ...productArtwork, title, crop, alt: `SimpleSite workflow: ${title}.` }));
const calendarSlides = [
  ["Browse by date", "350 60 600 1140"],
  ["Daily records", "925 60 600 1140"],
].map(([title, crop]) => ({ title, crop, src: `${assetRoot}/simplesite-calendar@2x.png`, width: 1876, height: 1248, alt: `SimpleSite: ${title}.` }));

// Each screen shows the same record, including its camera roll and library thumbnails.
const capturePhotos = [
  { slide: 0, x: 83, y: 211, width: 442, height: 635, radius: 12 },
  { slide: 0, x: 86, y: 978, width: 85, height: 84, radius: 12 },
  { slide: 1, x: 636, y: 211, width: 431, height: 374, radius: 12 },
  { slide: 2, x: 1194, y: 283, width: 400, height: 274, radius: 12 },
  { slide: 3, x: 1722, y: 425, width: 210, height: 151, radius: 11 },
] as const;

function SimpleSiteProductArtwork({ slide }: { slide?: number }) {
  const screen = slide === undefined ? undefined : productSlides[slide];
  const { src, width, height } = productArtwork;
  const photos = slide === undefined ? capturePhotos : capturePhotos.filter(photo => photo.slide === slide);

  return (
    <svg
      className={screen ? "mobile-screenshot-carousel__artwork" : "ss-product__artwork"}
      viewBox={screen?.crop ?? `0 0 ${width} ${height}`}
      role="img"
      aria-label={screen?.alt ?? "Four SimpleSite screens showing a construction photo being captured, tagged, saved, and found in the library."}
    >
      <image href={src} width={width} height={height} />
      {photos.map(({ x, y, width, height, radius }) => {
        const clipId = `ss-capture-photo-${slide ?? "all"}-${x}`;
        return (
          <g key={x}>
            <clipPath id={clipId}>
              <rect x={x} y={y} width={width} height={height} rx={radius} />
            </clipPath>
            <g clipPath={`url(#${clipId})`}>
              <rect x={x} y={y} width={width} height={height} fill="#34464d" />
              <svg x={x} y={y} width={width} height={height} viewBox="800 520 1670 1282"
                preserveAspectRatio="xMidYMax slice" overflow="hidden">
                <image href={`${assetRoot}/simplesite-interface-context@2x.png`} width="2716" height="1802" />
              </svg>
            </g>
          </g>
        );
      })}
      {(slide === undefined || slide === 0) && (
        <g aria-hidden="true" className="ss-product__viewfinder">
          <path d="M104 263v-31h29 M475 232h30v31 M104 773v30h29 M505 773v30h-30"
            fill="none" stroke="#fff" strokeWidth="2.5" />
          <text x="103" y="831" fill="#fff" fontSize="17" fontFamily="monospace">PHOTO / 001</text>
        </g>
      )}
    </svg>
  );
}

function SimpleSiteHeroArtwork({
  crop = "0 0 2716 1120",
  alt = "SimpleSite construction-site photo mockup and wordmark, with the scaffold symbol assembling above it.",
}: { crop?: string; alt?: string }) {
  const [x, y, width, height] = crop.split(" ").map(Number);
  const clipId = `ss-hero-crop-${crop.replaceAll(" ", "-")}`;
  return (<svg className="ss-hero__symbol" viewBox={crop} preserveAspectRatio="xMidYMid meet" role="img" aria-label={alt}>
            <defs><clipPath id={clipId}><rect x={x} y={y} width={width} height={height} /></clipPath></defs>
            <g clipPath={`url(#${clipId})`}>
            <image href={`${assetRoot}/simplesite-hero@2x.png`} width="2716" height="1120" />
            <rect x="1945" y="353" width="234" height="234" fill="#000104" />
            <g transform="translate(1926 334) scale(.376)">
              <g className="ss-scaffold" fill="none" stroke="currentColor" strokeWidth="26" strokeLinecap="butt">
                <g className="ss-scaffold__middle">
                  <path pathLength="1" d="M321 361H105" />
                  <path pathLength="1" d="M400 361H616" />
                </g>
                <g className="ss-scaffold__uprights">
                  <path pathLength="1" d="M75 321V105" />
                  <path pathLength="1" d="M361 321V105" />
                  <path pathLength="1" d="M645 321V105" />
                  <path pathLength="1" d="M75 400V616" />
                  <path pathLength="1" d="M361 400V616" />
                  <path pathLength="1" d="M645 400V616" />
                </g>
                <g className="ss-scaffold__top">
                  <path pathLength="1" d="M321 75H105" />
                  <path pathLength="1" d="M400 75H616" />
                </g>
                <g className="ss-scaffold__bottom">
                  <path pathLength="1" d="M321 645H105" />
                  <path pathLength="1" d="M400 645H616" />
                </g>
                <path className="ss-scaffold__brace" pathLength="1" d="M113 312L312 113" />
                <path className="ss-scaffold__brace" pathLength="1" d="M399 598L598 399" />
              </g>
            </g>
            </g>
          </svg>);
}

export default function SimpleSitePage() {
  return (
    <main className="case-study simple-case ss-case">
      <ProjectNavigation />

      <section className="ss-hero ss-shell" aria-labelledby="simplesite-title">
        <p className="ss-mono">06</p>
        <h1 id="simplesite-title">SimpleSite</h1>
        <p className="ss-mono ss-hero__meta">
          Product strategy / UX/UI / AI system / Mobile + web development · 2025–26 · Live
        </p>
        <figure className="ss-hero__visual">
          <SimpleSiteHeroArtwork />
        </figure>
        <div className="ss-hero__mobile mobile-only">
          <figure><SimpleSiteHeroArtwork crop="1442 0 1260 1120" alt="SimpleSite wordmark with its animated scaffold symbol." /></figure>
          <figure><SimpleSiteHeroArtwork crop="0 0 1426 1120" alt="SimpleSite capture screen at a construction site." /></figure>
        </div>
        <p className="ss-hero__intro af-body">
          SimpleSite is a field documentation system built for large, complex construction projects. It turns site
          photographs, coordinates, tags, and notes into a structured record, captured in the field and searchable
          with AI.
        </p>
      </section>

      <section className="ss-product ss-shell ss-divider" aria-labelledby="product-system-title">
        <p className="ss-mono">The product system</p>
        <h2 id="product-system-title">Documentation<br />made easy</h2>
        <div className="ss-product__media desktop-only">
          <SimpleSiteProductArtwork />
        </div>
        <MobileScreenshotCarousel id="simplesite-product-slides" label="SimpleSite workflow" slides={productSlides}
          artwork={Object.fromEntries(productSlides.map(({ title }, index) => [
            index, <SimpleSiteProductArtwork key={title} slide={index} />,
          ]))} />
        <ol className="ss-stages desktop-only" aria-label="SimpleSite workflow">
          {stages.map(([number, label]) => (
            <li key={label}>
              <span className="ss-stage__dot" aria-hidden="true" />
              <span className="ss-mono">{number}<br />{label}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="ss-feature ss-shell ss-divider" aria-labelledby="field-proof-title">
        <div className="ss-feature__copy">
          <p className="ss-mono">Field proof</p>
          <h2 id="field-proof-title">Implemented on a real industrial construction project.</h2>
          <p className="af-body">
            At Heizkraftwerk Süd in Munich, SimpleSite was developed further around the realities of industrial
            construction, making progress visible to both client and contractor.
          </p>
        </div>
        <figure className="ss-feature__visual desktop-only">
          <img
            src={`${assetRoot}/simplesite-field-proof@2x.png`}
            alt="Heizkraftwerk Süd in Munich, where SimpleSite was implemented with AFRY."
            width="1876"
            height="1248"
            loading="lazy"
          />
        </figure>
        <figure className="ss-feature__visual ss-field-proof-mobile mobile-only">
          <ImageCrop src={`${assetRoot}/simplesite-field-proof@2x.png`} width={1876} height={1248}
            crop="0 0 1876 888" alt="Heizkraftwerk Süd in Munich, where SimpleSite was implemented with AFRY." />
          <figcaption className="ss-field-proof__caption">
            <p>Implemented with AFRY</p>
            <p>Heizkraftwerk Süd, Munich</p>
            <p>Industrial construction</p>
            <p>Product development + implementation</p>
            <p>2025–2026</p>
          </figcaption>
        </figure>
      </section>

      <section className="ss-challenge ss-shell ss-divider" aria-labelledby="challenge-title">
        <div className="ss-challenge__intro">
          <p className="ss-mono">Why we built it</p>
          <h2 id="challenge-title">Captured doesn’t mean organized.</h2>
          <p className="af-body">When documenting takes too much effort, information gets scattered and becomes difficult to find.</p>
        </div>
        <div className="ss-challenge__cards">
          {friction.map(([number, title, body]) => (
            <article key={title}>
              <p className="ss-card__number">{number}</p>
              <h3>{title}</h3>
              <p className="af-body">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ss-feature ss-shell ss-calendar" aria-labelledby="calendar-title">
        <div className="ss-feature__copy">
          <p className="ss-mono">Organized by date</p>
          <h2 id="calendar-title">Everyday<br />in order.</h2>
          <p className="af-body">
            Browse by date to see that day’s photos, notes, and tags in one place. Each record keeps its context,
            making it easy to revisit what happened and find the details you need.
          </p>
        </div>
        <figure className="ss-feature__visual desktop-only">
          <img
            src={`${assetRoot}/simplesite-calendar@2x.png`}
            alt="SimpleSite calendar and records arranged by date."
            width="1876"
            height="1248"
            loading="lazy"
          />
        </figure>
        <MobileScreenshotCarousel id="simplesite-calendar-slides" label="SimpleSite calendar" slides={calendarSlides} />
      </section>

      <section className="ss-applications ss-shell" aria-labelledby="applications-title">
        <p className="ss-mono" id="applications-title">Brand applications</p>
        <div className="ss-applications__grid">
          <figure>
            <img src={`${assetRoot}/simplesite-application-01@2x.png`} alt="SimpleSite app icon on a phone." width="878" height="810" loading="lazy" />
          </figure>
          <figure>
            <img src={`${assetRoot}/simplesite-application-02@2x.png`} alt="SimpleSite project library on a laptop." width="912" height="810" loading="lazy" />
          </figure>
          <figure>
            <img src={`${assetRoot}/simplesite-application-03@2x.png`} alt="SimpleSite identity on a dark card." width="890" height="810" loading="lazy" />
          </figure>
        </div>
      </section>

      <section className="ss-metrics ss-shell" aria-label="Product snapshot">
        <p className="ss-mono">Product snapshot / 10 Dec 2025</p>
        <div className="ss-metrics__grid">
          {metrics.map(([value, label, note]) => (
            <article key={label}>
              <strong>{value}</strong>
              <p className="ss-mono">{label}</p>
              <p className="af-body">{note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ss-scope ss-shell ss-divider" aria-labelledby="scope-title">
        <div className="ss-scope__intro">
          <p className="ss-mono">Our scope</p>
          <h2 id="scope-title">From field observation to live product.</h2>
          <p className="af-body">We owned the problem, product, interface and build, from the first idea through implementation with AFRY.</p>
        </div>
        <ol className="ss-scope__list">
          {scope.map((item, index) => (
            <li key={item}>
              <span className="ss-scope__accent" aria-hidden="true" />
              <span className="ss-card__number">0{index + 1}</span>
              <strong>{item}</strong>
            </li>
          ))}
        </ol>
      </section>

      <CaseStudyFooter
        eyebrow="The outcome"
        statement="We made documentation easier to create, organize, and find."
        currentHref="/work/simplesite"
      />
    </main>
  );
}
