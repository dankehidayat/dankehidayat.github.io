import type { APIRoute } from 'astro';
import { fetchNowPlaying, lastfmConfig } from '../../lib/lastfm';

// GET /api/now-playing
//
// Runs live in `astro dev` (reads .env) and is prerendered to a static JSON
// file for the static build. Credentials stay server-side.

export const prerender = true;

export const GET: APIRoute = async () => {
    const { apiKey, user } = lastfmConfig();
    if (!apiKey || !user) {
        return new Response(JSON.stringify({ ok: false, error: 'not-configured' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        });
    }
    try {
        const nowPlaying = await fetchNowPlaying(apiKey, user);
        return new Response(JSON.stringify({ ok: true, ...nowPlaying }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        });
    } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: 'fetch-failed' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        });
    }
};
