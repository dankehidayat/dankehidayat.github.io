// Fetch cover images for the SHELF from the AniList API.
// Usage: node scripts/fetch-covers.mjs <manifest.json> [outDir]
// manifest.json: [{ "slug": "kebab-case", "title": "search string", "type": "MANGA"|"ANIME" }]
// Writes public/shelf/covers/<slug>.<ext> (or custom outDir), plus a results
// manifest to scripts/covers-manifest.json (not shipped to the site).
import fs from 'node:fs';
import path from 'node:path';

const ANILIST = 'https://graphql.anilist.co';
const QUERY = `
query ($search: String, $type: MediaType) {
  Media(search: $search, type: $type) {
    id
    title { romaji english native }
    coverImage { extraLarge large medium color }
    format
  }
}`;

async function anilist(search, type) {
    const res = await fetch(ANILIST, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ query: QUERY, variables: { search, type } })
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.Media ?? null;
}

async function download(url, filePath) {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (portfolio cover fetch)' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filePath, buf);
    return buf.length;
}

const manifestPath = process.argv[2];
const outDir = process.argv[3] ?? path.join(process.cwd(), 'public/shelf/covers');
fs.mkdirSync(outDir, { recursive: true });

const items = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const results = [];

for (const item of items) {
    const { slug, title, type } = item;
    let media = null;
    // Try the exact title, then the english title if provided.
    const searches = [title];
    if (item.english) searches.push(item.english);
    for (const s of searches) {
        media = await anilist(s, type);
        if (media) break;
    }
    if (!media) {
        results.push({ slug, ok: false, reason: 'not found on AniList' });
        console.log(`MISS  ${slug}  (${title})`);
        continue;
    }
    const url = media.coverImage?.extraLarge || media.coverImage?.large || media.coverImage?.medium;
    if (!url) {
        results.push({ slug, ok: false, reason: 'no cover image' });
        console.log(`MISS  ${slug}  (no cover)`);
        continue;
    }
    let ext = path.extname(new URL(url).pathname).split('?')[0] || '.jpg';
    if (!ext || ext.length > 5) ext = '.jpg';
    const out = path.join(outDir, `${slug}${ext}`);
    try {
        const bytes = await download(url, out);
        results.push({ slug, ok: true, file: `${slug}${ext}`, bytes, color: media.coverImage?.color, title: media.title?.romaji ?? media.title?.english });
        console.log(`OK    ${slug}  ${bytes} bytes  ${out}`);
    } catch (e) {
        results.push({ slug, ok: false, reason: e.message });
        console.log(`FAIL  ${slug}  ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 250));
}

const manifest = Object.fromEntries(results.map((r) => [r.slug, r]));
fs.writeFileSync(path.join(process.cwd(), 'scripts/covers-manifest.json'), JSON.stringify(manifest, null, 2));
const ok = results.filter((r) => r.ok).length;
console.log(`\n${ok}/${results.length} covers fetched.`);
