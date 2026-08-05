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
    // TODO: confirm from CV — software engineering roles started Oct 2025;
    // earlier roles (testing, data, IT) reach back to 2020. Pick the framing you want.
    { value: '2+', label: 'Years as a developer' },
    // Verifiable: 6 curated project entries in src/content/projects/.
    { value: '6', label: 'Projects built' },
    // Verifiable: 11 certification records in src/data/certifications.ts.
    { value: '11', label: 'Certifications' }
];
