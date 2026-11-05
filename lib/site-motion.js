const revealSelector = [
  "section h2",
  "section h3",
  "section p",
  "section article",
  "section figure",
  "section img",
  ".af-feature-project",
  ".af-project-card",
  ".af-process-card",
  ".af-footer__cta",
  ".studio-gallery__item",
  ".studio-intro__copy",
  ".studio-purpose__copy > p",
  ".studio-offerings__rows > div",
  ".studio-contact__main",
  ".project-footer__statement",
].join(",");

// Content is visible by default. Only offscreen elements are prepared for entry.
export function startSiteMotion(root = document.querySelector("main")) {
  if (!root || typeof window.IntersectionObserver !== "function") return () => {};

  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (preference.matches) return () => {};

  const prepared = new Set();
  const pending = new Set();
  const show = (element) => {
    element.setAttribute("data-af-reveal", "visible");
    pending.delete(element);
    observer.unobserve(element);
  };
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) show(entry.target);
    }
  }, { threshold: 0, rootMargin: "0px 0px -48px 0px" });

  try {
    for (const element of root.querySelectorAll(revealSelector)) {
      // Keep interactive data tools and nested reveal targets independent.
      if (element.closest(".wc-explorer-section, [data-no-motion]")) continue;
      if (element.parentElement?.closest(revealSelector)) continue;
      if (!element.getClientRects().length) continue;
      if (element.getBoundingClientRect().top < window.innerHeight) continue;

      let delay = 0;
      const parent = element.parentElement;
      const isMobile = window.innerWidth <= 700;
      if (parent?.matches(
        ".af-project-grid, .af-process-grid, .studio-gallery__grid, .studio-offerings__rows, .cadence-analytics__grid, .cadence-challenge__grid, .cadence-journey__grid, .cadence-scope__grid, .earthen-journey__grid",
      )) {
        const columns = window.getComputedStyle(parent).gridTemplateColumns;
        const columnCount = columns === "none" ? 3 : columns.split(" ").length;
        delay = (Array.from(parent.children).indexOf(element) % columnCount) * (isMobile ? 80 : 140);
      } else if (parent) {
        const siblings = Array.from(parent.children).filter(child => child.matches(revealSelector));
        delay = Math.min(siblings.indexOf(element), 3) * (isMobile ? 60 : 90);
      }

      element.style.setProperty("--af-reveal-delay", `${delay}ms`);
      element.setAttribute("data-af-reveal", "pending");
      prepared.add(element);
      pending.add(element);
      observer.observe(element);
    }
  } catch {
    // A browser enhancement must never leave page content hidden on failure.
    for (const element of prepared) {
      element.removeAttribute("data-af-reveal");
      element.style.removeProperty("--af-reveal-delay");
    }
    observer.disconnect();
    return () => {};
  }

  const onFocus = (event) => {
    for (const element of pending) {
      if (element.contains(event.target)) show(element);
    }
  };
  const onPreferenceChange = (event) => {
    if (!event.matches) return;
    for (const element of pending) show(element);
    observer.disconnect();
  };
  root.addEventListener("focusin", onFocus);
  preference.addEventListener("change", onPreferenceChange);

  return () => {
    observer.disconnect();
    root.removeEventListener("focusin", onFocus);
    preference.removeEventListener("change", onPreferenceChange);
    for (const element of prepared) {
      element.removeAttribute("data-af-reveal");
      element.style.removeProperty("--af-reveal-delay");
    }
  };
}
