import { ProcessCard } from "@/components/site/process-card";
import { ProjectCard } from "@/components/site/project-card";
import { ConnectTheDots } from "@/components/site/connect-the-dots";
import "./home-panels.css";

const projects = [
  {
    index: "02",
    title: "Cubed",
    category: "Brand strategy, brand identity",
    tags: "#hospitality  #finance",
    href: "/work/cubed",
    image: "/assets/home/cubed.png",
    imageAlt: "Cubed identity applied to violet and olive textile swatches.",
  },
  {
    index: "04",
    title: "#WeCount",
    category: "Data visualization",
    tags: "#society-of-family-planning",
    href: "/work/wecount",
    image: "/assets/home/wecount.png",
    imageAlt: "A map-based visualization of changes in abortion access.",
  },
  {
    index: "03",
    title: "Earthen",
    category: "Brand strategy, brand identity",
    tags: "#brand-strategy  #web-design",
    href: "/work/earthen",
    image: "/assets/home/earthen.png",
    imageAlt: "Earthen wordmark set over a dark green landscape.",
  },
  {
    index: "05",
    title: "Valmia App",
    category: "An Analog Future digital product",
    tags: "#app  #community",
    href: "/work/valmia",
    image: "/assets/home/valmia.png",
    imageAlt: "Valmia symbol over a misty alpine landscape.",
  },
  {
    index: "07",
    title: "Coolbuilding",
    category: "An Analog Future digital product",
    tags: "#architecture  #map  #digital-product",
    href: "/work/coolbuilding",
    image: "/assets/home/coolbuilding.png",
    imageAlt: "Coolbuilding geometric identity in blue and gray.",
  },
  {
    index: "06",
    title: "Simple Site",
    category: "An Analog Future digital product",
    tags: "#construction  #digital-product",
    href: "/work/simplesite",
    image: "/assets/home/simplesite.png",
    imageAlt: "A detailed modern building facade in sunlight.",
  },
] as const;

const process = [
  {
    index: "01",
    title: "Shape",
    description:
      "Find the central idea, clarify the audience, and set a direction that can guide every decision.",
    services: "Strategy · Positioning · Product direction",
  },
  {
    index: "02",
    title: "Express",
    description:
      "Give the idea a distinctive voice through identity, typography, image, and a flexible visual system.",
    services: "Art direction · Identity · Campaigns",
  },
  {
    index: "03",
    title: "Build",
    description:
      "Turn the system into an experience people can understand, use, and remember.",
    services: "UX / UI · Design systems · Digital products",
  },
] as const;

export default function Home() {
  return (
    <main className="af-home af-home--panels" id="top">
      <section className="af-hero" aria-labelledby="af-home-title">
        <div className="af-hero__inner">
          <div className="af-hero__copy">
            <div className="af-hero__context">
              <p>Independent design &amp; technology studio</p>
            </div>

            <h1 id="af-home-title">
              <span>Analog</span>
              <em>Future</em>
            </h1>

            <ol className="af-hero__services" aria-label="Studio services">
              <li><span>01</span><span className="af-hero__service-name">Brand strategy &amp; identity</span></li>
              <li><span>02</span><span className="af-hero__service-name">Digital product design &amp; dev</span></li>
              <li><span>03</span><span className="af-hero__service-name">AI products &amp; systems</span></li>
            </ol>
          </div>

          <div className="af-hero__drawing">
            <ConnectTheDots />
          </div>

          <a className="af-hero__cue af-micro" href="#studio">
            Scroll Up
          </a>
        </div>
      </section>

      <div className="af-panel-anchor" id="studio" aria-hidden="true" />
      <section className="af-manifesto af-panel" aria-labelledby="af-manifesto-title">
        <a className="af-panel__tab" href="#studio" aria-current="location">
          <span className="af-panel__tab-number" aria-hidden="true">01</span>
          <span>What we do</span>
        </a>
        <div className="af-panel__clip">
          <div className="af-manifesto__inner">
            <p className="af-section-label af-micro">01 / What we do</p>
            <h2 id="af-manifesto-title">
              Technology moves quickly. People still need ideas they can{" "}
              <em>understand</em>, <em>trust</em>, and <em>feel</em>.
            </h2>
            <div className="af-studio-teaser">
              <p className="af-studio-teaser__description">
                Analog Future brings art direction, brand thinking, and digital
                product development together. We combine our expertise in
                engineering and storytelling to create expressive systems that work.
              </p>
              <a className="af-studio-teaser__link" href="/studio">
                More about the studio <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="af-panel-spacer" aria-hidden="true" />

      <div className="af-panel-anchor" id="work" aria-hidden="true" />
      <section className="af-work af-panel" aria-labelledby="af-work-title">
        <a className="af-panel__tab" href="#work">
          <span className="af-panel__tab-number" aria-hidden="true">02</span>
          <span>Selected work</span>
        </a>
        <div className="af-panel__clip">
          <div className="af-work__inner">
            <h2 id="af-work-title" className="af-section-label af-micro">
              02 / Selected work
            </h2>

            <article className="af-feature-project">
              <a className="af-feature-project__artwork" href="/work/cadence">
                <img
                  src="/assets/home/cadence-exact.png"
                  alt="Cadence visual system shown as a field of blue lines folding through time."
                  width="836"
                  height="693"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="af-feature-project__content">
                <p className="af-micro">01</p>
                <p className="af-feature-project__category af-micro">
                  An Analog Future product · In development
                </p>
                <h3><a href="/work/cadence">Cadence</a></h3>
                <p className="af-feature-project__description">
                  A time-awareness platform that turns everyday activity into a
                  visual record of how life is actually lived.
                </p>
                <p className="af-feature-project__services af-micro">
                  Product strategy&nbsp;&nbsp;&nbsp; Identity<br />
                  UX / UI&nbsp;&nbsp;&nbsp; Design system
                </p>
              </div>
            </article>

            <div className="af-project-grid">
              {projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="af-panel-spacer" aria-hidden="true" />

      <div className="af-panel-anchor" id="approach" aria-hidden="true" />
      <section className="af-approach af-panel" aria-labelledby="af-approach-title">
        <a className="af-panel__tab" href="#approach">
          <span className="af-panel__tab-number" aria-hidden="true">03</span>
          <span>How we work</span>
        </a>
        <div className="af-panel__clip">
          <div className="af-approach__inner">
            <p className="af-section-label af-micro">03 / How we work</p>
            <h2 id="af-approach-title">
              We bring design, storytelling, and engineering into one shared
              process—from shaping the idea to building the finished system.
            </h2>
            <div className="af-process-grid">
              {process.map((step) => (
                <ProcessCard key={step.title} {...step} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="af-panel-spacer" aria-hidden="true" />

      <div className="af-panel-anchor" id="contact" aria-hidden="true" />
      <footer className="af-footer af-panel">
        <a className="af-panel__tab" href="#contact">
          <span className="af-panel__tab-number" aria-hidden="true">04</span>
          <span>Start something</span>
        </a>
        <div className="af-panel__clip">
          <div className="af-footer__inner">
            <p className="af-section-label af-micro">04 / Start something</p>
            <a className="af-footer__cta" href="mailto:email@analogfuture.com">
              <span>Have an idea that needs form?</span>
              <span><em>Let&apos;s talk</em> <span aria-hidden="true">↗</span></span>
            </a>
            <div className="af-footer__meta">
              <div className="af-footer__studio">
                <strong>Analog Future</strong>
                <a href="/studio">Studio ↗</a>
              </div>
              <a href="mailto:email@analogfuture.com">email@analogfuture.com</a>
              <span>Berlin · New York</span>
              <a href="#top">Back to top ↑</a>
            </div>
          </div>
        </div>
      </footer>
      <div className="af-panel-spacer" aria-hidden="true" />
    </main>
  );
}
