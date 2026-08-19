import type { ReactNode } from "react";
import { Fact, isPending } from "@/content/schema";
import { Label } from "./primitives";

/**
 * An open question.
 *
 * The society is three months old and most of its record is genuinely blank.
 * Rather than filling those blanks with invented copy, the site shows them —
 * marked, dated and attributed. An honest gap reads as candour; a fabricated
 * mission statement would read as noise the moment a visitor met the founders.
 */
export function OpenQuestion({
  children,
  className = "",
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "quiet";
}) {
  return (
    <div
      className={`flex gap-4 rounded-token-sm border-l-2 border-brass/45 bg-brass/[0.045] py-4 pl-5 pr-5 ${className}`}
    >
      <div className="flex flex-col gap-2">
        <Label brass>Open question</Label>
        <p className={`m-0 text-[0.9375rem] leading-relaxed ${tone === "quiet" ? "text-faint" : "text-dim"}`}>
          {children}
        </p>
      </div>
    </div>
  );
}

/**
 * A single line of the public record.
 *
 * Most rows on this site share one source — the state filing — so repeating it
 * under every value would be eight identical lines of noise. Pass the panel's
 * `commonSource` and matching rows stay quiet; only rows sourced elsewhere, or
 * missing entirely, carry their own attribution.
 */
export function RecordRow({
  label,
  fact,
  commonSource,
}: {
  label: string;
  fact: Fact<string>;
  commonSource?: string;
}) {
  const gap = isPending(fact);
  const showSource = gap || fact.source !== commonSource;

  return (
    <div
      className="grid grid-cols-1 gap-2 border-t border-hair-soft py-5 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-8"
      data-reveal
    >
      <dt className="label pt-1">{label}</dt>
      <dd className="m-0">
        <p className={`m-0 text-[0.9375rem] leading-relaxed ${gap ? "text-faint" : "text-primary"}`}>
          {gap ? fact.fallback : fact.value}
        </p>
        {showSource ? (
          <p className="mt-1.5 max-w-read font-mono text-[0.6875rem] leading-relaxed text-faint/70">
            {gap ? "Not on record — " : "Source: "}
            {fact.source}
          </p>
        ) : null}
      </dd>
    </div>
  );
}

/** The state seal-adjacent header for the filing panel. */
export function StampHeader({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hair px-6 py-4 sm:px-8">
      {children}
    </div>
  );
}
