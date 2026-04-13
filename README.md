# The 7 Energies of the Soul — Quiz App

A production-ready, mobile-first personality quiz built with Next.js.
Hosted on Vercel, embeddable via iframe in Kajabi, integrated with Kit (ConvertKit).

## Quick Start

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Open .env.local and fill in your real Kit API key and Form ID

# 3. Start the development server
npm run dev

# 4. Open http://localhost:3000
```

### Deploy to Vercel

#### Option A — Vercel CLI (fastest)

```bash
# Install Vercel CLI globally (one-time)
npm install -g vercel

# From the project root:
vercel

# Follow the prompts:
# - Link to your Vercel account
# - Set project name (e.g. soul-quiz)
# - Framework: Next.js (auto-detected)

# Add environment variables:
vercel env add KIT_API_KEY
# paste your Kit API key when prompted

vercel env add KIT_FORM_ID
# paste your Kit Form ID when prompted

# Deploy to production:
vercel --prod
```

#### Option B — GitHub + Vercel Dashboard

1. Push this project to a GitHub repository
2. Go to https://vercel.com/new
3. Import your GitHub repo
4. Under **Environment Variables**, add:
   - `KIT_API_KEY` = `your_kit_api_key_here`
   - `KIT_FORM_ID` = `your_form_id_here`
5. Click **Deploy**

Vercel auto-detects Next.js. No extra build configuration needed.

---

## Embed in Kajabi

Once deployed (e.g. `https://soul-quiz.vercel.app`), paste this into any Kajabi page's HTML block:

```html
<iframe
  src="https://YOUR-VERCEL-URL.vercel.app"
  width="100%"
  style="border: none; min-height: 700px;"
  scrolling="yes"
  title="7 Energies Soul Quiz"
></iframe>
```

For a fully responsive auto-resizing iframe, add this script after the iframe tag:

```html
<script>
  window.addEventListener('message', function(e) {
    var iframe = document.querySelector('iframe[title="7 Energies Soul Quiz"]');
    if (iframe && e.data && e.data.type === 'resize') {
      iframe.style.height = e.data.height + 'px';
    }
  });
</script>
```

---

## Kit (ConvertKit) Integration

The app sends subscriber data to Kit via a secure serverless function at `/api/subscribe`.

Each subscriber receives:
- **First name** and **email**
- **Custom field**: `soul_energy_type` (e.g. `creator`, `healer`, `warrior`)
- **Tags**: `soul-quiz` and `energy-type-{type}` (e.g. `energy-type-master`)

You can use these tags in Kit to trigger automations, send type-specific email sequences, or segment your audience.

---

## Project Structure

```
soul-quiz/
├── pages/
│   ├── _app.js          # Global CSS import
│   ├── _document.js     # Custom HTML head (fonts, meta)
│   ├── index.js         # Main quiz app (all stages)
│   └── api/
│       └── subscribe.js # Secure Kit API route
├── lib/
│   └── quizData.js      # All 28 questions, scoring logic, result descriptions
├── styles/
│   └── globals.css      # Full design system
├── public/              # Static assets
├── .env.example         # Safe-to-commit template — copy to .env.local and fill in your keys
├── next.config.js
├── vercel.json          # iframe-friendly CORS headers
└── package.json
```

---

## Customization

### Updating the Kit form or API key
Copy `.env.example` to `.env.local`, fill in your real values, and do not commit `.env.local`. For production, update the environment variables in your Vercel project dashboard under Settings → Environment Variables.

### Updating the CTA link on results page
In `pages/index.js`, search for `meditationschool.com` and replace with your target URL.

### Adding/editing questions
Edit `lib/quizData.js`. Each question has:
- `type`: `"single"` or `"multi"`
- `maxSelect` / `minSelect`: for multi-select questions
- `options`: array of `{ text, scores: { energyType: points } }`

### Updating result descriptions
Edit the `RESULTS` object in `lib/quizData.js`.
