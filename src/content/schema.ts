/**
 * Content schema for Human Nature & Civilization Forum Society Inc.
 *
 * Background: the research compiled on 2026-08-18 found no website, no socials,
 * no listings and no press for this organization. The only verified record is
 * the New York Department of State corporate filing. Every string on this site
 * is therefore tagged with where it came from, so nobody downstream mistakes a
 * drafted placeholder for a fact the organization has actually stated.
 *
 * Rules of the road:
 *   - `verified`  — sourced from a named public record. Safe to publish.
 *   - `drafted`   — written by the design team as structural copy. It describes
 *                   the site, never the organization's history, numbers, people
 *                   or claims. Must be reviewed by the client before launch.
 *   - `pending`   — a hole in the record. Rendered as an honest gap in the UI,
 *                   never filled in with an invention.
 *
 * `npm run content:report` prints everything that is not yet `verified`.
 */

export type FactStatus = "verified" | "drafted" | "pending";

export interface Fact<T = string> {
  /** The value to render. `null` means the field is a known gap. */
  value: T | null;
  status: FactStatus;
  /** Where the value came from, or what is needed to fill the gap. */
  source: string;
  /** Shown in the UI when `value` is null. */
  fallback?: string;
}

/** A fact whose value is guaranteed present, so callers never unwrap a null. */
export type Known<T> = Fact<T> & { value: T };

export const verified = <T>(value: T, source: string): Known<T> => ({
  value,
  status: "verified",
  source,
});

export const drafted = <T>(
  value: T,
  source = "Drafted by the design team — awaiting client review",
): Known<T> => ({
  value,
  status: "drafted",
  source,
});

export const pending = <T>(source: string, fallback: string): Fact<T> => ({
  value: null,
  status: "pending",
  source,
  fallback,
});

export function isPending(fact: Fact<unknown>): boolean {
  return fact.status === "pending" || fact.value === null;
}
