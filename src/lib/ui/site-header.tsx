"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav } from "@/content/site";
import { org } from "@/content/org";
import Seal from "./seal";
import { ActionLink, Container } from "./primitives";

/**
 * Translucent chrome: content scrolls underneath, and the material thickens
 * once the page has moved rather than sitting as an opaque strip from the
 * first pixel. No hard divider — the blur does the separating.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 24);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the menu on navigation, and let Escape out of it from anywhere.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-token bg-vellum px-4 py-2 font-mono text-xs text-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>

      <header
        data-material="chrome"
        data-material-edge
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-slow ease-token after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-6 after:bg-gradient-to-b after:from-ink/70 after:to-transparent after:transition-opacity after:duration-slow after:ease-token ${
          scrolled || open
            ? "bg-ink/70 backdrop-blur-xl backdrop-saturate-150 after:opacity-100"
            : "bg-transparent after:opacity-0"
        }`}
      >
        <Container className="flex h-[4.5rem] items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity duration-token ease-token hover:opacity-80"
            aria-label={`${org.legalName.value} — home`}
          >
            <Seal size={30} className="text-vellum" />
            <span className="hidden font-display text-[0.9375rem] font-semibold leading-none tracking-[-0.02em] sm:block">
              Human Nature <span className="font-body italic text-brass">&amp;</span> Civilization
            </span>
            <span className="font-display text-[0.9375rem] font-semibold leading-none tracking-[-0.02em] sm:hidden">
              HN<span className="font-body italic text-brass">&amp;</span>C
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-token-sm px-3.5 py-2 font-display text-[0.875rem] font-medium tracking-[-0.01em] transition-[color,transform] duration-fast ease-token active:scale-[0.97] ${
                    active ? "text-primary" : "text-dim hover:text-primary"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-brass transition-transform duration-token ease-token ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ActionLink href="/join" className="hidden px-5 py-2.5 text-[0.875rem] sm:inline-flex">
              Join the list
            </ActionLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="flex h-11 w-11 items-center justify-center rounded-token border border-hair text-primary transition-[background-color,transform] duration-fast ease-token hover:bg-surface active:scale-[0.94] lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
                <path
                  d="M0 1h18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="origin-center transition-transform duration-token ease-token"
                  style={open ? { transform: "translateY(5px) rotate(45deg)" } : undefined}
                />
                <path
                  d="M0 11h18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="origin-center transition-transform duration-token ease-token"
                  style={open ? { transform: "translateY(-5px) rotate(-45deg)" } : undefined}
                />
              </svg>
            </button>
          </div>
        </Container>

      </header>

      {/*
        Mobile sheet — a sibling of the bar, not a child of it.

        `backdrop-filter` on the bar establishes a backdrop root, so a nested
        blurred surface has nothing to sample and page content reads straight
        through it. As its own layer the blur works, and the sheet is weighted
        heavier than the bar because it covers content rather than floating
        over it.

        It scales and blurs in from its top edge and leaves along the same
        path. `inert` while closed, so a keyboard user cannot tab into a menu
        they cannot see.
      */}
      <div
        id="site-menu"
        data-material="chrome"
        inert={!open}
        aria-hidden={!open}
        className={`fixed inset-x-0 top-[4.5rem] z-40 origin-top border-b border-hair bg-ink/95 backdrop-blur-2xl backdrop-saturate-150 transition-[opacity,transform,filter] duration-slow ease-token lg:hidden ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100 blur-0"
            : "pointer-events-none -translate-y-3 scale-[0.98] opacity-0 blur-[6px]"
        }`}
      >
        <Container className="flex flex-col gap-1 pb-8 pt-2">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col gap-1 border-t border-hair-soft py-4 transition-colors duration-fast ease-token hover:text-primary active:bg-surface"
            >
              <span className="font-display text-heading font-semibold">{item.label}</span>
              <span className="text-[0.875rem] text-faint">{item.blurb}</span>
            </Link>
          ))}
          <ActionLink href="/join" className="mt-4 w-full sm:hidden">
            Join the list
          </ActionLink>
        </Container>
      </div>
    </>
  );
}
