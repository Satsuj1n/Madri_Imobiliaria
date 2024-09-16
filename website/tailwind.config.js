<<<<<<< HEAD
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ajuste o caminho conforme a estrutura do seu projeto
  ],
  theme: {
    extend: {},
=======
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-white": "var(--color-white)",
        "greyscale-grey-100": "var(--greyscale-grey-100)",
        "greyscale-grey-200": "var(--greyscale-grey-200)",
        "greyscale-grey-300": "var(--greyscale-grey-300)",
        "greyscale-grey-600": "var(--greyscale-grey-600)",
        "greyscale-grey-700": "var(--greyscale-grey-700)",
        "greyscale-grey-800": "var(--greyscale-grey-800)",
        "greyscale-grey-900": "var(--greyscale-grey-900)",
        "greyscalegrey-400": "var(--greyscalegrey-400)",
        "greyscalegrey-50": "var(--greyscalegrey-50)",
        "greyscalegrey-500": "var(--greyscalegrey-500)",
        "main-colorblack": "var(--main-colorblack)",
        "main-colorprimary": "var(--main-colorprimary)",
        "main-colorsecondary": "var(--main-colorsecondary)",
        "main-colorswhite": "var(--main-colorswhite)",
        "main-colorwhite": "var(--main-colorwhite)",
        "other-colors-white": "var(--other-colors-white)",
        "shades-of-purplepurple-90": "var(--shades-of-purplepurple-90)",
        "shades-of-purplepurple-92": "var(--shades-of-purplepurple-92)",
        "shades-of-purplepurple-94": "var(--shades-of-purplepurple-94)",
        "shades-of-purplepurple-96": "var(--shades-of-purplepurple-96)",
        "shades-of-purplepurple-98": "var(--shades-of-purplepurple-98)",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        "body-large-145-bold": "var(--body-large-145-bold-font-family)",
        "body-large-145-medium": "var(--body-large-145-medium-font-family)",
        "body-medium-150-bold": "var(--body-medium-150-bold-font-family)",
        "body-medium-150-medium": "var(--body-medium-150-medium-font-family)",
        "body-medium-150-regular": "var(--body-medium-150-regular-font-family)",
        "body-medium-160-medium": "var(--body-medium-160-medium-font-family)",
        "body-medium-160-regular": "var(--body-medium-160-regular-font-family)",
        "body-small-140-bold": "var(--body-small-140-bold-font-family)",
        "body-small-140-medium": "var(--body-small-140-medium-font-family)",
        "body-small-140-regular": "var(--body-small-140-regular-font-family)",
        "body-xlarge-140-bold": "var(--body-xlarge-140-bold-font-family)",
        "body-xlarge-160-bold": "var(--body-xlarge-160-bold-font-family)",
        "body-xlarge-160-medium": "var(--body-xlarge-160-medium-font-family)",
        "body-xsmall-135-bold": "var(--body-xsmall-135-bold-font-family)",
        "body-xsmall-135-medium": "var(--body-xsmall-135-medium-font-family)",
        "body-xsmall-135-regular": "var(--body-xsmall-135-regular-font-family)",
        "heading-h1": "var(--heading-h1-font-family)",
        "heading-h2": "var(--heading-h2-font-family)",
        "heading-h3": "var(--heading-h3-font-family)",
        "heading-h4": "var(--heading-h4-font-family)",
      },
    },
>>>>>>> 74a9ce6975ecfe371b01186914454e6f4717edb1
  },
  plugins: [],
};
