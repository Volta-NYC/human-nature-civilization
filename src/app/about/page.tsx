import type { Metadata } from "next";
import PageHeader from "@/lib/ui/page-header";
import { ActionLink, Arrow, Container, Label, Panel, Section, SectionHead } from "@/lib/ui/primitives";
import { OpenQuestion } from "@/lib/ui/record";
import Seal from "@/lib/ui/seal";
import { monthsSinceFormation, org } from "@/content/org";

/**
 * The page states how many months old the society is, which would otherwise
 * freeze at whatever it was on the day of the build. Re-render daily.
 */
export const revalidate = 86400;


export const metadata: Metadata = {
  title: "The society",
  description:
    "Human Nature & Civilization Forum Society Inc. is a charitable not-for-profit chartered in Queens, New York on April 30, 2026. What has been decided so far, and what has not.",
  alternates: { canonical: "/about" },
};

const decided = [
  {
    label: "Decided",
    title: "That it is a charity, not a club",
    body: "It was filed as a Domestic Not-for-Profit Corporation under §402 of New York's Not-for-Profit Corporation Law, in the Charitable category. That is a commitment with obligations attached, made before the society had a single member.",
  },
  {
    label: "Decided",
    title: "That it is a forum, not an audience",
    body: "The word in the name is forum. Whatever the founders build, they named it after a place where people speak to each other, not one where they are spoken to.",
  },
  {
    label: "Decided",
    title: "That it belongs to Queens",
    body: "Filed in Queens County, with its address in Flushing. The society is rooted in the most linguistically diverse place in the world, which is a useful setting for an argument about human universals.",
  },
];

const undecided = [
  "The purpose clause the founders wrote is on file with the State of New York and has not been published here.",
  "The board, the officers and the founding members have not been named publicly.",
  "No session, reading list, venue or date has been announced.",
  "No federal tax-exempt determination appears on record — normal for an organization this young.",
];

export default function AboutPage() {
  const months = monthsSinceFormation();

  return (
    <>
      <PageHeader
        label="The society"
        title={<>A society with a charter and no history.</>}
        lede={
          <>
            {org.legalName.value} is {months} months old. It has one document to its name, a
            county, and a question. This page is an honest account of both halves of that: what
            has been settled, and what has not.
          </>
        }
      />

      <Section>
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead label="Settled" title="Three things the filing already tells you." />
          </div>

          <ul className="m-0 flex list-none flex-col gap-px overflow-hidden rounded-token border border-hair bg-hair p-0">
            {decided.map((item, i) => (
              <li
                key={item.title}
                className="flex flex-col gap-3 bg-ink p-7 transition-colors duration-token ease-token hover:bg-ink-raised sm:p-9"
                data-reveal
                style={{ ["--i" as string]: i }}
              >
                <Label brass>{item.label}</Label>
                <h3 className="text-heading">{item.title}</h3>
                <p className="m-0 max-w-read text-[0.9375rem] leading-relaxed text-dim">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section bordered>
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              label="Unsettled"
              title="And four it does not."
              lede="Published in full rather than papered over, because a visitor deserves to know which parts of an organization are still a blank page."
            />
          </div>

          <div className="flex flex-col gap-4">
            {undecided.map((line, i) => (
              <div key={line} data-reveal style={{ ["--i" as string]: i }}>
                <OpenQuestion>{line}</OpenQuestion>
              </div>
            ))}
            <p className="m-0 mt-4 max-w-read text-[0.9375rem] leading-relaxed text-faint" data-reveal>
              These are not rhetorical. Each one is a real gap in the public record as of
              August 2026, and each closes the moment the society fills it in.
            </p>
          </div>
        </Container>
      </Section>

      <Section bordered>
        <Container>
          <Panel className="flex flex-col items-start gap-7 p-8 sm:p-14" data-reveal>
            <Seal size={56} className="text-brass/70" />
            <h2 className="max-w-[20ch] text-title">
              The founding room decides what this becomes.
            </h2>
            <p className="m-0 max-w-read text-lede leading-relaxed text-dim">
              Societies calcify fast. The people in the first three sessions set the questions,
              the tone, and the standard of argument that everyone afterwards inherits — usually
              without ever voting on it.
            </p>
            <div className="flex flex-wrap gap-3">
              <ActionLink href="/join">
                Take part <Arrow />
              </ActionLink>
              <ActionLink href="/record" variant="outline">
                Read the record
              </ActionLink>
            </div>
          </Panel>
        </Container>
      </Section>
    </>
  );
}
