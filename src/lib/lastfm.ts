// Shared last.fm helpers.
//
// Used by the Astro API endpoints (src/pages/api/*.ts) which run live in
// `astro dev` and are prerendered into static JSON for the static build.
// Credentials come from the environment (.env) so the API key never ships
// to the client:
//   LASTFM_API_KEY   last.fm API key (https://www.last.fm/api/account/create)
//   LASTFM_USERNAME  the last.fm username to watch

const API = 'https://ws.audioscrobbler.com/2.0/';

export function lastfmConfig() {
    const apiKey = import.meta.env.LASTFM_API_KEY as string | undefined;
    const user = import.meta.env.LASTFM_USERNAME as string | undefined;
    return { apiKey, user };
}

export async function lastfmGet(params: Record<string, string>): Promise<any> {
    const qs = new URLSearchParams({ format: 'json', ...params });
    const res = await fetch(`${API}?${qs}`);
    if (!res.ok) throw new Error(`last.fm responded ${res.status}`);
    const data = await res.json();
    if (data && data.error) throw new Error(`last.fm error ${data.error}: ${data.message}`);
    return data;
}

const SIZE_RANK: Record<string, number> = { small: 0, medium: 1, large: 2, extralarge: 3, mega: 4 };

function bestImage(images: any): string | null {
    if (!Array.isArray(images)) return null;
    const sorted = images
        .filter((i) => i && i['#text'])
        .sort((a, b) => (SIZE_RANK[a.size] ?? -1) - (SIZE_RANK[b.size] ?? -1));
    return sorted[sorted.length - 1]?.['#text'] ?? null;
}

// last.fm serves a well-known placeholder PNG (same hash in the URL) for
// albums/artists without cover art. Treat it as "no art" so it never
// renders in the collage or the featured #1 blocks.
const PLACEHOLDER_HASH = '2a96cbd8b46e442fc41c2b86b821562f';

export function hasArt(url: string | null | undefined): url is string {
    return !!url && !url.includes(PLACEHOLDER_HASH);
}

// ── Weekly (7day) top charts ───────────────────────────────────────────

export async function fetchTopArtists(apiKey: string, user: string): Promise<TopArtist[]> {
    const data = await lastfmGet({
        method: 'user.gettopartists',
        user,
        api_key: apiKey,
        period: '7day',
        limit: '10',
    });
    return ((data?.topartists?.artist ?? []) || []).map((a: any) => ({
        name: String(a?.name ?? ''),
        playcount: Number(a?.playcount) || 0,
        url: String(a?.url ?? ''),
    }));
}

export async function fetchTopAlbums(apiKey: string, user: string): Promise<TopAlbum[]> {
    const data = await lastfmGet({
        method: 'user.gettopalbums',
        user,
        api_key: apiKey,
        period: '7day',
        limit: '10',
        extended: '1',
    });
    return ((data?.topalbums?.album ?? []) || []).map((a: any) => {
        const image = bestImage(a?.image);
        return {
            name: String(a?.name ?? ''),
            artist: String(a?.artist?.name ?? a?.artist?.['#text'] ?? ''),
            playcount: Number(a?.playcount) || 0,
            url: String(a?.url ?? ''),
            image: hasArt(image) ? image : null,
        };
    });
}

export async function fetchTopTracks(apiKey: string, user: string): Promise<TopTrack[]> {
    const data = await lastfmGet({
        method: 'user.gettoptracks',
        user,
        api_key: apiKey,
        period: '7day',
        limit: '10',
        extended: '1',
    });
    return ((data?.toptracks?.track ?? []) || []).map((t: any) => {
        const image = bestImage(t?.image);
        return {
            name: String(t?.name ?? ''),
            artist: String(t?.artist?.name ?? t?.artist?.['#text'] ?? ''),
            playcount: Number(t?.playcount) || 0,
            url: String(t?.url ?? ''),
            image: hasArt(image) ? image : null,
        };
    });
}

export type TopArtist = { name: string; playcount: number; url: string };
export type TopAlbum = { name: string; artist: string; playcount: number; url: string; image: string | null };
export type TopTrack = { name: string; artist: string; playcount: number; url: string; image: string | null };

// Cover art for a single artist (used for the #1 top artist card).
export async function fetchTopArtistImage(apiKey: string, artist: string): Promise<string | null> {
    if (!artist) return null;
    try {
        const d = await lastfmGet({ method: 'artist.getinfo', artist, api_key: apiKey, autocorrect: '1' });
        const image = bestImage(d?.artist?.image);
        if (hasArt(image)) return image;
        // Many artists have no portrait art; fall back to the cover of their
        // top album so the #1 card still gets a real visual.
        const al = await lastfmGet({ method: 'artist.gettopalbums', artist, api_key: apiKey, autocorrect: '1', limit: '3' });
        const first = Array.isArray(al?.topalbums?.album) ? al.topalbums.album[0] : null;
        const albumImage = bestImage(first?.image);
        return hasArt(albumImage) ? albumImage : null;
    } catch {
        return null;
    }
}

// ── Totals ──────────────────────────────────────────────────────────────

export type Totals = {
    scrobbles: number;
    registeredYear: number | null;
    weekPlays: number;
    weekFrom: number | null;
    weekTo: number | null;
};

export async function fetchTotals(apiKey: string, user: string): Promise<Totals> {
    const [info, week] = await Promise.all([
        lastfmGet({ method: 'user.getinfo', user, api_key: apiKey }),
        fetchWeekTotal(apiKey, user),
    ]);
    const u = info?.user;
    return {
        scrobbles: Number(u?.playcount) || 0,
        registeredYear: u?.registered?.unixtime
            ? new Date(Number(u.registered.unixtime) * 1000).getUTCFullYear()
            : null,
        weekPlays: week.plays,
        weekFrom: week.from,
        weekTo: week.to,
    };
}

async function fetchWeekTotal(apiKey: string, user: string) {
    const charts = await lastfmGet({ method: 'user.getweeklychartlist', user, api_key: apiKey });
    const list = charts?.weeklychartlist?.chart ?? [];
    // The chart list is chronological — the most recent week is last.
    const week = Array.isArray(list) ? list[list.length - 1] : null;
    if (!week) return { plays: 0, from: null, to: null };
    const chart = await lastfmGet({
        method: 'user.getweeklytrackchart',
        user,
        api_key: apiKey,
        from: String(week.from),
        to: String(week.to),
    });
    const tracks = chart?.weeklytrackchart?.track ?? [];
    const plays = (Array.isArray(tracks) ? tracks : []).reduce(
        (sum: number, t: any) => sum + (Number(t?.playcount) || 0),
        0,
    );
    return { plays, from: Number(week.from), to: Number(week.to) };
}

// ── Top tags: LAST month vs THIS month (area bump chart) ───────────────

export type TagBumpPoint = { x: string; y: number };
export type TagBumpSeries = { id: string; data: TagBumpPoint[] };
export type TagBump = {
    periods: string[];
    monthIndex: number;
    series: TagBumpSeries[];
};

const TAG_PADDING = 9; // rank assigned when a tag is absent from a window

// Calendar month boundaries in local time. "Counted 30 days": this month runs
// from the 1st to today, last month from its 1st to the last day.
function monthBoundaries(now = new Date()) {
    const startThis = new Date(now.getFullYear(), now.getMonth(), 1);
    const startLast = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return {
        startLast: Math.floor(startLast.getTime() / 1000),
        startThis: Math.floor(startThis.getTime() / 1000),
    };
}

async function fetchWindowScrobbles(apiKey: string, user: string, fromTs: number): Promise<any[]> {
    const out: any[] = [];
    const pageSize = 200;
    const maxPages = 40;
    for (let page = 1; page <= maxPages; page++) {
        const data = await lastfmGet({
            method: 'user.getrecenttracks',
            user,
            api_key: apiKey,
            limit: String(pageSize),
            page: String(page),
            extended: '1',
        });
        const list = data?.recenttracks?.track ?? [];
        if (!Array.isArray(list) || list.length === 0) break;
        for (const t of list) {
            const uts = t?.date?.uts ? Number(t.date.uts) : null;
            if (uts === null) continue; // in-flight now-playing entry
            if (uts < fromTs) return out; // scrobbles are newest-first: we are past the window
            out.push(t);
        }
        if (list.length < pageSize) break;
    }
    return out;
}

export async function fetchTagBump(apiKey: string, user: string): Promise<TagBump> {
    const { startLast, startThis } = monthBoundaries();
    const scrobbles = await fetchWindowScrobbles(apiKey, user, startLast);
    if (scrobbles.length === 0) {
        return { periods: ['Last month', 'This month'], monthIndex: 0, series: [] };
    }

    // Plays per artist per window.
    const plays: Record<'this' | 'last', Map<string, number>> = { this: new Map(), last: new Map() };
    for (const t of scrobbles) {
        const artist = String(t?.artist?.name ?? t?.artist?.['#text'] ?? '');
        if (!artist) continue;
        const key = Number(t.date.uts) >= startThis ? 'this' : 'last';
        plays[key].set(artist, (plays[key].get(artist) ?? 0) + 1);
    }

    // Top artists by combined plays across both windows.
    const combined = new Map<string, number>();
    (['this', 'last'] as const).forEach((k) =>
        plays[k].forEach((c, a) => combined.set(a, (combined.get(a) ?? 0) + c)),
    );
    const topArtists = [...combined.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([a]) => a);

    // Tags per artist (artist.gettoptags), weighted by play count in each window.
    const tagLists = await Promise.all(
        topArtists.map((artist) =>
            lastfmGet({ method: 'artist.gettoptags', artist, api_key: apiKey, autocorrect: '1' })
                .then((d) => ((d?.toptags?.tag ?? []) || []).map((t: any) => ({ name: String(t?.name ?? ''), count: Number(t?.count) || 0 })))
                .catch(() => []),
        ),
    );

    const score: Record<'this' | 'last', Map<string, number>> = { this: new Map(), last: new Map() };
    topArtists.forEach((artist, i) => {
        const tags = tagLists[i] ?? [];
        (['this', 'last'] as const).forEach((k) => {
            const p = plays[k].get(artist) ?? 0;
            if (p === 0) return;
            tags.forEach((tg) => score[k].set(tg.name, (score[k].get(tg.name) ?? 0) + p * tg.count));
        });
    });

    const rankFor = (k: 'this' | 'last') => {
        const sorted = [...score[k].entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name);
        return (name: string) => (sorted.indexOf(name) === -1 ? TAG_PADDING : sorted.indexOf(name) + 1);
    };
    const rankThis = rankFor('this');
    const rankLast = rankFor('last');

    const totalScore = new Map<string, number>();
    (['this', 'last'] as const).forEach((k) =>
        score[k].forEach((c, tag) => totalScore.set(tag, (totalScore.get(tag) ?? 0) + c)),
    );
    const top = [...totalScore.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name]) => name);

    const periods = ['Last month', 'This month'];
    const series = top.map((name) => ({
        id: name,
        data: [
            { x: periods[0], y: rankLast(name) },
            { x: periods[1], y: rankThis(name) },
        ],
    }));

    return { periods, monthIndex: 0, series };
}

// ── Listening clock + recent album art ─────────────────────────────────

export type AlbumArt = { name: string; artist: string; image: string; url: string };
export type RecentSample = {
    clock: number[]; // 24 hourly scrobble counts
    clockSample: number; // scrobbles used to build the clock
    albums: AlbumArt[]; // up to 16 distinct recent albums that have cover art
};

const CLOCK_SAMPLE = 3000; // most recent scrobbles used for the clock + collage

export async function fetchRecentSample(apiKey: string, user: string): Promise<RecentSample> {
    const hourCounts = new Array(24).fill(0) as number[];
    const albums = new Map<string, AlbumArt>();
    const pageSize = 200;
    const pages = Math.ceil(CLOCK_SAMPLE / pageSize);
    let counted = 0;

    for (let page = 1; page <= pages; page++) {
        const data = await lastfmGet({
            method: 'user.getrecenttracks',
            user,
            api_key: apiKey,
            limit: String(pageSize),
            page: String(page),
            extended: '1',
        });
        const list = data?.recenttracks?.track ?? [];
        if (!Array.isArray(list) || list.length === 0) break;
        for (const t of list) {
            if (!t?.date?.uts) continue; // skip the in-flight now-playing entry
            hourCounts[new Date(Number(t.date.uts) * 1000).getHours()] += 1;
            counted += 1;

            // collect up to 24 real-art candidates so the 4×4 collage still
            // fills after placeholder art is filtered out
            if (albums.size < 24) {
                const name = String(t?.album?.name ?? t?.album?.['#text'] ?? '');
                const artist = String(t?.artist?.name ?? t?.artist?.['#text'] ?? '');
                const image = bestImage(t?.image);
                if (name && hasArt(image)) {
                    const key = `${name}\u0000${artist}`;
                    if (!albums.has(key)) {
                        albums.set(key, {
                            name,
                            artist,
                            image: image as string,
                            url: String(t?.url ?? ''),
                        });
                    }
                }
            }
        }
    }

    return {
        clock: hourCounts,
        clockSample: counted,
        albums: [...albums.values()].slice(0, 16),
    };
}

// ── Now playing + recent spins (fun page, polled) ─────────────────────

export type NowPlaying = {
    nowPlaying: boolean;
    track: string;
    artist: string;
    album: string;
    url: string;
    image: string | null;
    recent: RecentEntry[];
};

export type RecentEntry = {
    track: string;
    artist: string;
    album: string;
    image: string | null;
    url: string;
    ts: number | null;
};

export async function fetchNowPlaying(apiKey: string, user: string): Promise<NowPlaying> {
    const data = await lastfmGet({
        method: 'user.getrecenttracks',
        user,
        api_key: apiKey,
        limit: '6',
        extended: '1',
    });
    const list = data?.recenttracks?.track ?? [];
    if (!Array.isArray(list) || list.length === 0) {
        return { nowPlaying: false, track: '', artist: '', album: '', url: '', image: null, recent: [] };
    }

    const first = list[0];
    const recent: RecentEntry[] = list
        .slice(1)
        .filter((t: any) => t?.name)
        .map((t: any) => ({
            track: String(t.name ?? ''),
            artist: String(t?.artist?.name ?? t?.artist?.['#text'] ?? ''),
            album: String(t?.album?.name ?? t?.album?.['#text'] ?? ''),
            image: bestImage(t?.image),
            url: String(t?.url ?? ''),
            ts: t?.date?.uts ? Number(t.date.uts) : null,
        }));

    return {
        nowPlaying: first['@attr']?.nowplaying === 'true',
        track: String(first?.name ?? ''),
        artist: String(first?.artist?.name ?? first?.artist?.['#text'] ?? ''),
        album: String(first?.album?.name ?? first?.album?.['#text'] ?? ''),
        url: String(first?.url ?? ''),
        image: bestImage(first?.image),
        recent,
    };
}

// ── Combined weekly snapshot (the stats page fetches this once) ────────

export async function fetchStats(apiKey: string, user: string) {
    const now = Math.floor(Date.now() / 1000);
    const [total, topArtists, topAlbums, topTracks, topTags, sample] = await Promise.all([
        fetchTotals(apiKey, user),
        fetchTopArtists(apiKey, user),
        fetchTopAlbums(apiKey, user),
        fetchTopTracks(apiKey, user),
        fetchTagBump(apiKey, user),
        fetchRecentSample(apiKey, user),
    ]);
    const topArtistImage = topArtists[0] ? await fetchTopArtistImage(apiKey, topArtists[0].name) : null;
    return {
        user,
        period: '7day',
        generatedAt: now,
        total,
        topArtists,
        topAlbums,
        topTracks,
        topTags,
        clock: sample.clock,
        clockSample: sample.clockSample,
        albums: sample.albums,
        topArtistImage,
    };
}
