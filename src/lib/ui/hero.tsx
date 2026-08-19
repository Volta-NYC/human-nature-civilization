import ScrollTension from "@/lib/motion/scroll-tension";
import { org, monthsSinceFormation } from "@/content/org";
import { ActionLink, Arrow, Container, Label } from "./primitives";

/**
 * The signature.
 *
 * The society's entire subject is the tension between the inheritance we did
 * not choose and the world we build on top of it. So the name is set as two
 * opposed masses with a single hairline between them, and scrolling pulls them
 * apart. The thesis is the hero; there is no stock photograph standing in for
 * an idea, which is fortunate, because this organization has no photography.
 */
export default function Hero() {
  const months = monthsSinceFormation();

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28">
      <ScrollTension>
        <Container className="flex flex-1 flex-col justify-center py-8">
          <div
            className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2"
            data-reveal
            data-tension="fade"
          >
            <Label brass>New York · DOS {org.dosId.value}</Label>
            <span className="hidden h-px w-12 bg-hair sm:block" />
            <Label>
              Incorporated {org.formedOnLabel.value} · {org.county.value}, NY
            </Label>
          </div>

          <h1 className="flex flex-col text-mega font-semibold">
            <span className="sr-only">{org.legalName.value}</span>

            <span
              aria-hidden="true"
              data-tension="left"
              className="block will-change-transform"
            >
              <span data-reveal className="block">
                Human Nature
              </span>
            </span>

            {/* The line between the two. It draws itself, then holds. */}
            <span aria-hidden="true" className="relative my-2 flex items-center gap-5 sm:my-3">
              <span className="rule flex-1 origin-left" data-reveal-rule style={{ ["--i" as string]: 1 }} />
              <span
                className="font-body text-[clamp(2rem,4.4vw,3.25rem)] font-normal italic leading-none text-brass"
                data-reveal
                style={{ ["--i" as string]: 2 }}
              >
                &amp;
              </span>
              <span className="rule flex-1 origin-right" data-reveal-rule style={{ ["--i" as string]: 1 }} />
            </span>

            <span
              aria-hidden="true"
              data-tension="right"
              className="block text-right will-change-transform"
            >
              <span data-reveal className="block" style={{ ["--i" as string]: 3 }}>
                Civilization
              </span>
            </span>
          </h1>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <p
              className="m-0 max-w-[46ch] text-lede text-dim"
              data-reveal
              style={{ ["--i" as string]: 4 }}
            >
              A forum society in Queens for the argument that never finishes:{" "}
              <em className="not-italic text-primary">what we are</em>, and{" "}
              <em className="not-italic text-primary">what we keep building</em> on top of it.
              Public sessions, two opposed positions, and a room that talks back.
            </p>

            <div className="flex flex-wrap gap-3" data-reveal style={{ ["--i" as string]: 5 }}>
              <ActionLink href="/join">
                Join the list <Arrow />
              </ActionLink>
              <ActionLink href="/forum" variant="outline">
                How a session works
              </ActionLink>
            </div>
          </div>
        </Container>

        {/* Foot of the fold: the honest status line. */}
        <Container className="border-t border-hair py-6" data-tension="fade">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3" data-reveal style={{ ["--i" as string]: 6 }}>
            <Label>
              {months} months old · Chartered, not yet convened
            </Label>
            <Label className="hidden sm:block">Scroll</Label>
          </div>
        </Container>
      </ScrollTension>
    </section>
  );
}
