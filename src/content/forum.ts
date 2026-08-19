import { drafted, pending } from "./schema";

/**
 * No programs, events, lecture series, memberships or publications are
 * documented for this organization anywhere. The session calendar below is
 * therefore genuinely empty, and the format described is drafted structural
 * copy for client review — not a claim about how the society operates.
 */

export const sessionsNotice = pending<string>(
  "No events are documented in any public record. The client must supply the first session's date, topic, speakers and venue.",
  "No sessions announced",
);

export interface Session {
  slug: string;
  number: number;
  title: string;
  date: string;
  venue: string;
  summary: string;
}

/** Populated by the client. The calendar UI is built to handle zero sessions. */
export const sessions: Session[] = [];

export interface FormatStep {
  label: string;
  title: string;
  body: string;
}

/** Drafted: a proposed house format, pending confirmation by the society. */
export const proposedFormat: FormatStep[] = [
  {
    label: "Before",
    title: "A short reading, sent in advance",
    body: "Every session is anchored to one text short enough to finish on a subway ride. Nobody arrives having to pretend they read it.",
  },
  {
    label: "Opening",
    title: "Two positions, twelve minutes each",
    body: "Two speakers put the strongest version of opposing readings on the table. No slides, no lectern, no prepared rebuttal.",
  },
  {
    label: "Floor",
    title: "The room takes over",
    body: "The bulk of the evening belongs to the people who came. The chair's only job is to keep the argument honest and moving.",
  },
  {
    label: "After",
    title: "The record",
    body: "What the room actually concluded — including what it failed to settle — is written down and published here.",
  },
];

export const formatNotice = drafted(
  "Not yet adopted. The society has published no format of its own, and this proposal carries no authority until it does.",
);

/** Drafted framing for the three standing lines of inquiry the name implies. */
export const inquiries = [
  {
    label: "01",
    title: "What we are",
    body: "The stubborn parts. Instinct, kinship, aggression, care — the inheritance that no institution gets to vote on.",
  },
  {
    label: "02",
    title: "What we build",
    body: "Cities, laws, markets, faiths. The machinery a species invents to live at a scale it was never fitted for.",
  },
  {
    label: "03",
    title: "Where the two collide",
    body: "Every civilization is a wager about human nature. This is the argument about which wagers are still paying out.",
  },
];
