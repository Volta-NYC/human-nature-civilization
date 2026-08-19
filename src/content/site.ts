import { org } from "./org";

export const site = {
  name: org.shortName.value,
  legalName: org.legalName.value,
  /** Set to the real domain before launch; used for canonical URLs and OG tags. */
  url: "https://humannatureforum.org",
  locale: "en_US",
  description:
    "A not-for-profit forum society in Flushing, Queens, convening public conversation on human nature and civilization. Incorporated in New York on April 30, 2026.",
} as const;

export interface NavItem {
  href: string;
  label: string;
  /** Shown in the mega-nav; says what is actually on the page. */
  blurb: string;
}

export const primaryNav: NavItem[] = [
  { href: "/about", label: "The society", blurb: "What has been decided, and what has not." },
  { href: "/forum", label: "The forum", blurb: "How a session is run, and what is on the calendar." },
  { href: "/record", label: "The record", blurb: "Our filing, our governance, our open questions." },
  { href: "/join", label: "Take part", blurb: "Attend, speak, or help build the society." },
  { href: "/contact", label: "Contact", blurb: "Reach the society directly." },
];

export const footerNav: { heading: string; items: { href: string; label: string }[] }[] = [
  {
    heading: "Society",
    items: [
      { href: "/about", label: "The society" },
      { href: "/forum", label: "The forum" },
      { href: "/record", label: "The record" },
    ],
  },
  {
    heading: "Participate",
    items: [
      { href: "/join", label: "Take part" },
      { href: "/contact", label: "Contact" },
      { href: "/join#questions", label: "Common questions" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { href: "/privacy", label: "Privacy" },
      { href: "/record#filing", label: "Charitable status" },
    ],
  },
];
