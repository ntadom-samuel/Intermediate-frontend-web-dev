/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    //Vid 307: using and specifying fonts
    //1. Get fonts' link from Google Fonts 2. Create a fontFamily object and a property associated with your desired font . Use font on an element as shown: font-propertyname
    fontFamily: {
      // pizza: "Roboto Mono, monospace",
      sans: "Roboto Mono, monospace",
    },
    //Placing the colors property outside extends overrides all of tailwinds defualt colors
    // colors:{
    //   pizza: "#123456"

    // },
    extend: {
      // colors:{
      //   pizza: "#123456"

      // },
      fontSize: {
        huge: ["80rem", { lineHeight: "1" }],
      },
      height: {
        //This helps adjust veiw port height for mobile devices
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
