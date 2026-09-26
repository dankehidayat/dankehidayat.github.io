/**
 * Extra lily plates — the five botanical accents added 2026-09-25
 * (owner: "download more lily flowers to put outside the home and works
 * page"). Static imports through the Astro asset pipeline, same pattern as
 * folio-plates.ts; species / alt / credit are read from
 * src/assets/images/folio/extra-lilies.json so a page can never drift from
 * the manifest (CREDITS.md carries the full credit lines).
 *
 * Round 4 (owner): the home-page placements were retired; these now sit
 * on /folio (the hero title plate + colophon) and rotate as the margin
 * plate on each plate-detail page — always OUTSIDE the six-works plate
 * grids, so they never compete with the numbered plates.
 */
import type { FolioPlateImage } from './folio-plates';

import liliumBulbiferum from '../assets/images/folio/lilium-bulbiferum-redoute.jpg';
import liliumCandidum from '../assets/images/folio/lilium-candidum-curtis.webp';
import liliumCatesbaei from '../assets/images/folio/lilium-catesbaei-curtis.webp';
import liliumChalcedonicum from '../assets/images/folio/lilium-chalcedonicum-redoute.jpg';
import liliumSuperbum from '../assets/images/folio/lilium-superbum-redoute.jpg';
import manifest from '../assets/images/folio/extra-lilies.json';

/** Plate image + the manifest's own species/alt/credit fields. */
export type ExtraLilyPlate = FolioPlateImage & {
    species: string;
    credit: string;
    /** Short caption line derived from `credit` ("Curtis · pl. 280"). */
    source: string;
};

/** Static-imported imagery keyed by the manifest's `file` name. */
const imagery: Record<string, ImageMetadata> = {
    'lilium-candidum-curtis.webp': liliumCandidum,
    'lilium-catesbaei-curtis.webp': liliumCatesbaei,
    'lilium-chalcedonicum-redoute.jpg': liliumChalcedonicum,
    'lilium-bulbiferum-redoute.jpg': liliumBulbiferum,
    'lilium-superbum-redoute.jpg': liliumSuperbum
};

/** Small-caps caption source, compressed from the manifest credit line. */
function shortSource(credit: string): string {
    const curtis = credit.match(/^Curtis's Botanical Magazine, (pl\. \d+)/);
    if (curtis) return `Curtis · ${curtis[1]}`;
    if (credit.startsWith('Redouté')) return 'Redouté · Les liliacées';
    return credit;
}

function fromManifest(file: string): ExtraLilyPlate {
    const entry = manifest.find((row) => row.file === file);
    const src = imagery[file];
    if (!entry || !src) {
        throw new Error(`extra-lilies: no manifest row / imagery for ${file}`);
    }
    return {
        src,
        species: entry.species,
        alt: entry.alt,
        credit: entry.credit,
        source: shortSource(entry.credit)
    };
}

/** The five accents, keyed for call sites. Alt text is verbatim from the manifest. */
export const EXTRA_LILIES = {
    /** Curtis's Botanical Magazine pl. 280 — plate-detail margin rotation. */
    candidum: fromManifest('lilium-candidum-curtis.webp'),
    /** Curtis's Botanical Magazine pl. 261 — /folio hero title plate. */
    catesbaei: fromManifest('lilium-catesbaei-curtis.webp'),
    /** Redouté, Les liliacées — plate-detail margin rotation. */
    chalcedoncum: fromManifest('lilium-chalcedonicum-redoute.jpg'),
    /** Redouté, Les liliacées — plate-detail margin rotation. */
    bulbiferum: fromManifest('lilium-bulbiferum-redoute.jpg'),
    /** Redouté, Les liliacées — /folio colophon plate. */
    superbum: fromManifest('lilium-superbum-redoute.jpg')
} satisfies Record<string, ExtraLilyPlate>;

/** Stable order — lets the plate-detail pages rotate one margin lily each. */
export const EXTRA_LILY_ORDER: ExtraLilyPlate[] = [
    EXTRA_LILIES.candidum,
    EXTRA_LILIES.catesbaei,
    EXTRA_LILIES.chalcedoncum,
    EXTRA_LILIES.bulbiferum,
    EXTRA_LILIES.superbum
];
