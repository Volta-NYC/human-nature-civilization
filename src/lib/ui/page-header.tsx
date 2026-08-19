import type { ReactNode } from "react";
import { Container, Label } from "./primitives";

/** The standard opener for every page below the home page. */
export default function PageHeader({
  label,
  title,
  lede,
  aside,
}: {
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="page-hero border-b border-hair pb-16 pt-[9.5rem] sm:pt-[11rem]">
      <div className="page-hero-motif" aria-hidden="true"><span /><span /><span /></div>
      <Container>
        <div className="flex items-center gap-4" data-reveal>
          <Label brass>{label}</Label>
          <span className="rule w-12 origin-left sm:w-20" data-reveal-rule />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
          <h1 className="max-w-[16ch] text-display" data-reveal style={{ ["--i" as string]: 1 }}>
            {title}
          </h1>
          {lede ? (
            <p className="m-0 max-w-read text-lede text-dim" data-reveal style={{ ["--i" as string]: 2 }}>
              {lede}
            </p>
          ) : null}
        </div>

        {aside ? (
          <div className="mt-12" data-reveal style={{ ["--i" as string]: 3 }}>
            {aside}
          </div>
        ) : null}
      </Container>
    </header>
  );
}
