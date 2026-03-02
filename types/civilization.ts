/**
 * Republic Civilization Lab — Type Definitions
 * Strict JSON format for generated civilizations.
 */

export interface SampleWord {
    word: string;
    meaning: string;
}

export interface Civilization {
    civilization_name: string;
    origin_world: string;
    core_philosophy: string;
    social_structure: string;
    economy_model: string;
    ten_sample_words: SampleWord[];
    mythology_summary: string;
    flag_prompt: string;
}

export interface GenerateRequest {
    theme: string;
    variations?: boolean;
}

export interface GenerateResponse {
    success: boolean;
    data: Civilization | Civilization[];
    error?: string;
}
