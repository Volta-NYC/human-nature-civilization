import type { Metadata } from "next";
import PageHeader from "@/lib/ui/page-header";
import { Container, Section } from "@/lib/ui/primitives";
import { addressOneLine, org } from "@/content/org";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What Human Nature & Civilization Forum Society Inc. collects through this website, why, and how to have it removed.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/**
 * Written to describe what this site actually does, not what a generic policy
 * template assumes. If the implementation changes — analytics added, a mail
 * provider wired in — this page has to change with it.
 */
const sections = [
  {
    heading: "What this site collects",
    body: [
      "Only what you type into a form. That is a name, an email address, the interests you select, and any note you write. Nothing else is gathered.",
      "There is no analytics script, no advertising pixel, no session recording and no third-party embed on any page of this site. Typefaces are served from this site's own domain rather than a font network, so browsing here does not tell anyone else that you were here.",
    ],
  },
  {
    heading: "Why it is collected",
    body: [
      "To tell you when the society's first session is scheduled, and to answer what you asked. That is the entire purpose.",
      "Submissions are not sold, rented, traded or shared with partners, because there are none.",
    ],
  },
  {
    heading: "Where it is kept",
    body: [
      "Submissions are stored on the server that runs this site. They are not sent to a mailing-list provider or a customer database, as the society does not yet use either.",
    ],
  },
  {
    heading: "How long it is kept",
    body: [
      "Until you ask for it to be removed, or until the society stops keeping an interest list — whichever comes first.",
    ],
  },
  {
    heading: "Removing your details",
    body: [
      "Write to the society at the address below and say what you would like removed. There is no verification process to get past; a request is enough.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "This site sets no cookies of its own and no tracking cookies of anyone else's. There is nothing to consent to, which is why there is no banner asking you to.",
    ],
  },
  {
    heading: "Children",
    body: [
      "The site is not directed at children under 13 and the society does not knowingly collect their details.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "If the society adds a mail provider, analytics, or anything else that changes the answers above, this page is updated at the same time as the change, not afterwards.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        label="Privacy"
        title={<>What we collect, which is very little.</>}
        lede="A short policy, because this is a short site: no analytics, no cookies, no third-party scripts, and one form."
      />

      <Section>
        <Container className="max-w-3xl">
          <div className="prose-society">
            {sections.map((section, i) => (
              <div key={section.heading} className="mb-12" data-reveal style={{ ["--i" as string]: Math.min(i, 3) }}>
                <h2 className="mb-4 text-heading">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ))}

            <div className="border-t border-hair pt-8" data-reveal>
              <h2 className="mb-4 text-heading">Who to write to</h2>
              <p>
                {org.legalName.value}, {addressOneLine}. {org.address.note.value}
              </p>
              <p className="font-mono text-[0.6875rem] text-faint">
                Last updated 18 August 2026 · New York DOS ID {org.dosId.value}
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
