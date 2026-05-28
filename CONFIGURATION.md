# Configuration Setup Guide

## Overview
The QuizMaker application loads configuration variables directly from a `.env` file at runtime. This eliminates the need for build steps or generation scripts.

## Initial Setup

### 1. Create your `.env` file
Copy the example file to create your own `.env` file:
```bash
cp .env.example .env
```

### 2. Add your API keys
Edit `.env` and add your actual API keys. You can use the `VITE_` prefix (optional) for compatibility with other tools:
```env
GEMINI_KEY=your_gemini_api_key_here
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## How It Works
The `config-loader.js` script fetches the `.env` file from the server root when the page loads, parses the text, and exports a `CONFIG` object.

- **No Node.js required** for runtime configuration.
- **No build steps** or `setup-config.js` execution needed.
- **Automatic parsing** handles both standard and `VITE_` prefixed keys.

## Deployment (GitHub Pages)

### 1. Ensure `.nojekyll` exists
GitHub Pages ignores files starting with a dot (like `.env`) by default. The root of this repository contains a `.nojekyll` file to disable this behavior.

### 2. Secrets Management
Since this is a static site, you must ensure a `.env` file is present in your deployment branch. If you are deploying from a branch manually:
- Include the `.env` file in the branch (be careful not to make it public if the repo is public).

If you are using **GitHub Actions** to deploy (recommended for security):
- The workflow should create the `.env` file from GitHub Secrets before deploying.

## Security Notes
- **Never commit your `.env` file** to a public repository. It is included in `.gitignore` by default.
- Always use restricted API keys (e.g., Supabase anon key, Gemini key with usage limits).
