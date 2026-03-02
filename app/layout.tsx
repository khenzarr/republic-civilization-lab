import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Republic Civilization Lab",
    description:
        "Generate fictional civilizations using Republic Testnet compute. Powered by KHENZAR.",
    openGraph: {
        title: "Republic Civilization Lab",
        description: "Generate fictional civilizations using Republic Testnet compute.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${inter.className}`}>
                {/* Background effects */}
                <div className="bg-grid" />
                <div className="bg-orb-1" />
                <div className="bg-orb-2" />

                {/* Main content */}
                <div className="relative z-10">{children}</div>
            </body>
        </html>
    );
}
