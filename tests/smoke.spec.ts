import {
    ROUTES,
    expect,
    formatIssues,
    gotoAndSettle,
    mapWithConcurrency,
    test
} from './fixtures';

/**
 * Smoke suite — the floor every release stands on.
 *
 * For every route: it exists, it identifies itself, it announces itself to
 * crawlers, it runs clean, and nothing it links to is broken.
 */

test.describe('routes return 200 with the expected heading', () => {
    for (const route of ROUTES) {
        test(`${route.path} serves 200 and one level-1 heading`, async ({ page, pageIssues }) => {
            const response = await gotoAndSettle(page, route.path);
            expect(response, `${route.path} did not return a response`).not.toBeNull();
            expect(response?.status(), `${route.path} HTTP status`).toBe(200);

            const h1 = page.getByRole('heading', { level: 1 });
            await expect(h1, `${route.path} must expose exactly one h1`).toHaveCount(1);
            await expect(h1, `${route.path} h1 accessible name`).toHaveAccessibleName(route.h1);
            if (route.note) {
                test.info().annotations.push({ type: 'note', description: route.note });
            }

            // `pageIssues` is asserted here so a module that throws while the
            // document boots is caught on every route, not just the first.
            expect(pageIssues, `console/page errors on ${route.path}:\n${formatIssues(pageIssues)}`).toEqual(
                []
            );
        });
    }
});

test.describe('document head is complete and non-empty', () => {
    for (const route of ROUTES) {
        test(`${route.path} declares title, description and canonical`, async ({ page }) => {
            await gotoAndSettle(page, route.path);

            const title = await page.title();
            expect(title.trim(), `${route.path} <title>`).not.toBe('');

            const description = page.locator('meta[name="description"]');
            await expect(description, `${route.path} meta[name=description]`).toHaveCount(1);
            const descriptionContent = (await description.getAttribute('content')) ?? '';
            expect(descriptionContent.trim(), `${route.path} description content`).not.toBe('');

            const canonical = page.locator('link[rel="canonical"]');
            await expect(canonical, `${route.path} link[rel=canonical]`).toHaveCount(1);
            const canonicalHref = (await canonical.getAttribute('href')) ?? '';
            expect(canonicalHref.trim(), `${route.path} canonical href`).not.toBe('');
            expect(canonicalHref, `${route.path} canonical must be absolute`).toMatch(/^https?:\/\//);
        });
    }
});

test.describe('social cards are present', () => {
    for (const route of ROUTES) {
        test(`${route.path} carries Open Graph and Twitter card tags`, async ({ page }) => {
            await gotoAndSettle(page, route.path);

            const requiredOpenGraph = [
                'meta[property="og:type"]',
                'meta[property="og:url"]',
                'meta[property="og:title"]',
                'meta[property="og:description"]',
                'meta[property="og:image"]'
            ];
            for (const selector of requiredOpenGraph) {
                const tag = page.locator(selector);
                await expect(tag, `${route.path} ${selector}`).toHaveCount(1);
                const content = (await tag.getAttribute('content')) ?? '';
                expect(content.trim(), `${route.path} ${selector} content`).not.toBe('');
            }

            const twitterCard = page.locator('meta[name="twitter:card"]');
            await expect(twitterCard, `${route.path} meta[name=twitter:card]`).toHaveCount(1);
            expect(((await twitterCard.getAttribute('content')) ?? '').trim()).not.toBe('');

            // og:url and the canonical link must name the same document.
            const canonical = (await page.locator('link[rel="canonical"]').getAttribute('href')) ?? '';
            const ogUrl = (await page.locator('meta[property="og:url"]').getAttribute('content')) ?? '';
            expect(ogUrl, `${route.path} og:url must match canonical`).toBe(canonical);
        });
    }
});

test.describe('internal links resolve', () => {
    for (const route of ROUTES) {
        test(`${route.path} has no broken internal links`, async ({ page, request }) => {
            await gotoAndSettle(page, route.path);

            const hrefs = await page.evaluate(() => {
                const found = new Set<string>();
                for (const anchor of document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]')) {
                    const href = anchor.getAttribute('href');
                    if (!href || href.startsWith('//')) continue;
                    // Drop query/hash: the link check is about the document.
                    found.add(href.split('#')[0].split('?')[0]);
                }
                return [...found].filter((href) => href.length > 0);
            });

            expect(hrefs.length, `${route.path} should link somewhere`).toBeGreaterThan(0);

            const broken = await mapWithConcurrency(hrefs, 8, async (href) => {
                const response = await request.get(href, { maxRedirects: 0 });
                return response.status() >= 400 ? `${href} -> ${response.status()}` : null;
            });

            expect(
                broken.filter(Boolean),
                `broken internal links on ${route.path}:\n${broken.filter(Boolean).join('\n')}`
            ).toEqual([]);
        });
    }
});

test.describe('in-page anchors resolve', () => {
    for (const route of ROUTES) {
        test(`${route.path} in-page anchors point at real elements`, async ({ page }) => {
            await gotoAndSettle(page, route.path);

            const fragments = await page.evaluate(() => {
                const found = new Set<string>();
                for (const anchor of document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
                    const href = anchor.getAttribute('href') ?? '';
                    // `href="#"` is the empty fragment — "top of this
                    // document", not a named target, so it has nothing to
                    // resolve against. (The atelier gallery link uses it and
                    // stays `hidden` until its script fills it in.)
                    if (href.length < 2) continue;
                    found.add(href.slice(1));
                }
                return [...found];
            });

            expect(fragments.length, `${route.path} should have in-page anchors`).toBeGreaterThan(0);

            const missing = await page.evaluate(
                (ids) => ids.filter((id) => !document.getElementById(id)),
                fragments
            );

            expect(
                missing,
                `in-page anchors on ${route.path} with no target element: ${missing.join(', ')}`
            ).toEqual([]);
        });
    }
});
