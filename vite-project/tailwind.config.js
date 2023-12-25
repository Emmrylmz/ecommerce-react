/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'aqua' : '#75F4E5',
        'orangeish' : '#f59b4c',
        'pinkish' : '#e899cb',
        'white-pink' : '#fdf2fc'
      },
      fontFamily: {
         sans : ['Slabo 27px',]
    },
  },
  plugins: [],
}
}
