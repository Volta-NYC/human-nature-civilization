import type { Metadata } from "next";
import PageHeader from "@/lib/ui/page-header";
import Seal from "@/lib/ui/seal";
import { ActionLink, Arrow, Container, Label, Panel, Section, SectionHead } from "@/lib/ui/primitives";
import { OpenQuestion } from "@/lib/ui/record";
import { formatNotice, inquiries, proposedFormat, sessions, sessionsNotice } from "@/content/forum";
import { org } from "@/content/org";

export const metadata: Metadata = {
  title: "The forum",
  description:
    "How a session of the Human Nature & Civilization Forum Society is run: one short reading, two opposed positions, and a floor that does most of the talking. No sessions are scheduled yet.",
  alternates: { canonical: "/forum" },
};

const houseRules = [
  {
    rule: "Steelman first",
    body: "You may not attack a position until you can state it in a form its holder would accept.",
  },
  {
    rule: "No credentials at the door",
    body: "An argument is judged on the floor by what it can carry, not by who is carrying it.",
  },
  {
    rule: "Disagreement is the product",
    body: "A session that ends in consensus has usually failed to find the real question.",
  },
  {
    rule: "The record is honest",
    body: "What the room failed to settle gets written down alongside what it settled.",
  },
];

export default function ForumPage() {
  return (
    <>
      <PageHeader
        label="The forum"
        title={<>One reading. Two positions. Then the floor.</>}
        lede="A forum is not a lecture with questions at the end. The speakers exist to start the argument, and the argument belongs to the room."
      />

      {/* The calendar sits first: it is the thing a visitor came to check. */}
      <Section id="calendar">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
          <SectionHead
            label="Calendar"
            title="Sessions"
            className="lg:sticky lg:top-32 lg:self-start"
          />

          {sessions.length === 0 ? (
            <Panel className="flex flex-col items-start gap-6 p-8 sm:p-12" data-reveal>
              <div className="flex items-center gap-4">
                <Seal size={40} className="text-vellum/40" />
                <Label>{sessionsNotice.fallback}</Label>
              </div>
              <h3 className="max-w-[24ch] text-title">The calendar is empty, and honestly so.</h3>
              <p className="m-0 max-w-read text-lede leading-relaxed text-dim">
                The society was chartered on {org.formedOnLabel.value}. Nothing has been
                scheduled since, and no past sessions exist to list. When a date is set it will
                appear here first.
              </p>
              <div className="flex flex-wrap gap-3">
                <ActionLink href="/join">
                  Get the announcement <Arrow />
                </ActionLink>
                <ActionLink href="/join#speak" variant="outline">
                  Propose the opening question
                </ActionLink>
              </div>
            </Panel>
          ) : (
            <ul className="m-0 flex list-none flex-col gap-px overflow-hidden rounded-token border border-hair bg-hair p-0">
              {sessions.map((session) => (
                <li key={session.slug} className="flex flex-col gap-3 bg-ink p-7 sm:p-9">
                  <div className="flex items-center gap-4">
                    <Label brass>Session {String(session.number).padStart(3, "0")}</Label>
                    <Label>{session.date}</Label>
                  </div>
                  <h3 className="text-heading">{session.title}</h3>
                  <p className="m-0 max-w-read text-[0.9375rem] leading-relaxed text-dim">
                    {session.summary}
                  </p>
                  <Label>{session.venue}</Label>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>

      <Section bordered id="format">
        <Container>
          <SectionHead
            label="The format"
            title="How an evening is meant to run."
            lede="Drafted as a proposal for the society to adopt, amend or throw out. It is published because a stranger deciding whether to give up a weeknight deserves to know the shape of it."
          />

          <ol className="mt-16 grid list-none gap-px overflow-hidden rounded-token border border-hair bg-hair p-0 sm:grid-cols-2">
            {proposedFormat.map((step, i) => (
              <li
                key={step.label}
                className="flex flex-col gap-4 bg-ink p-8 transition-colors duration-token ease-token hover:bg-ink-raised sm:p-10"
                data-reveal
                style={{ ["--i" as string]: i }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <Label brass>{step.label}</Label>
                  <span className="font-mono text-[0.6875rem] text-faint/50">
                    {String(i + 1).padStart(2, "0")} / {String(proposedFormat.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-heading">{step.title}</h3>
                <p className="m-0 max-w-read text-[0.9375rem] leading-relaxed text-dim">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 max-w-read" data-reveal>
            <OpenQuestion tone="quiet">{formatNotice.value}</OpenQuestion>
          </div>
        </Container>
      </Section>

      <Section bordered id="rules">
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              label="House rules"
              title="Four rules that make the room worth attending."
            />
          </div>
          <dl className="m-0 grid gap-0">
            {houseRules.map((item, i) => (
              <div
                key={item.rule}
                className="grid gap-3 border-t border-hair py-8 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-10"
                data-reveal
                style={{ ["--i" as string]: i }}
              >
                <dt className="font-display text-heading font-semibold">{item.rule}</dt>
                <dd className="m-0 max-w-read text-[0.9375rem] leading-relaxed text-dim">{item.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section bordered id="inquiries">
        <Container>
          <SectionHead
            label="Standing questions"
            title="Three lines of inquiry the name commits us to."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-token border border-hair bg-hair sm:grid-cols-3">
            {inquiries.map((item, i) => (
              <div
                key={item.label}
                className="flex flex-col gap-3 bg-ink p-8 transition-colors duration-token ease-token hover:bg-ink-raised"
                data-reveal
                style={{ ["--i" as string]: i }}
              >
                <Label brass>{item.label}</Label>
                <h3 className="text-heading">{item.title}</h3>
                <p className="m-0 text-[0.9375rem] leading-relaxed text-dim">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
