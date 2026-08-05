import { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveBump } from '@nivo/bump';

// Listening stats — the weekly listening report from last.fm.
//
// The client fetches /api/lastfm-stats exactly once on mount (a weekly
// snapshot) and renders the whole page from that single response: total
// scrobbles, the listening clock, the top-tags bump, the recent-albums
// collage, and the ranked top lists. The endpoint reads LASTFM_API_KEY /
// LASTFM_USERNAME from .env server-side, so the key never ships to the
// client.

type TopArtist = { name: string; playcount: number; url: string };
type TopAlbum = { name: string; artist: string; playcount: number; url: string; image: string | null };
type TopTrack = { name: string; artist: string; playcount: number; url: string; image: string | null };
type AlbumArt = { name: string; artist: string; image: string; url: string };
type TagBumpSeries = { id: string; data: { x: string; y: number }[] };

type Payload = {
    ok: boolean;
    user?: string;
    period?: string;
    total?: { scrobbles: number; registeredYear: number | null; weekPlays: number };
    topArtists?: TopArtist[];
    topAlbums?: TopAlbum[];
    topTracks?: TopTrack[];
    topTags?: { periods: string[]; monthIndex: number; series: TagBumpSeries[] };
    clock?: number[];
    clockSample?: number;
    albums?: AlbumArt[];
    topArtistImage?: string | null;
    error?: string;
};

const SIGNAL_GREEN = '#1e6b4a';
const SIGNAL_TANGERINE = '#e05d1e';
const SIGNAL_SAFFRON = '#e5a81c';

// Warm Signal chart surface: hairline grid, muted ticks, signal colors.
const nivoTheme = {
    background: 'transparent',
    text: { fill: '#7a6c59', fontFamily: "'Source Sans 3 Variable', sans-serif", fontSize: 12 },
    axis: {
        domain: { line: { stroke: '#e4d9c2', strokeWidth: 1 } },
        ticks: {
            line: { stroke: '#e4d9c2', strokeWidth: 1 },
            text: { fill: '#7a6c59', fontFamily: "'Source Sans 3 Variable', sans-serif", fontSize: 12 },
        },
    },
    grid: { line: { stroke: '#e4d9c2', strokeWidth: 1, strokeDasharray: '4 4' } },
    tooltip: { container: { background: 'transparent' } },
};

const TAG_COLORS = [
    '#e05d1e', // tangerine
    '#1e6b4a', // green
    '#e5a81c', // saffron
    '#2f9e65', // green bright
    '#b8430e', // tangerine deep
    '#7a6c59', // muted
    '#155236', // green deep
    '#c2402e', // error red (muted by line work)
];

// ── Total scrobbles band ───────────────────────────────────────────────

function TotalBand({ total, topArtist }: { total: NonNullable<Payload['total']>; topArtist: string }) {
    const since = total.registeredYear ? `since ${total.registeredYear}` : 'all time';
    return (
        <section className="stats-hero" aria-label="Listening totals">
            <div className="stats-hero-main">
                <p className="stats-hero-label">Total scrobbles</p>
                <p className="stats-hero-value">{total.scrobbles.toLocaleString('en-US')}</p>
                <p className="stats-hero-note">scrobbled on last.fm {since}</p>
            </div>
            <dl className="stats-hero-cols">
                <div className="stats-hero-cell">
                    <dt>This week</dt>
                    <dd>{total.weekPlays.toLocaleString('en-US')}</dd>
                    <dd className="stats-hero-cell-note">scrobbles this week</dd>
                </div>
                <div className="stats-hero-cell">
                    <dt>Top artist</dt>
                    <dd>{topArtist || '—'}</dd>
                    <dd className="stats-hero-cell-note">this week</dd>
                </div>
                <div className="stats-hero-cell">
                    <dt>Snapshot</dt>
                    <dd>7 days</dd>
                    <dd className="stats-hero-cell-note">of listening</dd>
                </div>
            </dl>
        </section>
    );
}

// ── Listening clock ────────────────────────────────────────────────────

function ListeningClock({ clock, sample }: { clock: number[]; sample: number }) {
    const peak = clock.reduce((best, v, i) => (v > clock[best] ? i : best), 0);
    const data = clock.map((v, i) => ({ hour: String(i).padStart(2, '0'), plays: v }));
    return (
        <section className="chart-card">
            <header className="chart-head">
                <h2 className="chart-title">Listening clock</h2>
                <span className="chart-tag">24 hours · {sample.toLocaleString('en-US')} scrobbles</span>
            </header>
            <div className="chart-body clock-body" style={{ height: 240 }}>
                <ResponsiveBar
                    data={data}
                    indexBy="hour"
                    keys={['plays']}
                    margin={{ top: 4, right: 8, bottom: 30, left: 38 }}
                    padding={0.24}
                    borderRadius={3}
                    colors={(bar: any) => (bar.index === peak ? SIGNAL_TANGERINE : SIGNAL_GREEN)}
                    enableLabel={false}
                    enableGridY
                    gridYValues={4}
                    enableGridX={false}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 0,
                        tickPadding: 8,
                        tickValues: ['00', '03', '06', '09', '12', '15', '18', '21', '23'],
                    }}
                    axisLeft={{ tickSize: 0, tickPadding: 8 }}
                    animate
                    motionConfig="gentle"
                    role="img"
                    ariaLabel="Scrobbles by hour of day"
                    tooltip={({ data: d, value }: any) => (
                        <div className="chart-tip">
                            <span className="chart-tip-title">{d.hour}:00</span>
                            <span className="chart-tip-value">
                                {value} scrobble{value === 1 ? '' : 's'} in this hour
                            </span>
                        </div>
                    )}
                />
            </div>
        </section>
    );
}

// ── Top tags: last month vs this month (area bump) ─────────────────────

function TagBump({ topTags }: { topTags: NonNullable<Payload['topTags']> }) {
    if (!topTags.series.length) return null;
    return (
        <section className="chart-card">
            <header className="chart-head">
                <h2 className="chart-title">Top tags</h2>
                <span className="chart-tag">{topTags.series.length} tags · last vs this month</span>
            </header>
            <div className="chart-body bump-body" style={{ height: 300 }}>
                <ResponsiveBump
                    data={topTags.series}
                    margin={{ top: 26, right: 104, bottom: 30, left: 34 }}
                    colors={TAG_COLORS}
                    lineWidth={2.5}
                    activeLineWidth={4}
                    inactiveLineWidth={1.5}
                    inactiveOpacity={0.24}
                    pointSize={7}
                    activePointSize={11}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    activePointBorderWidth={3}
                    pointBorderColor={{ from: 'serie.color' }}
                    enableGridX
                    enableGridY={false}
                    axisTop={null}
                    axisBottom={{ tickSize: 0, tickPadding: 8 }}
                    axisLeft={{ tickSize: 0, tickPadding: 8 }}
                    area
                    areaOpacity={0.22}
                    startLabel={false}
                    endLabel
                    endLabelTextColor={{ from: 'serie.color' }}
                    endLabelPadding={10}
                    animate
                    motionConfig="gentle"
                    role="img"
                    ariaLabel="Top tags ranked last month versus this month"
                    tooltip={({ serie, data }: any) => (
                        <div className="chart-tip">
                            <span className="chart-tip-title">#{data.y} · {serie.id}</span>
                            <span className="chart-tip-value">rank in “{data.x}”</span>
                        </div>
                    )}
                />
            </div>
        </section>
    );
}

// ── Recent albums collage (4×4, art only) ──────────────────────────────

function AlbumCollage({ albums }: { albums: AlbumArt[] }) {
    const withArt = albums.filter((a) => a.image);
    if (!withArt.length) return null;
    return (
        <section className="chart-card">
            <header className="chart-head">
                <h2 className="chart-title">Recent albums</h2>
                <span className="chart-tag">{withArt.length} covers · recent spins</span>
            </header>
            <div className="collage">
                {withArt.map((a) => (
                    <a
                        className="collage-tile"
                        key={`${a.artist}\u0000${a.name}`}
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${a.artist} — ${a.name}`}
                    >
                        <img src={a.image} alt={`${a.artist} — ${a.name}`} width={300} height={300} loading="lazy" />
                        <span className="collage-overlay">
                            <span className="collage-name">{a.name}</span>
                            <span className="collage-artist">{a.artist}</span>
                        </span>
                    </a>
                ))}
            </div>
        </section>
    );
}

// ── Ranked top lists (cards, no bars) ──────────────────────────────────

type RankRow = { name: string; sub?: string; value: number; image?: string | null; url?: string };

function RankedList({
    title,
    tag,
    rows,
    ariaLabel,
    topLabel,
}: {
    title: string;
    tag: string;
    rows: RankRow[];
    ariaLabel: string;
    topLabel: string;
}) {
    if (!rows.length) return null;

    // The #1 entry is always presented as a featured band. When last.fm has
    // no cover art for it (placeholder art counts as none), a designed
    // monogram tile stands in — the three cards keep a consistent look.
    const featured = rows[0];
    const listRows = rows.slice(1);

    return (
        <section className="rank-card" aria-label={ariaLabel}>
            <header className="rank-head">
                <h2 className="chart-title">{title}</h2>
                <span className="chart-tag">{tag}</span>
            </header>
            <a
                className="rank-featured"
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${featured.name} on last.fm`}
            >
                <span className="rank-featured-media">
                    {featured.image ? (
                        <img className="rank-featured-cover" src={featured.image} alt={`${featured.name} cover`} loading="lazy" />
                    ) : (
                        <span className="rank-featured-mono" aria-hidden="true">
                            {featured.name.charAt(0).toUpperCase()}
                        </span>
                    )}
                </span>
                <span className="rank-featured-info">
                    <span className="rank-featured-top">
                        <span className="rank-featured-label">Top {topLabel}</span>
                        <span className="rank-featured-rank">#1</span>
                    </span>
                    <span className="rank-featured-name">{featured.name}</span>
                    {featured.sub && <span className="rank-featured-sub">{featured.sub}</span>}
                    <span className="rank-featured-value">
                        {featured.value}
                        <em> plays</em>
                    </span>
                </span>
            </a>
            <ol className="rank-list">
                {listRows.map((r, i) => (
                    <li className="rank-row" key={`${r.name}\u0000${r.sub ?? ''}`}>
                        <span className="rank-no">{String(i + 2).padStart(2, '0')}</span>
                        <span className="rank-name">
                            <strong>{r.name}</strong>
                            {r.sub && <span className="rank-sub">{r.sub}</span>}
                        </span>
                        <span className="rank-value">
                            {r.value}
                            <em> plays</em>
                        </span>
                    </li>
                ))}
            </ol>
        </section>
    );
}

// ── Page ───────────────────────────────────────────────────────────────

export default function ListeningStats() {
    const [state, setState] = useState<'loading' | 'error' | 'ready'>('loading');
    const [payload, setPayload] = useState<Payload | null>(null);

    useEffect(() => {
        let cancelled = false;
        fetch('/api/lastfm-stats')
            .then((r) => r.json())
            .then((data: Payload) => {
                if (cancelled) return;
                if (!data || !data.ok) throw new Error('unavailable');
                setPayload(data);
                setState('ready');
            })
            .catch(() => {
                if (!cancelled) setState('error');
            });
        return () => {
            cancelled = true;
        };
    }, []);

    if (state === 'loading') {
        return (
            <div className="charts-state" role="status">
                <p className="charts-state-title">Reading last.fm…</p>
                <p>Pulling the week&rsquo;s listening report.</p>
            </div>
        );
    }

    if (state === 'error' || !payload) {
        return (
            <div className="charts-state">
                <p className="charts-state-title">Listening stats aren&rsquo;t available right now.</p>
                <p>
                    This page is fed by a small server function that reads a private key from the
                    environment. Run <code>astro dev</code> locally with your key in <code>.env</code>{' '}
                    and it comes alive.
                </p>
            </div>
        );
    }

    const total = payload.total ?? { scrobbles: 0, registeredYear: null, weekPlays: 0 };
    const artists = payload.topArtists ?? [];
    const albums = payload.topAlbums ?? [];
    const tracks = payload.topTracks ?? [];
    const clock = payload.clock ?? [];
    const topTags = payload.topTags ?? { periods: [], monthIndex: 1, series: [] };
    const collage = payload.albums ?? [];

    return (
        <div className="charts">
            <TotalBand total={total} topArtist={artists[0]?.name ?? ''} />

            <div className="stats-pair">
                {clock.length === 24 && (
                    <ListeningClock clock={clock} sample={payload.clockSample ?? 0} />
                )}
                {topTags.series.length > 0 && <TagBump topTags={topTags} />}
            </div>

            {collage.length > 0 && <AlbumCollage albums={collage} />}

            <div className="rank-grid">
                <RankedList
                    title="Top artists"
                    tag={`top ${artists.length} · week`}
                    topLabel="artist"
                    rows={artists.map((a, i) => ({
                        name: a.name,
                        value: a.playcount,
                        image: i === 0 ? payload.topArtistImage : null,
                        url: i === 0 ? a.url : undefined,
                    }))}
                    ariaLabel="Top artists this week by play count"
                />
                <RankedList
                    title="Top albums"
                    tag={`top ${albums.length} · week`}
                    topLabel="album"
                    rows={albums.map((a, i) => ({
                        name: a.name,
                        sub: a.artist,
                        value: a.playcount,
                        image: i === 0 ? a.image : null,
                        url: i === 0 ? a.url : undefined,
                    }))}
                    ariaLabel="Top albums this week by play count"
                />
                <RankedList
                    title="Top tracks"
                    tag={`top ${tracks.length} · week`}
                    topLabel="track"
                    rows={tracks.map((t, i) => ({
                        name: t.name,
                        sub: t.artist,
                        value: t.playcount,
                        image: i === 0 ? t.image : null,
                        url: i === 0 ? t.url : undefined,
                    }))}
                    ariaLabel="Top tracks this week by play count"
                />
            </div>
        </div>
    );
}
