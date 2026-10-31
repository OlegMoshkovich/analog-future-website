import type { Metadata } from "next";
import { CaseStudyFooter } from "@/components/site/case-study-footer";
import { ProjectNavigation } from "@/components/site/project-navigation";
import "./earthen.css";

export const metadata: Metadata = {
  title: "Earthen — Analog Future",
  description: "A flexible brand and educational platform for personal development.",
};

const journey = [
  {
    number: "01",
    stage: "Explore",
    program: "Earthen Masterclass",
    body: "Accessible, standalone sessions introducing Earthen’s ideas and practices. Designed as a welcoming, low-commitment entry point for people encountering the work for the first time.",
  },
  {
    number: "02",
    stage: "Practice",
    program: "Soul Guide",
    body: "A recurring guided program for people ready to move from curiosity into consistent practice. Participants could deepen their learning, apply the work to everyday life, and grow alongside a community.",
  },
  {
    number: "03",
    stage: "Lead",
    program: "Empowerment Certification",
    body: "An immersive pathway for experienced participants ready to expand their capabilities. The program was designed to develop the knowledge, confidence, and practical foundation needed to guide others.",
  },
] as const;

const applications = [
  {
    src: "/assets/projects/earthen-figma/earthen-application-01@2x.png",
    width: 878,
    height: 810,
    alt: "An Earthen outdoor sign carrying the circular brand graphic.",
  },
  {
    src: "/assets/projects/earthen-figma/earthen-application-02@2x.png",
    width: 912,
    height: 810,
    alt: "The Earthen mobile experience shown in a natural setting.",
  },
  {
    src: "/assets/projects/earthen-figma/earthen-application-03@2x.png",
    width: 890,
    height: 810,
    alt: "Earthen printed materials with the forest-green identity.",
  },
] as const;

export default function EarthenPage() {
  return (
    <main className="earthen-page">
      <ProjectNavigation />

      <section className="earthen-hero" aria-labelledby="earthen-title">
        <p className="earthen-micro earthen-hero__number">03</p>
        <h1 id="earthen-title">Earthen</h1>
        <p className="earthen-micro earthen-hero__meta">
          Brand strategy / Naming / Program architecture / Identity / Digital / Social · 2022
        </p>
        <figure className="earthen-hero__media">
          <svg className="earthen-hero__artwork" viewBox="0 0 1358 560" role="img" aria-label="Earthen identity: sunlit architecture and autumn branches beside the white Earthen wordmark on forest green.">
            <image href="/assets/projects/earthen-figma/hero-photo.jpg" x="0" y="-109" width="679" height="681" preserveAspectRatio="xMidYMid slice" />
            <image href="/assets/projects/earthen-figma/hero-wordmark.svg" x="827" y="238.598" width="390" height="93" />
          </svg>
        </figure>
        <p className="earthen-hero__description">
          We helped reposition an established healing practice as Earthen—a broader educational platform for multiple modalities, structured programs, and community.
        </p>
      </section>

      <section className="earthen-section earthen-problem" aria-labelledby="earthen-problem-title">
        <div className="earthen-problem__inner">
          <div className="earthen-problem__copy">
            <h2 className="earthen-micro" id="earthen-problem-title">Building beyond a single methodology</h2>
            <p>
              The founders had built a trusted practice around Theta Healing, but the methodology had also become a constraint. They wanted the freedom to incorporate other techniques, welcome a broader audience.
              <br /><br />
              The challenge was to evolve the practice without losing the intimacy and trust they had already established.
            </p>
          </div>
          <figure className="earthen-problem__media">
            <img
              src="/assets/projects/earthen-figma/earthen-feature-01@2x.png"
              width="1752"
              height="1268"
              alt="Earthen website and editorial layouts arranged as a tactile design system."
            />
          </figure>
        </div>
      </section>

      <section className="earthen-platform" aria-labelledby="earthen-platform-title">
        <p className="earthen-micro">From practice to platform</p>
        <h2 id="earthen-platform-title">
          We transformed an established healing practice into a flexible brand and educational platform—with a clear pathway from first encounter to deeper practice and leadership.
        </h2>
      </section>

      <section className="earthen-journey" aria-labelledby="earthen-journey-title">
        <h2 className="earthen-micro" id="earthen-journey-title">New program structure</h2>
        <div className="earthen-journey__grid">
          {journey.map(({ number, stage, program, body }) => (
            <article className="earthen-journey__item" key={stage}>
              <p className="earthen-micro">{number}</p>
              <div>
                <p className="earthen-journey__stage">{stage}</p>
                <h3>{program}</h3>
                <p className="earthen-journey__body">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="earthen-section earthen-editorial" aria-labelledby="earthen-editorial-title">
        <div className="earthen-editorial__inner">
          <h2 className="earthen-micro" id="earthen-editorial-title">Editorial / Digital</h2>
          <figure className="earthen-editorial__media">
            <img
              src="/assets/projects/earthen-figma/earthen-feature-02@2x.png"
              width="1752"
              height="2030"
              alt="The Earthen learning journey displayed on a tablet."
            />
          </figure>
        </div>
      </section>

      <section className="earthen-applications" aria-labelledby="earthen-applications-title">
        <h2 className="earthen-micro" id="earthen-applications-title">Brand applications</h2>
        <div className="earthen-applications__grid">
          {applications.map(({ src, width, height, alt }) => (
            <figure key={src}>
              <img src={src} width={width} height={height} alt={alt} />
            </figure>
          ))}
        </div>
      </section>

      <section className="earthen-section earthen-identity" aria-labelledby="earthen-identity-title">
        <div className="earthen-identity__grid">
          <h2 className="earthen-micro" id="earthen-identity-title">Identity system</h2>

          <div className="earthen-identity__mark">
            <img
              src="/assets/projects/earthen-figma/earthen-identity-mark@2x.png"
              width="408"
              height="356"
              alt="Earthen geometric brand mark."
            />
            <p className="earthen-micro">Brand mark</p>
          </div>

          <div className="earthen-identity__colors" aria-label="Earthen color palette">
            <div>
              <span style={{ background: "#183b32" }} />
              <p><strong>Forest</strong><br />#183B32</p>
            </div>
            <div>
              <span style={{ background: "#b6cacd" }} />
              <p><strong>Cloud</strong><br />#B6CACD</p>
            </div>
            <div>
              <span style={{ background: "#c9a27e" }} />
              <p><strong>Clay</strong><br />#C9A27E</p>
            </div>
          </div>

          <div className="earthen-identity__type">
            <p className="earthen-identity__sample">Aa</p>
            <p><strong>Canela</strong></p>
            <p>Graphik · Secondary<br />Regular / Medium<br />ABCČĆDĐEFGHIJKLMNOPQRSŠTUVZŽ<br />abcčćdđefghijklmnopqrsštuvzž</p>
          </div>
        </div>
      </section>

      <CaseStudyFooter
        eyebrow="The solution"
        statement="We built Earthen from strategy to expression—defining its identity, program structure, art direction, photography, and digital experience. A cohesive platform designed to help the practice grow beyond a single methodology."
        currentHref="/work/earthen"
      />
    </main>
  );
}
