/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3134CE",
        secondary: {
          DEFAULT: "#968AB6",
          100: "#D0BFFD",
          200: "#76679E",
          300: "#5F4D8B",
          400: "#3F2F6C",
        },
        warning: {
          DEFAULT: "#b6988a",
          100: "#fdd3bf",
          200: "#d98b53",
          300: "#de7a32",
          400: "#bb5a15",
          500: "#a44d0f",
        },
        darkened: "#332C49",
        lightened: "#FCF7FF",
      },
      fontFamily: {
        slight: ["Satoshi-Light", "sans-serif"],
        sregular: ["Satoshi-Regular", "sans-serif"],
        smedium: ["Satoshi-Medium", "sans-serif"],
        sbold: ["Satoshi-Bold", "sans-serif"],
        sblack: ["Satoshi-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
