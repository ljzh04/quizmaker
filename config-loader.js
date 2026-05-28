/**
 * Simplified Configuration Loader
 * Uses a generated config.js when deployed and falls back to .env for local development.
 */

async function loadConfig() {
    const config = {
        GEMINI_KEY: "",
        SUPABASE_URL: "",
        SUPABASE_ANON_KEY: ""
    };

    try {
        const module = await import('./config.js');
        if (module.CONFIG) {
            return {
                ...config,
                ...module.CONFIG
            };
        }
    } catch (e) {
        // Ignore missing config.js and fall back to .env
    }

    try {
        const response = await fetch('.env', { cache: 'no-store' });
        if (response.ok) {
            const text = await response.text();
            text.split('\n').forEach(line => {
                const [k, ...v] = line.split('=');
                if (!k || k.trim().startsWith('#')) return;
                
                // Remove VITE_ prefix if present and clean up the value
                const key = k.trim().replace(/^VITE_/, '');
                const value = v.join('=').trim().replace(/^["']|["']$/g, '');
                
                if (key in config) {
                    config[key] = value;
                }
            });
        }
    } catch (e) {
        // Fallback to empty values if .env is missing or unreachable
    }

    return config;
}

// Top-level await ensures CONFIG is fully populated before it is used by importers
export const CONFIG = await loadConfig();
