import type { Metadata } from "next";
import PageHeader from "@/lib/ui/page-header";
import InterestForm from "@/lib/ui/interest-form";
import { Container, Label, Panel, Section, SectionHead } from "@/lib/ui/primitives";
import { OpenQuestion } from "@/lib/ui/record";
import { faqs, membershipNotice, ways } from "@/content/participate";

export const metadata: Metadata = {
  title: "Take part",
  description:
    "Attend a session, propose a topic, or help run the Human Nature & Civilization Forum Society. Join the interest list to hear when the first session in Queens is called.",
  alternates: { canonical: "/join" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function JoinPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHeader
        label="Take part"
        title={<>Three ways in, all of them early.</>}
        lede="The society has no members yet, which means there is no queue, no committee to get past, and no established way of doing things to work around."
      />

      <Section>
        <Container>
          <ul className="m-0 grid list-none gap-px overflow-hidden rounded-token border border-hair bg-hair p-0 lg:grid-cols-3">
            {ways.map((way, i) => (
              <li
                key={way.key}
                id={way.key}
                className="flex flex-col gap-4 bg-ink p-8 transition-colors duration-token ease-token hover:bg-ink-raised sm:p-10"
                data-reveal
                style={{ ["--i" as string]: i, scrollMarginTop: "6rem" }}
              >
                <Label brass>{way.label}</Label>
                <h2 className="text-heading">{way.title}</h2>
                <p className="m-0 text-[0.9375rem] leading-relaxed text-dim">{way.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section bordered id="interest">
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              label="The list"
              title="Put your name down."
              lede="One email when the first session is called. That is the whole commitment."
            />
            <div className="mt-8">
              <OpenQuestion tone="quiet">{membershipNotice.fallback}</OpenQuestion>
            </div>
          </div>

          <Panel className="p-7 sm:p-10" data-reveal>
            <InterestForm />
          </Panel>
        </Container>
      </Section>

      <Section bordered id="questions">
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead label="Questions" title="What people ask first." />
          </div>

          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <details
                key={faq.q}
                className="group border-t border-hair last:border-b"
                data-reveal
                style={{ ["--i" as string]: Math.min(i, 4) }}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 font-display text-heading font-semibold transition-colors duration-fast ease-token marker:hidden hover:text-primary active:text-brass [&::-webkit-details-marker]:hidden">
                  <span className="max-w-[34ch]">{faq.q}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-hair text-faint transition-transform duration-token ease-token group-open:rotate-45"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.25" />
                    </svg>
                  </span>
                </summary>
                <div className="pb-7 pr-10">
                  <p className="m-0 max-w-read text-[0.9375rem] leading-relaxed text-dim">{faq.a}</p>
                  {faq.drafted ? (
                    <p className="m-0 mt-3 font-mono text-[0.6875rem] text-faint/70">
                      Intended policy — not yet confirmed by the society.
                    </p>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
