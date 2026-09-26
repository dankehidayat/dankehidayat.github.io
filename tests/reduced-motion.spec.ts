import { expect, gotoAndSettle, settle, test } from './fixtures';

/**
 * Reduced-motion suite.
 *
 * Runs only in the `reduced-motion` project, whose context sets
 * `reducedMotion: 'reduce'`. `src/scripts/motion.ts` gates every GSAP
 * timeline behind `reduced()`, so the contract is simple and absolute:
 * nothing it would have animated carries a transform, and nothing carries
 * a GSAP-written inline `transform`.
 *
 * `MOTION_SELECTOR` is the same attribute list motion.ts uses to clear
 * inline styles on teardown, so the two can never drift apart silently.
 */
const MOTION_SELECTOR =
    '[data-hero-item], [data-hero-plate], [data-title-letter], [data-head], [data-row], [data-plate], [data-reveal], [data-growth-node], [data-fan-item], [data-filmstrip-track], [data-wall-card]';

const ROUTES_TO_CHECK = ['/', '/folio', '/florilegium', '/atelier'] as const;

/** `transform: none` and the identity matrix are both "no motion". */
const IDENTITY_TRANSFORMS = new Set(['none', 'matrix(1, 0, 0, 1, 0, 0)', 'matrix(1, 0, 0, 1, 0, 0)']);

test.describe('motion is disabled', () => {
    for (const route of ROUTES_TO_CHECK) {
        test(`${route} — the media query is actually in force`, async ({ page }) => {
            await gotoAndSettle(page, route);
            expect(
                await page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches),
                `${route} is not running with reduced motion`
            ).toBe(true);
        });

        test(`${route} — no motion target carries a transform`, async ({ page }) => {
            await gotoAndSettle(page, route);
            // Give the deferred motion module a beat to (not) boot.
            await settle(page);

            const offenders = await page.evaluate((selector) => {
                const rows: Array<{ label: string; transform: string }> = [];
                for (const el of document.querySelectorAll<HTMLElement>(selector)) {
                    const computed = window.getComputedStyle(el).transform;
                    if (computed === 'none' || computed === 'matrix(1, 0, 0, 1, 0, 0)') continue;
                    const classes = (el.className || '').trim().split(/\s+/).slice(0, 2).join('.');
                    rows.push({ label: `${el.tagName.toLowerCase()}${classes ? `.${classes}` : ''}`, transform: computed });
                }
                return rows;
            }, MOTION_SELECTOR);

            expect(
                offenders.map((o) => `${o.label} computed transform: ${o.transform}`),
                `${route}: elements the motion system animates still carry a transform under reduced motion`
            ).toEqual([]);
        });

        test(`${route} — no GSAP inline transform styles are present`, async ({ page }) => {
            await gotoAndSettle(page, route);
            await settle(page);

            const inline = await page.evaluate((selector) => {
                const rows: string[] = [];
                const all = [...document.querySelectorAll<HTMLElement>(selector)];
                // Include the elements GSAP touches transitively: SplitText
                // writes transforms on the words/chars it creates.
                for (const el of all) {
                    const style = el.getAttribute('style') ?? '';
                    if (!/(^|;)\s*(transform|-webkit-transform|translate|rotate|scale)\s*:/i.test(style)) continue;
                    const classes = (el.className || '').trim().split(/\s+/).slice(0, 2).join('.');
                    rows.push(`${el.tagName.toLowerCase()}${classes ? `.${classes}` : ''} style="${style}"`);
                }
                return rows;
            }, MOTION_SELECTOR);

            expect(
                inline,
                `${route}: inline transform styles written into motion targets under reduced motion`
            ).toEqual([]);
        });
    }
});

test.describe('the page is still fully readable', () => {
    for (const route of ROUTES_TO_CHECK) {
        test(`${route} — headings and body copy are visible and unpainted`, async ({ page }) => {
            await gotoAndSettle(page, route);

            const report = await page.evaluate(() => {
                const hiddenHeadings: string[] = [];
                for (const el of document.querySelectorAll<HTMLElement>('main h1, main h2, main h3')) {
                    const rect = el.getBoundingClientRect();
                    const style = window.getComputedStyle(el);
                    if (
                        rect.width === 0 ||
                        rect.height === 0 ||
                        style.visibility === 'hidden' ||
                        style.display === 'none' ||
                        Number(style.opacity) < 0.05
                    ) {
                        hiddenHeadings.push(`${el.tagName.toLowerCase()} "${(el.textContent ?? '').trim().slice(0, 40)}"`);
                    }
                }
                const invisibleParagraphs = [...document.querySelectorAll<HTMLElement>('main p')]
                    .filter((el) => {
                        if (!(el.textContent ?? '').trim()) return false;
                        if (el.getAttribute('aria-hidden') === 'true') return false;
                        // Deliberately not rendered by the page itself (e.g.
                        // the florilegium's "nothing filed under this label"
                        // panel, which carries [hidden] until a filter empties
                        // the drawer). That is authored state, not motion.
                        if (el.closest('[hidden]')) return false;
                        const rect = el.getBoundingClientRect();
                        const style = window.getComputedStyle(el);
                        return (
                            rect.width === 0 ||
                            rect.height === 0 ||
                            style.visibility === 'hidden' ||
                            style.display === 'none' ||
                            Number(style.opacity) < 0.05
                        );
                    })
                    .map((el) => `"${(el.textContent ?? '').trim().slice(0, 40)}"`);

                return {
                    hiddenHeadings,
                    invisibleParagraphs,
                    bodyTextLength: (document.body.innerText || '').replace(/\s+/g, '').length,
                    h1: document.querySelector('h1')?.getBoundingClientRect()
                };
            });

            expect(report.hiddenHeadings, `${route}: headings not rendered`).toEqual([]);
            expect(report.invisibleParagraphs, `${route}: body copy not rendered`).toEqual([]);
            expect(report.h1, `${route}: the h1 has no box`).not.toBeNull();
            expect(report.h1?.width ?? 0, `${route}: the h1 has no width`).toBeGreaterThan(0);
            expect(report.h1?.height ?? 0, `${route}: the h1 has no height`).toBeGreaterThan(0);
            expect(
                report.bodyTextLength,
                `${route}: the page is effectively empty under reduced motion (${report.bodyTextLength} characters)`
            ).toBeGreaterThan(1500);
        });
    }
});
