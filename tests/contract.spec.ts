import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { REPO_ROOT, expect, test } from './fixtures';

/**
 * Project invariants — the things that must never silently change because
 * nobody was looking at the diff.
 *
 * These read from disk rather than over HTTP on purpose: the build output
 * and the stylesheet are the artifacts under contract, and a passing HTTP
 * response would not prove anything about their contents.
 */

/** The seed that names the world. One occurrence, and it leads the body. */
const SEED = '68ad9b11';

async function collectHtml(dir: string, out: string[] = []): Promise<string[]> {
    let entries;
    try {
        entries = await readdir(dir, { withFileTypes: true });
    } catch {
        return out;
    }
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) await collectHtml(full, out);
        else if (entry.name.endsWith('.html')) out.push(full);
    }
    return out;
}

test.describe('the seed contract', () => {
    test('dist/index.html carries the seed exactly once, first thing in the body', async () => {
        const file = path.join(REPO_ROOT, 'dist', 'index.html');
        const html = await readFile(file, 'utf8');

        const occurrences = html.split(SEED).length - 1;
        expect(occurrences, `${file} must contain "${SEED}" exactly once, found ${occurrences}`).toBe(1);

        const bodyOpen = html.indexOf('<body');
        expect(bodyOpen, 'dist/index.html must have a <body>').toBeGreaterThan(-1);
        const bodyTagEnd = html.indexOf('>', bodyOpen) + 1;
        const bodyContent = html.slice(bodyTagEnd);

        // Inside the body…
        expect(html.indexOf(SEED), 'the seed must live inside <body>').toBeGreaterThan(bodyTagEnd);

        // …and it is the first thing in it. The only thing allowed between
        // the `<body>` tag and the seed is the opening of the comment that
        // carries it: no element, no text, no other node of any kind.
        const beforeSeed = bodyContent.slice(0, bodyContent.indexOf(SEED));
        const afterBodyTag = beforeSeed.replace(/^\s*/, '');
        expect(
            afterBodyTag,
            `<body> must be followed by the seed comment, got: ${JSON.stringify(
                afterBodyTag.slice(0, 80)
            )}`
        ).toMatch(/^<!--/);

        const commentBody = afterBodyTag.slice('<!--'.length);
        expect(
            commentBody.includes('<') || commentBody.includes('>'),
            'markup appears between the comment opener and the seed'
        ).toBe(false);

        // The comment that opens the body closes again, so the seed really
        // is inside it and not a stray token in the markup.
        const afterSeed = bodyContent.slice(bodyContent.indexOf(SEED));
        expect(
            afterSeed.indexOf('-->'),
            'the comment carrying the seed never closes'
        ).toBeGreaterThan(-1);
    });
});

test.describe('the font pin', () => {
    test('global.css imports the Bodoni Moda variable font and no optical-size build', async () => {
        const file = path.join(REPO_ROOT, 'src', 'styles', 'global.css');
        const css = await readFile(file, 'utf8');

        expect(
            css,
            'global.css must import @fontsource-variable/bodoni-moda (the variable build)'
        ).toMatch(/@import\s+'@fontsource-variable\/bodoni-moda'/);

        // The optical-size axis build is pinned off. Shipping `opsz.css`
        // alongside the variable build is what regressed the display type
        // once before; the wght-only import is deliberate.
        const opszImports = css.match(/@import[^;]*opsz[^;]*;/gi) ?? [];
        expect(
            opszImports,
            `global.css must not import any opsz build, found:\n${opszImports.join('\n')}`
        ).toEqual([]);
        expect(css, 'global.css must not reference an opsz.css at all').not.toMatch(/opsz\.css/i);
        expect(css, 'global.css must not reference opsz-italic').not.toMatch(/opsz-italic/i);

        // And nothing may re-pin the optical size by hand.
        const variationSettings = css.match(/font-variation-settings[^;]*;/gi) ?? [];
        const opticalOverrides = variationSettings.filter((rule) => /['"]?opsz['"]?\s*:?\s*\d/i.test(rule));
        expect(
            opticalOverrides,
            `global.css must not override the optical size axis, found:\n${opticalOverrides.join('\n')}`
        ).toEqual([]);
    });

    test('no stylesheet re-pins the optical size axis', async () => {
        const stylesDir = path.join(REPO_ROOT, 'src', 'styles');
        const files = (await readdir(stylesDir)).filter((f) => f.endsWith('.css'));
        expect(files.length, 'src/styles should hold the site stylesheets').toBeGreaterThan(0);

        const offenders: string[] = [];
        for (const name of files) {
            const css = await readFile(path.join(stylesDir, name), 'utf8');
            for (const rule of css.match(/font-variation-settings[^;]*;/gi) ?? []) {
                if (/['"]?opsz['"]?\s*:?\s*\d/i.test(rule)) offenders.push(`${name}: ${rule}`);
            }
            for (const rule of css.match(/@import[^;]*opsz[^;]*;/gi) ?? []) {
                offenders.push(`${name}: ${rule}`);
            }
        }
        expect(offenders, 'optical-size overrides or imports in the stylesheets').toEqual([]);
    });
});

test.describe('no image-generation artifacts', () => {
    test('no built HTML references a pollinations.ai URL', async () => {
        const dist = path.join(REPO_ROOT, 'dist');
        const files = await collectHtml(dist);
        expect(files.length, 'the build should have produced HTML').toBeGreaterThan(10);

        const offenders: string[] = [];
        for (const file of files) {
            const html = await readFile(file, 'utf8');
            if (/pollinations\.ai/i.test(html)) offenders.push(path.relative(REPO_ROOT, file));
            // The API host can also appear URL-encoded in a query string.
            if (/pollinations%2Eai/i.test(html)) offenders.push(path.relative(REPO_ROOT, file));
        }
        expect(
            [...new Set(offenders)],
            'built HTML still points at the image-generation service'
        ).toEqual([]);
    });
});
