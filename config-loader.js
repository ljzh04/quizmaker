/**
 * Simplified Configuration Loader
 * Directly fetches and parses the .env file at runtime.
 * No build step or setup scripts required.
 */

async function loadConfig() {
    const config = {
        GEMINI_KEY: "",
        SUPABASE_URL: "",
        SUPABASE_ANON_KEY: ""
    };

    try {
        const response = await fetch('.env');
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
