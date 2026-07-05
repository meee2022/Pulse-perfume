import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // PULSE — paper / editorial system (from the brand site)
        paper: {
          1: "#F5F2EB",
          2: "#EDEAE3",
          3: "#E4E0D6",
        },
        ink: "#262521",
        olive: {
          DEFAULT: "#7E836E",
          deep: "#5C6051", // deep-neutral
        },
        dust: {
          green: "#AEB39D",
          blue: "#93A6B8",
          grey: "#C2C4C7",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.4em",
        wide1: "0.25em",
        wide2: "0.15em",
        wide3: "0.08em",
      },
      maxWidth: {
        shell: "1200px",
        prose2: "34rem",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        drawPulse: { to: { strokeDashoffset: "0" } },
        fadeUp: { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "none" } },
        pulseDown: {
          "0%,100%": { transform: "translateY(0)", opacity: "0.5" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
        },
      },
      animation: {
        pulseDown: "pulseDown 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
