import type { CSSProperties } from "react";
import { CaseStudyFooter } from "@/components/site/case-study-footer";
import { ProjectNavigation } from "@/components/site/project-navigation";

type Block = { eyebrow: string; title: string; body: string };
type EditorialCaseStudyProps = {
  index: string;
  title: string;
  meta: string;
  intro: string;
  accent: string;
  dark?: string;
  heroImage: string;
  heroAlt: string;
  heroFit?: CSSProperties["objectFit"];
  problem: Block;
  feature: Block;
  featureImage?: string;
  featureAlt?: string;
  steps: Array<{ number: string; title: string; body: string }>;
  identity: { colors: Array<[string, string]>; typeface: string };
  scope: string[];
  outcome: string;
  outcomeEyebrow?: string;
  nextTitle: string;
  nextHref: string;
};

export function EditorialCaseStudy(props: EditorialCaseStudyProps) {
  const style = { "--case-accent": props.accent, "--case-dark": props.dark || "#17171c" } as CSSProperties;
  const readableColor = (hex: string) => {
    const value = hex.replace("#", "");
    if (!/^[0-9a-f]{6}$/i.test(value)) return "#ffffff";
    const [r, g, b] = [0, 2, 4].map(index => Number.parseInt(value.slice(index, index + 2), 16));
    return (r * 299 + g * 587 + b * 114) / 1000 > 165 ? "#17171c" : "#ffffff";
  };
  return (
    <main className="editorial-case" style={style} id="top">
      <ProjectNavigation />
      <section className="ec-hero ec-wrap">
        <div className="ec-hero__heading">
          <p className="ec-kicker">{props.index}</p>
          <h1>{props.title}</h1>
          <div><p>{props.intro}</p><p className="ec-kicker">{props.meta}</p></div>
        </div>
        <figure className="ec-hero__media"><img src={props.heroImage} alt={props.heroAlt} style={{ objectFit: props.heroFit }} /></figure>
      </section>

      <section className="ec-split ec-section ec-wrap">
        <div><p className="ec-kicker">{props.problem.eyebrow}</p><h2>{props.problem.title}</h2></div>
        <p>{props.problem.body}</p>
      </section>

      <section className="ec-feature ec-section ec-wrap">
        <div className="ec-feature__copy"><p className="ec-kicker">{props.feature.eyebrow}</p><h2>{props.feature.title}</h2><p>{props.feature.body}</p></div>
        <figure className="ec-feature__media"><img src={props.featureImage || props.heroImage} alt={props.featureAlt || props.heroAlt} /></figure>
      </section>

      <section className="ec-steps ec-section ec-wrap">
        <p className="ec-kicker">The system</p>
        <div className="ec-steps__grid">
          {props.steps.map(step => <article key={step.title}><span className="ec-kicker">{step.number}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}
        </div>
      </section>

      <section className="ec-identity ec-section ec-wrap">
        <div className="ec-section__heading"><p className="ec-kicker">Identity system</p><h2>A visual language built for the idea.</h2></div>
        <div className="ec-identity__grid">
          <div className="ec-identity__name">{props.title}</div>
          {props.identity.colors.map(([name, value]) => <div key={value} style={{ background:value, color:readableColor(value) }}><span className="ec-kicker">{name}</span><strong>{value}</strong></div>)}
          <div className="ec-identity__type"><span className="ec-kicker">Primary typeface</span><strong>Aa</strong><small>{props.identity.typeface}</small></div>
        </div>
      </section>

      <section className="ec-scope ec-section ec-wrap">
        <div className="ec-section__heading"><p className="ec-kicker">Scope</p><h2>Strategy, expression, and experience—designed as one system.</h2></div>
        <div className="ec-scope__grid">{props.scope.map((item,i)=><div key={item}><span className="ec-kicker">0{i+1}</span><p>{item}</p></div>)}</div>
      </section>
      <CaseStudyFooter eyebrow={props.outcomeEyebrow} statement={props.outcome} nextTitle={props.nextTitle} nextHref={props.nextHref} />
    </main>
  );
}
