import { Wordmark } from "@/components/site/wordmark";

export function ProjectNavigation() {
  return (
    <header className="project-nav">
      <Wordmark />
      <nav aria-label="Project navigation">
        <a href="/#work">Work</a>
        <a href="/studio" aria-current="page">About</a>
        <a href="mailto:andrea.lausevic@gmail.com">Contact</a>
      </nav>
    </header>
  );
}
