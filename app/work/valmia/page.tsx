import type { Metadata } from "next";
import { CaseStudyFooter } from "@/components/site/case-study-footer";
import { ProjectNavigation } from "@/components/site/project-navigation";
import "../case-study-v2.css";
import "./valmia.css";

export const metadata: Metadata = {
  title: "ValMia — Analog Future",
  description:
    "A community and experience platform for alpine destinations, developed across strategy, brand, technology, and UX/UI.",
};

const productLoop = [
  ["01", "Discover", "See events, activities, groups, and useful local information in one place."],
  ["02", "Join", "Take part without navigating fragmented channels or needing an existing connection."],
  ["03", "Create", "Organize an activity, share knowledge, or invite others to participate."],
  ["04", "Connect", "Turn individual moments into relationships and a stronger sense of belonging."],
] as const;

const evolution = [
  ["01", "Activate", "Events, activities, and early adopters create a clear reason to return."],
  ["02", "Expand", "Groups, announcements, recommendations, and neighbourly support deepen participation."],
  ["03", "Mature", "Services, exchanges, and marketplace functions connect the wider destination."],
] as const;

const scope = [
  ["01", "Market research"],
  ["02", "Product strategy"],
  ["03", "Brand identity"],
  ["04", "UX/UI design"],
  ["05", "Development"],
] as const;

function ValMiaMark() {
  return (
    <svg className="vm-mark" viewBox="0 0 52 64" aria-hidden="true">
      <path d="M4 60V4l22 35L48 4v56" />
    </svg>
  );
}

export default function ValMiaPage() {
  return (
    <main className="case-study valmia-page">
      <ProjectNavigation />

      <section className="vm-hero" aria-labelledby="vm-title">
        <p className="vm-micro vm-hero__number">05</p>
        <h1 id="vm-title">ValMia</h1>
        <p className="vm-micro vm-hero__meta">
          Product strategy / Market research / Brand identity / UX/UI / Development · 2026 · In development
        </p>
        <img
          className="vm-hero__visual"
          src="/assets/projects/valmia-figma/hero@2x.png"
          width="2716"
          height="1120"
          alt="Friends sharing a picnic in the Alps beside the ValMia identity."
          fetchPriority="high"
        />
        <p className="vm-hero__description">
          ValMia is a community and experience platform for alpine destinations, helping guests, owners, locals, and businesses discover what is happening and participate in village life. Working closely with the founding team, we helped turn the early idea into a connected digital product shaping its strategy, brand, technology, and UX/UI as one coherent system.
        </p>
      </section>

      <section className="vm-section vm-strategy" aria-labelledby="vm-strategy-title">
        <div className="vm-strategy__copy">
          <p className="vm-micro">The strategic idea</p>
          <h2 id="vm-strategy-title">
            Every destination has infrastructure and experiences. ValMia adds the missing social layer—where people connect, participate, and belong.
          </h2>
        </div>
        <img
          src="/assets/projects/valmia-figma/strategy@2x.png"
          width="1980"
          height="1660"
          alt="A group hiking together across an alpine landscape."
          loading="lazy"
          decoding="async"
        />
      </section>

      <section className="vm-section vm-product" aria-labelledby="vm-product-title">
        <div className="vm-product__copy">
          <p className="vm-micro">The product</p>
          <h2 id="vm-product-title">A working community app designed around participation.</h2>
        </div>
        <img
          src="/assets/projects/valmia-figma/product@2x.png"
          width="1774"
          height="1200"
          alt="ValMia welcome, circles, and events app screens."
          loading="lazy"
          decoding="async"
        />
      </section>

      <section className="vm-community" aria-labelledby="vm-community-title">
        <div className="vm-community__intro">
          <p className="vm-micro">The community model</p>
          <h2 id="vm-community-title">ValMia is driven<br />by the community.</h2>
          <div className="vm-community__outcomes">
            <div className="vm-community__outcome">
              <span className="vm-micro">01</span>
              <p>The platform grows organically.</p>
            </div>
            <div className="vm-community__outcome">
              <span className="vm-micro">02</span>
              <p>The destination becomes alive.</p>
            </div>
          </div>
        </div>

        <div className="vm-community__chart" role="img" aria-label="Owners, guests, locals, and businesses connect through one shared ValMia layer.">
          <svg className="vm-community__connections" viewBox="0 0 860 330" aria-hidden="true">
            <path d="M153 92 677 286M153 286 677 92" />
            <circle cx="153" cy="92" r="4" />
            <circle cx="153" cy="286" r="4" />
            <circle cx="677" cy="92" r="4" />
            <circle cx="677" cy="286" r="4" />
          </svg>
          <div className="vm-community__node vm-community__node--owners"><strong>Owners</strong><span>Create activities</span></div>
          <div className="vm-community__node vm-community__node--guests"><strong>Guests</strong><span>Organise meetups</span></div>
          <div className="vm-community__node vm-community__node--locals"><strong>Locals</strong><span>Share experiences</span></div>
          <div className="vm-community__node vm-community__node--businesses"><strong>Businesses</strong><span>Participate</span></div>
          <div className="vm-community__hub"><ValMiaMark /></div>
          <p className="vm-community__hub-label">One shared layer</p>
        </div>
      </section>

      <section className="vm-section vm-loop" aria-labelledby="vm-loop-title">
        <div className="vm-loop__intro">
          <p className="vm-micro">The product loop</p>
          <h2 id="vm-loop-title">From finding out<br />to joining in.</h2>
          <p>A simple loop turns local information into participation and recurring relationships.</p>
        </div>
        <div className="vm-loop__steps">
          {productLoop.map(([number, title, body]) => (
            <article className="vm-loop__step" key={title}>
              <span className="vm-loop__dot" aria-hidden="true" />
              <p className="vm-micro">{number}</p>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="vm-section vm-place" aria-labelledby="vm-place-title">
        <p className="vm-micro">Community in place</p>
        <h2 id="vm-place-title">A destination becomes alive<br />through shared moments.</h2>
        <div className="vm-place__grid">
          <figure>
            <img src="/assets/projects/valmia-figma/gather@2x.png" width="862" height="720" alt="Friends gathering outdoors in the Alps." loading="lazy" decoding="async" />
            <figcaption>01&nbsp;&nbsp;—&nbsp;&nbsp;Gather</figcaption>
          </figure>
          <figure>
            <img src="/assets/projects/valmia-figma/explore@2x.png" width="862" height="720" alt="A dramatic alpine peak and meadow." loading="lazy" decoding="async" />
            <figcaption>02&nbsp;&nbsp;—&nbsp;&nbsp;Explore</figcaption>
          </figure>
          <figure>
            <img src="/assets/projects/valmia-figma/belong@2x.png" width="862" height="720" alt="A community sharing a long outdoor meal." loading="lazy" decoding="async" />
            <figcaption>03&nbsp;&nbsp;—&nbsp;&nbsp;Belong</figcaption>
          </figure>
        </div>
      </section>

      <section className="vm-section vm-evolution" aria-labelledby="vm-evolution-title">
        <div className="vm-evolution__intro">
          <p className="vm-micro">Product evolution</p>
          <h2 id="vm-evolution-title">Designed to grow<br />with the<br />destination.</h2>
          <p>A focused first release creates a foundation for a broader community ecosystem.</p>
        </div>
        <div className="vm-evolution__steps">
          {evolution.map(([number, title, body]) => (
            <article className="vm-evolution__step" key={title}>
              <p className="vm-micro">{number}</p>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="vm-section vm-scope" aria-labelledby="vm-scope-title">
        <div className="vm-scope__intro">
          <p className="vm-micro">Scope</p>
          <h2 id="vm-scope-title">An end-to-end<br />community<br />product<br />partnership.</h2>
          <p>Research, strategy, brand, product, and development—from opportunity to pilot.</p>
        </div>
        <div className="vm-scope__items">
          {scope.map(([number, title]) => (
            <article className="vm-scope__item" key={title}>
              <span className="vm-scope__dash" aria-hidden="true" />
              <p className="vm-micro">{number}</p>
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </section>

      <CaseStudyFooter
        eyebrow="The outcome"
        statement={"Buildings create a resort.\nCommunity creates a destination."}
        currentHref="/work/valmia"
      />
    </main>
  );
}
