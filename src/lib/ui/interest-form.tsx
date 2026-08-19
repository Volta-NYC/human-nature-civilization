"use client";

import { useId, useRef, useState } from "react";
import { interests as interestOptions } from "@/content/participate";
import { Button, Label } from "./primitives";

type State = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-token border border-hair bg-ink-raised/60 px-4 py-3.5 font-body text-[1rem] text-primary placeholder:text-faint/60 transition-colors duration-fast ease-token focus:border-brass/60 focus:outline-none focus:ring-0";

/**
 * The interest list.
 *
 * Validation happens inline as the user leaves a field rather than all at once
 * on submit, and the labels say what a person controls, not what the system
 * stores. Errors state what went wrong and how to fix it.
 */
export default function InterestForm() {
  const id = useId();
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [chosen, setChosen] = useState<string[]>([]);
  const form = useRef<HTMLFormElement>(null);

  const toggle = (value: string) =>
    setChosen((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setErrors({});
    setMessage("");

    const data = new FormData(event.currentTarget);
    const body = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      note: String(data.get("note") ?? ""),
      company: String(data.get("company") ?? ""),
      interests: chosen,
    };

    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json().catch(() => ({}));

      if (response.status === 422 && result.errors) {
        setErrors(result.errors);
        setState("error");
        return;
      }
      if (!response.ok) {
        setMessage(result.error ?? "Something went wrong on our side. Try again in a moment.");
        setState("error");
        return;
      }

      form.current?.reset();
      setChosen([]);
      setState("sent");
    } catch {
      setMessage("The network dropped the request. Check your connection and try again.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div
        className="flex flex-col gap-4 rounded-token border border-brass/40 bg-brass/[0.06] p-8 sm:p-10"
        role="status"
      >
        <Label brass>On the list</Label>
        <h3 className="text-title">You are down for the first session.</h3>
        <p className="m-0 max-w-read text-[0.9375rem] leading-relaxed text-dim">
          Nothing is scheduled yet, so there is nothing to confirm. When a date is set, you hear
          about it before it is announced anywhere else.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="self-start font-display text-[0.875rem] font-semibold text-brass underline-offset-4 hover:underline"
        >
          Add someone else
        </button>
      </div>
    );
  }

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-name`} className="label">
            Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            className={field}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
            placeholder="Who should we expect?"
          />
          {errors.name ? (
            <p id={`${id}-name-error`} className="m-0 font-mono text-[0.6875rem] text-brass">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-email`} className="label">
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className={field}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
            placeholder="you@example.com"
          />
          {errors.email ? (
            <p id={`${id}-email-error`} className="m-0 font-mono text-[0.6875rem] text-brass">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
        <legend className="label mb-1 p-0">What brings you here? Choose any.</legend>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((option) => {
            const active = chosen.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggle(option)}
                aria-pressed={active}
                className={`rounded-token-sm border px-4 py-2.5 font-display text-[0.8125rem] font-medium transition-[background-color,border-color,color,transform] duration-fast ease-token active:scale-[0.97] ${
                  active
                    ? "border-brass/60 bg-brass/15 text-primary"
                    : "border-hair text-dim hover:border-vellum/30 hover:text-primary"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-note`} className="label">
          Anything you want to say <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          id={`${id}-note`}
          name="note"
          rows={4}
          className={`${field} resize-y`}
          placeholder="A question you would want the first session to take on, or how you would like to help."
        />
      </div>

      {/* Honeypot. Hidden from people and from screen readers; bots fill it in. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {state === "error" && message ? (
        <p className="m-0 rounded-token-sm border border-brass/40 bg-brass/[0.06] px-4 py-3 text-[0.875rem] text-dim" role="alert">
          {message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-5">
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Adding you…" : "Join the list"}
        </Button>
        <p className="m-0 max-w-[38ch] font-mono text-[0.6875rem] leading-relaxed text-faint">
          Your details go to the society and nowhere else. No newsletter, no partners, no
          tracking.
        </p>
      </div>
    </form>
  );
}
