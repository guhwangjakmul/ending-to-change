import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sindinaru-m': ['sindinaru-m', 'sans-serif'], // a신디나루M
        'sindinaru-b': ['sindinaru-b', 'sans-serif'], // a신디나루B
        'gothic-m': ['gothic-m', 'sans-serif'], // a영고딕M
        'gothic-b': ['gothic-b', 'sans-serif'], // a영고딕B
      },
      colors: {
        white: 'rgba(255, 255, 251, 1)',
        beige: 'rgba(255, 249, 228, 1)',
        cream: 'rgba(249, 247, 226, 1)',
        'light-beige': 'rgba(245, 243, 222, 1)',
        'light-yellow': 'rgba(254, 236, 158, 1)',
        yellow: 'rgba(255, 206, 0, 1)',
        orange: 'rgba(245, 114, 48, 1)',
        brown: 'rgba(126, 114, 92, 1)',
        'dark-brown': 'rgba(91, 79, 65, 1)',
        'medium-brown': 'rgba(131, 113, 86, 1)',
        'mint-green': 'rgba(26, 200, 185, 1)',
        mint: 'rgba(91, 188, 169, 1)',
        'lime-green': 'rgba(102, 210, 103, 1)',
        'sky-blue': 'rgba(2, 177, 206, 1)',
        gray: 'rgba(206, 198, 186, 1)',
        'light-gray': 'rgba(146, 142, 131, 1)',
        'light-mint': 'rgba(238, 250, 249, 1)',
      },
      boxShadow: {
        button: '0px 1px 2px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
export default config
