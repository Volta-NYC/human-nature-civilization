import type { Config } from "tailwindcss"

/**
 * Theme mirrors the CSS custom properties in globals.css, which are themselves
 * adapted from the `hubtown` Volta capture. Change a value there, not here —
 * these entries only expose the tokens to Tailwind's utility generator.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          deep: "rgb(var(--ink-deep) / <alpha-value>)",
          raised: "rgb(var(--ink-raised) / <alpha-value>)",
        },
        vellum: "rgb(var(--vellum) / <alpha-value>)",
        brass: "rgb(var(--brass) / <alpha-value>)",
      },
      textColor: {
        primary: "var(--text)",
        dim: "var(--text-dim)",
        faint: "var(--text-faint)",
      },
      borderColor: {
        hair: "var(--hairline)",
        "hair-soft": "var(--hairline-soft)",
      },
      backgroundColor: {
        surface: "var(--surface)",
        "surface-hover": "var(--surface-hover)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Fluid display scale. Tracking is set per-step in globals.css.
        mega: ["clamp(2.5rem, 8.6vw, 7.5rem)", { lineHeight: "0.92", letterSpacing: "-0.045em" }],
        display: ["clamp(2.25rem, 6vw, 4.75rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        title: ["clamp(1.75rem, 3.4vw, 2.75rem)", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
        heading: ["clamp(1.25rem, 1.8vw, 1.6rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        lede: ["clamp(1.125rem, 1.3vw, 1.4rem)", { lineHeight: "1.5", letterSpacing: "-0.011em" }],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        token: "var(--radius)",
        "token-sm": "var(--radius-sm)",
      },
      transitionTimingFunction: {
        token: "var(--ease)",
        "token-out": "var(--ease-out)",
      },
      transitionDuration: {
        fast: "120ms",
        token: "320ms",
        slow: "640ms",
      },
      maxWidth: {
        shell: "84rem",
        read: "62ch",
      },
      spacing: {
        gutter: "var(--gutter)",
        section: "var(--section)",
      },
      keyframes: {
        "rise-in": {
          "0%": { opacity: "0", transform: "translate3d(0, 24px, 0)" },
          "100%": { opacity: "1", transform: "none" },
        },
        "draw-x": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" },
        },
      },
      animation: {
        "rise-in": "rise-in var(--dur-reveal) var(--ease) both",
        "draw-x": "draw-x var(--dur-reveal) var(--ease) both",
        drift: "drift 9s var(--ease) infinite",
      },
    },
  },
  plugins: [],
}
export default config
