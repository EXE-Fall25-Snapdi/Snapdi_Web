/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "sf-pro": [
          "SF Pro Display",
          "system-ui",
          "Avenir",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        sans: [
          "SF Pro Display",
          "system-ui",
          "Avenir",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      fontWeight: {
        thin: "100",
        ultralight: "200",
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        heavy: "800",
        black: "900",
      },
      colors: {
        primary: "#34D399",
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
      },
      boxShadow: {
        "custom-green":
          "0 10px 15px -3px rgba(52, 211, 153, 0.2), 0 4px 6px -2px rgba(52, 211, 153, 0.15)", // Ví dụ: shadow xanh lá
        "custom-dark-green": "10px 10px 0px rgba(0, 128, 0, 1)", // Shadow mạnh và lệch về phía dưới, phải
        "green-neon": "0 0 15px rgba(0, 255, 0, 0.7)", // Shadow xanh neon
        "soft-green-edge": "5px 5px 0px #34d399", // Shadow cứng màu xanh lá
      },
    },
  },
  plugins: [],
};
