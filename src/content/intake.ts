/**
 * The intake questionnaire. Rendered at /intake (noindex) so the client can
 * read or print it. Each item maps to a `pending` field in the content layer,
 * so answering the list is literally the work of finishing the site.
 */

export interface IntakeItem {
  q: string;
  why: string;
  /** The content path this answer fills. */
  fills: string;
  priority: "blocker" | "important" | "nice";
}

export interface IntakeSection {
  heading: string;
  items: IntakeItem[];
}

export const intake: IntakeSection[] = [
  {
    heading: "Purpose and identity",
    items: [
      {
        q: "What is the purpose clause in your Certificate of Incorporation, word for word?",
        why: "It is the one statement of mission that is already legally binding. The site should not paraphrase it.",
        fills: "org.mission",
        priority: "blocker",
      },
      {
        q: "In one sentence a stranger would understand, what does the society do?",
        why: "Becomes the hero subhead, the meta description, and the social preview.",
        fills: "org.tagline, org.descriptor",
        priority: "blocker",
      },
      {
        q: "Why was it founded, and by whom? What happened that made it necessary?",
        why: "The origin story is the about page. Nothing online supplies it.",
        fills: "about.origin",
        priority: "blocker",
      },
      {
        q: "Is there a name you use publicly that differs from the legal name?",
        why: "The state's Fictitious Name field is blank, so the site currently uses the legal name everywhere.",
        fills: "org.fictitiousName",
        priority: "nice",
      },
    ],
  },
  {
    heading: "People",
    items: [
      {
        q: "Who are the officers, directors and founding members? Names, roles, one-line bios.",
        why: "The state record names none. A charitable organization with no visible people is hard to trust.",
        fills: "org.founded_by, about.people",
        priority: "blocker",
      },
      {
        q: "May we publish photographs of them?",
        why: "There is no photography of any kind associated with the organization.",
        fills: "media.portraits",
        priority: "important",
      },
    ],
  },
  {
    heading: "Programs",
    items: [
      {
        q: "Has any session, lecture or meeting happened yet? Date, topic, attendance.",
        why: "The calendar is empty because nothing is documented. Even one past session changes the whole site.",
        fills: "forum.sessions",
        priority: "blocker",
      },
      {
        q: "What is the intended format of a session, and how often do you plan to meet?",
        why: "The format currently on the forum page is our proposal, not your practice. It needs your confirmation or replacement.",
        fills: "forum.proposedFormat",
        priority: "blocker",
      },
      {
        q: "Is there membership? If so, what does it cost and what does it include?",
        why: "Nothing about membership is documented. The site deliberately claims none.",
        fills: "participate.membershipNotice",
        priority: "important",
      },
    ],
  },
  {
    heading: "Contact and place",
    items: [
      {
        q: "What public email address and phone number should the site publish?",
        why: "Neither exists in any record. The contact form has nowhere to send mail until this is answered.",
        fills: "org.email, org.phone",
        priority: "blocker",
      },
      {
        q: "Confirm: should 141-25 Northern Blvd, Unit B1 be published? Property records suggest a residential co-op.",
        why: "It is published at your direction as the address on file with the Department of State. Say the word and it comes down.",
        fills: "org.address",
        priority: "important",
      },
      {
        q: "Where will sessions actually be held, and is there parking or transit worth naming?",
        why: "Attendees need to know how to get there. No venue is documented.",
        fills: "forum.venue",
        priority: "important",
      },
    ],
  },
  {
    heading: "Brand and material",
    items: [
      {
        q: "Is there an existing logo, wordmark or colour scheme?",
        why: "None was found. The mark on this site was drawn for you and can be replaced.",
        fills: "media.logo",
        priority: "important",
      },
      {
        q: "Any photographs, documents, reading lists or writing we may use?",
        why: "The site currently carries no photography by necessity, not by choice.",
        fills: "media.library",
        priority: "important",
      },
      {
        q: "Do you have an IRS determination letter or a pending 501(c)(3) application?",
        why: "Governs whether the site may say donations are tax-deductible. Right now it correctly says nothing.",
        fills: "participate.faqs",
        priority: "important",
      },
      {
        q: "Which domain name and social handles should the site point at?",
        why: "No accounts exist on any platform. Canonical URLs are currently a placeholder.",
        fills: "site.url",
        priority: "important",
      },
    ],
  },
];

export const intakeIntro =
  "A research pass on August 18, 2026 found no website, social account, listing, review or press mention for this organization anywhere. The only public record is the New York State corporate filing. This site was built on that filing alone; everything below is a gap it cannot fill by itself.";
