"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/routing";

const targets = [
  ".editorial-heading", ".journey-card", ".story-image", ".story-copy",
  ".route-experience-heading", ".route-experience-layout", ".wide-photo .shell",
  ".page-hero .shell", ".tour-card", ".route-tile", ".feature-card",
  ".inquiry-band .shell", "#quick-inquiry > .shell",
].join(", ");

export function MotionExperience() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("motion-visible");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -5% 0px", threshold: 0.06 });
    const register = () => {
      document.querySelectorAll(targets).forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        element.classList.add("motion-reveal");
        observer.observe(element);
      });
    };
    register();
    const mutations = new MutationObserver(register);
    const main = document.getElementById("content");
    if (main) mutations.observe(main, { childList: true, subtree: true });
    return () => {
      mutations.disconnect();
      observer.disconnect();
      document.querySelectorAll(".motion-reveal").forEach((element) => {
        element.classList.remove("motion-reveal");
      });
    };
  }, [pathname]);

  return null;
}
