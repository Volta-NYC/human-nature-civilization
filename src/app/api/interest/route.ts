import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Interest list intake.
 *
 * The society has no published email address and no account with any form
 * provider, so submissions are appended to a local newline-delimited JSON file
 * rather than forwarded anywhere. That is a real, working endpoint with a real
 * store — not a mock — but it is a holding pattern.
 *
 * TO WIRE UP AT LAUNCH: forward each entry to the society's inbox (or a list
 * provider) inside `deliver()` below. Everything else can stay as it is.
 */

export const runtime = "nodejs";

const STORE = path.join(process.cwd(), ".data", "interest.jsonl");
const MAX = { name: 120, email: 200, note: 2000 };

interface Submission {
  name: string;
  email: string;
  note: string;
  interests: string[];
  receivedAt: string;
}

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

const clean = (value: unknown, limit: number) =>
  typeof value === "string" ? value.trim().slice(0, limit) : "";

async function deliver(entry: Submission) {
  await mkdir(path.dirname(STORE), { recursive: true });
  await appendFile(STORE, `${JSON.stringify(entry)}\n`, "utf8");
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a JSON body." }, { status: 400 });
  }

  const data = payload as Record<string, unknown>;

  // Honeypot: a field no human ever sees, so anything in it is a bot. Return a
  // success shape so the bot does not learn anything from the response.
  if (clean(data.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(data.name, MAX.name);
  const email = clean(data.email, MAX.email);
  const note = clean(data.note, MAX.note);
  const interests = Array.isArray(data.interests)
    ? data.interests.filter((i): i is string => typeof i === "string").slice(0, 12)
    : [];

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Add a name so we know who to expect.";
  if (!email) errors.email = "An email address is how you will hear about the first session.";
  else if (!isEmail(email)) errors.email = "That address does not look right. Check it and try again.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const entry: Submission = { name, email, note, interests, receivedAt: new Date().toISOString() };

  try {
    await deliver(entry);
  } catch (error) {
    // A read-only filesystem (most serverless hosts) lands here. The entry is
    // still surfaced in the server log so nothing is silently dropped.
    console.error("[interest] could not write to store:", error);
    console.info("[interest] entry:", JSON.stringify(entry));
    return NextResponse.json(
      { error: "The list is not accepting entries right now. Please try the contact page." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
