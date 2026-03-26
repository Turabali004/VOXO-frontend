/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                twitter: {
                    blue: '#1DA1F2',
                    black: '#000000',
                    darkGray: '#16181C',
                    lightGray: '#AAB8C2',
                    extraLightGray: '#E1E8ED',
                    extraExtraLightGray: '#F5F8FA',
                },
            },
        },
    },
    plugins: [],
}
