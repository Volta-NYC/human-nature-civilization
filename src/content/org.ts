import { Fact, drafted, pending, verified } from "./schema";

const DOS = "NY Dept. of State, Division of Corporations — entity record, DOS ID #7912524";

/**
 * The organization's record. Everything marked `verified` traces to the single
 * public document that exists for this entity: its New York State filing.
 */
export const org = {
  legalName: verified("Human Nature & Civilization Forum Society Inc.", DOS),
  /** Used in nav, footer and headings where the full legal name is too long. */
  shortName: verified("Human Nature & Civilization", DOS),
  initials: verified("HN&C", DOS),

  dosId: verified("7912524", DOS),
  entityType: verified("Domestic Not-for-Profit Corporation", DOS),
  statute: verified("§402, New York Not-for-Profit Corporation Law", DOS),
  nfpCategory: verified("Charitable", DOS),
  status: verified("Active", DOS),
  formedOn: verified("2026-04-30", DOS),
  formedOnLabel: verified("April 30, 2026", DOS),
  county: verified("Queens", DOS),
  jurisdiction: verified("New York", DOS),
  filingsOnRecord: verified(
    "One — the original Certificate of Incorporation (4 pages). No amendment or name change since formation.",
    DOS,
  ),
  fictitiousName: pending<string>(
    "The Fictitious Name field on the state record is blank.",
    "No DBA on file",
  ),
  registeredAgent: verified(
    'Service of process is directed to "THE CORPORATION" — no third-party agent is named.',
    DOS,
  ),

  address: {
    line1: verified("141-25 Northern Blvd, Unit B1", DOS),
    city: verified("Flushing", DOS),
    state: verified("NY", DOS),
    zip: verified("11354", DOS),
    /** Published at the client's direction. It is the service-of-process
     *  address on the state filing, not a confirmed public venue. */
    note: verified(
      "Address on file with the New York Department of State for service of process.",
      DOS,
    ),
  },

  // ---------------------------------------------------------------------
  // Gaps in the record. These render as visible, honest absences.
  // ---------------------------------------------------------------------
  mission: pending<string>(
    "The Certificate of Incorporation contains a purpose clause, but New York's free public-inquiry portal does not display filed documents. Request the purpose clause from the client, or order a certified copy.",
    "The society's purpose clause is on file with the State of New York and has not yet been published here.",
  ),
  founded_by: pending<string>(
    "The state record names no CEO, principal executive officer or incorporator. Ask the client directly.",
    "Leadership has not yet been announced.",
  ),
  phone: pending<string>("No phone number appears in any public record.", "Not yet published"),
  email: pending<string>(
    "No email address appears in any public record. A general inbox should be created before launch.",
    "Not yet published",
  ),
  hours: pending<string>(
    "No evidence of a public-facing venue with set hours.",
    "By announcement — the society does not keep walk-in hours.",
  ),

  /** Structural copy. Describes the site and the format, never the org's claims. */
  tagline: drafted("A society for the long argument about who we are and what we build."),
  descriptor: drafted(
    "A not-for-profit forum society in Queens, New York, convening public conversation on human nature and civilization.",
  ),
} satisfies Record<string, unknown>;

export const addressOneLine = [
  org.address.line1.value,
  `${org.address.city.value}, ${org.address.state.value} ${org.address.zip.value}`,
].join(", ");

/** Age of the organization, in whole months, at render time. */
export function monthsSinceFormation(now = new Date()): number {
  const start = new Date(`${org.formedOn.value}T00:00:00`);
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) months -= 1;
  return Math.max(0, months);
}

/** Every fact on the record, for the transparency page and the audit script. */
export const recordRows: { label: string; fact: Fact<string> }[] = [
  { label: "Legal name", fact: org.legalName },
  { label: "Entity type", fact: org.entityType },
  { label: "Incorporated under", fact: org.statute },
  { label: "Not-for-profit category", fact: org.nfpCategory },
  { label: "DOS ID", fact: org.dosId },
  { label: "Date of formation", fact: org.formedOnLabel },
  { label: "Status", fact: org.status },
  { label: "County of formation", fact: org.county },
  { label: "Jurisdiction", fact: org.jurisdiction },
  { label: "Filings on record", fact: org.filingsOnRecord },
  { label: "Fictitious name / DBA", fact: org.fictitiousName },
  { label: "Service of process", fact: org.registeredAgent },
  { label: "Address on file", fact: org.address.line1 },
  { label: "Purpose clause", fact: org.mission },
  { label: "Officers on record", fact: org.founded_by },
];
