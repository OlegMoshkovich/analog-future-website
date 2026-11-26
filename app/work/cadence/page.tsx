import { IdentitySystem } from "@/components/site/identity-system";
import type { Metadata } from "next";
import { CaseStudyFooter } from "@/components/site/case-study-footer";
import { ProjectNavigation } from "@/components/site/project-navigation";
import { MobileScreenshotCarousel } from "@/components/site/mobile-screenshot-carousel";
import { CadenceAnalyticsScreen } from "./cadence-analytics-screen";
import { CadenceHeroAnimation } from "./cadence-hero-animation";
import { CadenceTimelineDemo } from "./cadence-timeline-demo";
import "./cadence.css";

export const metadata: Metadata = {
  title: "Cadence | Analog Future",
  description: "A reflective record for remembering everyday life and seeing its patterns over time.",
};

const journey = [
  ["01", "Log the day", "Quickly capture activities as you go."],
  ["02", "Review patterns", "See your time across days and weeks."],
  ["03", "Understand time", "Notice what shapes the rhythm of your days."],
  ["04", "Reflect", "Build awareness and make intentional change."],
] as const;

const analyticsSlides = ([
  { view: "overview", title: "Overview", alt: "Cadence analytics overview showing streaks, logged days, and 6,072 total hours logged." },
  { view: "hours", title: "Hours", alt: "Cadence hours view with 1,704 hours logged and a category breakdown." },
  { view: "spend", title: "Spend", alt: "Cadence spend view showing $19,261.50 total spend and monthly and daily spending patterns." },
  { view: "mood", title: "Mood", alt: "Cadence mood view showing changes across January and an average mood of Pleasant." },
] as const).map(slide => ({
  ...slide, src: `/assets/projects/cadence-figma/analytics-${slide.view}@2x.png`,
  crop: "40 75 591 791", width: 631, height: 866,
}));

const experienceSlides = [
  { title: "Daily view", crop: "72 40 620 1120", alt: "Cadence daily view for logging activities, feelings, and moments." },
  { title: "Weekly view", crop: "710 40 620 1120", alt: "Cadence weekly view showing activity patterns across seven days." },
  { title: "Yearly view", crop: "1348 40 620 1120", alt: "Cadence yearly view showing the rhythm of activities across months." },
].map(slide => ({ ...slide, src: "/assets/projects/cadence-figma/feature@2x.png", width: 2046, height: 1384 }));

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
        <CadenceHeroAnimation />
        <p className="cadence-hero__description af-body">
          Cadence is a time tracker and journal for everyday life. We built it so we could go back to a random Tuesday and remember what we worked on, what we read or watched, and how we felt. Over time, those details show us what we make time for and when we have the most energy.
        </p>
      </section>

      <section className="cadence-section cadence-experience" aria-labelledby="cadence-experience-title">
        <div className="cadence-experience__inner">
          <div className="cadence-experience__copy">
            <p className="cadence-micro">The core experience</p>
            <h2 id="cadence-experience-title">One system.<br />Multiple scales.</h2>
          </div>
          <figure className="cadence-experience__media">
            <CadenceTimelineDemo />
          </figure>
          <MobileScreenshotCarousel id="cadence-experience-slides" label="Cadence views" slides={experienceSlides} artwork={{ 0: <CadenceTimelineDemo view="daily" />, 2: <CadenceTimelineDemo view="yearly" /> }} />
        </div>
      </section>

      <section className="cadence-section cadence-journey" aria-labelledby="cadence-journey-title">
        <div className="cadence-journey__grid">
          <div className="cadence-context cadence-journey__context">
            <p className="cadence-micro">User journey</p>
            <h2 id="cadence-journey-title">From daily moments to a clearer perspective.</h2>
            <p className="af-body">A simple loop turns quick entries into useful reflection.</p>
          </div>
          {journey.map(([number, title, body]) => (
            <article className="cadence-journey__item" key={title}>
              <span className="cadence-journey__marker" aria-hidden="true" />
              <p className="cadence-micro">{number}</p>
              <h3>{title}</h3>
              <p className="af-body">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cadence-analytics" aria-labelledby="cadence-analytics-title">
        <h2 className="cadence-micro" id="cadence-analytics-title">Analytics</h2>
        <div className="cadence-analytics__grid" data-no-motion>
          {analyticsSlides.map(({ view, src, alt, width, height }) => (
            <figure key={view}>
              <CadenceAnalyticsScreen view={view} src={src} alt={alt} width={width} height={height} />
            </figure>
          ))}
        </div>
        <MobileScreenshotCarousel id="cadence-analytics-slides" label="Cadence analytics" slides={analyticsSlides}
          artwork={Object.fromEntries(analyticsSlides.map((slide, index) => (
            [index, <CadenceAnalyticsScreen key={slide.view} {...slide} />]
          )))} />
      </section>

      <section className="cadence-identity" aria-labelledby="cadence-identity-title">
        <h2 className="cadence-micro" id="cadence-identity-title">Identity system</h2>
        <IdentitySystem project="cadence" />
      </section>

      <section className="cadence-scope" aria-labelledby="cadence-scope-title">
        <div className="cadence-scope__grid">
          <div className="cadence-context cadence-scope__context">
            <p className="cadence-micro">Scope</p>
            <h2 id="cadence-scope-title">A complete end-to-end partnership.</h2>
            <p className="af-body">Strategy, brand, product, and development, from idea to launch.</p>
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
