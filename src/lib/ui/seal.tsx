/**
 * The society's mark, drawn for this build — no logo exists on any record.
 *
 * A circle divided by a single rule. Above it, an arc: what grows on its own.
 * Below it, a ruled grid: what we lay down on purpose. The society's subject is
 * the line between them, so the mark is that line.
 */
export default function Seal({
  size = 40,
  className = "",
  title,
  ...rest
}: {
  size?: number;
  className?: string;
  title?: string;
} & Record<string, unknown>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="24" cy="24" r="22.25" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
      {/* The dividing rule */}
      <path d="M4 24h40" stroke="currentColor" strokeWidth="1.5" />
      {/* Above: growth */}
      <path
        d="M9.5 24c0-8 6.5-14.5 14.5-14.5S38.5 16 38.5 24"
        stroke="currentColor"
        strokeOpacity="0.75"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Below: construction */}
      <path
        d="M13 24v10.5M19 24v14.5M24 24v16.5M29 24v14.5M35 24v10.5"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M13 31.5h22M17 37h14" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.25" />
    </svg>
  );
}
