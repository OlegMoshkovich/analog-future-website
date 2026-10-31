import type { Metadata } from "next";
import { CaseStudyFooter } from "@/components/site/case-study-footer";
import { ProjectNavigation } from "@/components/site/project-navigation";
import "./cadence.css";

export const metadata: Metadata = {
  title: "Cadence — Analog Future",
  description: "A reflective record for remembering everyday life and seeing its patterns over time.",
};

const challenges = [
  ["01", "Life is Fragmented", "Important parts of life are spread across tools and contexts."],
  ["02", "Hard to see", "Patterns are difficult to spot, so time and attention stay abstract."],
  ["03", "Easy to lose balance", "Without perspective, small choices quietly become habits."],
] as const;

const journey = [
  ["01", "Log the day", "Quickly capture activities as you go."],
  ["02", "Review patterns", "See your time across days and weeks."],
  ["03", "Understand time", "Notice what shapes the rhythm of your days."],
  ["04", "Reflect", "Build awareness and make intentional change."],
] as const;

const analytics = [
  ["/assets/projects/cadence-figma/analytics-overview@2x.png", "Cadence analytics overview showing streaks, logged days, and total hours."],
  ["/assets/projects/cadence-figma/analytics-hours@2x.png", "Cadence hours view showing a category breakdown."],
  ["/assets/projects/cadence-figma/analytics-spend@2x.png", "Cadence spend view showing monthly and daily spending patterns."],
  ["/assets/projects/cadence-figma/analytics-mood@2x.png", "Cadence mood view showing changes across a month."],
] as const;

const scope = ["Product strategy", "Brand identity", "UX/UI design", "Design system", "Development"] as const;

export default function CadencePage() {
  return (
    <main className="cadence-page">
      <ProjectNavigation />

      <section className="cadence-hero" aria-labelledby="cadence-title">
        <p className="cadence-micro cadence-hero__number">01</p>
        <h1 id="cadence-title">Cadence</h1>
        <p className="cadence-micro cadence-hero__meta">
          Design direction / Brand identity / UX/UI · 2026 · In development
        </p>
        <figure className="cadence-hero__media" aria-label="Cadence identity with a gently pulsing blue symbol beside the white wordmark.">
          <svg className="cadence-hero__identity" viewBox="0 0 1174 480" role="img" aria-label="Cadence">
            <g className="cadence-hero__symbol" fill="#7594e8" transform="translate(11 0)">
              {[{ x: 358.5, y: 202, width: 17, height: 71 }, { x: 378.5, y: 191, width: 17, height: 92 }, { x: 398.5, y: 184, width: 19, height: 107 }, { x: 420, y: 191, width: 17, height: 92 }, { x: 440, y: 202, width: 17, height: 71 }].map((bar, index) => (
                <rect key={index} className="cadence-hero__bar" {...bar} rx="4" />
              ))}
            </g>
            <image href="/assets/projects/cadence-figma/wordmark.svg" x="491" y="205" width="277" height="64.6" aria-hidden="true" />
          </svg>
        </figure>
        <p className="cadence-hero__description">
          We built Cadence because we wanted to remember our lives better—to return to a random Tuesday and see what we did. Not only work, but the things that make up a life: how we felt, what we read or watched, what we spent, and the thoughts we wrote down. Over time, these details reveal the patterns of our lives.
        </p>
      </section>

      <section className="cadence-section cadence-challenge" aria-labelledby="cadence-challenge-title">
        <div className="cadence-challenge__grid">
          <div className="cadence-context cadence-challenge__context">
            <p className="cadence-micro">The challenge</p>
            <h2 id="cadence-challenge-title">Modern life moves fast.</h2>
            <p>Work, wellbeing, spending, and personal life live across different tools—making the whole picture hard to see.</p>
          </div>
          {challenges.map(([number, title, body]) => (
            <article className="cadence-challenge__item" key={title}>
              <p className="cadence-micro">{number}</p>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cadence-section cadence-experience" aria-labelledby="cadence-experience-title">
        <div className="cadence-experience__inner">
          <div className="cadence-experience__copy">
            <p className="cadence-micro">The core experience</p>
            <h2 id="cadence-experience-title">One system.<br />Multiple scales.</h2>
          </div>
          <figure className="cadence-experience__media">
            <img
              src="/assets/projects/cadence-figma/feature@2x.png"
              width="2046"
              height="1384"
              alt="Cadence daily, weekly, and yearly views shown side by side."
            />
          </figure>
        </div>
      </section>

      <section className="cadence-section cadence-journey" aria-labelledby="cadence-journey-title">
        <div className="cadence-journey__grid">
          <div className="cadence-context cadence-journey__context">
            <p className="cadence-micro">User journey</p>
            <h2 id="cadence-journey-title">From daily moments to a clearer perspective.</h2>
            <p>A simple loop turns quick entries into useful reflection.</p>
          </div>
          {journey.map(([number, title, body]) => (
            <article className="cadence-journey__item" key={title}>
              <span className="cadence-journey__marker" aria-hidden="true" />
              <p className="cadence-micro">{number}</p>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cadence-analytics" aria-labelledby="cadence-analytics-title">
        <h2 className="cadence-micro" id="cadence-analytics-title">Analytics</h2>
        <div className="cadence-analytics__grid">
          {analytics.map(([src, alt]) => (
            <figure key={src}>
              <img src={src} width="631" height="866" alt={alt} />
            </figure>
          ))}
        </div>
      </section>

      <section className="cadence-identity" aria-labelledby="cadence-identity-title">
        <div className="cadence-identity__viewport">
          <img
            src="/assets/projects/cadence-figma/identity@2x.png"
            width="2716"
            height="734"
            alt="The Cadence brand mark, core colors, typography, and category icons."
          />
          <h2 className="cadence-micro" id="cadence-identity-title">Identity system</h2>
        </div>
      </section>

      <section className="cadence-scope" aria-labelledby="cadence-scope-title">
        <div className="cadence-scope__grid">
          <div className="cadence-context cadence-scope__context">
            <p className="cadence-micro">Scope</p>
            <h2 id="cadence-scope-title">A complete end-to-end partnership.</h2>
            <p>Strategy, brand, product, and development—from idea to launch.</p>
          </div>
          {scope.map((item, index) => (
            <article className="cadence-scope__item" key={item}>
              <span className="cadence-scope__accent" aria-hidden="true" />
              <p className="cadence-micro">0{index + 1}</p>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <CaseStudyFooter
        eyebrow="The solution"
        statement="Cadence makes the patterns shaping everyday life visible."
        currentHref="/work/cadence"
      />
    </main>
  );
}
