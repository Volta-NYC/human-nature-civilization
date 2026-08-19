import type { Metadata } from "next";
import PageHeader from "@/lib/ui/page-header";
import InterestForm from "@/lib/ui/interest-form";
import { Container, Label, Panel, Section, SectionHead } from "@/lib/ui/primitives";
import { OpenQuestion } from "@/lib/ui/record";
import { org } from "@/content/org";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Human Nature & Civilization Forum Society Inc. in Flushing, Queens. Address on file with the New York Department of State, and a direct line to the society.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title={<>Write to the society.</>}
        lede="There is no switchboard and no office hours. Messages reach the people building this directly, which for now is the fastest route there is."
      />

      <Section>
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
          <div className="flex flex-col gap-10 lg:sticky lg:top-32 lg:self-start">
            <div className="flex flex-col gap-4">
              <Label brass>Address on file</Label>
              <address className="m-0 font-display text-heading font-semibold not-italic leading-snug">
                {org.address.line1.value}
                <br />
                {org.address.city.value}, {org.address.state.value} {org.address.zip.value}
                <br />
                <span className="text-faint">United States</span>
              </address>
              <p className="m-0 max-w-[38ch] font-mono text-[0.6875rem] leading-relaxed text-faint">
                {org.address.note.value} Please do not visit without an appointment — no public
                venue has been announced.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Label>Phone</Label>
              <p className="m-0 text-[0.9375rem] text-faint">{org.phone.fallback}</p>
            </div>

            <div className="flex flex-col gap-4">
              <Label>Email</Label>
              <p className="m-0 text-[0.9375rem] text-faint">{org.email.fallback}</p>
            </div>

            <div className="flex flex-col gap-4">
              <Label>Hours</Label>
              <p className="m-0 max-w-[34ch] text-[0.9375rem] leading-relaxed text-faint">
                {org.hours.fallback}
              </p>
            </div>

            <OpenQuestion tone="quiet">
              The society has not published a phone number or email address. The form is the
              reliable route until it does.
            </OpenQuestion>
          </div>

          <div className="flex flex-col gap-8">
            <SectionHead
              label="Message"
              title="Say what you need, and we will answer it."
              lede="Questions about the society, the first session, speaking, volunteering, or a room we could use — all of it lands in the same place."
            />
            <Panel className="p-7 sm:p-10" data-reveal>
              <InterestForm />
            </Panel>
          </div>
        </Container>
      </Section>

      <Section bordered>
        <Container className="grid gap-8 sm:grid-cols-3">
          {[
            {
              label: "Legal name",
              value: org.legalName.value,
            },
            {
              label: "Registered in",
              value: `${org.jurisdiction.value} · ${org.county.value} County`,
            },
            {
              label: "DOS ID",
              value: org.dosId.value,
            },
          ].map((item, i) => (
            <div key={item.label} className="flex flex-col gap-2" data-reveal style={{ ["--i" as string]: i }}>
              <Label>{item.label}</Label>
              <p className="m-0 text-[0.9375rem] leading-snug text-dim">{item.value}</p>
            </div>
          ))}
        </Container>
      </Section>
    </>
  );
}
