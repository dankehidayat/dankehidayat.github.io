import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { test as base, expect, type Locator, type Page, type Response } from '@playwright/test';

/**
 * Shared fixtures and helpers for the site's automation suite.
 *
 * Two things are centralised here so no spec has to re-implement them:
 *   1. the console/page-error collector (attached *before* the first goto,
 *      so a module that throws on evaluation is caught);
 *   2. navigation helpers that know about Astro's ClientRouter view
 *      transitions, so a soft-navigation assertion never races the swap.
 */

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export { REPO_ROOT };

/* ───────────────────────────── route inventory ────────────────────────── */

export type RouteCase = {
    /** Site-relative path, exactly as the router serves it. */
    path: string;
    /** Accessible name of the page's single level-1 heading. */
    h1: string;
    /** Documented reason when the h1 is not the obvious literal string. */
    note?: string;
};

/**
 * The routes every cross-cutting suite walks. Slugs are real: the folio
 * slugs come from `FOLIO_WORK_IDS` in `src/data/works.ts`, the florilegium
 * slugs from `src/content/shelf/*.mdx`. Nothing here is invented — a typo
 * would show up as a 404 in the smoke suite.
 */
export const ROUTES: readonly RouteCase[] = [
    {
        path: '/',
        h1: 'Danke Hidayat',
        note: 'The home title plate splits the visible glyphs into aria-hidden letter spans, so the h1 exposes an aria-label rather than text content.'
    },
    { path: '/folio', h1: 'The folio.' },
    { path: '/folio/selene', h1: 'Selene' },
    { path: '/folio/flora', h1: 'Flora' },
    { path: '/folio/flowpoint-next', h1: 'FlowPoint-Next' },
    { path: '/florilegium', h1: 'The florilegium.' },
    { path: '/florilegium/lycoris-recoil', h1: 'Lycoris Recoil' },
    { path: '/florilegium/max-havelaar', h1: 'Max Havelaar' },
    { path: '/atelier', h1: 'The atelier.' },
    { path: '/404', h1: 'Page not found' }
] as const;

/* ───────────────────────── console / page-error collector ─────────────── */

export type IssueSink = string[];

/**
 * The `pageIssues` fixture collects every `console.error` and uncaught
 * exception for the lifetime of the page. It is wired as a fixture (not
 * called by hand in each spec) so the listeners are guaranteed to be
 * installed before the test body can issue its first `goto`.
 */
export const test = base.extend<{ pageIssues: IssueSink }>({
    pageIssues: async ({ page }, use) => {
        const issues: IssueSink = [];
        page.on('console', (message) => {
            if (message.type() === 'error') issues.push(`console.error: ${message.text()}`);
        });
        page.on('pageerror', (error) => {
            issues.push(`pageerror: ${error.message}`);
        });
        await use(issues);
    }
});

export { expect };

/** Human-readable issue report, or an empty string when the page was clean. */
export function formatIssues(issues: IssueSink): string {
    return issues.length ? issues.map((i) => `  - ${i}`).join('\n') : '  (none)';
}

/* ───────────────────────────── navigation helpers ──────────────────────── */

/**
 * Navigate and let the document settle.
 *
 * `defer-motion.ts` hands the motion bundle off on the frame after `load`,
 * so waiting for `load` alone can land the assertion a frame or two before
 * GSAP has written its first inline style. Two rAFs past `load` (plus
 * `document.fonts.ready`, which the preloaded woff2 faces depend on) is the
 * point where the page is genuinely at rest.
 */
export async function gotoAndSettle(page: Page, routePath: string): Promise<Response | null> {
    const response = await page.goto(routePath, { waitUntil: 'load' });
    await settle(page);
    return response;
}

/** Wait for a fully painted, non-reflowing document. */
export async function settle(page: Page): Promise<void> {
    await page.evaluate(async () => {
        await document.fonts.ready;
        await new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        );
    });
}

/**
 * Click an internal link and wait for Astro's ClientRouter swap to finish.
 *
 * `astro:after-swap` is the authoritative "the DOM has been replaced"
 * signal; the `[data-astro-transition-scope]` poll covers the case where
 * the event was already dispatched before this helper's listener was
 * installed (a very fast swap) — the two together make the wait immune to
 * how quick the navigation resolves.
 *
 * Pass a `Locator` to click a specific link, or a nav link's visible name
 * to let the helper resolve the right affordance for the current width.
 */
export async function softNavigate(page: Page, target: Locator | string): Promise<void> {
    await page.evaluate(() => {
        const w = window as unknown as { __afterSwapCount?: number };
        w.__afterSwapCount = 0;
        document.addEventListener('astro:after-swap', () => {
            w.__afterSwapCount = (w.__afterSwapCount ?? 0) + 1;
        });
    });

    if (typeof target === 'string') {
        await clickNavLink(page, target);
    } else {
        await target.click();
    }

    await page.waitForFunction(
        () => ((window as unknown as { __afterSwapCount?: number }).__afterSwapCount ?? 0) > 0,
        undefined,
        { timeout: 20_000 }
    );
    await page.waitForFunction(() => !document.querySelector('[data-astro-transition-scope]'), undefined, {
        timeout: 20_000
    });
    await settle(page);
}

/* ─────────────────────────── responsive nav helpers ────────────────────── */

/**
 * Below 900px the running head collapses: the start group is `display:none`
 * and the remaining links move into the full-screen contents sheet. These
 * helpers pick whichever affordance is actually on screen at the current
 * width, so a "click the Folio nav link" test means the same thing on a
 * 1440px desktop and on a Pixel 7.
 */

/** The menu button that opens the mobile contents sheet. */
export const menuButton = (page: Page) => page.locator('.site-menu-btn');

/** The mobile contents sheet. */
export const mobileSheet = (page: Page) => page.locator('#site-mobile');

/** Open the mobile contents sheet and wait for it to be usable. */
export async function openMobileMenu(page: Page): Promise<void> {
    const button = menuButton(page);
    if ((await button.getAttribute('aria-expanded')) === 'true') {
        // Already open (a theme flip in the sheet footer leaves it open) —
        // reopening would toggle it shut.
        await expect(mobileSheet(page)).toBeVisible();
        return;
    }
    await expect(button).toHaveAttribute('aria-label', 'Open menu');
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(mobileSheet(page)).toHaveClass(/\bis-open\b/);
    await expect(mobileSheet(page)).toBeVisible();
}

/** Close the mobile contents sheet with the Escape key. */
export async function closeMobileMenuWithEscape(page: Page): Promise<void> {
    await page.keyboard.press('Escape');
    await expect(menuButton(page)).toHaveAttribute('aria-expanded', 'false');
    await expect(mobileSheet(page)).not.toHaveClass(/\bis-open\b/);
}

/**
 * Click a primary-navigation link by visible name at any viewport width.
 * Resolves the link in the desktop strip when it is on screen, otherwise
 * opens the contents sheet and clicks the same entry there.
 */
export async function clickNavLink(page: Page, name: string): Promise<void> {
    const strip = page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name, exact: true });
    if (await strip.isVisible()) {
        await strip.click();
        return;
    }
    const endStrip = page.getByRole('navigation', { name: 'More' }).getByRole('link', { name, exact: true });
    if (await endStrip.isVisible()) {
        await endStrip.click();
        return;
    }
    await openMobileMenu(page);
    await mobileSheet(page).getByRole('link', { name, exact: true }).click();
}

/**
 * Reach an element with real Tab presses and report how many it took.
 *
 * `:focus-visible` only matches keyboard-driven focus, so a programmatic
 * `.focus()` cannot exercise the rule — and a fixed "Tab, Tab, Shift+Tab"
 * dance depends on whatever else happens to sit in the tab order on that
 * particular page. Walking the tab order until the target is hit proves
 * both things at once: the control is keyboard reachable, and its focus
 * came from the keyboard. Returns -1 when the target is never reached.
 */
export async function focusViaKeyboard(page: Page, target: Locator, maxPresses = 40): Promise<number> {
    await page.evaluate(() => {
        const active = document.activeElement;
        if (active instanceof HTMLElement) active.blur();
    });
    for (let presses = 1; presses <= maxPresses; presses += 1) {
        await page.keyboard.press('Tab');
        const hit = await target.evaluate((el) => el === document.activeElement);
        if (hit) return presses;
    }
    return -1;
}

export async function focusableNavTarget(page: Page) {
    const strip = page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'About' });
    if (await strip.isVisible()) return strip;
    return menuButton(page);
}
/**
 * The theme toggle the user can actually reach at the current width.
 *
 * Owner amendment 2026-09-25: below 900px the strip's toggle is
 * `display:none` and the control moves into the mobile sheet footer, so a
 * test that wants to flip the theme on a phone has to open the sheet first.
 * Returns a locator that is already visible.
 */
export async function reachableThemeToggle(page: Page): Promise<Locator> {
    const strip = page.locator('.site-nav-inner [data-theme-toggle]');
    if (await strip.isVisible()) {
        await expect(strip, 'the strip carries exactly one theme toggle').toHaveCount(1);
        return strip;
    }
    await openMobileMenu(page);
    const sheetToggle = mobileSheet(page).locator('[data-theme-toggle]');
    await expect(sheetToggle, 'the sheet footer carries exactly one theme toggle').toHaveCount(1);
    await expect(sheetToggle, 'the sheet theme toggle must be reachable').toBeVisible();
    return sheetToggle;
}

/**
 * Write a value into `localStorage` before any document on this origin runs.
 * `addInitScript` survives the soft navigations the theme suite performs,
 * which is exactly the persistence being tested.
 */
export async function seedStorage(page: Page, entries: Record<string, string>): Promise<void> {
    await page.addInitScript((pairs: Array<[string, string]>) => {
        for (const [key, value] of pairs) window.localStorage.setItem(key, value);
    }, Object.entries(entries));
}

/** Read a `localStorage` key, or null when unset / inaccessible. */
export function readStorage(page: Page, key: string): Promise<string | null> {
    return page.evaluate((k) => window.localStorage.getItem(k), key);
}

/** `document.documentElement`'s resolved theme attribute. */
export function currentTheme(page: Page): Promise<string | null> {
    return page.evaluate(() => document.documentElement.getAttribute('data-theme'));
}

/** The resolved `background-color` of `<body>`, e.g. `rgb(246, 241, 230)`. */
export function bodyBackground(page: Page): Promise<string> {
    return page.evaluate(() => getComputedStyle(document.body).backgroundColor);
}

/**
 * The current path with a single trailing slash, so `/folio` and `/folio/`
 * compare equal — the running head's hrefs are written without the slash
 * and the router serves either form.
 */
export function pathnameOf(page: Page): string {
    const path = new URL(page.url()).pathname;
    return path.length > 1 ? path.replace(/\/$/, '') : path;
}

/* ───────────────────────────── image helpers ───────────────────────────── */

export type SrcsetEntry = { url: string; descriptor: string };

/** Parse a `srcset` attribute into its candidates. */
export function parseSrcset(value: string | null | undefined): SrcsetEntry[] {
    if (!value) return [];
    return value
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => {
            const [url, ...rest] = part.split(/\s+/);
            return { url, descriptor: rest.join(' ') };
        })
        .filter((entry) => Boolean(entry.url));
}

/** The pixel width a `w` descriptor asks for, or null for `x`-style entries. */
export function descriptorWidth(descriptor: string): number | null {
    const match = /^(\d+(?:\.\d+)?)w$/.exec(descriptor.trim());
    return match ? Number(match[1]) : null;
}

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg', '.tiff']);

/**
 * Real intrinsic widths of every master under `src/assets/images/**`, keyed
 * by file basename without extension.
 *
 * The built asset names carry the source basename as a prefix
 * (`/_astro/EcoOffice.CbGMgwaT_ZGF2wh.webp` ← `projects/EcoOffice.png`), so
 * this map is what lets the images suite check a `srcset` width descriptor
 * against the master it was generated from instead of against a guess.
 */
let sourceWidthsPromise: Promise<Map<string, number>> | null = null;

async function collectSourceWidths(root: string): Promise<Map<string, number>> {
    const out = new Map<string, number>();
    const queue: string[] = [root];
    while (queue.length) {
        const dir = queue.pop() as string;
        let entries;
        try {
            entries = await readdir(dir, { withFileTypes: true });
        } catch {
            continue;
        }
        for (const entry of entries) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                queue.push(full);
                continue;
            }
            if (!IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) continue;
            try {
                const meta = await sharp(full).metadata();
                if (typeof meta.width === 'number') out.set(path.basename(entry.name, path.extname(entry.name)), meta.width);
            } catch {
                // Unreadable master — simply not resolvable for this check.
            }
        }
    }
    return out;
}

export function sourceImageWidths(): Promise<Map<string, number>> {
    sourceWidthsPromise ??= collectSourceWidths(path.join(REPO_ROOT, 'src', 'assets', 'images'));
    return sourceWidthsPromise;
}

/**
 * The master basename a built `/_astro/...` URL was generated from, or null
 * when the file is not an Astro image transform output.
 */
export function sourceKeyFor(builtUrl: string): string | null {
    const file = builtUrl.split('?')[0].split('/').pop();
    if (!file) return null;
    const base = file.split('.')[0];
    return base || null;
}

/**
 * The narrowest rung any of the site's ladders in
 * `src/lib/responsive-image.ts` can emit is 200w, but every ladder that
 * serves a screenshot band or a specimen plate bottoms out at 320w. A
 * master narrower than this cannot produce two candidates without
 * upscaling, which the same suite forbids — so single-candidate ladders are
 * only tolerated below this floor and are always reported.
 */
export const MIN_MULTI_CANDIDATE_MASTER_WIDTH = 320;

/* ───────────────────────────── misc helpers ────────────────────────────── */

/** Run an async map with a bounded concurrency. */
export async function mapWithConcurrency<T, R>(
    items: readonly T[],
    limit: number,
    fn: (item: T) => Promise<R>
): Promise<R[]> {
    const results = new Array<R>(items.length);
    let cursor = 0;
    const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
        while (cursor < items.length) {
            const index = cursor++;
            results[index] = await fn(items[index]);
        }
    });
    await Promise.all(workers);
    return results;
}
