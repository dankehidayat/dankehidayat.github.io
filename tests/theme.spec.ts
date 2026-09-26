import {
    bodyBackground,
    currentTheme,
    expect,
    gotoAndSettle,
    pathnameOf,
    readStorage,
    reachableThemeToggle,
    seedStorage,
    softNavigate,
    test
} from './fixtures';

/**
 * Theme regression suite.
 *
 * This is the guard for the bug that was just fixed: ClientRouter swaps the
 * incoming document's <html> attributes onto the live element, the static
 * markup carries no `data-theme`, and a soft navigation used to strip the
 * theme entirely — the page fell back to light. Every "survives a soft
 * navigation" assertion below therefore clicks a real nav link and waits
 * for the view transition to settle; `page.goto` would be a full document
 * load and would prove nothing about the swap.
 */

/** The two palettes the site pins. */
const DARK_BG = 'rgb(23, 21, 15)';
const LIGHT_BG = 'rgb(246, 241, 230)';
const DARK_THEME_COLOR = '#17150F';
const LIGHT_THEME_COLOR = '#F6F1E6';

const STORAGE_KEY = 'folio-theme';

const themeColor = (page: import('@playwright/test').Page) =>
    page.locator('meta[name="theme-color"]').getAttribute('content');

test.describe('system preference', () => {
    test('resolves to dark when the OS prefers dark and nothing is stored', async ({ page }) => {
        await page.emulateMedia({ colorScheme: 'dark' });
        // No addInitScript: the point is that folio-theme is absent.
        await gotoAndSettle(page, '/');
        expect(await readStorage(page, STORAGE_KEY)).toBeNull();
        expect(await currentTheme(page)).toBe('dark');
    });

    test('resolves to light when the OS prefers light and nothing is stored', async ({ page }) => {
        await page.emulateMedia({ colorScheme: 'light' });
        await gotoAndSettle(page, '/');
        expect(await readStorage(page, STORAGE_KEY)).toBeNull();
        expect(await currentTheme(page)).toBe('light');
    });
});

for (const stored of ['light', 'dark'] as const) {
    const opposite = stored === 'light' ? 'dark' : 'light';
    const storedBg = stored === 'light' ? LIGHT_BG : DARK_BG;
    const oppositeBg = stored === 'light' ? DARK_BG : LIGHT_BG;
    const storedMeta = stored === 'light' ? LIGHT_THEME_COLOR : DARK_THEME_COLOR;

    test.describe(`explicit "${stored}" choice`, () => {
        test(`is applied on a full load`, async ({ page }) => {
            await page.emulateMedia({ colorScheme: opposite });
            await seedStorage(page, { [STORAGE_KEY]: stored });
            await gotoAndSettle(page, '/');

            expect(await currentTheme(page)).toBe(stored);
            expect(await bodyBackground(page)).toBe(storedBg);
            expect(await themeColor(page)).toBe(storedMeta);
        });

        test(`survives a client-side soft navigation`, async ({ page }) => {
            await page.emulateMedia({ colorScheme: opposite });
            await seedStorage(page, { [STORAGE_KEY]: stored });
            await gotoAndSettle(page, '/');
            expect(await currentTheme(page)).toBe(stored);

            // Soft navigation, not a reload: this is the regression.
            await softNavigate(page, 'Folio');
            expect(pathnameOf(page), 'navigation target').toBe('/folio');

            expect(await currentTheme(page), 'data-theme after the swap').toBe(stored);
            expect(await bodyBackground(page), 'body background after the swap').toBe(storedBg);
            expect(await themeColor(page), 'theme-color after the swap').toBe(storedMeta);
        });

        test(`survives two consecutive soft navigations`, async ({ page }) => {
            await page.emulateMedia({ colorScheme: opposite });
            await seedStorage(page, { [STORAGE_KEY]: stored });
            await gotoAndSettle(page, '/');

            await softNavigate(page, 'Folio');
            expect(pathnameOf(page)).toBe('/folio');

            await softNavigate(page, 'Atelier');
            expect(pathnameOf(page)).toBe('/atelier');

            expect(await currentTheme(page), 'data-theme after two swaps').toBe(stored);
            expect(await bodyBackground(page), 'body background after two swaps').toBe(storedBg);
            expect(await themeColor(page), 'theme-color after two swaps').toBe(storedMeta);
        });
    });
}

test.describe('the header toggle', () => {
    test('flips the theme, persists it, and syncs theme-color', async ({ page }) => {
        await page.emulateMedia({ colorScheme: 'light' });
        await gotoAndSettle(page, '/');
        expect(await currentTheme(page)).toBe('light');

        // Desktop has the toggle in the running head; below 900px it lives
        // in the contents sheet footer, so the helper resolves whichever is
        // on screen (and opens the sheet when that is the one).
        const toggle = await reachableThemeToggle(page);
        await expect(toggle).toHaveAttribute('aria-label', 'Switch to dark theme');

        await toggle.click();

        expect(await currentTheme(page), 'data-theme after one click').toBe('dark');
        expect(await readStorage(page, STORAGE_KEY), 'localStorage after one click').toBe('dark');
        expect(await bodyBackground(page), 'body background after one click').toBe(DARK_BG);
        expect(await themeColor(page), 'theme-color after one click').toBe(DARK_THEME_COLOR);
        await expect(toggle, 'toggle label follows the theme').toHaveAttribute(
            'aria-label',
            'Switch to light theme'
        );

        await toggle.click();

        expect(await currentTheme(page), 'data-theme after two clicks').toBe('light');
        expect(await readStorage(page, STORAGE_KEY), 'localStorage after two clicks').toBe('light');
        expect(await bodyBackground(page), 'body background after two clicks').toBe(LIGHT_BG);
        expect(await themeColor(page), 'theme-color after two clicks').toBe(LIGHT_THEME_COLOR);
        await expect(toggle).toHaveAttribute('aria-label', 'Switch to dark theme');
    });

    test('a choice made in the toggle still survives a soft navigation', async ({ page }) => {
        await page.emulateMedia({ colorScheme: 'light' });
        await gotoAndSettle(page, '/');

        const toggle = await reachableThemeToggle(page);
        await toggle.click();
        expect(await currentTheme(page)).toBe('dark');

        await softNavigate(page, 'Folio');

        expect(pathnameOf(page)).toBe('/folio');
        expect(await currentTheme(page), 'runtime choice after the swap').toBe('dark');
        expect(await readStorage(page, STORAGE_KEY), 'stored choice after the swap').toBe('dark');
        expect(await bodyBackground(page)).toBe(DARK_BG);
        expect(await themeColor(page)).toBe(DARK_THEME_COLOR);
    });
});
