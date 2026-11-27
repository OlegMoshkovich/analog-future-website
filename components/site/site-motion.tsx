"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { startHomePanels } from "@/lib/home-panels";
import { startSiteMotion } from "@/lib/site-motion";

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const stopPanels = startHomePanels();
    const stopMotion = startSiteMotion();
    const openPanelDirectly = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, window.location.href);
      const id = url.hash.slice(1);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== "/") return;
      if (id !== "studio" && id !== "work" && id !== "approach" && id !== "contact") return;
      document.documentElement.style.scrollBehavior = "auto";
    };
    document.addEventListener("click", openPanelDirectly, true);
    return () => {
      document.removeEventListener("click", openPanelDirectly, true);
      stopMotion();
      stopPanels();
    };
  }, [pathname]);

  return null;
}
