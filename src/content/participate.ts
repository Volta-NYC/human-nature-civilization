import { pending } from "./schema";

/** Drafted structural copy. No membership tiers, dues or benefits are documented. */
export const membershipNotice = pending<string>(
  "No membership structure, dues or benefits are documented anywhere. Confirm with the society whether membership exists at all before publishing tiers.",
  "Membership terms have not been set, so there is nothing to sign up for and nothing to pay. This is a list, not a roll.",
);

export const ways = [
  {
    key: "attend",
    label: "Attend",
    title: "Come to a session",
    body: "Sessions are open to the public and free to attend. Join the list and you will hear about the first one before it is announced anywhere else.",
    action: { label: "Join the list", href: "#interest" },
  },
  {
    key: "speak",
    label: "Speak",
    title: "Put a question on the table",
    body: "The society is looking for its opening arguments. If you have a position you can defend for twelve minutes in front of people who disagree, propose it.",
    action: { label: "Propose a session", href: "#interest" },
  },
  {
    key: "build",
    label: "Build",
    title: "Help run it",
    body: "A three-month-old society needs chairs, note-takers, a room, and people who will show up in February. Founding volunteers shape how this works.",
    action: { label: "Volunteer", href: "#interest" },
  },
];

export const interests = [
  "Attending sessions",
  "Speaking or proposing a topic",
  "Volunteering",
  "Offering a venue",
  "Supporting the society",
];

export interface Faq {
  q: string;
  a: string;
  /** True when the answer is drafted rather than sourced from the record. */
  drafted?: boolean;
}

export const faqs: Faq[] = [
  {
    q: "Is the society a registered nonprofit?",
    a: "Yes. Human Nature & Civilization Forum Society Inc. is a Domestic Not-for-Profit Corporation, incorporated under §402 of the New York Not-for-Profit Corporation Law on April 30, 2026, and listed as Active with the New York Department of State under DOS ID #7912524. Its not-for-profit category on file is Charitable.",
  },
  {
    q: "Are donations tax-deductible?",
    a: "That depends on the society's federal determination, which is a separate process from state incorporation. No IRS Form 990 filings appear on record yet, which is normal for an organization formed this recently. The society will publish its federal status here once it is settled rather than imply it beforehand.",
  },
  {
    q: "When is the first session?",
    a: "Not yet scheduled. The society was incorporated in April 2026 and is still assembling its founding participants. The interest list is the fastest way to hear when a date is set.",
  },
  {
    q: "What does it cost to attend?",
    a: "Sessions are intended to be free and open to the public. Fees, if any are ever introduced, would be published here first.",
    drafted: true,
  },
  {
    q: "Where do sessions take place?",
    a: "A venue has not been announced. The society is based in Queens and expects to meet there. The address published on the contact page is the address on file with the New York Department of State for service of process, not a public meeting place.",
  },
  {
    q: "Who runs the society?",
    a: "The state filing names no officers — service of process is directed to the corporation itself. The society has not yet published its board or leadership. When it does, it will appear on the record page.",
  },
];
