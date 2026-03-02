# Republic Civilization Lab

[![Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://republic-civilization-lab.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

**Republic Civilization Lab** is a structured AI civilization generator designed to run inference workloads on the Republic Testnet. Generate unique fictional civilizations with language, mythology, culture, and social structures — powered by decentralized compute.

> 🚧 This is a preview demo — compute layer is currently mocked. Real Republic API integration coming soon.

## 🌐 Demo

- **Live Demo**: https://republic-civilization-lab.vercel.app
- **GitHub Repo**: https://github.com/khenzarr/republic-civilization-lab

## 📷 Screenshots

![Republic Civilization Lab UI](assets/demo-placeholder.gif)
*Dark futuristic interface with animated backgrounds and real-time generation*

## ⚡ Features

### Current Features
- ✅ **Dark Futuristic UI** - Animated backgrounds, gradient orbs, smooth transitions
- ✅ **Theme Input** - 1-120 character validation with real-time feedback
- ✅ **Single Generation Mode** - Minimal compute usage (default)
- ✅ **3 Variations Mode** - Generate multiple civilizations (optional, compute-heavy)
- ✅ **Structured JSON Output** - Strict 8-field format for consistency
- ✅ **Export Functionality** - Copy to clipboard or download as JSON file
- ✅ **Error Handling** - Comprehensive validation and user feedback
- ✅ **Loading States** - Visual feedback during generation
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **REST Abstraction** - Ready for Republic Testnet integration

### Civilization Data Structure
Each generated civilization includes:
- Civilization name
- Origin world
- Core philosophy
- Social structure
- Economy model
- 10 sample words with meanings
- Mythology summary (max 120 words)
- Flag design prompt

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 3.4
- **Architecture**: React Server Components
- **Deployment**: Vercel-optimized
- **Bundle Size**: 91.5 kB (First Load)

## 🚀 Installation & Deployment

### Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Visit http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or use the one-click deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/khenzarr/republic-civilization-lab)

## 📁 Project Structure

```
republic-civilization-lab/
├── app/
│   ├── api/generate/route.ts     # API endpoint for civilization generation
│   ├── page.tsx                  # Homepage with input form
│   ├── layout.tsx                # Root layout with metadata
│   └── globals.css               # Global styles and animations
├── components/
│   ├── CivilizationCard.tsx      # Display civilization results
│   └── LanguageTable.tsx         # Display language samples
├── lib/
│   └── republic.ts               # Republic Testnet integration layer
├── types/
│   └── civilization.ts           # TypeScript type definitions
└── docs/
    ├── DEPLOYMENT.md             # Deployment guides
    ├── REPUBLIC_INTEGRATION.md   # API integration guide
    └── CONTRIBUTING.md           # Contribution guidelines
```

## 🧠 Republic Testnet Integration

### Current Status
The project uses a **mock generator** for preview purposes. All integration points are clearly marked with `// TODO:` comments in `lib/republic.ts`.

### Integration Steps

1. **Set Environment Variable**:
   ```bash
   REPUBLIC_API_KEY=your_api_key_here
   ```

2. **Update Endpoint**:
   Replace `REPUBLIC_ENDPOINT` in `lib/republic.ts` with the real Republic API URL.

3. **Replace Mock Functions**:
   - `submitJob()`: Real API call to submit compute job
   - `pollJob()`: Real API polling logic
   - Use `buildPrompt()` function for inference prompt

See [REPUBLIC_INTEGRATION.md](REPUBLIC_INTEGRATION.md) for detailed integration guide.

### Mock Implementation Features
- Simulates 1.5s compute delay
- Generates deterministic, coherent civilizations
- Returns structured JSON matching spec
- No infinite polling (max 1 retry)
- Optimized for minimal token usage

## 🔌 API Usage

### POST /api/generate

**Single Generation (Default)**
```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"theme": "underwater nomads", "variations": false}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "civilization_name": "Zyruntha",
    "origin_world": "Crystal Abyss",
    "core_philosophy": "Harmony through collective resonance",
    "social_structure": "Council of Elders with rotating stewardship",
    "economy_model": "Energy-credit barter system",
    "ten_sample_words": [
      { "word": "krena", "meaning": "fire" },
      ...
    ],
    "mythology_summary": "In the age before memory...",
    "flag_prompt": "A geometric flag design in deep indigo and silver..."
  }
}
```

**3 Variations Mode (Compute-Heavy)**
```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"theme": "crystal architects", "variations": true}'
```

Returns array of 3 civilizations.

## 🎯 Planned Next Steps

- [ ] **Real Republic API Integration** - Connect to Republic Testnet inference endpoint
- [ ] **Multi-Step Simulation** - Evolve civilizations over time periods
- [ ] **Deterministic Seeds** - Shareable civilization links with reproducible results
- [ ] **Civilization Evolution** - Track changes across generations
- [ ] **Advanced Language Generation** - Expanded vocabulary and grammar rules
- [ ] **Mythology Expansion** - Deeper lore and interconnected stories
- [ ] **Visual Flag Generator** - AI-generated flag images from prompts
- [ ] **Civilization Comparison** - Side-by-side analysis tool
- [ ] **Export Formats** - PDF, Markdown, and structured data exports
- [ ] **Community Gallery** - Share and discover civilizations

## ⚡ Performance

- **Build Time**: ~10 seconds
- **First Load JS**: 91.5 kB
- **Dev Server**: Ready in ~3 seconds
- **Generation Time**: ~1.5 seconds (mock) / TBD (real API)
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Built by**: [KHENZAR](https://github.com/khenzarr)
- **Powered by**: Republic Testnet
- **Framework**: Next.js by Vercel
- **Inspiration**: Procedural generation and decentralized compute

## 📞 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/khenzarr/republic-civilization-lab/issues)
- **Discussions**: [Join the conversation](https://github.com/khenzarr/republic-civilization-lab/discussions)
- **Twitter**: [@khenzarr](https://twitter.com/khenzarr) (if applicable)

---

**⭐ Star this repo if you find it useful!**

Made with ❤️ for the Republic Testnet community
