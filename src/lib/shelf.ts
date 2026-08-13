/**
 * Shelf — the catalogued leisure corner.
 * Shared ordering, shelfmarks, and labels for the /shelf pages.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type ShelfEntry = CollectionEntry<'shelf'>;

export type MarkedEntry = {
    entry: ShelfEntry;
    shelfmark: string;
};

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

const shelfmarkPrefixes: Record<(typeof shelfCategoryOrder)[number], string> = {
    manga: 'MNG',
    anime: 'ANM',
    'light-novel': 'LNV',
    fiction: 'FIC',
    'non-fiction': 'NFC',
    romance: 'RMC'
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

/** Assigns a catalog shelfmark (MNG·01…) to each entry in drawer order. */
export function withShelfmarks(entries: ShelfEntry[]): MarkedEntry[] {
    const counters = new Map<string, number>();
    return entries.map((entry) => {
        const n = (counters.get(entry.data.category) ?? 0) + 1;
        counters.set(entry.data.category, n);
        return {
            entry,
            shelfmark: `${shelfmarkPrefixes[entry.data.category]}·${String(n).padStart(2, '0')}`
        };
    });
}

// Cover jackets live in public/shelf/covers/. The filenames are harvested at
// compile time through Vite's static glob, so the lookup never depends on the
// path a page module resolves from at build time (a runtime fs probe against
// import.meta.url silently failed for the index page).
const coverFiles = import.meta.glob('../../public/shelf/covers/*.{jpg,jpeg}');
const availableCovers = new Set(
    Object.keys(coverFiles).map((p) => (p.split('/').pop() ?? p).replace(/\.jpe?g$/i, ''))
);

/** Cover jacket URL for an entry, or null when there is no jacket (monogram tile). */
export function coverPathFor(entry: ShelfEntry): string | null {
    const key = entry.data.cover ?? entry.id;
    return availableCovers.has(key) ? `/shelf/covers/${key}.jpg` : null;
}
