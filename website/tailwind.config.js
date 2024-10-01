/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Garanta que esses caminhos estejam corretos
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"], // Define 'Plus Jakarta Sans' como fonte padrão
      },
      colors: {
        primary: "#0053f8", // Adicione outras cores personalizadas conforme necessário
        secondary: "#5a50c2",
      },
    },
  },
  plugins: [],
};
