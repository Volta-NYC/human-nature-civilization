#!/usr/bin/env node
/**
 * Content audit.
 *
 * Walks src/content and prints every field that is not `verified`, so nobody
 * ships a drafted placeholder believing it came from the client. Exits 1 when
 * a `pending` field remains, which makes it usable as a pre-launch gate.
 *
 *   npm run content:report
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const DIR = path.join(process.cwd(), "src", "content");

const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const brass = (s) => `\x1b[33m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;

const files = (await readdir(DIR)).filter((f) => f.endsWith(".ts") && f !== "schema.ts");

let pending = 0;
let drafted = 0;
const rows = [];

for (const file of files) {
  const source = await readFile(path.join(DIR, file), "utf8");
  const lines = source.split("\n");

  lines.forEach((line, i) => {
    // Match `name: pending<...>(` / `name: drafted(` at any indentation.
    const match = line.match(/^\s*([A-Za-z_][\w]*)\s*:\s*(pending|drafted)\s*[<(]/);
    if (!match) return;
    const [, key, kind] = match;
    if (kind === "pending") pending += 1;
    else drafted += 1;
    rows.push({ file, key, kind, line: i + 1 });
  });

  // Bare `drafted(` / `pending(` exports that are not object properties.
  lines.forEach((line, i) => {
    const match = line.match(/^export const ([A-Za-z_][\w]*)\s*=\s*(pending|drafted)\s*[<(]/);
    if (!match) return;
    const [, key, kind] = match;
    if (kind === "pending") pending += 1;
    else drafted += 1;
    rows.push({ file, key, kind, line: i + 1 });
  });
}

console.log(`\n${bold("Content audit")} ${dim("— Human Nature & Civilization Forum Society Inc.")}\n`);

if (rows.length === 0) {
  console.log(green("Every field is verified. Nothing outstanding.\n"));
  process.exit(0);
}

for (const file of [...new Set(rows.map((r) => r.file))]) {
  console.log(dim(`src/content/${file}`));
  for (const row of rows.filter((r) => r.file === file)) {
    const tag = row.kind === "pending" ? brass("PENDING ") : dim("DRAFTED ");
    console.log(`  ${tag} ${row.key} ${dim(`:${row.line}`)}`);
  }
  console.log("");
}

console.log(
  `${brass(`${pending} pending`)} ${dim("(gaps in the public record)")} · ` +
    `${drafted} drafted ${dim("(written by us, awaiting client review)")}\n`,
);
console.log(dim("The full questionnaire is at /intake.\n"));

process.exit(pending > 0 ? 1 : 0);
