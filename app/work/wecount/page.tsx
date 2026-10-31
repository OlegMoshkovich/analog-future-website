import type { Metadata } from "next";
import WeCountExplorer from "@/components/wecount/explorer";
import { CaseStudyFooter } from "@/components/site/case-study-footer";
import { ProjectNavigation } from "@/components/site/project-navigation";
import "../case-study-v2.css";
import "./wecount.css";

export const metadata: Metadata = {
  title: "#WeCount — Analog Future",
  description: "An interactive reconstruction of Andrea Lausevic’s #WeCount data visualization, using published historical estimates from the Society of Family Planning.",
};

export default function WeCountPage() {
  return (
    <main className="case-study wc-page">
      <ProjectNavigation />
      <section className="wc-project-intro" aria-labelledby="wc-project-title">
        <div className="wc-intro-meta">
          <p className="wc-kicker">#WeCount / Data visualization</p>
          <p className="wc-kicker">Society of Family Planning</p>
        </div>
        <div className="wc-intro-content">
          <div>
            <h1 id="wc-project-title">#WeCount</h1>
            <p className="wc-project-subtitle">Tracking abortion access after Dobbs.</p>
          </div>
          <p className="wc-project-description">#WeCount is a public health research initiative tracking monthly, state-by-state abortion volumes across the United States. This interactive view makes the post-Dobbs data easier to explore—showing how access shifted over time and from state to state.</p>
        </div>
      </section>
      <section className="wc-explorer-section" aria-label="Interactive #WeCount data explorer">
        <WeCountExplorer />
      </section>
      <CaseStudyFooter
        eyebrow="The solution"
        statement="We transformed spreadsheets of monthly estimates into an interactive national view—making shifts in abortion access visible across time, geography, and legal context."
        currentHref="/work/wecount"
      />
    </main>
  );
}
