import { projectOrder } from "@/lib/project-order";
import "./case-study-footer.css";

type CaseStudyFooterProps = {
  eyebrow?: string;
  statement: string;
  currentHref: string;
};

export function CaseStudyFooter({ eyebrow = "The solution", statement, currentHref }: CaseStudyFooterProps) {
  const index = projectOrder.findIndex(project => project.href === currentHref);
  if (index < 0) throw new Error(`Unknown project: ${currentHref}`);
  const previous = projectOrder[(index - 1 + projectOrder.length) % projectOrder.length];
  const next = projectOrder[(index + 1) % projectOrder.length];
  return (
    <footer className="project-footer project-footer--navigation">
      <p className="project-kicker">{eyebrow}</p>
      <p className="project-footer__statement">{statement}</p>
      <nav className="project-pagination" aria-label="More projects">
        <a className="project-pagination__link" data-project-direction="previous" href={previous.href}>
          <span className="project-pagination__label">← Previous project</span>
          <span className="project-pagination__title">{previous.title}</span>
        </a>
        <a className="project-pagination__link project-pagination__link--next" data-project-direction="next" href={next.href}>
          <span className="project-pagination__label">Next project →</span>
          <span className="project-pagination__title">{next.title}</span>
        </a>
      </nav>
    </footer>
  );
}
