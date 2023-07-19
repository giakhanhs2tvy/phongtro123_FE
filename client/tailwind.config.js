/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      width:{
        '1100':'1100px'
      },
      backgroundColor:{
        primary: '#F5F5F5',
        secondary:'#0071c2',
        primary2: '#f73859',
        'overlay-30': 'rgba(0,0,0,0.3)',
        'overlay-60': 'rgba(0,0,0,0.6)',
        'overlay-70': 'rgba(0,0,0,0.7)'
      },
      maxWidth:{
        '600':'600px',
        '1100': '1100px'
      },
      cursor:{
        pointer:'pointer'
      }
    },
  },
  plugins: [],
}

