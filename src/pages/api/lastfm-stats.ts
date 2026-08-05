import type { APIRoute } from 'astro';
import { fetchStats, lastfmConfig } from '../../lib/lastfm';

// GET /api/lastfm-stats
//
// Runs live in `astro dev` (reads .env) and is prerendered to a static JSON
// file for the static build, so the listening charts work both locally and
// on any static host. Credentials stay server-side.

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
        const stats = await fetchStats(apiKey, user);
        return new Response(JSON.stringify({ ok: true, ...stats }), {
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
