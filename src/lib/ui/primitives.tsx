import Link from "next/link";
import type { ComponentProps, ElementType, ReactNode } from "react";

const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");

/** The page shell. One measure, one gutter, everywhere. */
export function Container({
  children,
  className = "",
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
} & Record<string, unknown>) {
  return (
    <Tag className={cx("mx-auto w-full max-w-shell px-gutter", className)} {...rest}>
      {children}
    </Tag>
  );
}

/** A vertical band of the page, with the standard rhythm above and below. */
export function Section({
  children,
  className = "",
  id,
  bordered = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={cx("py-section", bordered && "border-t border-hair", className)}
      style={id ? { scrollMarginTop: "5.5rem" } : undefined}
    >
      {children}
    </section>
  );
}

/**
 * A mono micro-label. The site's connective tissue: it marks sections the way
 * a docket marks entries, which is the right register for an organization
 * whose only existing document is a state filing.
 */
export function Label({
  children,
  className = "",
  brass = false,
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  brass?: boolean;
  as?: ElementType;
}) {
  return <Tag className={cx("label", brass && "label-brass", className)}>{children}</Tag>;
}

/** Section opener: label, rule that draws itself, heading. */
export function SectionHead({
  label,
  title,
  lede,
  className = "",
  align = "left",
}: {
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <header className={cx("flex flex-col gap-5", align === "center" && "items-center text-center", className)}>
      <div className={cx("flex items-center gap-4", align === "center" && "justify-center")} data-reveal>
        <Label brass>{label}</Label>
        <span className="rule w-10 origin-left sm:w-16" data-reveal-rule />
      </div>
      <h2 className="max-w-[22ch] text-title" data-reveal style={{ ["--i" as string]: 1 }}>
        {title}
      </h2>
      {lede ? (
        <p
          className={cx("max-w-read text-lede text-dim", align === "center" && "mx-auto")}
          data-reveal
          style={{ ["--i" as string]: 2 }}
        >
          {lede}
        </p>
      ) : null}
    </header>
  );
}

type ButtonVariant = "solid" | "outline" | "ghost";

const buttonBase =
  "group inline-flex items-center justify-center gap-2.5 rounded-token px-6 py-3.5 font-display text-[0.9375rem] font-semibold tracking-[-0.01em] shadow-[0_8px_30px_rgba(25,46,41,0.08)] transition-[background-color,border-color,color,transform,box-shadow] duration-token ease-token hover:-translate-y-0.5 active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50";

const buttonVariants: Record<ButtonVariant, string> = {
  solid: "bg-vellum text-ink hover:bg-brass hover:text-white",
  outline: "border border-hair text-primary hover:border-vellum/40 hover:bg-surface",
  ghost: "text-dim hover:text-primary",
};

export function ActionLink({
  href,
  children,
  variant = "solid",
  className = "",
  ...rest
}: { href: string; children: ReactNode; variant?: ButtonVariant; className?: string } & Omit<
  ComponentProps<typeof Link>,
  "href" | "className"
>) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const classes = cx(buttonBase, buttonVariants[variant], className);
  if (external) {
    return (
      <a href={href} className={classes} rel="noreferrer noopener" target="_blank">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "solid",
  className = "",
  ...rest
}: { variant?: ButtonVariant } & ComponentProps<"button">) {
  return (
    <button className={cx(buttonBase, buttonVariants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

/** A small arrow that leans into the direction of travel on hover. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={cx("transition-transform duration-token ease-token group-hover:translate-x-1", className)}
    >
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A raised panel. Radius and surface come straight from the token set. */
export function Panel({
  children,
  className = "",
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
} & Record<string, unknown>) {
  return (
    <Tag
      data-material="surface"
      className={cx("rounded-token border border-hair bg-surface backdrop-blur-[2px]", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
