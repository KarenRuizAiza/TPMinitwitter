export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1DA1F2",
        secondary: "#F5F8FA",
        darkText: "#657786",
        success: "#17BF63",
        danger: "#E0245E",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        miniTwitter: {
          primary: "#1DA1F2",
          secondary: "#F5F8FA",
          accent: "#17BF63",
          info: "#1DA1F2",
          success: "#17BF63",
          warning: "#F1C40F",
          error: "#E0245E",
        },
      },
    ],
  },
};
