/**
 * The folio's canonical plate set — the six works shown at equal scale.
 * Newest first; plate numbers 01–06 follow this order.
 * (src/content/projects/ also holds `neon`, which is not part of the
 * curated six in PRODUCT.md, so it stays out of the folio.)
 */
export const FOLIO_WORK_IDS = [
    'selene',
    'flowpoint-next',
    'flora',
    'eco-office',
    'ecobin-sorter',
    'hydrolevi'
] as const;

export type FolioWorkId = (typeof FOLIO_WORK_IDS)[number];

export function isFolioWork(id: string): id is FolioWorkId {
    return (FOLIO_WORK_IDS as readonly string[]).includes(id);
}

/** Two-digit plate number for a folio work id, e.g. selene → "01". */
export function plateNumberOf(id: string): string {
    const index = FOLIO_WORK_IDS.indexOf(id as FolioWorkId);
    return index === -1 ? '00' : String(index + 1).padStart(2, '0');
}

/**
 * Small-caps stage label per plate — factual descriptors drawn from each
 * project's own description, never invented marketing copy.
 */
export const PLATE_LABELS: Record<FolioWorkId, string> = {
    selene: 'Energy & climate dashboard',
    'flowpoint-next': 'Real-time energy monitor',
    flora: 'Environmental monitor',
    'eco-office': 'Office energy & temperature',
    'ecobin-sorter': 'Waste sorting bin',
    hydrolevi: 'Water level monitor'
};

/**
 * Real project screenshots from public/projects/ (captured 2026-09, owner
 * evidence — never fabricated). They only render inside ScreenshotMarquee,
 * which is aria-hidden decoration, so no alt text rides along with them.
 */
export const PROJECT_SHOTS: Record<
    FolioWorkId,
    { src: string; width: number; height: number }
> = {
    selene: { src: '/projects/Selene.png', width: 1440, height: 900 },
    'flowpoint-next': {
        src: '/projects/Flowpoint.png',
        width: 1440,
        height: 900
    },
    flora: { src: '/projects/Flora.png', width: 1440, height: 900 },
    'eco-office': {
        src: '/projects/EcoOffice.png',
        width: 1440,
        height: 900
    },
    'ecobin-sorter': {
        src: '/projects/EcoBin-Sorter.jpeg',
        width: 1440,
        height: 900
    },
    hydrolevi: {
        src: '/projects/HydroleVI.jpeg',
        width: 1440,
        height: 900
    }
};

/**
 * Category grouping for /folio (owner decision 2026-09-24; the Works
 * dropdown is retired): Web Apps and Internet of Things only. Category
 * names render in Bodoni Moda italic wherever they appear.
 */
export const WORK_CATEGORIES = [
    {
        id: 'web-apps',
        name: 'Web Apps',
        note: 'Dashboards and live data surfaces — browsers doing the watching.',
        works: ['selene', 'flowpoint-next'] as const
    },
    {
        id: 'iot',
        name: 'Internet of Things',
        note: 'Sensors, firmware, and the bins, tanks, and rooms they watch.',
        works: ['flora', 'eco-office', 'ecobin-sorter', 'hydrolevi'] as const
    }
] as const;

export type WorkCategoryId = (typeof WORK_CATEGORIES)[number]['id'];
