"use client";

import { useEffect } from "react";

/**
 * One observer for the whole document.
 *
 * Any element in the tree — server-rendered or not — can opt into the reveal
 * by carrying `data-reveal`. This engine watches for them, flips them to
 * `data-reveal="shown"` when they cross into view, and stops watching. A
 * MutationObserver picks up elements added by client navigation.
 *
 * Keeping the mechanism here means pages stay server components: no page has
 * to become a client bundle just to fade something in.
 */
export default function RevealEngine() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SELECTOR = "[data-reveal], [data-reveal-rule]";

    const show = (el: Element) => {
      if (el.hasAttribute("data-reveal")) el.setAttribute("data-reveal", "shown");
      if (el.hasAttribute("data-reveal-rule")) el.setAttribute("data-reveal-rule", "shown");
    };

    // No observer needed when motion is reduced — everything is simply present.
    if (reduced) {
      document.querySelectorAll(SELECTOR).forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          io.unobserve(entry.target);
        }
      },
      // Fire a little before the element reaches the fold, and once ~12% of a
      // tall element is showing, so long sections do not wait for their bottom.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const observeAll = (root: ParentNode) => {
      root.querySelectorAll(SELECTOR).forEach((el) => {
        const state = el.getAttribute("data-reveal") ?? el.getAttribute("data-reveal-rule");
        if (state === "shown") return;
        // Anything already on screen at load reveals immediately rather than
        // waiting for a scroll that may never come.
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          show(el);
          return;
        }
        io.observe(el);
      });
    };

    observeAll(document);

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node.nodeType === 1) observeAll(node as Element);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  // Deep links land correctly. The browser resolves a hash before hydration,
  // when reveal targets are still collapsed and the document is shorter than
  // its final height, so the initial jump lands short. Re-apply it once the
  // layout has settled.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    const target = document.querySelector(hash);
    if (!(target instanceof HTMLElement)) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => {
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }, 120);

    return () => window.clearTimeout(id);
  }, []);

  return null;
}
