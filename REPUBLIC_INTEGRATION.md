# Republic Testnet Integration Guide

This guide explains how to integrate the real Republic Testnet compute API into the Civilization Lab.

## Current Status

The project currently uses a **mock generator** that simulates Republic compute behavior. All integration points are clearly marked with `// TODO:` comments in the code.

## Integration Steps

### 1. Get Republic API Credentials

1. Sign up for Republic Testnet access
2. Obtain your API key
3. Note the API endpoint URL

### 2. Set Environment Variable

Create a `.env.local` file in the project root:

```bash
REPUBLIC_API_KEY=your_actual_api_key_here
```

**Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

### 3. Update `lib/republic.ts`

Replace the mock implementation with real API calls:

#### Update Endpoint

```typescript
// Replace this:
const REPUBLIC_ENDPOINT = "https://api.republic.ai/v1/compute";

// With the real endpoint:
const REPUBLIC_ENDPOINT = "https://actual-republic-endpoint.com/v1/inference";
```

#### Update API Key

```typescript
// This already reads from environment:
const REPUBLIC_API_KEY = process.env.REPUBLIC_API_KEY || "mock-key";
```

#### Replace `submitJob()` Function

```typescript
export async function submitJob(theme: string, variationIndex: number = 0): Promise<string> {
    const prompt = buildPrompt(theme);
    
    const response = await fetch(REPUBLIC_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${REPUBLIC_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'republic-inference-v1', // Use actual model name
            prompt: prompt,
            max_tokens: 800,
            temperature: 0.7,
            response_format: { type: 'json_object' },
        }),
    });

    if (!response.ok) {
        throw new Error(`Republic API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.job_id; // Adjust based on actual response structure
}
```

#### Replace `pollJob()` Function

```typescript
export async function pollJob(jobId: string): Promise<Civilization> {
    // Initial poll
    let response = await fetch(`${REPUBLIC_ENDPOINT}/jobs/${jobId}`, {
        headers: {
            'Authorization': `Bearer ${REPUBLIC_API_KEY}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to poll job ${jobId}`);
    }

    let data = await response.json();

    // If completed, return result
    if (data.status === 'completed') {
        return JSON.parse(data.result) as Civilization;
    }

    // One retry after 500ms (as per spec: max 1 retry)
    await new Promise((resolve) => setTimeout(resolve, 500));

    response = await fetch(`${REPUBLIC_ENDPOINT}/jobs/${jobId}`, {
        headers: {
            'Authorization': `Bearer ${REPUBLIC_API_KEY}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to poll job ${jobId} on retry`);
    }

    data = await response.json();

    if (data.status === 'completed') {
        return JSON.parse(data.result) as Civilization;
    }

    throw new Error(`Job ${jobId} failed to complete after retry`);
}
```

#### Remove Mock Code

Delete these mock-only sections:
- `jobStore` Map
- `hashSeed()` function
- `pick()` function
- `generateMockCivilization()` function

### 4. Test Integration

#### Local Testing

```bash
# Set environment variable
export REPUBLIC_API_KEY=your_key_here

# Run dev server
npm run dev

# Test generation
# Visit http://localhost:3000
# Enter a theme and click "Generate Civilization"
```

#### Verify API Calls

Check your terminal/console for:
- Successful API requests
- Proper JSON responses
- No errors in the network tab

### 5. Deploy with Environment Variable

#### Vercel

```bash
vercel env add REPUBLIC_API_KEY
# Paste your API key when prompted

vercel --prod
```

Or via Vercel Dashboard:
1. Go to Project Settings
2. Environment Variables
3. Add `REPUBLIC_API_KEY`
4. Redeploy

## API Response Format

Ensure Republic API returns JSON matching this structure:

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
  "mythology_summary": "string",
  "flag_prompt": "string"
}
```

If the API returns a different format, add a transformation layer in `pollJob()`.

## Prompt Engineering

The `buildPrompt()` function is already optimized for:
- Strict JSON output
- Token efficiency
- Coherent results
- No markdown or extra text

Adjust the prompt if needed based on Republic model behavior.

## Error Handling

The current implementation handles:
- Invalid API keys (401)
- Network errors
- Timeout errors
- Malformed JSON responses

Add additional error handling as needed for Republic-specific errors.

## Cost Optimization

Current optimizations:
- Single inference per request (default mode)
- Max 800 tokens per generation
- No infinite polling (max 1 retry)
- Optional 3-variation mode (user must enable)

Monitor your RAI credit usage and adjust `max_tokens` if needed.

## Testing Checklist

- [ ] API key is set correctly
- [ ] Endpoint URL is correct
- [ ] Single generation works
- [ ] 3-variation mode works
- [ ] Error handling works (test with invalid key)
- [ ] JSON parsing works
- [ ] No console errors
- [ ] Build succeeds: `npm run build`
- [ ] Production deployment works

## Troubleshooting

### "Job not found" Error

- Check if `job_id` field name matches Republic API response
- Verify polling endpoint URL

### JSON Parse Error

- Ensure Republic returns valid JSON
- Check for markdown formatting in response
- Add JSON cleaning logic if needed

### Timeout Issues

- Increase retry delay from 500ms if needed
- Add more retry attempts (but stay minimal per spec)

### Rate Limiting

- Add exponential backoff if hitting rate limits
- Consider caching results (optional)

## Support

For Republic Testnet API issues:
- Check Republic documentation
- Contact Republic support
- Review API status page

For app issues:
- Check GitHub issues
- Review deployment logs
- Test locally first
