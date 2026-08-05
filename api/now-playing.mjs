// Vercel serverless function: GET /api/now-playing
//
// Returns the track Danke is currently playing on last.fm, read from the
// environment so the API key never ships to the client:
//   LASTFM_API_KEY   last.fm API key (https://www.last.fm/api/account/create)
//   LASTFM_USERNAME  the last.fm username to watch
//
// The client (src/pages/fun.astro) fetches this and renders the "now playing"
// card; if this function is missing (local dev, non-Vercel hosting) the card
// simply stays hidden. Always returns 200 with { ok: false, error } on failure
// so the client can degrade silently.

const SIZE_RANK = { small: 0, medium: 1, large: 2, extralarge: 3, mega: 4 };

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');

    const apiKey = process.env.LASTFM_API_KEY;
    const user = process.env.LASTFM_USERNAME;
    if (!apiKey || !user) {
        return res.status(200).json({ ok: false, error: 'not-configured' });
    }

    try {
        const url =
            'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks' +
            `&user=${encodeURIComponent(user)}` +
            `&api_key=${encodeURIComponent(apiKey)}` +
            '&format=json&limit=1&extended=1';
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`last.fm responded ${resp.status}`);
        const data = await resp.json();
        if (data && data.error) throw new Error(`last.fm error ${data.error}: ${data.message}`);

        const track = data?.recenttracks?.track?.[0];
        if (!track) return res.status(200).json({ ok: false, error: 'no-track' });

        const nowPlaying = track['@attr']?.nowplaying === 'true';
        const artistName = track.artist?.name ?? track.artist?.['#text'] ?? '';
        const images = (Array.isArray(track.image) ? track.image : [])
            .filter((i) => i && i['#text'])
            .sort((a, b) => (SIZE_RANK[a.size] ?? -1) - (SIZE_RANK[b.size] ?? -1));
        const image = images[images.length - 1]?.['#text'] ?? null;

        return res.status(200).json({
            ok: true,
            nowPlaying,
            track: track.name ?? '',
            artist: artistName,
            album: track.album?.name ?? track.album?.['#text'] ?? '',
            url: track.url ?? '',
            image,
        });
    } catch (err) {
        return res.status(200).json({ ok: false, error: 'fetch-failed' });
    }
}
