import type { Metadata } from "next";
import { CaseStudyFooter } from "@/components/site/case-study-footer";
import { ProjectNavigation } from "@/components/site/project-navigation";
import { ImageCrop, ColumnGrid } from "@/components/site/image-crop";
import { MobileScreenshotCarousel } from "@/components/site/mobile-screenshot-carousel";
import "../case-study-v2.css";
import "./cubed.css";

export const metadata: Metadata = { title: "Cubed | Analog Future", description: "A clear, approachable identity for a finance and accounting company serving small businesses." };

const mobileSlides = [
  ["Meet the founder", "10 0 570 1220"],
  ["Our approach", "590 0 570 1220"],
  ["Join us", "1170 0 582 1220"],
].map(([title, crop]) => ({ title, crop, src: "/assets/projects/cubed-figma/mobile@2x.png", width: 1752, height: 1268, alt: `Cubed mobile website: ${title}.` }));

export default function CubedPage() {
  return <main className="case-study cubed-page">
    <ProjectNavigation />
    <section className="cubed-hero">
      <p className="cubed-label">02</p><h1>Cubed</h1>
      <p className="cubed-label cubed-meta">Brand strategy / Identity / Website · 2023</p>
      <img className="cubed-hero-media" src="/assets/projects/cubed-figma/hero@2x.png" alt="Cubed business cards and brand symbol." />
      <ImageCrop className="cubed-hero-mobile mobile-only" src="/assets/projects/cubed-figma/hero@2x.png" width={2716} height={1120} crop="0 0 1708 1120" alt="Cubed business cards in cream, olive, and violet." />
      <p className="cubed-intro af-body">Cubed is a finance and accounting company working with small businesses in food and hospitality. They wanted a brand that made financial expertise feel clear, approachable, and human.</p>
    </section>
    <section className="cubed-split cubed-problem">
      <div className="cubed-copy"><p className="cubed-label">A flexible brand system</p><h2>We created an identity system that brings clarity and character to every touchpoint, from the website and communications to merchandise and printed materials.</h2></div>
      <div className="cubed-rule" /><img className="cubed-feature-media" src="/assets/projects/cubed-figma/system@2x.png" alt="Cubed desktop website design." />
    </section>
    <section className="cubed-applications"><p className="cubed-label">Brand applications</p><img className="desktop-only" src="/assets/projects/cubed-figma/applications@2x.png" alt="Cubed cap, sculptural composition, and tote bag." />
      <div className="cubed-applications-mobile mobile-only">
        {[["0 0 878 866", "Cubed cap"], ["896 0 912 866", "Cubed sculptural composition"], ["1826 0 890 866", "Cubed tote bag"]].map(([crop, alt]) => <ImageCrop key={alt} crop={crop} alt={alt} src="/assets/projects/cubed-figma/applications@2x.png" width={2716} height={866} />)}
      </div>
    </section>
    <section className="cubed-split cubed-mobile">
      <p className="cubed-label cubed-mobile-label">Mobile website</p><div className="cubed-rule" /><img className="cubed-feature-media desktop-only" src="/assets/projects/cubed-figma/mobile@2x.png" alt="Three Cubed mobile website screens." />
      <MobileScreenshotCarousel id="cubed-mobile-slides" label="Cubed mobile website" slides={mobileSlides} />
    </section>
    <section className="cubed-identity" aria-labelledby="cubed-identity-title">
      <h2 className="cubed-label" id="cubed-identity-title">Identity system</h2>
      <div className="identity-cell identity-symbol"><div className="symbol-disc"><span/><span/><span/></div><p className="cubed-label identity-caption">Brand symbol</p></div>
      <div className="identity-cell identity-colors"><div><i className="violet"/><p>Violet blue<br/>#492CB2</p></div><div><i className="olive"/><p>Olive<br/>#989F54</p></div><div><i className="cream"/><p>Cream<br/>#DCD3C7</p></div></div>
      <div className="identity-cell identity-type"><strong>Aa</strong><b>Ivar Display</b><small>Title / Regular</small><p>Karla / Secondary<br/>Regular / Medium<br/>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>abcdefghijklmnopqrstuvwxyz</p></div>
      <div className="identity-cell identity-grid"><p className="cubed-label identity-caption">Twelve column grid</p><ColumnGrid /></div>
    </section>
    <CaseStudyFooter eyebrow="A new direction" statement="We created a modern, tactile brand identity that makes financial expertise feel fresh, approachable, and human, supported by a flexible system designed to work across digital and physical applications." currentHref="/work/cubed" />
  </main>;
}
