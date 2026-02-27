import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'system-ui', 'sans-serif'],
            },
            colors: {
                'ga-blue': '#2E86DE',
                'ga-blue-light': '#54A0FF',
                'ga-blue-dark': '#1A5FAD',
                'ga-sky': '#74B9FF',
                'ga-amber': '#E6A817',
                'ga-dark': '#0D1117',
                'ga-dark-2': '#161B22',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
};

export default config;
