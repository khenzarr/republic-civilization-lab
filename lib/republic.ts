/**
 * Republic Integration Layer
 *
 * This module handles communication with the Republic Testnet compute network.
 * Currently uses a mock generator for development/testing.
 *
 * // TODO: Replace mock functions with real Republic Testnet SDK calls
 * // TODO: Add Republic API key via environment variable: REPUBLIC_API_KEY
 * // TODO: Replace endpoint URL with real Republic Testnet endpoint
 */

import { Civilization } from "@/types/civilization";

// TODO: Replace with real Republic Testnet endpoint
const REPUBLIC_ENDPOINT = "https://api.republic.ai/v1/compute";

// TODO: Set via environment variable
const REPUBLIC_API_KEY = process.env.REPUBLIC_API_KEY || "mock-key";

/**
 * In-memory store for mock job results.
 * // TODO: Remove when integrating real Republic API
 */
const jobStore = new Map<string, { status: string; result: Civilization | null }>();

/**
 * Generate a simple deterministic hash from a string seed.
 */
function hashSeed(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return Math.abs(hash);
}

/**
 * Pick an item from an array using a seeded index.
 */
function pick<T>(arr: T[], seed: number, offset: number = 0): T {
    return arr[(seed + offset) % arr.length];
}

/**
 * Mock civilization generator.
 * Produces deterministic, coherent civilization data from a theme string.
 *
 * // TODO: Replace this entire function with real Republic compute call
 * // The real implementation should send the prompt to Republic's inference API
 * // and receive structured JSON back.
 */
function generateMockCivilization(theme: string, variationIndex: number = 0): Civilization {
    const seed = hashSeed(theme) + variationIndex * 7919;

    const prefixes = ["Zyr", "Vex", "Kor", "Ael", "Nyx", "Thu", "Orn", "Sel", "Dra", "Fen"];
    const suffixes = ["antha", "orim", "alis", "undra", "heim", "oria", "enth", "ivos", "arux", "elum"];
    const worlds = [
        "Obsidian Nebula", "Crystal Abyss", "Ember Frontier", "Frozen Lattice",
        "Verdant Rift", "Hollow Shard", "Eclipsed Meridian", "Starfall Basin",
        "Ashen Plateau", "Luminous Drift"
    ];
    const philosophies = [
        "Harmony through collective resonance", "Strength through adaptive solitude",
        "Wisdom distilled from entropy", "Unity in fractal diversity",
        "Progress through controlled chaos", "Balance between silence and storm",
        "Enlightenment via perpetual inquiry", "Resilience forged in cosmic drift",
        "Peace through symmetric exchange", "Growth rooted in ancestral echoes"
    ];
    const structures = [
        "Council of Elders with rotating stewardship",
        "Meritocratic guild federation",
        "Decentralized autonomous communes",
        "Hierarchical crystal caste system",
        "Nomadic tribal democracy",
        "Symbiotic hive consensus",
        "Theocratic knowledge oligarchy",
        "Egalitarian mesh network society",
        "Warrior-scholar dual governance",
        "Cyclic matriarchal succession"
    ];
    const economies = [
        "Energy-credit barter system", "Reputation-based token economy",
        "Resource-sharing commons", "Quantum labor exchange",
        "Gift economy with honor ledger", "Algorithmic resource distribution",
        "Crystal-backed currency standard", "Time-banked mutual aid",
        "Symbiotic trade symbiosis", "Artifact-mining export economy"
    ];

    const civName = pick(prefixes, seed, 0) + pick(suffixes, seed, 3);

    const wordBases = [
        ["kren", "fire"], ["vosh", "water"], ["thal", "earth"], ["ziri", "sky"],
        ["moku", "life"], ["fael", "death"], ["orna", "light"], ["shev", "shadow"],
        ["luma", "truth"], ["drek", "war"], ["pael", "peace"], ["yun", "time"],
        ["xari", "knowledge"], ["bren", "strength"], ["quol", "dream"],
        ["neth", "home"], ["sera", "star"], ["ghul", "spirit"], ["tosk", "bond"],
        ["velm", "change"]
    ];

    const selectedWords = [];
    for (let i = 0; i < 10; i++) {
        const idx = (seed + i * 3 + variationIndex) % wordBases.length;
        const suffix = pick(["a", "ix", "on", "ur", "em", "is", "al"], seed, i);
        selectedWords.push({
            word: wordBases[idx][0] + suffix,
            meaning: wordBases[idx][1],
        });
    }

    const mythFragments = [
        `In the age before memory, the first ${civName} emerged from the ${pick(worlds, seed, 7).toLowerCase()}, carrying fragments of a shattered god.`,
        `Their ancestors discovered the Resonance — a cosmic frequency binding all matter — and built their civilization upon its harmony.`,
        `Legend says the Great Convergence will reunite the scattered shards, restoring the original world that ${civName} once called home.`,
        `The Weavers of ${pick(worlds, seed, 2)} sang the first laws into existence, and their echoes still guide every decision made in council.`,
        `When the twin moons aligned, the founders of ${civName} received the Codex of Infinite Patterns from the void between stars.`,
    ];

    const mythology = pick(mythFragments, seed, 1) + " " + pick(mythFragments, seed, 4);

    // Truncate mythology to ~120 words
    const mythWords = mythology.split(" ");
    const trimmedMyth = mythWords.length > 120 ? mythWords.slice(0, 120).join(" ") + "..." : mythology;

    const flagStyles = [
        "geometric", "organic", "crystalline", "celestial", "tribal", "minimalist"
    ];
    const flagColors = [
        "deep indigo and silver", "crimson and obsidian", "emerald and gold",
        "arctic blue and white", "violet and copper", "midnight black and neon cyan"
    ];

    return {
        civilization_name: civName,
        origin_world: pick(worlds, seed, 1),
        core_philosophy: pick(philosophies, seed, 2),
        social_structure: pick(structures, seed, 5),
        economy_model: pick(economies, seed, 4),
        ten_sample_words: selectedWords,
        mythology_summary: trimmedMyth,
        flag_prompt: `A ${pick(flagStyles, seed, 6)} flag design in ${pick(flagColors, seed, 8)}, featuring symbols of ${theme.toLowerCase()}, suitable for a ${civName} civilization.`,
    };
}

/**
 * Submit a compute job to Republic Testnet.
 *
 * // TODO: Replace with real Republic API call:
 * // const response = await fetch(REPUBLIC_ENDPOINT, {
 * //   method: 'POST',
 * //   headers: {
 * //     'Authorization': `Bearer ${REPUBLIC_API_KEY}`,
 * //     'Content-Type': 'application/json',
 * //   },
 * //   body: JSON.stringify({
 * //     model: 'republic-inference-v1',
 * //     prompt: buildPrompt(theme),
 * //     max_tokens: 800,
 * //     temperature: 0.7,
 * //     response_format: { type: 'json_object' },
 * //   }),
 * // });
 * // const data = await response.json();
 * // return data.job_id;
 */
export async function submitJob(theme: string, variationIndex: number = 0): Promise<string> {
    // Simulate network delay (1.5 seconds as specified)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const result = generateMockCivilization(theme, variationIndex);

    jobStore.set(jobId, { status: "completed", result });

    return jobId;
}

/**
 * Poll a compute job for results.
 * Max 1 retry as per spec — no infinite polling.
 *
 * // TODO: Replace with real Republic API poll:
 * // const response = await fetch(`${REPUBLIC_ENDPOINT}/jobs/${jobId}`, {
 * //   headers: { 'Authorization': `Bearer ${REPUBLIC_API_KEY}` },
 * // });
 * // const data = await response.json();
 * // if (data.status === 'completed') return data.result;
 * // throw new Error('Job not completed');
 */
export async function pollJob(jobId: string): Promise<Civilization> {
    const job = jobStore.get(jobId);

    if (!job) {
        throw new Error(`Job ${jobId} not found`);
    }

    if (job.status === "completed" && job.result) {
        // Clean up job from store after retrieval
        const result = job.result;
        jobStore.delete(jobId);
        return result;
    }

    // One retry after 500ms
    await new Promise((resolve) => setTimeout(resolve, 500));
    const retryJob = jobStore.get(jobId);

    if (retryJob?.status === "completed" && retryJob.result) {
        const result = retryJob.result;
        jobStore.delete(jobId);
        return result;
    }

    throw new Error(`Job ${jobId} failed to complete after retry`);
}

/**
 * Build the prompt that would be sent to Republic compute.
 * Kept here for reference when real integration is done.
 *
 * // TODO: Use this prompt with the real Republic API
 */
export function buildPrompt(theme: string): string {
    return `Generate a fictional civilization based on the theme: "${theme}".

Return ONLY valid JSON with this exact structure:
{
  "civilization_name": "string",
  "origin_world": "string",
  "core_philosophy": "string",
  "social_structure": "string",
  "economy_model": "string",
  "ten_sample_words": [
    { "word": "string", "meaning": "string" }
  ],
  "mythology_summary": "string (max 120 words)",
  "flag_prompt": "string"
}

Rules:
- Exactly 10 sample words
- Mythology max 120 words
- All fields required
- Creative but concise
- Internally coherent
- No markdown, no explanation
- Return valid JSON only`;
}
