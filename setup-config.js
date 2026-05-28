#!/usr/bin/env node

// Simple script to generate config.js from .env file
// Usage: node setup-config.js

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const configPath = path.join(__dirname, 'config.js');

// Read .env file
let envContent = '';
try {
    envContent = fs.readFileSync(envPath, 'utf8');
} catch (err) {
    console.error(`Error reading .env file: ${err.message}`);
    console.error('Please create a .env file first. You can copy from .env.example:');
    console.error('  cp .env.example .env');
    process.exit(1);
}

// Parse .env file
const config = {};
envContent.split('\n').forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return; // Skip empty lines and comments
    
    const [key, ...valueParts] = line.split('=');
    const cleanKey = key.trim().replace('VITE_', '');
    const value = valueParts.join('=').trim();
    
    if (cleanKey && value) {
        config[cleanKey] = value;
    }
});

// Generate config.js content
const configContent = `// Auto-generated from .env file. DO NOT commit this file!
// To regenerate, run: node setup-config.js

export const CONFIG = {
    GEMINI_KEY: "${config.GEMINI_KEY || ''}",
    SUPABASE_URL: "${config.SUPABASE_URL || ''}",
    SUPABASE_ANON_KEY: "${config.SUPABASE_ANON_KEY || ''}"
};
`;

// Write config.js
try {
    fs.writeFileSync(configPath, configContent);
    console.log(`✓ Successfully generated ${configPath}`);
    console.log('');
    console.log('Config values loaded:');
    console.log(`  - GEMINI_KEY: ${config.GEMINI_KEY ? '✓ configured' : '✗ missing'}`);
    console.log(`  - SUPABASE_URL: ${config.SUPABASE_URL ? '✓ configured' : '✗ missing'}`);
    console.log(`  - SUPABASE_ANON_KEY: ${config.SUPABASE_ANON_KEY ? '✓ configured' : '✗ missing'}`);
} catch (err) {
    console.error(`Error writing config.js: ${err.message}`);
    process.exit(1);
}
