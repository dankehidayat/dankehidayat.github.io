import { ROUTES, expect, focusViaKeyboard, focusableNavTarget, gotoAndSettle, test } from './fixtures';

/**
 * Accessibility suite — deterministic, hand-written checks.
 *
 * No @axe-core: every rule below is one this suite can state precisely and
 * keep stable. The decorative-image rule lives in `images.spec.ts`, where
 * the site's own convention (an aria-hidden container around a duplicated
 * screenshot band) is understood; here the rule is the floor — an <img>
 * must be inside the accessibility tree with an `alt`.
 */

/** Resolve the accessible name of an element the way a screen reader would. */
const ACCESSIBLE_NAME = `(() => {
    const labelFrom = (el) => el.getAttribute('aria-label') || '';
    const labelledBy = (el) => {
        const ids = (el.getAttribute('aria-labelledby') || '').split(/\\s+/).filter(Boolean);
        return ids
            .map((id) => document.getElementById(id))
            .filter(Boolean)
            .map((node) => (node.textContent || '').trim())
            .join(' ')
            .trim();
    };
    const ownText = (el) => {
        const clone = el.cloneNode(true);
        for (const hidden of clone.querySelectorAll('[aria-hidden="true"]')) hidden.remove();
        for (const img of clone.querySelectorAll('img')) {
            img.textContent = (img.getAttribute('alt') || '').trim();
        }
        return (clone.textContent || '').replace(/\\s+/g, ' ').trim();
    };
    return (el) => {
        const direct = labelFrom(el);
        if (direct.trim()) return direct.trim();
        const referenced = labelledBy(el);
        if (referenced) return referenced;
        const title = (el.getAttribute('title') || '').trim();
        if (ownText(el)) return ownText(el);
        if (el.tagName === 'INPUT' && (el.getAttribute('type') === 'submit' || el.getAttribute('type') === 'button')) {
            return ((el.getAttribute('value') || '').trim());
        }
        return title;
    };
})()`;

test.describe('document structure', () => {
    for (const route of ROUTES) {
        test(`${route.path} — one h1, no skipped heading levels, real landmarks`, async ({ page }) => {
            await gotoAndSettle(page, route.path);

            await expect(page.locator('h1'), `${route.path} h1 count`).toHaveCount(1);

            // Levels in document order; a jump of two or more is a skip.
            const levels = await page.evaluate(() =>
                [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((el) =>
                    Number(el.tagName.slice(1))
                )
            );
            expect(levels.length, `${route.path} should use headings`).toBeGreaterThan(0);
            expect(levels[0], `${route.path} first heading must be the h1`).toBe(1);

            const skips: string[] = [];
            for (let i = 1; i < levels.length; i += 1) {
                if (levels[i] - levels[i - 1] > 1) {
                    skips.push(`h${levels[i - 1]} -> h${levels[i]} at position ${i}`);
                }
            }
            expect(skips, `${route.path} heading level skips`).toEqual([]);

            await expect(page.locator('main'), `${route.path} <main>`).toHaveCount(1);
            await expect(page.locator('header'), `${route.path} <header>`).not.toHaveCount(0);
            await expect(page.locator('footer'), `${route.path} <footer>`).not.toHaveCount(0);
            await expect(page.locator('nav'), `${route.path} <nav>`).not.toHaveCount(0);
        });
    }
});

test.describe('interactive elements are named', () => {
    for (const route of ROUTES) {
        test(`${route.path} — every link and button has an accessible name`, async ({ page }) => {
            await gotoAndSettle(page, route.path);

            const unnamed = await page.evaluate((nameSource) => {
                // eslint-disable-next-line no-eval
                const accessibleName = eval(nameSource) as (el: Element) => string;
                return [...document.querySelectorAll('a, button')]
                    .filter((el) => el.getAttribute('aria-hidden') !== 'true')
                    .filter((el) => {
                        // A hidden control is out of the tree entirely.
                        if (el.hasAttribute('hidden')) return false;
                        if (el.closest('[hidden]')) return false;
                        if (el.closest('[aria-hidden="true"]')) return false;
                        return accessibleName(el) === '';
                    })
                    .map((el) => {
                        const classes =
                            typeof el.className === 'string' && el.className.trim()
                                ? `.${el.className.trim().split(/\s+/).slice(0, 2).join('.')}`
                                : '';
                        return `${el.tagName.toLowerCase()}${classes} href=${el.getAttribute('href') ?? ''}`;
                    });
            }, ACCESSIBLE_NAME);

            expect(unnamed, `${route.path} links/buttons with no accessible name`).toEqual([]);
        });
    }
});

test.describe('keyboard hygiene', () => {
    for (const route of ROUTES) {
        test(`${route.path} — no positive tabindex anywhere`, async ({ page }) => {
            await gotoAndSettle(page, route.path);
            const offenders = await page.evaluate(() =>
                [...document.querySelectorAll('[tabindex]')]
                    .filter((el) => Number(el.getAttribute('tabindex')) > 0)
                    .map(
                        (el) =>
                            `${el.tagName.toLowerCase()}[tabindex=${el.getAttribute('tabindex')}]` +
                            (el.id ? `#${el.id}` : '')
                    )
            );
            expect(offenders, `${route.path} positive tabindex values`).toEqual([]);
        });
    }
});

test.describe('document language', () => {
    for (const route of ROUTES) {
        test(`${route.path} — html lang is a real BCP-47 tag`, async ({ page }) => {
            await gotoAndSettle(page, route.path);
            const lang = await page.evaluate(() => document.documentElement.getAttribute('lang') ?? '');
            expect(lang.trim(), `${route.path} html lang must be set`).not.toBe('');
            // `en_US` is an underscore POSIX form, not a valid BCP-47 tag.
            expect(lang, `${route.path} html lang must not use the POSIX form`).not.toBe('en_US');
            expect(lang, `${route.path} html lang must be hyphen-separated BCP-47`).toMatch(
                /^[A-Za-z]{2,3}(-[A-Za-z0-9]{2,8})*$/
            );
        });
    }
});

test.describe('images', () => {
    for (const route of ROUTES) {
        test(`${route.path} — every <img> has an alt attribute`, async ({ page }) => {
            await gotoAndSettle(page, route.path);
            const missing = await page.evaluate(() =>
                [...document.querySelectorAll('img')]
                    .filter((el) => !el.hasAttribute('alt'))
                    .map((el) => el.getAttribute('src') ?? '(no src)')
            );
            expect(missing, `${route.path} images with no alt attribute`).toEqual([]);
        });
    }
});

test.describe('focus visibility', () => {
    for (const route of ROUTES) {
        test(`${route.path} — a focused nav control shows a visible focus indicator`, async ({ page }) => {
            await gotoAndSettle(page, route.path);

            // The running head is the first thing a keyboard user reaches
            // after the skip link, so it is the right place to prove the
            // ring. Below 900px the strip links are display:none and the
            // nav's own affordance is the menu button.
            const target = await focusableNavTarget(page);
            await expect(target, `${route.path} nav focus target`).toBeVisible();

            // Reach it with real key presses: :focus-visible only matches
            // keyboard-driven focus, so a programmatic .focus() would not
            // exercise the rule at all.
            const presses = await focusViaKeyboard(page, target);
            expect(
                presses,
                `${route.path}: ${route.path === '/' ? 'the running head' : 'the nav control'} is never reached ` +
                    'by tabbing — it is not keyboard reachable'
            ).toBeGreaterThan(0);
            await expect(target, `${route.path} nav control must be keyboard focusable`).toBeFocused();

            const styles = await target.evaluate((el) => {
                const computed = window.getComputedStyle(el);
                return {
                    matchesFocusVisible: el.matches(':focus-visible'),
                    outlineStyle: computed.outlineStyle,
                    outlineWidth: computed.outlineWidth,
                    outlineColor: computed.outlineColor,
                    boxShadow: computed.boxShadow,
                    borderColor: computed.borderTopColor,
                    borderWidth: computed.borderTopWidth
                };
            });

            expect(
                styles.matchesFocusVisible,
                `${route.path}: nav control did not match :focus-visible after keyboard focus`
            ).toBe(true);

            const hasOutline = styles.outlineStyle !== 'none' && parseFloat(styles.outlineWidth) > 0;
            const hasShadow = styles.boxShadow !== 'none' && styles.boxShadow !== '';
            const borderWidth = parseFloat(styles.borderWidth) || 0;

            expect(
                hasOutline || hasShadow || borderWidth > 0,
                `${route.path}: focused nav control has no visible focus indicator — ` +
                    `outline=${styles.outlineStyle} ${styles.outlineWidth}, ` +
                    `box-shadow=${styles.boxShadow}, border=${styles.borderWidth} ${styles.borderColor}`
            ).toBe(true);
        });
    }
});
