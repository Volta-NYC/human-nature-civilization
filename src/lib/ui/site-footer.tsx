import Link from "next/link";
import { footerNav } from "@/content/site";
import { addressOneLine, org } from "@/content/org";
import Seal from "./seal";
import { Container, Label } from "./primitives";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-hair">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Seal size={34} className="text-vellum" />
            <span className="font-display text-[0.9375rem] font-semibold leading-tight tracking-[-0.02em]">
              Human Nature <span className="font-body italic text-brass">&amp;</span> Civilization
              <br />
              <span className="text-faint">Forum Society Inc.</span>
            </span>
          </div>
          <p className="m-0 max-w-[34ch] text-[0.9375rem] leading-relaxed text-dim">
            {org.descriptor.value}
          </p>
          <div className="flex flex-col gap-1 font-mono text-[0.6875rem] leading-relaxed text-faint">
            <span>{addressOneLine}</span>
            <span>{org.address.note.value}</span>
          </div>
        </div>

        {footerNav.map((group) => (
          <nav key={group.heading} aria-label={group.heading} className="flex flex-col gap-4">
            <Label>{group.heading}</Label>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {group.items.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-dim transition-colors duration-fast ease-token hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <Container className="flex flex-col gap-4 border-t border-hair-soft py-7 font-mono text-[0.6875rem] leading-relaxed text-faint sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0">
          © {year} {org.legalName.value}. A New York not-for-profit corporation.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:justify-end">
          <p className="m-0">
            DOS ID {org.dosId.value} · Formed {org.formedOnLabel.value} · {org.county.value} County
          </p>
          <a
            href="https://novusnyc.org"
            target="_blank"
            rel="noreferrer noopener"
            className="font-display text-[0.75rem] font-semibold tracking-[-0.01em] text-[#F6B78D] transition-opacity duration-fast ease-token hover:opacity-70"
          >
            Made by Novus
          </a>
        </div>
      </Container>
    </footer>
  );
}
