/**
 * Stats bar numbers shown under the About summary on the home page.
 *
 * PLACEHOLDER POLICY: only repo-verifiable numbers are set below.
 * Anything marked with a `// TODO: confirm from CV` comment must be
 * replaced by Danke before launch. Never leave an unverified claim live.
 */
export type Stat = {
    value: string;
    label: string;
};

export const stats: Stat[] = [
    // Verifiable: 6 curated project entries in src/content/projects/.
    { value: '6', label: 'Projects I shipped' },
    // Verifiable: 11 certification records in src/data/certifications.ts.
    { value: '11', label: 'Certifications' }
];
