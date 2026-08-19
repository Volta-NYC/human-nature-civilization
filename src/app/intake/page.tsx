import type { Metadata } from "next";
import PageHeader from "@/lib/ui/page-header";
import { Container, Label, Panel, Section } from "@/lib/ui/primitives";
import { intake, intakeIntro } from "@/content/intake";

export const metadata: Metadata = {
  title: "Intake",
  description: "Internal: the questions this site needs the society to answer.",
  // Working document for the client, not part of the public site.
  robots: { index: false, follow: false, nocache: true },
};

const priorityStyles: Record<string, string> = {
  blocker: "border-brass/60 text-brass",
  important: "border-hair text-dim",
  nice: "border-hair-soft text-faint",
};

const priorityLabel: Record<string, string> = {
  blocker: "Blocks launch",
  important: "Important",
  nice: "Nice to have",
};

export default function IntakePage() {
  const total = intake.reduce((sum, section) => sum + section.items.length, 0);
  const blockers = intake.reduce(
    (sum, section) => sum + section.items.filter((i) => i.priority === "blocker").length,
    0,
  );

  return (
    <>
      <PageHeader
        label="Internal · not indexed"
        title={<>What the site still needs from you.</>}
        lede={intakeIntro}
        aside={
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            <Label brass>
              {blockers} of {total} block launch
            </Label>
            <Label>Everything else can follow</Label>
            <Label>Answers map straight into the content layer</Label>
          </div>
        }
      />

      <Section>
        <Container className="max-w-4xl">
          <p className="m-0 mb-14 max-w-read text-lede leading-relaxed text-dim" data-reveal>
            Every page of this site is built and working. What it lacks is your account of the
            organization — none of which is discoverable online. Answer these and the placeholders
            disappear; each answer feeds a named field in{" "}
            <code className="font-mono text-[0.875rem] text-brass">src/content/</code>.
          </p>

          <div className="flex flex-col gap-16">
            {intake.map((section, s) => (
              <div key={section.heading} className="flex flex-col gap-6" data-reveal>
                <div className="flex items-center gap-4">
                  <Label brass>{String(s + 1).padStart(2, "0")}</Label>
                  <h2 className="text-title">{section.heading}</h2>
                </div>

                <ol className="m-0 flex list-none flex-col gap-px overflow-hidden rounded-token border border-hair bg-hair p-0">
                  {section.items.map((item) => (
                    <li key={item.q} className="flex flex-col gap-3 bg-ink p-6 sm:p-8">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`rounded-full border px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] ${priorityStyles[item.priority]}`}
                        >
                          {priorityLabel[item.priority]}
                        </span>
                        <code className="font-mono text-[0.6875rem] text-faint/70">{item.fills}</code>
                      </div>
                      <p className="m-0 font-display text-heading font-semibold leading-snug">{item.q}</p>
                      <p className="m-0 max-w-read text-[0.9375rem] leading-relaxed text-dim">{item.why}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <Panel className="mt-16 flex flex-col gap-4 p-8" data-reveal>
            <Label brass>How to send answers</Label>
            <p className="m-0 max-w-read text-[0.9375rem] leading-relaxed text-dim">
              Reply in any format — a document, an email, a voice note. Nothing needs to be
              polished; the writing is our job. Run{" "}
              <code className="font-mono text-brass">npm run content:report</code> at any point to
              see which gaps are still open.
            </p>
          </Panel>
        </Container>
      </Section>
    </>
  );
}
