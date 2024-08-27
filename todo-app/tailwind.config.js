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
      colors: {
        // Colores para el modo claro
        light: {
          background: "#ffffff", // Fondo principal (blanco)
          textPrimary: "#1a202c", // Texto principal (gris oscuro)
          textSecondary: "#4a5568", // Texto secundario (gris medio)
          card: "#f7fafc", // Fondo de tarjetas (gris muy claro)
          button: {
            bg: "#4299e1", // Fondo de botones (azul)
            text: "#ffffff", // Texto de botones (blanco)
            hover: "#3182ce", // Fondo de botones en hover (azul más oscuro)
          },
          // Colores para el modo oscuro
          dark: {
            background: "#1a202c", // Fondo principal (gris muy oscuro)
            textPrimary: "#f7fafc", // Texto principal (gris muy claro)
            textSecondary: "#a0aec0", // Texto secundario (gris claro)
            card: "#2d3748", // Fondo de tarjetas (gris oscuro)
            button: {
              bg: "#2b6cb0", // Fondo de botones (azul oscuro)
              text: "#ffffff", // Texto de botones (blanco)
              hover: "#2c5282", // Fondo de botones en hover (azul más oscuro)
            },
          },
        },
      },
    },
  },
  plugins: [],
};
