import { createColorSet, withAccountKitUi } from "@account-kit/react/tailwind";

export default withAccountKitUi(
  // /** @type {import('tailwindcss').Config} */
  {
    content: ["./*.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
  },
  {
    colors: {
      "btn-primary": createColorSet("#02d632", "#9AB7FF"),
      "fg-accent-brand": createColorSet("#02d632", "#9AB7FF"),
    },
    borderRadius: "md",
  }
);
