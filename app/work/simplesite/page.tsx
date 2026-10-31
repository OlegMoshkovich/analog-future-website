import type { Metadata } from "next";
import { CaseStudyFooter } from "@/components/site/case-study-footer";
import { ProjectNavigation } from "@/components/site/project-navigation";
import "../case-study-v2.css";
import "./simplesite.css";

export const metadata: Metadata = {
  title: "SimpleSite — Analog Future",
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
          <svg className="ss-hero__symbol" viewBox="0 0 2716 1120" preserveAspectRatio="xMidYMid slice" role="img" aria-label="SimpleSite construction-site photo mockup and wordmark, with the scaffold symbol gently assembling above it.">
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
          </svg>
        </figure>
        <p className="ss-hero__intro">
          SimpleSite is a field documentation system built for large, complex construction projects. It turns site
          photographs, coordinates, tags, and notes into a structured record, captured in the field and searchable
          with AI.
        </p>
      </section>

      <section className="ss-product ss-shell ss-divider" aria-labelledby="product-system-title">
        <p className="ss-mono">The product system</p>
        <h2 id="product-system-title">Documentation<br />made easy</h2>
        <div className="ss-product__media">
          <p className="ss-mono">01 / Mobile capture</p>
          <img
            src={`${assetRoot}/simplesite-product-flow@2x.png`}
            alt="Four SimpleSite mobile screens showing photo capture, details, saving, and record search."
            width="2236"
            height="1258"
            loading="lazy"
          />
        </div>
        <ol className="ss-stages" aria-label="SimpleSite workflow">
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
          <h2 id="field-proof-title">Built on a live industrial construction project.</h2>
          <p>
            At Heizkraftwerk Süd in Munich, SimpleSite was developed further around the realities of industrial
            construction—making progress visible to both client and contractor.
          </p>
        </div>
        <figure className="ss-feature__visual">
          <img
            src={`${assetRoot}/simplesite-field-proof@2x.png`}
            alt="Heizkraftwerk Süd in Munich, where SimpleSite was implemented with AFRY."
            width="1876"
            height="1248"
            loading="lazy"
          />
        </figure>
      </section>

      <section className="ss-challenge ss-shell ss-divider" aria-labelledby="challenge-title">
        <div className="ss-challenge__intro">
          <p className="ss-mono">Why we built it</p>
          <h2 id="challenge-title">Captured doesn’t mean organized.</h2>
          <p>When documenting takes too much effort, information gets scattered—and becomes difficult to find.</p>
        </div>
        <div className="ss-challenge__cards">
          {friction.map(([number, title, body]) => (
            <article key={title}>
              <p className="ss-card__number">{number}</p>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ss-feature ss-shell ss-calendar" aria-labelledby="calendar-title">
        <div className="ss-feature__copy">
          <p className="ss-mono">Organized by date</p>
          <h2 id="calendar-title">Everyday<br />in order.</h2>
          <p>
            Browse by date to see that day’s photos, notes, and tags in one place. Each record keeps its context,
            making it easy to revisit what happened and find the details you need.
          </p>
        </div>
        <figure className="ss-feature__visual">
          <img
            src={`${assetRoot}/simplesite-calendar@2x.png`}
            alt="SimpleSite calendar and records arranged by date."
            width="1876"
            height="1248"
            loading="lazy"
          />
        </figure>
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

      <section className="ss-metrics ss-shell" aria-labelledby="snapshot-title">
        <p className="ss-mono">Product snapshot / 10 Dec 2025</p>
        <h2 id="snapshot-title">A working product, not a concept.</h2>
        <div className="ss-metrics__grid">
          {metrics.map(([value, label, note]) => (
            <article key={label}>
              <strong>{value}</strong>
              <p className="ss-mono">{label}</p>
              <p>{note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ss-scope ss-shell ss-divider" aria-labelledby="scope-title">
        <div className="ss-scope__intro">
          <p className="ss-mono">Our scope</p>
          <h2 id="scope-title">From field observation to live product.</h2>
          <p>We owned the problem, product, interface and build—from the first idea through implementation with AFRY.</p>
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
