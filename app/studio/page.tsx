import type { Metadata } from "next";
import { ProjectNavigation } from "./studio-navigation";
import { ExpertisePong } from "@/components/site/expertise-pong";
import "./studio.css";
import "./studio-navigation.css";

export const metadata: Metadata = {
  title: "Studio — Analog Future",
  description: "A collaborative studio bringing design, art, and engineering together to build useful tools and new ways of seeing.",
};

export default function StudioPage() {
  return (
    <main className="studio-page" id="top">
      <ProjectNavigation />
      <section className="studio-hero studio-wrap" aria-labelledby="studio-intro-heading">
        <div className="studio-intro">
          <h1 id="studio-intro-heading">Different backgrounds.<br /><em>A shared curiosity.</em></h1>
          <div className="studio-intro__copy">
            <p>We are a small group of people working across design, art, and engineering.</p>
            <p>What brings us together is an interest in people, culture, and the ways we live with technology.</p>
            <p>Each of us brings a different way of noticing, asking questions, and making things.</p>
          </div>
        </div>
      </section>

      <section className="studio-expertise studio-wrap" id="expertise" aria-label="Storytelling and engineering" data-no-motion="">
        <ExpertisePong />
      </section>

      <section className="studio-purpose studio-wrap" aria-labelledby="studio-purpose-heading">
        <p className="studio-label">02 / Why we make</p>
        <div>
          <h2 id="studio-purpose-heading">Sometimes the answer is a useful tool. Sometimes it’s <em>a new way of seeing.</em></h2>
          <div className="studio-purpose__copy">
            <p>We like projects that begin with a real question. That might mean making a complicated task simpler, helping an idea communicate more clearly, or revealing patterns that otherwise go unnoticed.</p>
            <p>We’re equally interested in what a tool can do and what it can help someone understand — about a place, a community, or themselves.</p>
          </div>
        </div>
      </section>

      <section className="studio-offerings studio-wrap" aria-labelledby="studio-offerings-heading">
        <div className="studio-offerings__heading">
          <p className="studio-label">03 / What we bring</p>
          <h2 id="studio-offerings-heading">Thinking, making, and building — together.</h2>
        </div>
        <div className="studio-offerings__rows">
          <div><span className="studio-label">01</span><h3>Brand &amp; strategy</h3><p>Research / Positioning / Identity</p></div>
          <div><span className="studio-label">02</span><h3>Digital products &amp; development</h3><p>UX / UI / Systems / Engineering</p></div>
          <div><span className="studio-label">03</span><h3>AI ecosystem design</h3><p>Exploration / Applied tools / Experiences</p></div>
        </div>
      </section>

      <section className="studio-contact studio-wrap" id="contact">
        <p className="studio-label">04 / Start a conversation</p>
        <div className="studio-contact__main">
          <h2>Have an idea or question?</h2>
          <a href="mailto:andrea.lausevic@gmail.com?subject=Hello%20Analog%20Future">Let&apos;s talk <span aria-hidden="true">↗</span></a>
        </div>
        <footer className="studio-contact__footer">
          <span>© Analog Future</span>
          <span>Berlin · New York</span>
          <a href="#top">Back to top ↑</a>
        </footer>
      </section>
    </main>
  );
}
