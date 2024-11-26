import generateTailwindColors from "./generateTailwindColors";
import config from "./../app.config";

/** @type {import('tailwindcss').Config} */
export default {
  important: false,
  prefix: "tw-",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "412px",
        xss: "632px",
        "x1000": "1000px",
      },
      animation: {
        pulse: "pulse 2s",
      },
      flex: {
        1: "flex: 1",
        2: "flex: 2",
      },
      minWidth: {
        10: "2.5rem",
        20: "5rem",
        "320px": "320px",
        "500px": "500px",
        inherit: "inherit",
      },
      minHeight: {
        24: "6rem",
        inherit: "inherit",
      },
      width: {
        inherit: "inherit",
      },
      height: {
        inherit: "inherit",
      },
      strokeWidth: {
        3: "3px",
        4: "4px",
      },
      fontSize: {
        xxxs: ["8pt", ".7rem"],
        xxs: ["9pt", ".75rem"],
        xs: "10pt",
        sm: "11pt",
        base: "12pt",
        lg: "14pt",
        xl: "16pt",
        "2xl": "20pt",
        "3xl": "24pt",
        "4xl": "28pt",
      },
      zIndex: {
        0: 0,
        10: 10,
        20: 20,
        25: 25,
        30: 30,
        40: 40,
        50: 50,
        75: 75,
        100: 100,
      },
      colors: {
        skeleton: config.colors.skeleton,
        background: config.colors.background,
        card: config.colors.card,
        primary: generateTailwindColors(config.colors.primary),
        secondary: generateTailwindColors(config.colors.secondary),
      },
      transitionProperty: {
        width: "width",
      },
      boxShadow: {
        bot: "0 2px 1px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      },
    },
  },
};
