/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/**/*.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-vue/**/*.{js,tsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGreen: "#9CE452",
        lightBlue: "#028EE6",
        primary: "#1A3C54",
        muted: "#ACAFB6",
        lightgray: "#F0F7FC",
        mute: "#A3DAFD",
        origin: "#36A1EA",
        danger: "#F56666",
        chooser: "#F0F8FE",
        work: "#FEB51F",
        box: "#57B8FA",
        boxMuted: "#9DD7FF",
        calendarBg: "#E7F0FC",
        h1mute: "#5F5F5F",
        softTeal: "rgba(213, 237, 214, 1)",
        detail: "#8a99a4",
        white: "#FFF",
      },
      borderRadius: {
        large: "85px",
      },
      fontSize: {
        xxs: "9px",
      },
      width: {
        51: "11rem",
        75: "75%",
        160: "160px",
      },
      height: {
        160: "160px",
      },
      maxHeight: {
        chart: "40rem",
      },
      margin: {
        30: "7rem",
      },
      zIndex: {
        1035: "1035",
      },
      screens: {
        tablet: "950px",
        smallLaptop: "1210px",
      },
      variants: {
        extend: {
          opacity: ["disabled"],
          cursor: ["disabled"],
        },
        fill: ["hover", "focus"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
