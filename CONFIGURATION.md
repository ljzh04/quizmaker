# Configuration Setup Guide

## Overview
The QuizMaker application loads configuration from a generated `config.js` file when deployed, and falls back to `.env` for local development.

## Initial Setup

### 1. Create your `.env` file
Copy the example file to create your own `.env` file:
```bash
cp .env.example .env
```

### 2. Add your API keys
Edit `.env` and add your local API keys. You can use the `VITE_` prefix (optional) for compatibility with other tools:
```env
GEMINI_KEY=your_gemini_api_key_here
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## How It Works
The `config-loader.js` script first tries to import `config.js` from the site root. If that file is missing, it falls back to reading `.env` for local testing.

- **No Node.js required** for runtime configuration.
- **No build steps** are needed for the browser app.
- **Automatic parsing** still handles both standard and `VITE_` prefixed keys in local `.env` files.

## Deployment (GitHub Pages)

### 1. Set repository settings
In GitHub repository settings, add:
- `SUPABASE_URL` as a repository variable.
- `GEMINI_KEY` as a secret.
- `SUPABASE_ANON_KEY` as a secret.

### 2. Let the workflow generate config.js
The GitHub Actions workflow writes `config.js` from those settings and deploys the static site to the `gh-pages` branch automatically.

### 3. Ensure Pages is pointed at the deployment branch
Set GitHub Pages to deploy from the `gh-pages` branch root.

## Security Notes
- **Never commit your `.env` file** to a public repository. It is included in `.gitignore` by default.
- Always use restricted API keys (e.g., Supabase anon key, Gemini key with usage limits).
