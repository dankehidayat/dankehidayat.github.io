/**
 * Responsive image helper — the one place the site turns a full-resolution
 * master into the bytes a slot actually needs.
 *
 * Every plate, screenshot, cover, and gallery frame used to ship its master
 * file verbatim: a 1661×2154 Köhler engraving (1MB) rendered in a ~300px
 * arch, a 3360×3082 dashboard capture (5.6MB) in a decorative marquee. This
 * helper caps a width ladder at the source's own width (never upscales),
 * emits a `srcset`, and returns the intrinsic dimensions so the slot reserves
 * its box before the bytes land (CLS stays at 0).
 *
 * `src` is deliberately a mid-rung of the ladder rather than the master, so a
 * browser without `srcset` support still gets a sane file instead of the
 * original. The masters in `src/assets/images/` are never modified.
 */
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export type ResponsiveImage = {
    /** Fallback URL — a mid-rung of the ladder, never the master. */
    src: string;
    /** Comma-separated `srcset`, already ordered narrow → wide. */
    srcset: string;
    /** Intrinsic width of the fallback rung (for the width/height attributes). */
    width: number;
    /** Intrinsic height of the fallback rung. */
    height: number;
};

export type ResponsiveOptions = {
    /** Candidate widths; each is capped at the source width and de-duped. */
    widths: number[];
    /** Which rung becomes `src`. Defaults to the second-smallest. */
    fallback?: number;
    format?: 'webp' | 'jpeg' | 'png' | 'avif';
    quality?: number;
};

/** Ladders per slot, sized from the real CSS box each image is rendered in. */

/** Specimen plates — the 3:4 arch. */
export const PLATE_WIDTHS = [320, 480, 640, 720, 960];

/** `.shot-slot` is clamp(19rem, 27vw, 27rem) — 432px at the top end. */
export const SHOT_WIDTHS = [320, 480, 640, 864];

/**
 * Florilegium jackets. The two slots that share a jacket differ, so the ladder
 * runs to 672 — enough for a 20rem record cover at 2× on a desktop, which is
 * the widest any jacket ever renders.
 */
export const COVER_WIDTHS = [200, 300, 400, 528, 672];

/** The margin-lily accent slot was min(100%, 11.5rem); the folio's smallest
 *  image slot now lives in the record's plate ladder in folio/[slug].astro. */
export const LILY_WIDTHS = [200, 320, 460];

/**
 * Atelier archive shots. One ladder serves two very different sizes: the
 * filmstrip thumb (`.filmstrip-item` clamps to 18rem) and the full-bleed
 * lightbox, so the browser picks per `sizes` from the same set.
 */
export const ATELIER_SHOT_WIDTHS = [320, 560, 800, 1200, 1600];

/** The Rosé Pine showcase runs the full content column at 3360/1964. */
export const ATELIER_THEME_WIDTHS = [640, 1000, 1600, 2200];

/**
 * `sizes` per plate variant, derived from the real grid each one sits in
 * (see `.plate-grid--works` / `--strip` in folio.css). The ladder is tuned to
 * the device-pixel band these actually demand — roughly 300–720px — so a
 * mobile cell at 343 CSS px lands on the 720 rung rather than overshooting
 * to 960.
 */
export const PLATE_SIZES = {
    // .folio-hero-plate is min(100%, 22rem), widening to 24rem at 1180+.
    featured: '(min-width: 1180px) 24rem, 22rem',
    detail: '(min-width: 1024px) 32rem, (min-width: 640px) 26rem, 84vw',
    // 3-up at 1180+ (344px), 3-up at 1024+ (274px), 2-up at 640+ (320px).
    cell: '(min-width: 1180px) 21.5rem, (min-width: 1024px) 17rem, (min-width: 640px) 20rem, 88vw',
    mini: '(min-width: 640px) 14rem, 45vw'
} as const;

/** The six-across home strip: ~152px columns, not a 3-up cell. */
export const PLATE_STRIP_SIZES = '(min-width: 1180px) 10rem, (min-width: 720px) 15rem, 88vw';

/** `.shot-slot` mobile override is min(76vw, 17.5rem). */
export const SHOT_SIZES = '(min-width: 640px) 27rem, 76vw';

/**
 * `sizes` for a jacket, measured off the live layout rather than read off the
 * clamp — `.cut-card` is min(72vw, 15rem) below 640px, not 12.5rem, and the
 * record cover is a 20rem column. Each value leans a rung generous so a
 * jacket never comes back soft; the ladder caps the cost of being generous.
 */
/** Index page: the fan stage and the staggered cover wall. */
export const COVER_SIZES = '(min-width: 1180px) 16.5rem, (min-width: 640px) 26vw, 72vw';

/** Record sheet: the sticky hero jacket beside the essay. */
export const RECORD_COVER_SIZES = '(min-width: 1024px) 20rem, (min-width: 640px) 12rem, 60vw';

/**
 * Cap, de-dupe, and sort a width ladder against the source's real width.
 * A rung equal to the source width keeps the master's own resolution; no rung
 * ever exceeds it, so the browser never upscales.
 */
function ladder(widths: number[], sourceWidth: number): number[] {
    const capped = widths.map((w) => Math.min(Math.round(w), sourceWidth));
    return [...new Set(capped)].sort((a, b) => a - b);
}

/**
 * Build the src/srcset pair for one master image.
 * Cached per (source, options) so a plate reused across three pages is only
 * encoded once per build.
 */
const cache = new Map<string, Promise<ResponsiveImage>>();

export function responsiveImage(src: ImageMetadata, options: ResponsiveOptions): Promise<ResponsiveImage> {
    const format = options.format ?? 'webp';
    const quality = options.quality ?? 78;
    const widths = ladder(options.widths, src.width);
    // Second-smallest rung: small enough to stay cheap, large enough to look
    // right on a 1× screen. Clamped to the ladder's own range.
    const wanted = options.fallback ?? widths[Math.min(1, widths.length - 1)];
    const fallback = widths.reduce((best, w) => (Math.abs(w - wanted) < Math.abs(best - wanted) ? w : best));

    const key = `${src.src}|${widths.join(',')}|${fallback}|${format}|${quality}`;
    const hit = cache.get(key);
    if (hit) return hit;

    const job = getImage({
        src,
        widths,
        width: fallback,
        format,
        quality
    }).then((image) => {
        const result: ResponsiveImage = {
            src: image.src,
            srcset: image.srcSet.attribute,
            width: Number(image.attributes.width),
            height: Number(image.attributes.height)
        };
        cache.set(key, Promise.resolve(result));
        return result;
    });

    cache.set(key, job);
    return job;
}
