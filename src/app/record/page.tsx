import type { Metadata } from "next";
import PageHeader from "@/lib/ui/page-header";
import { ActionLink, Arrow, Container, Label, Panel, Section, SectionHead } from "@/lib/ui/primitives";
import { OpenQuestion, RecordRow, StampHeader } from "@/lib/ui/record";
import { addressOneLine, org, recordRows } from "@/content/org";

/** Every row below this source is attributed once, in the panel header. */
const FILING_SOURCE = org.legalName.source;

export const metadata: Metadata = {
  title: "The record",
  description:
    "The complete public record of Human Nature & Civilization Forum Society Inc.: its New York State filing, DOS ID 7912524, charitable status, and every question still open.",
  alternates: { canonical: "/record" },
};

/** Where we looked, and what we found. Published because absence is evidence too. */
const searched: { where: string; found: string; ok: boolean }[] = [
  { where: "NY Dept. of State, Division of Corporations", found: "Full entity record", ok: true },
  { where: "ProPublica Nonprofit Explorer (IRS Form 990)", found: "No filings on record", ok: false },
  { where: "Web and news search", found: "No coverage", ok: false },
  { where: "Google Business Profile / Maps", found: "No listing", ok: false },
  { where: "Facebook, Instagram, X, LinkedIn, TikTok, YouTube", found: "No accounts", ok: false },
  { where: "Eventbrite, Meetup", found: "No listings", ok: false },
];

export default function RecordPage() {
  return (
    <>
      <PageHeader
        label="The record"
        title={<>The whole file, including the empty parts.</>}
        lede="A charitable organization asks for trust before it has earned any. The least it can do is publish everything a stranger could otherwise dig up, plus the gaps they would find."
        aside={
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Label brass>Last reviewed 18 August 2026</Label>
            <Label>Source: New York Department of State</Label>
          </div>
        }
      />

      <Section id="filing">
        <Container>
          <SectionHead
            label="Filing"
            title="Certificate of Incorporation"
            lede="One document, four pages, filed once and never amended."
          />

          <Panel className="mt-14 overflow-hidden" data-reveal>
            <StampHeader>
              <Label brass>State of New York · DOS ID {org.dosId.value}</Label>
              <Label>Every row below is from this filing unless noted</Label>
            </StampHeader>
            <dl className="m-0 px-6 pb-6 sm:px-8 sm:pb-8">
              {recordRows.map((row) => (
                <RecordRow key={row.label} label={row.label} fact={row.fact} commonSource={FILING_SOURCE} />
              ))}
            </dl>
          </Panel>

          <p className="mt-6 max-w-read font-mono text-[0.6875rem] leading-relaxed text-faint" data-reveal>
            New York&apos;s free public-inquiry portal lists entity details but does not display
            filed documents. The purpose clause exists on the certificate; reading it requires a
            certified copy ordered from the state.
          </p>
        </Container>
      </Section>

      <Section bordered id="address">
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead label="Address" title="Where the state sends mail." />
          </div>
          <div className="flex flex-col gap-6" data-reveal>
            <p className="m-0 font-display text-title">{addressOneLine}</p>
            <p className="m-0 max-w-read text-lede leading-relaxed text-dim">
              {org.address.note.value} It is not a venue, and the society does not keep walk-in
              hours there. Sessions, when they are announced, will name their own location.
            </p>
            <OpenQuestion>
              No public meeting place has been announced. Correspondence is best sent through the
              contact page.
            </OpenQuestion>
          </div>
        </Container>
      </Section>

      <Section bordered id="footprint">
        <Container>
          <SectionHead
            label="Public footprint"
            title="Where we looked for this organization, and what was there."
            lede="A research pass on 18 August 2026 checked the places an organization normally leaves traces. Publishing the negative results is the point: this society is new, and pretending otherwise would be the first thing to distrust about it."
          />

          <ul className="mt-14 m-0 grid list-none gap-px overflow-hidden rounded-token border border-hair bg-hair p-0 sm:grid-cols-2">
            {searched.map((row, i) => (
              <li
                key={row.where}
                className="flex items-start justify-between gap-6 bg-ink p-6 sm:p-7"
                data-reveal
                style={{ ["--i" as string]: i }}
              >
                <span className="max-w-[28ch] text-[0.9375rem] leading-snug text-dim">{row.where}</span>
                <span
                  className={`shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.12em] ${
                    row.ok ? "text-brass" : "text-faint/70"
                  }`}
                >
                  {row.found}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section bordered id="giving">
        <Container>
          <Panel className="flex flex-col items-start gap-6 p-8 sm:p-14" data-reveal>
            <Label brass>Charitable status</Label>
            <h2 className="max-w-[22ch] text-title">
              Filed as charitable in New York. Nothing claimed federally.
            </h2>
            <p className="m-0 max-w-read text-lede leading-relaxed text-dim">
              The society&apos;s not-for-profit category on file with the state is Charitable.
              That is a state classification, and it is not the same as a federal 501(c)(3)
              determination — no IRS Form 990 filings appear on record, which is expected for an
              organization formed in April 2026.
            </p>
            <p className="m-0 max-w-read text-[0.9375rem] leading-relaxed text-faint">
              Until a federal determination is issued, this site makes no claim that gifts to the
              society are tax-deductible. When that changes, it will be stated here with the
              determination letter behind it.
            </p>
            <ActionLink href="/contact" variant="outline">
              Ask about supporting the society <Arrow />
            </ActionLink>
          </Panel>
        </Container>
      </Section>
    </>
  );
}
