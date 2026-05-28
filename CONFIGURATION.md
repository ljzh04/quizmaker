# Configuration Setup Guide

## Overview
The QuizMaker application now uses `.env` for configuration management instead of `config.js`. This provides better security and flexibility.

## Initial Setup

### 1. Create your `.env` file
Copy the example file to create your own `.env` file:
```bash
cp .env.example .env
```

### 2. Add your API keys
Edit `.env` and add your actual API keys:
```env
VITE_GEMINI_KEY=your_gemini_api_key_here
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Generate config.js (for non-Vite environments)
Run the setup script to generate `config.js` from `.env`:
```bash
node setup-config.js
```

This creates a `config.js` file that the HTML pages use at runtime.

## File Structure

- **`.env`** - Your actual configuration values (DO NOT commit)
- **`.env.example`** - Template for required configuration keys
- **`config-loader.js`** - Smart loader that handles both Vite and static environments
- **`setup-config.js`** - Node.js script to generate `config.js` from `.env`
- **`config.js`** - Generated file with your configuration (DO NOT commit)

## How It Works

### For Static/Direct Serving
1. Edit `.env` with your credentials
2. Run `node setup-config.js` to generate `config.js`
3. The app loads `config.js` at runtime
4. **Never commit `.env` or `config.js`** - they're in `.gitignore`

### For Vite/Build Environments
If you're using Vite or a similar build tool:
1. The build process automatically injects environment variables
2. `config-loader.js` reads from `import.meta.env`
3. No need to run `setup-config.js`

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `VITE_GEMINI_KEY` | Google Gemini API key for quiz generation |
| `VITE_SUPABASE_URL` | Supabase project URL for database |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous API key |

## Troubleshooting

### "CONFIG is undefined" error
- Make sure you've run `node setup-config.js`
- Check that `.env` file exists and has valid values
- Verify `config.js` was generated in the root directory

### Missing API Keys
- Check `.env` file has all three required keys
- Ensure there are no trailing spaces in values
- Verify keys are valid for their respective services

## For Development

When making changes to configuration:
1. Update `.env` with new values
2. Run `node setup-config.js` again
3. Restart your development server

## Security Notes

- **`.env` is in `.gitignore`** - never commit actual credentials
- **`config.js` is in `.gitignore`** - generated files shouldn't be committed
- **`.env.example` IS committed** - serves as documentation of required keys
- Always use environment-specific credentials (dev, staging, production)
