# Republic Civilization Lab

A viral web app that generates fictional civilizations using Republic Testnet compute. Built with Next.js 14, TypeScript, and TailwindCSS.

## Features

- **Minimal Compute Usage**: Optimized for limited RAI credits
- **Single Inference**: One API call per generation (no unnecessary re-generation)
- **Strict JSON Output**: Structured data to minimize token waste
- **3 Variations Mode**: Optional mode to generate multiple civilizations
- **Dark Futuristic UI**: Minimal, fast-loading interface
- **Export Options**: Copy JSON or download as file
- **Vercel-Ready**: Optimized for instant deployment

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- React Server Components
- No heavy UI libraries

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
/app
  page.tsx                    # Homepage with input form
  layout.tsx                  # Root layout with metadata
  globals.css                 # Global styles and animations
  /api
    /generate
      route.ts                # API endpoint for civilization generation

/components
  CivilizationCard.tsx        # Display civilization results
  LanguageTable.tsx           # Display language samples

/lib
  republic.ts                 # Republic Testnet integration layer

/types
  civilization.ts             # TypeScript type definitions
```

## Civilization JSON Format

Each generated civilization follows this strict structure:

```json
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
```

## Republic Testnet Integration

The project is structured for easy Republic Testnet integration. See `lib/republic.ts` for integration points:

### TODO: Real Integration

1. **Set Environment Variable**:
   ```bash
   REPUBLIC_API_KEY=your_api_key_here
   ```

2. **Update Endpoint**:
   Replace `REPUBLIC_ENDPOINT` in `lib/republic.ts` with the real Republic API URL.

3. **Replace Mock Functions**:
   - `submitJob()`: Replace with real API call to submit compute job
   - `pollJob()`: Replace with real API polling logic
   - Use `buildPrompt()` function for the inference prompt

### Current Implementation

Currently uses a mock generator that:
- Simulates 1.5s compute delay
- Generates deterministic, coherent civilizations
- Returns structured JSON matching the spec
- No infinite polling (max 1 retry)

## API Usage

### POST /api/generate

**Request:**
```json
{
  "theme": "underwater nomads",
  "variations": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "civilization_name": "Zyruntha",
    "origin_world": "Crystal Abyss",
    ...
  }
}
```

**With Variations (costs more compute):**
```json
{
  "theme": "crystal architects",
  "variations": true
}
```

Returns array of 3 civilizations.

## Performance Optimizations

- React Server Components for static content
- Client components only for interactive elements
- Memoized components to prevent unnecessary re-renders
- Minimal bundle size (no heavy dependencies)
- Optimized for Vercel Edge Network

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variable: `REPUBLIC_API_KEY`
4. Deploy

```bash
vercel
```

### Other Platforms

The app is a standard Next.js 14 application and can be deployed to any platform supporting Node.js:

- Netlify
- Railway
- Render
- AWS Amplify

## License

MIT

## Credits

Powered by **KHENZAR** for Republic Testnet
