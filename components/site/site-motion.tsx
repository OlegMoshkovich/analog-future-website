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
    return () => {
      stopMotion();
      stopPanels();
    };
  }, [pathname]);

  return null;
}
