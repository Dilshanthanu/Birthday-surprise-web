/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
                playfair: ['Playfair Display', 'serif'],
            },
            colors: {
                romantic: {
                    50: '#fff1f2',
                    100: '#ffe4e6',
                    200: '#fecdd3',
                    300: '#fda4af',
                    400: '#fb7185',
                    500: '#f43f5e',
                    600: '#e11d48',
                    700: '#be123c',
                    800: '#9f1239',
                    900: '#881337',
                },
                stitch: {
                    light: '#E0F2FE',
                    DEFAULT: '#0EA5E9',
                    dark: '#0369A1',
                },
                angel: {
                    light: '#FCE7F3',
                    DEFAULT: '#EC4899',
                    dark: '#9D174D',
                },
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'heart-beat': 'heart-beat 1.5s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'heart-beat': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                },
            },
        },
    },
    plugins: [],
}
