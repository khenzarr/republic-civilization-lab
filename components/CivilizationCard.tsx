"use client";

import { memo, useCallback } from "react";
import { Civilization } from "@/types/civilization";
import { LanguageTable } from "./LanguageTable";

interface CivilizationCardProps {
    civilization: Civilization;
    index?: number;
}

function CivilizationCardComponent({ civilization, index }: CivilizationCardProps) {
    const jsonString = JSON.stringify(civilization, null, 2);

    const handleCopyJSON = useCallback(() => {
        navigator.clipboard.writeText(jsonString).then(() => {
            const btn = document.getElementById(`copy-btn-${index ?? 0}`);
            if (btn) {
                btn.textContent = "Copied!";
                setTimeout(() => {
                    btn.textContent = "Copy JSON";
                }, 2000);
            }
        });
    }, [jsonString, index]);

    const handleDownloadJSON = useCallback(() => {
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${civilization.civilization_name.toLowerCase().replace(/\s+/g, "-")}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [jsonString, civilization.civilization_name]);

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface-card backdrop-blur-xl transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_40px_rgba(108,92,231,0.15)]">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-neon-cyan/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative p-6 md:p-8">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        {index !== undefined && (
                            <span className="mb-2 inline-block rounded-full bg-accent/20 px-3 py-0.5 text-xs font-medium text-accent-light">
                                Variation {index + 1}
                            </span>
                        )}
                        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                            {civilization.civilization_name}
                        </h2>
                        <p className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                            <svg className="h-4 w-4 text-neon-cyan/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {civilization.origin_world}
                        </p>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="mb-6 grid gap-4 md:grid-cols-3">
                    <InfoBlock
                        label="Core Philosophy"
                        value={civilization.core_philosophy}
                        icon={
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        }
                    />
                    <InfoBlock
                        label="Social Structure"
                        value={civilization.social_structure}
                        icon={
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        }
                    />
                    <InfoBlock
                        label="Economy Model"
                        value={civilization.economy_model}
                        icon={
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                    />
                </div>

                {/* Language Section */}
                <div className="mb-6">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
                        <svg className="h-4 w-4 text-neon-purple/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        Language Sample
                    </h3>
                    <LanguageTable words={civilization.ten_sample_words} />
                </div>

                {/* Mythology */}
                <div className="mb-6">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
                        <svg className="h-4 w-4 text-neon-pink/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Mythology
                    </h3>
                    <p className="leading-relaxed text-gray-300">
                        {civilization.mythology_summary}
                    </p>
                </div>

                {/* Flag Prompt */}
                <div className="mb-6">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
                        <svg className="h-4 w-4 text-accent-light/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                        </svg>
                        Flag Prompt
                    </h3>
                    <p className="rounded-lg bg-white/5 p-3 text-sm italic text-gray-400">
                        {civilization.flag_prompt}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                    <button
                        id={`copy-btn-${index ?? 0}`}
                        onClick={handleCopyJSON}
                        className="group/btn flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:border-accent/40 hover:bg-accent/10 hover:text-white"
                    >
                        <svg className="h-4 w-4 transition-transform group-hover/btn:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy JSON
                    </button>
                    <button
                        onClick={handleDownloadJSON}
                        className="group/btn flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:border-neon-cyan/40 hover:bg-neon-cyan/10 hover:text-white"
                    >
                        <svg className="h-4 w-4 transition-transform group-hover/btn:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download JSON
                    </button>
                </div>
            </div>
        </div>
    );
}

/** Reusable info block sub-component */
function InfoBlock({
    label,
    value,
    icon,
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {icon}
                {label}
            </div>
            <p className="text-sm leading-relaxed text-gray-300">{value}</p>
        </div>
    );
}

export const CivilizationCard = memo(CivilizationCardComponent);
