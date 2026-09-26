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
 * Real project screenshots (captured 2026-09, owner evidence — never
 * fabricated). Static imports through the Astro asset pipeline, so each one
 * gets a width laddered `srcset` in ScreenshotMarquee; they used to travel
 * whole out of public/, which put a 5.6MB PNG in an aria-hidden decorative
 * band. No alt text rides along — the marquee is decoration.
 */
import ecoBinSorter from '../assets/images/projects/EcoBin-Sorter.jpeg';
import ecoOffice from '../assets/images/projects/EcoOffice.png';
import floraShot from '../assets/images/projects/Flora.png';
import flowpointShot from '../assets/images/projects/Flowpoint.png';
import hydroleviShot from '../assets/images/projects/HydroleVI.jpeg';
import seleneShot from '../assets/images/projects/Selene.png';

export const PROJECT_SHOTS: Record<FolioWorkId, ImageMetadata> = {
    selene: seleneShot,
    'flowpoint-next': flowpointShot,
    flora: floraShot,
    'eco-office': ecoOffice,
    'ecobin-sorter': ecoBinSorter,
    hydrolevi: hydroleviShot
};

/**
 * What each shot actually shows, read off the master's own pixels (opened
 * 2026-09-26) — never inferred from the file name. Three of the six are
 * dashboard captures; the other three are photographs of the hardware and of
 * the people who built it, so the caption stamp and the alt text say which
 * instead of calling every one of them a screenshot.
 */
export type ShotPlate = { stamp: string; alt: string };
export const SHOT_PLATES: Record<string, ShotPlate> = {
    selene: {
        stamp: 'Screenshot · dashboard',
        alt: 'The Selene dashboard: energy cards reading AC voltage, AC current, AC power and estimated cost above an energy-usage line chart, with a climate-history chart and a comfort summary below.'
    },
    'flowpoint-next': {
        stamp: 'Screenshot · dashboard',
        alt: 'The Flowpoint dashboard: a comfort status of Fair, environmental metrics for temperature and humidity, energy metrics for active power and power factor, and a daily energy estimate.'
    },
    flora: {
        stamp: 'Screenshot · dashboard',
        alt: 'The Flora dashboard: temperature, humidity, pressure and altitude readings under environmental sensors, and three soil-moisture gauges for Soil 1, Soil 2 and Soil 3.'
    },
    'eco-office': {
        stamp: 'Photograph · the unit',
        alt: 'The Eco Office unit on a workbench: a black enclosure with a blue-lit LCD screen, cables running from its side.'
    },
    'ecobin-sorter': {
        stamp: 'Photograph · the machine',
        alt: 'The sorting machine standing in a lab with the project team gathered around it, a laptop open on top of the unit.'
    },
    hydrolevi: {
        stamp: 'Photograph · the team',
        alt: 'The project team posing outdoors beside a HydroleVi banner.'
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
        note: 'Dashboards and live data surfaces: browsers doing the watching.',
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
