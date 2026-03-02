"use client";

import { memo } from "react";
import { SampleWord } from "@/types/civilization";

interface LanguageTableProps {
    words: SampleWord[];
}

function LanguageTableComponent({ words }: LanguageTableProps) {
    return (
        <div className="overflow-hidden rounded-lg border border-white/10">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-white/5">
                        <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-neon-cyan/80">
                            Word
                        </th>
                        <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-neon-cyan/80">
                            Meaning
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {words.map((entry, index) => (
                        <tr
                            key={index}
                            className="transition-colors hover:bg-white/[0.03]"
                        >
                            <td className="px-4 py-2 font-mono text-neon-purple">
                                {entry.word}
                            </td>
                            <td className="px-4 py-2 text-gray-300">{entry.meaning}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export const LanguageTable = memo(LanguageTableComponent);
