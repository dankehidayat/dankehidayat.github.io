/**
 * Shelf — the catalogued leisure corner.
 * Shared ordering and labels for the /florilegium pages.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type ShelfEntry = CollectionEntry<'shelf'>;

export const shelfCategoryOrder = [
    'manga',
    'anime',
    'light-novel',
    'fiction',
    'non-fiction',
    'romance'
] as const;

export const categoryLabels: Record<(typeof shelfCategoryOrder)[number], string> = {
    manga: 'Manga',
    anime: 'Anime',
    'light-novel': 'Light novels',
    fiction: 'Fiction',
    'non-fiction': 'Non-fiction',
    romance: 'Romance'
};

/** Drawer order: category blocks, titles alphabetical inside each block. */
export async function getShelf(): Promise<ShelfEntry[]> {
    const entries = await getCollection('shelf');
    return entries.sort((a, b) => {
        const ca = shelfCategoryOrder.indexOf(a.data.category);
        const cb = shelfCategoryOrder.indexOf(b.data.category);
        if (ca !== cb) return ca - cb;
        return a.data.title.localeCompare(b.data.title);
    });
}

// Cover jackets live in src/assets/images/covers/. The filenames are harvested
// at compile time through Vite's static glob, so the lookup never depends on
// the path a page module resolves from at build time (a runtime fs probe
// against import.meta.url silently failed for the index page). Globbing
// src/assets (not public/) is what lets each jacket get a width laddered
// srcset — from public/ they shipped whole at up to 176KB for a 264px slot,
// and Vite emitted a second hashed copy of every jacket that no page ever
// referenced.
//
// `eager: true` is load-bearing: a lazy glob hands back loader *functions*,
// so `mod.default` would be undefined and every cover would silently fall
// through to its monogram tile.
const coverFiles = import.meta.glob<{ default: ImageMetadata }>(
    '../../src/assets/images/covers/*.{jpg,jpeg}',
    { eager: true }
);
const availableCovers = new Map<string, ImageMetadata>(
    Object.entries(coverFiles).map(([p, mod]) => [
        (p.split('/').pop() ?? p).replace(/\.jpe?g$/i, ''),
        mod.default
    ])
);

/** Cover jacket for an entry, or null when there is no jacket (monogram tile). */
export function coverPathFor(entry: ShelfEntry): ImageMetadata | null {
    const key = entry.data.cover ?? entry.id;
    return availableCovers.get(key) ?? null;
}
