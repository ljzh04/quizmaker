// Load configuration from environment variables or fallback to window globals
// For Vite/build environments: uses import.meta.env
// For static/direct serving: looks for window.APP_CONFIG

let config = {};

// Try Vite environment variables first (if using build process)
if (import.meta?.env) {
    config = {
        GEMINI_KEY: import.meta.env.VITE_GEMINI_KEY || "",
        SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || "",
        SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || ""
    };
}

// Fall back to window.APP_CONFIG if available (injected by server or config.js)
if (!config.GEMINI_KEY && window.APP_CONFIG) {
    config = window.APP_CONFIG;
}

// Fall back to empty values if nothing is configured
export const CONFIG = {
    GEMINI_KEY: config.GEMINI_KEY || "",
    SUPABASE_URL: config.SUPABASE_URL || "",
    SUPABASE_ANON_KEY: config.SUPABASE_ANON_KEY || ""
};
