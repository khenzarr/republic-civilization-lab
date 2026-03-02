# Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts and your app will be live!

### Option 2: Deploy via GitHub

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/republic-civilization-lab.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Add environment variable (optional for now):
   - Key: `REPUBLIC_API_KEY`
   - Value: `your_api_key_here`
7. Click "Deploy"

### Option 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/republic-civilization-lab)

## Environment Variables

When you integrate with real Republic Testnet:

```
REPUBLIC_API_KEY=your_actual_api_key
```

Add this in:
- Vercel Dashboard → Project Settings → Environment Variables
- Or via CLI: `vercel env add REPUBLIC_API_KEY`

## Post-Deployment

After deployment, your app will be available at:
```
https://your-project-name.vercel.app
```

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Performance Tips

- Vercel automatically optimizes Next.js apps
- Edge Network ensures fast global delivery
- Automatic HTTPS and CDN
- Zero-config deployment

## Monitoring

View deployment logs and analytics in Vercel Dashboard:
- Real-time logs
- Performance metrics
- Error tracking

## Troubleshooting

### Build Fails

Check build logs in Vercel dashboard. Common issues:
- Missing dependencies: Run `npm install` locally first
- TypeScript errors: Run `npm run build` locally to catch errors
- Environment variables: Ensure they're set in Vercel

### API Route Issues

- Verify API routes work locally: `npm run dev`
- Check function logs in Vercel dashboard
- Ensure serverless function timeout is sufficient (default: 10s)

## Alternative Platforms

### Netlify

```bash
npm run build
netlify deploy --prod
```

### Railway

```bash
railway login
railway init
railway up
```

### Docker (Self-hosted)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t republic-civilization-lab .
docker run -p 3000:3000 republic-civilization-lab
```
