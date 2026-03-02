"use client";

import { useState, useCallback } from "react";
import { Civilization, GenerateResponse } from "@/types/civilization";
import { CivilizationCard } from "@/components/CivilizationCard";

export default function HomePage() {
    const [theme, setTheme] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<Civilization[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [variations, setVariations] = useState(false);

    const handleGenerate = useCallback(async () => {
        if (!theme.trim() || loading) return;

        setLoading(true);
        setError(null);
        setResults([]);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ theme: theme.trim(), variations }),
            });

            const data: GenerateResponse = await response.json();

            if (!data.success) {
                setError(data.error || "Generation failed");
                return;
            }

            if (Array.isArray(data.data)) {
                setResults(data.data);
            } else {
                setResults([data.data]);
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [theme, loading, variations]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleGenerate();
            }
        },
        [handleGenerate]
    );

    return (
        <main className="mx-auto min-h-screen max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <header className="mb-12 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent-light">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-light opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                    Republic Testnet
                </div>
                <h1 className="mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                    Civilization Lab
                </h1>
                <p className="mx-auto max-w-lg text-base text-gray-400 sm:text-lg">
                    Generate unique fictional civilizations with language, mythology, and
                    culture — powered by decentralized compute.
                </p>
            </header>

            {/* Input Section */}
            <section className="mx-auto mb-12 max-w-2xl">
                <div className="rounded-2xl border border-white/10 bg-surface-card p-6 backdrop-blur-xl">
                    {/* Theme Input */}
                    <div className="mb-4">
                        <label
                            htmlFor="theme-input"
                            className="mb-2 block text-sm font-medium text-gray-400"
                        >
                            Civilization Theme
                        </label>
                        <input
                            id="theme-input"
                            type="text"
                            value={theme}
                            onChange={(e) => setTheme(e.target.value.slice(0, 120))}
                            onKeyDown={handleKeyDown}
                            placeholder="e.g., underwater nomads, crystal architects, void wanderers..."
                            maxLength={120}
                            disabled={loading}
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 outline-none transition-all focus:border-accent/50 focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
                        />
                        <div className="mt-1.5 flex justify-between text-xs text-gray-600">
                            <span>Press Enter to generate</span>
                            <span
                                className={
                                    theme.length > 100 ? "text-neon-pink" : ""
                                }
                            >
                                {theme.length}/120
                            </span>
                        </div>
                    </div>

                    {/* Variation Toggle */}
                    <div className="mb-5 flex items-center gap-3">
                        <button
                            type="button"
                            role="switch"
                            aria-checked={variations}
                            onClick={() => setVariations(!variations)}
                            disabled={loading}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-50 ${variations ? "bg-accent" : "bg-white/10"
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 rounded-full bg-white shadow-lg transition-transform duration-200 ${variations ? "translate-x-5" : "translate-x-0.5"
                                    }`}
                            />
                        </button>
                        <span className="text-sm text-gray-400">
                            Generate 3 Variations{" "}
                            <span className="text-xs text-gray-600">
                                (costs more compute)
                            </span>
                        </span>
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={handleGenerate}
                        disabled={loading || !theme.trim()}
                        className="btn-glow relative w-full rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 hover:shadow-accent/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="h-4 w-4 animate-spin"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                <span>
                                    Republic compute running
                                    <span className="loading-dots" />
                                </span>
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                                Generate Civilization
                            </span>
                        )}
                    </button>
                </div>
            </section>

            {/* Error Display */}
            {error && (
                <div className="mx-auto mb-8 max-w-2xl rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-center text-sm text-red-400">
                    {error}
                </div>
            )}

            {/* Results */}
            {results.length > 0 && (
                <section className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                            {results.length > 1
                                ? `${results.length} Civilizations Generated`
                                : "Civilization Generated"}
                        </h2>
                    </div>
                    {results.map((civ, index) => (
                        <CivilizationCard
                            key={`${civ.civilization_name}-${index}`}
                            civilization={civ}
                            index={results.length > 1 ? index : undefined}
                        />
                    ))}
                </section>
            )}

            {/* Footer */}
            <footer className="mt-16 pb-8 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 text-xs text-gray-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
                    Powered by{" "}
                    <span className="font-semibold text-accent-light">KHENZAR</span> for
                    Republic Testnet
                </div>
            </footer>
        </main>
    );
}
