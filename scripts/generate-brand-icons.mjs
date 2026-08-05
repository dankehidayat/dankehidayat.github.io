// Generate src/data/brand-icons.ts from simple-icons package (dev-time only).
// Extracts <path d> + brand hex per slug; adds hand-drawn glyphs for items
// that have no simple-icons entry (EMQX, IBM pulled from older release).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const iconsDir = path.join(root, 'node_modules/simple-icons/icons');
const dataJson = JSON.parse(fs.readFileSync(path.join(root, 'node_modules/simple-icons/data/simple-icons.json'), 'utf8'));

const slugToHex = (slug) => {
    const item = Array.isArray(dataJson) ? dataJson.find((i) => i.slug === slug) : dataJson[slug];
    const hex = item?.hex ?? null;
    // simple-icons stores hex without '#'; normalize to CSS hex.
    return hex && !hex.startsWith('#') ? `#${hex}` : hex;
};

function readPath(slug) {
    const file = path.join(iconsDir, `${slug}.svg`);
    const svg = fs.readFileSync(file, 'utf8');
    const m = svg.match(/<path d="([^"]+)"/);
    if (!m) throw new Error(`no path in ${slug}`);
    return m[1];
}

// IBM path from simple-icons v8.15.0 (removed in newer releases)
const ibmPath = fs.readFileSync(path.join(__dirname, 'ibm-path.txt'), 'utf8').trim();

// slug -> (simple-icons slug | custom)
const brandIcons = {
    // Languages
    typescript: { type: 'brand', slug: 'typescript' },
    javascript: { type: 'brand', slug: 'javascript' },
    dart: { type: 'brand', slug: 'dart' },
    cplusplus: { type: 'brand', slug: 'cplusplus' },
    python: { type: 'brand', slug: 'python' },
    // Frameworks & Libraries
    react: { type: 'brand', slug: 'react' },
    nextdotjs: { type: 'brand', slug: 'nextdotjs' },
    svelte: { type: 'brand', slug: 'svelte' },
    astro: { type: 'brand', slug: 'astro' },
    fastify: { type: 'brand', slug: 'fastify' },
    flutter: { type: 'brand', slug: 'flutter' },
    laravel: { type: 'brand', slug: 'laravel' },
    prisma: { type: 'brand', slug: 'prisma' },
    // Data & Backend
    postgresql: { type: 'brand', slug: 'postgresql' },
    timescale: { type: 'brand', slug: 'timescale' },
    mongodb: { type: 'brand', slug: 'mongodb' },
    // DevOps & Infrastructure
    docker: { type: 'brand', slug: 'docker' },
    ansible: { type: 'brand', slug: 'ansible' },
    caddy: { type: 'brand', slug: 'caddy' },
    // Tux renders black on the warm paper, not simple-icons' brand yellow.
    linux: { type: 'path', path: readPath('linux'), hex: '#000000' },
    git: { type: 'brand', slug: 'git' },
    // Embedded & IoT
    espressif: { type: 'brand', slug: 'espressif' },
    arduino: { type: 'brand', slug: 'arduino' },
    mqtt: { type: 'brand', slug: 'mqtt' },
    // Design & Tools
    figma: { type: 'brand', slug: 'figma' },
    proteus: { type: 'brand', slug: 'proteus' },
    kicad: { type: 'brand', slug: 'kicad' },
    apple: { type: 'brand', slug: 'apple' },
    // Networking
    mikrotik: { type: 'brand', slug: 'mikrotik' },
    // Cert issuers
    ibm: { type: 'path', path: ibmPath, hex: '#052FAD' },
    cisco: { type: 'brand', slug: 'cisco' },
    coursera: { type: 'brand', slug: 'coursera' }
};

let out = `// Auto-generated from simple-icons (dev-time). Do not edit by hand.
// Run: node scripts/generate-brand-icons.mjs
// Brand marks use each vendor's official hex; generic glyphs are hand-drawn.

export type BrandIconKind = 'brand' | 'glyph';

export type BrandIconDef = {
    kind: BrandIconKind;
    /** Filled brand path data (24x24 viewBox). */
    path?: string;
    /** Brand hex color. */
    hex?: string;
    /** Hand-drawn stroked glyph id. */
    glyph?: string;
};

export const brandIcons: Record<string, BrandIconDef> = {
`;

for (const [key, def] of Object.entries(brandIcons)) {
    if (def.type === 'brand') {
        const hex = slugToHex(def.slug);
        out += `    ${JSON.stringify(key)}: { kind: 'brand', path: ${JSON.stringify(readPath(def.slug))}, hex: ${JSON.stringify(hex)} },\n`;
    } else {
        out += `    ${JSON.stringify(key)}: { kind: 'brand', path: ${JSON.stringify(def.path)}, hex: ${JSON.stringify(def.hex)} },\n`;
    }
}

// Hand-drawn stroked glyphs (24x24, stroke 1.7, round caps — matches site icon set)
out += `
    sql: { kind: 'glyph', glyph: 'database' },
    websocket: { kind: 'glyph', glyph: 'plug' },
    'rest-api': { kind: 'glyph', glyph: 'brackets' },
    'docker-compose': { kind: 'glyph', glyph: 'layers' },
    'ci-cd': { kind: 'glyph', glyph: 'bolt' },
    blynk: { kind: 'glyph', glyph: 'bolt' },
    emqx: { kind: 'glyph', glyph: 'hexagon' },
    'sensor-fusion': { kind: 'glyph', glyph: 'circuit' },
    'fuzzy-logic': { kind: 'glyph', glyph: 'wave' },
    'labdha-design-system': { kind: 'glyph', glyph: 'diamond' }
};
`;

fs.writeFileSync(path.join(root, 'src/data/brand-icons.ts'), out);
console.log('Wrote src/data/brand-icons.ts');
const count = Object.keys(brandIcons).length;
console.log(`Brand icons: ${count} (+ 10 glyphs)`);
