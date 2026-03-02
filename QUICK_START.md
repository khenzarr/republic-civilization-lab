# Quick Start Guide

## 🚀 Get Running in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Visit: http://localhost:3000

That's it! The app is now running with mock data.

---

## 🎯 Try It Out

1. Enter a theme (e.g., "underwater nomads", "crystal architects")
2. Click "Generate Civilization"
3. Wait ~1.5 seconds for the result
4. Copy or download the JSON

### Enable 3 Variations
- Toggle the switch before generating
- Generates 3 different civilizations
- Takes ~4.5 seconds (3x compute)

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 🚢 Deploy to Vercel

### Fastest Way
```bash
npm i -g vercel
vercel
```

### Via GitHub
1. Push to GitHub
2. Import in Vercel
3. Deploy (auto-detected)

---

## 🔧 Integrate Real Republic API

See `REPUBLIC_INTEGRATION.md` for detailed steps.

**Quick version:**
1. Get Republic API key
2. Create `.env.local`:
   ```
   REPUBLIC_API_KEY=your_key_here
   ```
3. Update `lib/republic.ts` (follow TODO comments)
4. Test locally
5. Deploy with environment variable

---

## 📚 Documentation

- **README.md** - Full project overview
- **DEPLOYMENT.md** - Deployment guides for all platforms
- **REPUBLIC_INTEGRATION.md** - Step-by-step API integration
- **PROJECT_SUMMARY.md** - Complete feature checklist

---

## ✅ Verification Checklist

- [x] Project builds without errors
- [x] No TypeScript errors
- [x] No ESLint warnings
- [x] Dev server runs on port 3000
- [x] Mock generator works
- [x] UI renders correctly
- [x] JSON export works
- [x] Download works
- [x] Variations mode works
- [x] Ready for Vercel deployment

---

## 🆘 Troubleshooting

### Port 3000 Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 🎨 Customize

### Change Colors
Edit `tailwind.config.ts` → `theme.extend.colors`

### Modify UI
- Homepage: `app/page.tsx`
- Card: `components/CivilizationCard.tsx`
- Styles: `app/globals.css`

### Adjust Generation
- Logic: `lib/republic.ts`
- Types: `types/civilization.ts`
- API: `app/api/generate/route.ts`

---

## 📊 Project Stats

- **Build Time**: ~10 seconds
- **Bundle Size**: 91.5 kB (First Load)
- **Dependencies**: 5 production, 8 dev
- **Files**: ~15 source files
- **Lines of Code**: ~1,200

---

**Ready to go!** 🎉

Start with `npm run dev` and visit http://localhost:3000
