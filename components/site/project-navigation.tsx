export function ProjectNavigation() {
  return (
    <header className="project-nav">
      <a className="project-nav__brand" href="/" aria-label="Analog Future home">
        Analog Future
      </a>
      <nav aria-label="Project navigation">
        <a href="/#work">Work</a>
        <a href="/studio">About</a>
        <a href="mailto:andrea.lausevic@gmail.com">Contact</a>
      </nav>
    </header>
  );
}
