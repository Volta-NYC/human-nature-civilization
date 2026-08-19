import Link from "next/link";
import Hero from "@/lib/ui/hero";
import Seal from "@/lib/ui/seal";
import { ActionLink, Arrow, Container, Label, Panel, Section, SectionHead } from "@/lib/ui/primitives";
import { OpenQuestion, StampHeader } from "@/lib/ui/record";
import { org } from "@/content/org";
import { formatNotice, inquiries, proposedFormat, sessions } from "@/content/forum";

/**
 * The page states how many months old the society is, which would otherwise
 * freeze at whatever it was on the day of the build. Re-render daily.
 */
export const revalidate = 86400;


export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ------------------------------------------------------------------
          The premise. Sticky heading against a scrolling argument — the
          capture's pinned-chapter behaviour, done with position: sticky so it
          costs nothing and degrades to a plain stack on mobile.
         ------------------------------------------------------------------ */}
      <Section bordered id="premise">
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              label="The premise"
              title={
                <>
                  Every civilization is a wager
                  <br className="hidden sm:block" /> about human nature.
                </>
              }
            />
          </div>

          <div className="prose-society max-w-none">
            <p data-reveal>
              Laws, cities, markets, faiths, schools — each one is built on a claim about what
              people are like when nobody is watching. Get the claim wrong and the institution
              fails slowly, in ways that take a generation to read.
            </p>
            <p data-reveal style={{ ["--i" as string]: 1 }}>
              <strong>
                This society exists to argue about those claims in public, with people who
                disagree, in a room where nobody is selling anything.
              </strong>{" "}
              Not a lecture series with a lectern and a Q&amp;A tacked on the end. A forum: two
              positions, then the floor.
            </p>
            <p data-reveal style={{ ["--i" as string]: 2 }}>
              It is based in Flushing, Queens — a square mile that has been running the
              experiment on its own for a century.
            </p>

            <div className="mt-12 grid gap-px overflow-hidden rounded-token border border-hair bg-hair sm:grid-cols-3">
              {inquiries.map((item, i) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-3 bg-ink p-6 transition-colors duration-token ease-token hover:bg-ink-raised"
                  data-reveal
                  style={{ ["--i" as string]: i }}
                >
                  <Label brass>{item.label}</Label>
                  <h3 className="text-heading">{item.title}</h3>
                  <p className="m-0 text-[0.9375rem] leading-relaxed text-dim">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
          The format.
         ------------------------------------------------------------------ */}
      <Section bordered id="format">
        <Container>
          <SectionHead
            label="A session"
            title="Four movements, one evening."
            lede="Sessions are built so that the people who came do most of the talking. The proposal below is the house format we have drafted for the society's review."
          />

          <ol className="mt-16 grid list-none gap-px overflow-hidden rounded-token border border-hair bg-hair p-0 sm:grid-cols-2 lg:grid-cols-4">
            {proposedFormat.map((step, i) => (
              <li
                key={step.label}
                className="group flex flex-col gap-4 bg-ink p-7 transition-colors duration-token ease-token hover:bg-ink-raised"
                data-reveal
                style={{ ["--i" as string]: i }}
              >
                <div className="flex items-baseline justify-between">
                  <Label brass>{step.label}</Label>
                  <span className="font-mono text-[0.6875rem] text-faint/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-heading">{step.title}</h3>
                <p className="m-0 text-[0.9375rem] leading-relaxed text-dim">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 max-w-[62ch]" data-reveal>
            <OpenQuestion tone="quiet">{formatNotice.value}</OpenQuestion>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
          The calendar. Genuinely empty, and honest about it.
         ------------------------------------------------------------------ */}
      <Section bordered id="calendar">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <SectionHead
            label="The calendar"
            title="Nothing is scheduled yet."
            className="lg:sticky lg:top-32 lg:self-start"
          />

          {sessions.length === 0 ? (
            <Panel className="flex flex-col items-start gap-6 p-8 sm:p-12" data-reveal>
              <Seal size={52} className="animate-drift text-vellum/45" />
              <div className="flex max-w-[52ch] flex-col gap-4">
                <h3 className="text-title">The first session has not been called.</h3>
                <p className="m-0 text-lede leading-relaxed text-dim">
                  The society was chartered on {org.formedOnLabel.value} and is still assembling
                  the people who will run it. There is no back catalogue to browse and we are not
                  going to pretend there is.
                </p>
                <p className="m-0 text-[0.9375rem] leading-relaxed text-faint">
                  Put your name down and you will hear about the first evening before it is
                  announced anywhere else — which, given the society currently has no accounts on
                  any platform, is not a difficult promise to keep.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ActionLink href="/join">
                  Join the list <Arrow />
                </ActionLink>
                <ActionLink href="/join#speak" variant="outline">
                  Propose the first topic
                </ActionLink>
              </div>
            </Panel>
          ) : null}
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
          The filing. The one document that exists, presented as the artefact
          it is — and as the trust signal a three-month-old charity needs.
         ------------------------------------------------------------------ */}
      <Section bordered id="filing">
        <Container>
          <SectionHead
            label="The record"
            title="Everything we can prove, in one place."
            lede="A charitable organization asking for your evening owes you a way to check that it is real. This is the whole of the public record as it stands."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            <Panel className="overflow-hidden" data-reveal>
              <StampHeader>
                <Label brass>Certificate of Incorporation</Label>
                <Label>State of New York</Label>
              </StampHeader>
              <dl className="m-0 grid grid-cols-1 sm:grid-cols-2">
                {[
                  ["Legal name", org.legalName.value],
                  ["Entity type", org.entityType.value],
                  ["Filed under", org.statute.value],
                  ["Category", org.nfpCategory.value],
                  ["DOS ID", org.dosId.value],
                  ["Formed", org.formedOnLabel.value],
                  ["County", org.county.value],
                  ["Status", org.status.value],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-1.5 border-b border-hair-soft px-6 py-5 sm:px-8">
                    <Label>{label}</Label>
                    <span className="text-[0.9375rem] leading-snug text-primary">{value}</span>
                  </div>
                ))}
              </dl>
              <div className="px-6 py-5 sm:px-8">
                <Link
                  href="/record"
                  className="group inline-flex items-center gap-2 font-display text-[0.875rem] font-semibold text-primary"
                >
                  Read the full record <Arrow />
                </Link>
              </div>
            </Panel>

            <div className="flex flex-col gap-6" data-reveal style={{ ["--i" as string]: 1 }}>
              <p className="m-0 text-lede leading-relaxed text-dim">
                And what we cannot prove, we say so. The society has filed exactly one document
                in its life. It has no officers on public record, no published purpose clause,
                no programs behind it and no press.
              </p>
              <OpenQuestion>
                {org.mission.fallback}
              </OpenQuestion>
              <OpenQuestion>{org.founded_by.fallback}</OpenQuestion>
              <p className="m-0 text-[0.9375rem] leading-relaxed text-faint">
                Those gaps close as the society fills them in — not before.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
          Close.
         ------------------------------------------------------------------ */}
      <Section id="close" bordered>
        <Container className="flex flex-col items-center gap-8 text-center">
          <Seal size={64} className="text-brass/70" data-reveal />
          <h2 className="max-w-[18ch] text-display" data-reveal style={{ ["--i" as string]: 1 }}>
            Nothing has been decided yet.
          </h2>
          <p className="m-0 max-w-[52ch] text-lede text-dim" data-reveal style={{ ["--i" as string]: 2 }}>
            Which is the best possible reason to turn up early. The founding room sets the
            questions, the format, and the standard of argument everyone after them inherits.
          </p>
          <div className="flex flex-wrap justify-center gap-3" data-reveal style={{ ["--i" as string]: 3 }}>
            <ActionLink href="/join">
              Take part <Arrow />
            </ActionLink>
            <ActionLink href="/about" variant="outline">
              About the society
            </ActionLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
