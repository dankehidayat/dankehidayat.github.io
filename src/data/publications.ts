/**
 * Publications shown in the compact list on the home page.
 *
 * PLACEHOLDER POLICY: no publications exist yet, so the list is empty and the
 * section stays hidden until Danke supplies real entries from his CV.
 *
 * To add one, push an object in this shape (most recent first is fine —
 * the page renders in array order):
 *
 * ```ts
 * {
 *     title: 'Example paper title',
 *     venue: 'Journal or conference name',
 *     date: '2025', // or 'Jan 2025'
 *     doi: '10.xxxx/xxxxx' // optional; omit if none
 * }
 * ```
 */
export type Publication = {
    title: string;
    venue: string;
    date: string;
    doi?: string;
};

export const publications: Publication[] = [];
