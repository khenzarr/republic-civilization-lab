/**
 * POST /api/generate
 *
 * Accepts: { theme: string, variations?: boolean }
 * Returns: GenerateResponse with single or array of civilizations
 */

import { NextRequest, NextResponse } from "next/server";
import { submitJob, pollJob } from "@/lib/republic";
import { Civilization, GenerateResponse } from "@/types/civilization";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { theme, variations } = body;

        // Validate theme
        if (!theme || typeof theme !== "string") {
            return NextResponse.json<GenerateResponse>(
                { success: false, data: [] as Civilization[], error: "Theme is required" },
                { status: 400 }
            );
        }

        const trimmedTheme = theme.trim();

        if (trimmedTheme.length === 0 || trimmedTheme.length > 120) {
            return NextResponse.json<GenerateResponse>(
                {
                    success: false,
                    data: [] as Civilization[],
                    error: "Theme must be between 1 and 120 characters",
                },
                { status: 400 }
            );
        }

        // Generate civilization(s)
        if (variations) {
            // Generate 3 variations sequentially (costs more compute)
            const results: Civilization[] = [];

            for (let i = 0; i < 3; i++) {
                const jobId = await submitJob(trimmedTheme, i);
                const result = await pollJob(jobId);
                results.push(result);
            }

            return NextResponse.json<GenerateResponse>({
                success: true,
                data: results,
            });
        } else {
            // Single generation (default, minimal compute)
            const jobId = await submitJob(trimmedTheme);
            const result = await pollJob(jobId);

            return NextResponse.json<GenerateResponse>({
                success: true,
                data: result,
            });
        }
    } catch (error) {
        console.error("Generation error:", error);
        return NextResponse.json<GenerateResponse>(
            {
                success: false,
                data: [] as Civilization[],
                error: "Failed to generate civilization. Please try again.",
            },
            { status: 500 }
        );
    }
}
