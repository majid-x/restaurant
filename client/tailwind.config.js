/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      colors:{
        "green": "#39DB4A",
        "red" : "#FF6868",
        "secondary": "#555",
        "primary": "#FCFCFC"
      },
    },
  },
  plugins: [
    require("daisyui")
  ],
}

