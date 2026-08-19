"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's signature motion: the two halves of the name pull apart as the
 * page scrolls, and the rule between them stretches. The society's whole
 * subject is the tension between what we are and what we build, so the type
 * itself carries it rather than a decorative graphic.
 *
 * Written against rAF and transforms only — no layout is read during the
 * scroll handler, and the whole thing is skipped under reduced motion.
 */
export default function ScrollTension({ children }: { children: React.ReactNode }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const left = el.querySelector<HTMLElement>("[data-tension='left']");
    const right = el.querySelector<HTMLElement>("[data-tension='right']");
    const fade = el.querySelectorAll<HTMLElement>("[data-tension='fade']");

    let frame = 0;
    let travel = window.innerHeight;

    const measure = () => {
      travel = Math.max(320, window.innerHeight);
    };

    const render = () => {
      frame = 0;
      // 0 at the top of the page, 1 once a full viewport has been scrolled.
      const p = Math.min(1, Math.max(0, window.scrollY / travel));
      // Ease the drift so the first few pixels of scroll do the least work.
      const eased = p * p;
      const shift = eased * 9;
      if (left) left.style.transform = `translate3d(${-shift}vw, 0, 0)`;
      if (right) right.style.transform = `translate3d(${shift}vw, 0, 0)`;
      fade.forEach((node) => {
        node.style.opacity = String(Math.max(0, 1 - p * 1.6));
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(render);
    };

    measure();
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={host} className="contents">
      {children}
    </div>
  );
}
