/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Habilita el modo oscuro basado en la clase 'dark'
  theme: {
    extend: {
      transitionProperty: {
        background: "background-color", // Para transiciones suaves de fondo
        text: "color", // Para transiciones suaves de texto
      },
    },
  },
  plugins: [],
};
