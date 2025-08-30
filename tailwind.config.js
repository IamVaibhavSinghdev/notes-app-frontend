/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center : true, padding : "1rem"
    },
    extend: {
      colors : {
        brand : {
           50:"#eef6ff",100:"#dbecff",200:"#b7d8ff",300:"#8bbfff",
          400:"#59a2ff",500:"#2e84ff",600:"#1567e6",700:"#0f52b4",
          800:"#0e4692",900:"#0f3b76"
        }
      },
      borderRadius: { 
      xl: "1rem", 
      "2xl": "1.25rem" 
      }
    },
  },
  plugins: [],
}

