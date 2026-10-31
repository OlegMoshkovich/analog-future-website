import type { Metadata } from "next";
import { CaseStudyFooter } from "@/components/site/case-study-footer";
import { ProjectNavigation } from "@/components/site/project-navigation";
import { CoolbuildingAtlas } from "./coolbuilding-atlas";
import "../case-study-v2.css";
import "./coolbuilding.css";

export const metadata: Metadata = {
  title: "Coolbuilding — Analog Future",
  description: "An interactive map for visually exploring remarkable architecture around the world.",
};

export default function CoolbuildingPage() {
  return (
    <main className="case-study coolbuilding-page">
      <ProjectNavigation />

      <section className="cb-hero" aria-labelledby="cb-title">
        <p className="cb-micro">07</p>
        <h1 id="cb-title">Coolbuilding</h1>
        <p className="cb-micro cb-hero__meta">
          Product design / Branding · 2026 · Independent project
        </p>
        <CoolbuildingAtlas />
        <p className="cb-hero__description">
          Born from our love of architectural history, Cool Buildings is an interactive map for visually exploring remarkable buildings and hidden gems around the world.
        </p>
      </section>

      <section className="cb-idea" aria-labelledby="cb-idea-title">
        <div className="cb-idea__copy">
          <p className="cb-micro">The idea</p>
          <h2 id="cb-idea-title">
            An interactive map that helps you discover architectural gems all over the world.
          </h2>
        </div>
        <span className="cb-idea__rule" aria-hidden="true" />
        <img
          className="cb-idea__visual"
          src="/assets/projects/coolbuilding-figma/map@2x.png"
          width="1752"
          height="1256"
          alt="Coolbuilding interface showing the Barcelona Pavilion with filters for location, typology, era, and material."
          loading="lazy"
          decoding="async"
        />
      </section>

      <section className="cb-identity" aria-labelledby="cb-identity-title">
        <h2 className="cb-micro" id="cb-identity-title">Identity system</h2>
        <img
          src="/assets/projects/coolbuilding-figma/identity@2x.png"
          width="2716"
          height="720"
          alt="Coolbuilding identity system showing the floor-plan monogram, cobalt and concrete colors, Neue Montreal typography, and twelve-column grid."
          loading="lazy"
          decoding="async"
        />
      </section>

      <CaseStudyFooter
        eyebrow="Built for discovery"
        statement="A visual, intuitive way to explore architectural history: turning curiosity into discovery,"
        currentHref="/work/coolbuilding"
      />
    </main>
  );
}
