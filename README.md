# Human Nature & Civilization Forum Society Inc.

Website for a charitable not-for-profit forum society chartered in Queens, New York
on 30 April 2026.

## What is unusual about this project

The source material in `raw messy data/` is a single research report, not a scrape.
Its finding: **this organization has no existing web presence of any kind** — no site,
no social accounts, no listings, no reviews, no press, no photography. The only public
record is its New York State corporate filing (DOS ID #7912524).

So there was nothing to recreate and no media to download. The site is built from the
filing outward, and it is explicit about the difference between the two kinds of text
on it:

| Status | Meaning | Where it shows |
|---|---|---|
| `verified` | Traceable to a named public record | Rendered plainly, with its source |
| `drafted` | Written for this build, awaiting client review | Rendered, and labelled as a proposal |
| `pending` | A genuine gap in the record | Rendered as a visible **Open question**, never invented |

Nothing on the site asserts a mission, a founder, a program, a rating or a tax status
that the organization has not actually established.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run content:report   # list every field still drafted or pending
npm run check        # typecheck + production build
```

## Project layout

```
src/
  content/           The content layer — the only place copy and facts live
    schema.ts          Fact<T> types: verified / drafted / pending
    org.ts             The organization's record, sourced field by field
    site.ts            Navigation, canonical URL, metadata
    forum.ts           Sessions (empty) and the proposed house format
    participate.ts     Ways to take part, interest options, FAQs
    intake.ts          The client questionnaire rendered at /intake
  lib/
    ui/                Presentational components (primitives, header, footer,
                       seal, record ledger, forms)
    motion/            RevealEngine (one IntersectionObserver for the document)
                       and ScrollTension (the hero's signature motion)
  app/                 Routes, metadata, sitemap, robots, OG image, API
scripts/
  content-report.mjs   Audit script; exits non-zero while gaps remain
```

### Content layer

Every string a client would want to change lives in `src/content/`. Components read
facts, never literals, so filling a gap is a one-line edit in one file rather than a
search through JSX. `npm run content:report` walks the directory and prints what is
still outstanding — it exits `1` while any `pending` field remains, so it works as a
pre-launch gate in CI.

The full questionnaire is at **`/intake`** (noindex, excluded from the sitemap). Each
question names the content path it fills.

## Design system

The visual direction is adapted from the `hubtown` capture in the Volta template
library — its token system, not its markup, imagery or copy.

| Token | Value | Source |
|---|---|---|
| Ground | `rgb(2, 10, 25)` | hubtown palette |
| Foreground | `rgb(213, 224, 255)` | hubtown palette |
| Surface / hairline | `rgb(213 224 255 / .045)` · `/ .14` | hubtown palette |
| Accent | `#C8A24C` brass | **Addition.** The reference is a real-estate WebGL site; pure blue-on-black reads as crypto. A charitable civic society needs archive warmth. |
| Radii | `0` and `10px` | hubtown |
| Easing | `cubic-bezier(.4, 0, .2, 1)` · `cubic-bezier(0, 0, .2, 1)` | hubtown motion profile |
| Reveal | fade + transform-reveal, staggered | hubtown motion profile |
| Chapters | sticky section headings | hubtown (6 sticky elements) |

Tokens are defined once as CSS custom properties in `src/app/globals.css` and exposed
to Tailwind in `tailwind.config.ts`. **Change values in the stylesheet, not the config.**

### Typography

Three roles, self-hosted by `next/font` at build time — the running site makes no
third-party requests.

- **Archivo** — display and interface. Tracking is size-specific: negative at display
  sizes, near zero for body, positive for mono micro-labels.
- **Newsreader** — long-form reading, and the italic ampersand in the wordmark.
- **IBM Plex Mono** — the record: labels, dates, DOS identifiers, source lines.

### Motion

One `IntersectionObserver` in `RevealEngine` serves the whole document, so pages stay
server components — any element opts in with a `data-reveal` attribute and orders
itself in a stagger with `--i`.

The hero's signature is `ScrollTension`: the two halves of the name drift apart as the
page scrolls, because the tension between them is the society's actual subject. It
writes `transform` once per frame from `requestAnimationFrame` with no CSS transition
on top, so the type tracks the scroll rather than lagging behind it.

Only `transform`, `opacity` and `filter` are animated anywhere, so nothing leaves the
compositor.

### Materials

Translucent surfaces are marked `data-material="chrome"` (the header bar and the mobile
sheet — floating layers with content scrolling underneath) or `data-material="surface"`
(raised panels). The distinction matters because the two need different fallbacks when
transparency is turned down: chrome goes fully opaque and grows the edge it was
borrowing from the blur, while a panel stays a raised surface rather than flattening
into the page.

Two constraints worth remembering when editing the header:

- **Never nest one translucent surface inside another.** `backdrop-filter` on an
  ancestor establishes a backdrop root, so a nested blurred surface has nothing left to
  sample — the blur silently does nothing and page content reads straight through it.
  The mobile sheet is a *sibling* of the bar for exactly this reason.
- **The sheet is `inert` while closed.** Hiding it with opacity alone leaves its links
  in the tab order, so a keyboard user lands in a menu they cannot see.

### Preferences

`prefers-reduced-motion`, `prefers-reduced-transparency` and `prefers-contrast` each
have their own block in `globals.css`. Under reduced motion the displacement is dropped
entirely and only a short cross-fade remains; under reduced transparency the materials
go solid; under more contrast the hairlines and dim text step up and chrome takes a
defined border.

## Media

There is no photography, logo or artwork associated with this organization, so the site
ships none. Every visual is generated in-repo and served locally:

- the **seal** (`src/lib/ui/seal.tsx`) — a circle split by one rule, growth above,
  construction below. Drawn for this build; replaceable the moment a real mark exists.
- the **favicon** (`src/app/icon.svg`) and the **social card**
  (`src/app/opengraph-image.tsx`), generated from the same tokens at build time.
- the **paper grain** — an inline SVG turbulence filter in `globals.css`, not an image
  request.

## The interest form

`POST /api/interest` validates submissions and appends them to `.data/interest.jsonl`
(git-ignored). It is a real endpoint with a real store, but a holding pattern: the
society has no published email address and no form provider. **Before launch, forward
each entry from `deliver()` in `src/app/api/interest/route.ts` to the society's inbox.**
A read-only filesystem (most serverless hosts) returns a 503 and logs the entry rather
than dropping it silently.

## Before launch

1. Answer `/intake` — 7 of its 16 questions block launch.
2. Set the real domain in `src/content/site.ts` (`site.url`), used for canonical URLs,
   the sitemap and OG tags.
3. Wire `deliver()` to a real inbox.
4. Confirm the published address. `141-25 Northern Blvd, Unit B1` is the
   service-of-process address on the state filing; property records suggest the building
   is a residential co-op, so it is likely a founder's mailing address rather than a
   public office. It is published at the client's explicit direction, labelled as the
   address on file. Removing it is a one-line change in `src/content/org.ts`.
5. Run `npm run content:report` and confirm what remains is intentional.

## Accessibility

Semantic landmarks and heading order, a skip link, visible focus rings on a brass
outline, `aria-current` on the active nav item, inline field errors bound with
`aria-describedby`, `aria-pressed` on the interest toggles, a honeypot instead of a
CAPTCHA, and disclosure FAQs built on native `<details>` so they work without
JavaScript.
