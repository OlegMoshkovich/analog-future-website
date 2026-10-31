// Cards rise from the bottom, then keep their tabs at the top while content
// passes behind the card edge. The document remains the only scroll container.
export function startHomePanels(root = document.querySelector(".af-home--panels")) {
  if (!root) return () => {};

  const hero = root.querySelector(":scope > .af-hero");
  const records = Array.from(root.children)
    .filter(element => element.matches(".af-panel"))
    .map(surface => {
      const tab = surface.querySelector(".af-panel__tab");
      return {
        surface,
        tab,
        anchor: tab && document.getElementById(tab.getAttribute("href").slice(1)),
        content: surface.querySelector(".af-panel__clip")?.firstElementChild,
        spacer: surface.nextElementSibling,
        start: 0,
        tabHeight: 0,
      };
    })
    .filter(record => record.tab && record.anchor && record.content &&
      record.spacer?.matches(".af-panel-spacer"));
  if (!records.length) return () => {};

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0;
  let focusFrame = 0;
  let scrollFrame = 0;
  let disposed = false;
  let activeTab = null;

  const resetPanels = () => {
    root.removeAttribute("data-af-panels");
    hero?.style.removeProperty("--af-panel-top");
    for (const { surface, spacer } of records) {
      for (const property of ["--af-panel-top", "--af-panel-bottom",
        "--af-panel-height", "--af-panel-content-offset"]) {
        surface.style.removeProperty(property);
      }
      spacer.style.removeProperty("--af-panel-spacer-height");
    }
  };

  const updateScroll = () => {
    scrollFrame = 0;
    if (disposed) return;
    const scroll = window.scrollY;
    const readingLine = scroll + window.innerHeight * .4;
    let current = records[0].tab;
    for (const record of records) {
      if (!reducedMotion.matches) {
        const offset = Math.min(0, record.start - scroll - record.tabHeight);
        record.surface.style.setProperty("--af-panel-content-offset", `${offset}px`);
      }
      if (record.start <= readingLine) current = record.tab;
    }
    if (current === activeTab) return;
    activeTab = current;
    for (const { tab } of records) {
      if (tab === current) tab.setAttribute("aria-current", "location");
      else tab.removeAttribute("aria-current");
    }
  };

  const measure = () => {
    frame = 0;
    if (disposed) return;
    if (reducedMotion.matches) {
      resetPanels();
    } else {
      const viewport = window.innerHeight;
      const sizes = records.map(({ surface, tab, content }) => ({
        tabHeight: tab.getBoundingClientRect().height,
        contentHeight: content.getBoundingClientRect().height +
          parseFloat(window.getComputedStyle(surface).borderTopWidth || "0"),
      }));
      if (hero) {
        hero.style.setProperty("--af-panel-top",
          `${Math.min(0, viewport - hero.getBoundingClientRect().height)}px`);
      }
      records.forEach((record, index) => {
        const { tabHeight, contentHeight } = sizes[index];
        const height = Math.max(1, viewport - tabHeight);
        record.tabHeight = tabHeight;
        record.surface.style.setProperty("--af-panel-top", `${tabHeight}px`);
        record.surface.style.setProperty("--af-panel-bottom", `${-height}px`);
        record.surface.style.setProperty("--af-panel-height", `${height}px`);
        // Preserve the full reading distance without making the pinned surface
        // taller than the viewport or letting it push old tabs offscreen.
        record.spacer.style.setProperty("--af-panel-spacer-height",
          `${Math.max(0, contentHeight - height)}px`);
      });
      root.setAttribute("data-af-panels", "ready");
    }
    for (const record of records) {
      record.start = record.anchor.getBoundingClientRect().top + window.scrollY;
    }
    updateScroll();
  };

  const scheduleMeasure = () => {
    if (!frame && !disposed) frame = window.requestAnimationFrame(measure);
  };
  const onScroll = () => {
    if (!scrollFrame && !disposed) scrollFrame = window.requestAnimationFrame(updateScroll);
  };

  const onFocus = (event) => {
    const target = event.target;
    if (!(target instanceof Element) || !target.matches(":focus-visible")) return;
    window.cancelAnimationFrame(focusFrame);
    focusFrame = window.requestAnimationFrame(() => {
      if (disposed || reducedMotion.matches) return;
      const record = records.find(({ surface }) => surface.contains(target));
      if (!record) return;
      const rect = target.getBoundingClientRect();
      const x = Math.max(0, Math.min(window.innerWidth - 1, rect.left + rect.width / 2));
      const y = Math.max(0, Math.min(window.innerHeight - 1, rect.top + rect.height / 2));
      const visibleElement = document.elementFromPoint(x, y);
      if (target.contains(visibleElement)) return;

      const anchorTop = record.anchor.getBoundingClientRect().top + window.scrollY;
      const localTop = rect.top - record.content.getBoundingClientRect().top;
      const isTab = target === record.tab;
      // Native focus may target a clipped project or a previous card. Bring its
      // original document position back into view before the next paint.
      const scrollTop = isTab ? Math.max(0, anchorTop - record.tabHeight) :
        Math.max(0, anchorTop - record.tabHeight,
          anchorTop + localTop - window.innerHeight * .35);
      const html = document.documentElement;
      const previousBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollTop);
      html.style.scrollBehavior = previousBehavior;
      updateScroll();
    });
  };

  const resizeObserver = typeof window.ResizeObserver === "function"
    ? new ResizeObserver(scheduleMeasure)
    : null;
  if (hero) resizeObserver?.observe(hero);
  for (const { content } of records) resizeObserver?.observe(content);
  window.addEventListener("resize", scheduleMeasure, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("hashchange", onScroll);
  reducedMotion.addEventListener("change", scheduleMeasure);
  root.addEventListener("focusin", onFocus);
  measure();

  return () => {
    disposed = true;
    window.cancelAnimationFrame(frame);
    window.cancelAnimationFrame(focusFrame);
    window.cancelAnimationFrame(scrollFrame);
    resizeObserver?.disconnect();
    window.removeEventListener("resize", scheduleMeasure);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("hashchange", onScroll);
    reducedMotion.removeEventListener("change", scheduleMeasure);
    root.removeEventListener("focusin", onFocus);
    for (const { tab } of records) tab.removeAttribute("aria-current");
    resetPanels();
  };
}
