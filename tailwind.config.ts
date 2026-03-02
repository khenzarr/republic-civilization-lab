import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
            },
            colors: {
                surface: {
                    DEFAULT: "rgba(15, 15, 25, 1)",
                    card: "rgba(20, 20, 35, 0.8)",
                    hover: "rgba(30, 30, 50, 0.9)",
                },
                accent: {
                    DEFAULT: "#6C5CE7",
                    light: "#A29BFE",
                    glow: "rgba(108, 92, 231, 0.3)",
                },
                neon: {
                    cyan: "#00F5FF",
                    purple: "#BD93F9",
                    pink: "#FF79C6",
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
            animation: {
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
            },
            keyframes: {
                glow: {
                    "0%": { boxShadow: "0 0 5px rgba(108, 92, 231, 0.2), 0 0 20px rgba(108, 92, 231, 0.1)" },
                    "100%": { boxShadow: "0 0 10px rgba(108, 92, 231, 0.4), 0 0 40px rgba(108, 92, 231, 0.2)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
