// Local preview that also serves the /api/now-playing serverless function.
//
// Astro's `astro dev` / `astro preview` do NOT serve the api/ folder, so the
// now-playing card can never work under those commands. This tiny server serves
// the built site (dist/) plus the now-playing handler, reading LASTFM_API_KEY /
// LASTFM_USERNAME from .env. It mirrors what Vercel runs in production.
//
// Usage:
//   pnpm build && node scripts/serve-local.mjs
//   → open http://localhost:4323/fun and watch the live card fill in.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(projectRoot, 'dist');

// Load .env (LASTFM_API_KEY / LASTFM_USERNAME) into process.env if present.
const envFile = path.join(projectRoot, '.env');
if (fs.existsSync(envFile)) {
    for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
        const t = line.trim();
        if (!t || t.startsWith('#')) continue;
        const i = t.indexOf('=');
        if (i <= 0) continue;
        let value = t.slice(i + 1).trim();
        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1);
        }
        process.env[t.slice(0, i).trim()] = value;
    }
}

const { default: nowPlaying } = await import('../api/now-playing.mjs');

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.woff2': 'font/woff2',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.xml': 'application/xml; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
};

function send(res, status, body, type) {
    res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    res.end(body);
}

const server = http.createServer(async (req, res) => {
    try {
        const url = new URL(req.url, 'http://localhost');
        const pathname = decodeURIComponent(url.pathname);

        // API: run the Vercel handler with a minimal mock response object.
        if (pathname === '/api/now-playing') {
            const mockRes = {
                _status: 200,
                _body: null,
                setHeader() {},
                status(code) {
                    this._status = code;
                    return this;
                },
                json(obj) {
                    this._body = obj;
                },
            };
            await nowPlaying(req, mockRes);
            return send(res, mockRes._status, JSON.stringify(mockRes._body ?? {}), 'application/json; charset=utf-8');
        }

        // Static files from dist/ (index.html fallback for directory paths).
        let filePath = path.join(DIST, pathname === '/' ? 'index.html' : pathname);
        if (!filePath.startsWith(DIST)) return send(res, 403, 'Forbidden', 'text/plain; charset=utf-8');
        if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }
        if (!fs.existsSync(filePath)) {
            return send(res, 404, 'Not found', 'text/plain; charset=utf-8');
        }
        const ext = path.extname(filePath).toLowerCase();
        return send(res, 200, fs.readFileSync(filePath), MIME[ext] ?? 'application/octet-stream');
    } catch (err) {
        return send(res, 500, `Server error: ${err.message}`, 'text/plain; charset=utf-8');
    }
});

const PORT = Number(process.env.PORT) || 4323;
server.listen(PORT, () => {
    console.log(`Local preview with /api/now-playing → http://localhost:${PORT}`);
    console.log('Open /fun to see the live last.fm card (reads .env credentials).');
});
