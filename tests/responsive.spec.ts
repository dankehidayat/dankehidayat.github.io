import {
    closeMobileMenuWithEscape,
    expect,
    gotoAndSettle,
    menuButton,
    mobileSheet,
    openMobileMenu,
    test
} from './fixtures';

/**
 * Responsive suite.
 *
 * Three things a static portfolio cannot afford to break: a sideways
 * scrollbar at any width, a menu that will not open (or will not close from
 * the keyboard), and controls too small to hit with a thumb.
 */

const PHONE = { width: 375, height: 667 } as const;
const TABLET = { width: 768, height: 1024 } as const;
const DESKTOP = { width: 1440, height: 900 } as const;

const ROUTES_TO_CHECK = [
    '/',
    '/folio',
    '/folio/selene',
    '/florilegium',
    '/florilegium/lycoris-recoil',
    '/atelier'
] as const;

/** The widest things on the page, for the failure message. */
const OVERFLOWING_ELEMENTS = `(() => {
    return [...document.querySelectorAll('body *')]
        .map((el) => {
            const rect = el.getBoundingClientRect();
            return {
                right: Math.round(rect.right),
                width: Math.round(rect.width),
                tag: el.tagName.toLowerCase(),
                cls: typeof el.className === 'string' ? el.className.trim().split(/\\s+/).slice(0, 2).join('.') : ''
            };
        })
        .filter((row) => row.right > window.innerWidth + 1 && row.width > 0)
        .sort((a, b) => b.right - a.right)
        .slice(0, 5);
})()`;

for (const [label, viewport] of [
    ['375x667', PHONE],
    ['768x1024', TABLET],
    ['1440x900', DESKTOP]
] as const) {
    test.describe(`${label}`, () => {
        test.use({ viewport });

        for (const route of ROUTES_TO_CHECK) {
            test(`${route} — no horizontal overflow`, async ({ page }) => {
                await gotoAndSettle(page, route);

                const measurement = await page.evaluate(() => ({
                    scrollWidth: document.documentElement.scrollWidth,
                    innerWidth: window.innerWidth,
                    bodyScrollWidth: document.body.scrollWidth
                }));

                if (measurement.scrollWidth > measurement.innerWidth + 1) {
                    const offenders = (await page.evaluate(OVERFLOWING_ELEMENTS)) as Array<{
                        tag: string;
                        cls: string;
                        right: number;
                    }>;
                    test.info().annotations.push({
                        type: 'overflow',
                        description: `scrollWidth=${measurement.scrollWidth} vs innerWidth=${measurement.innerWidth}; ` +
                            `widest offenders: ${offenders.map((o) => `${o.tag}.${o.cls}@${o.right}`).join(', ')}`
                    });
                }

                expect(
                    measurement.scrollWidth,
                    `${route} at ${label}: documentElement.scrollWidth (${measurement.scrollWidth}) ` +
                        `must not exceed innerWidth + 1 (${measurement.innerWidth + 1})`
                ).toBeLessThanOrEqual(measurement.innerWidth + 1);
                expect(
                    measurement.bodyScrollWidth,
                    `${route} at ${label}: body.scrollWidth (${measurement.bodyScrollWidth}) ` +
                        `must not exceed innerWidth + 1 (${measurement.innerWidth + 1})`
                ).toBeLessThanOrEqual(measurement.innerWidth + 1);
            });
        }
    });
}

test.describe('mobile navigation', () => {
    test.use({ viewport: PHONE });

    test('the menu opens, is keyboard reachable, and closes with Escape', async ({ page }) => {
        await gotoAndSettle(page, '/');

        const button = menuButton(page);
        const sheet = mobileSheet(page);
        await expect(button, 'the menu button must be on screen at 375px').toBeVisible();
        await expect(button).toHaveAttribute('aria-expanded', 'false');
        await expect(sheet).toBeHidden();

        await openMobileMenu(page);
        await expect(sheet, 'the sheet must cover the viewport').toBeVisible();
        await expect(button).toHaveAttribute('aria-label', 'Close menu');

        // Opening moves focus into the sheet so a keyboard user is not
        // stranded behind the overlay.
        const firstEntry = sheet.getByRole('link', { name: 'About', exact: true });
        await expect(firstEntry, 'the sheet must take focus on open').toBeFocused();

        // Tab walks the index entries in order, then the sheet footer.
        const secondEntry = sheet.getByRole('link', { name: 'Folio', exact: true });
        await page.keyboard.press('Tab');
        await expect(secondEntry, 'Tab should reach the next index entry').toBeFocused();
        await page.keyboard.press('Tab');
        await expect(
            sheet.getByRole('link', { name: 'Florilegium', exact: true }),
            'Tab should reach the third index entry'
        ).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(
            sheet.getByRole('link', { name: 'Atelier', exact: true }),
            'Tab should reach the fourth index entry'
        ).toBeFocused();

        await closeMobileMenuWithEscape(page);
        await expect(sheet).toBeHidden();
        // Escape returns focus to the control that opened the sheet.
        await expect(button, 'Escape must restore focus to the menu button').toBeFocused();
    });

    test('the menu button toggles the sheet closed as well as open', async ({ page }) => {
        await gotoAndSettle(page, '/');
        const button = menuButton(page);

        await openMobileMenu(page);
        await button.click();
        await expect(button).toHaveAttribute('aria-expanded', 'false');
        await expect(mobileSheet(page)).toBeHidden();

        await openMobileMenu(page);
        await expect(mobileSheet(page)).toBeVisible();
    });

    test('the scroll lock is released when the menu closes', async ({ page }) => {
        await gotoAndSettle(page, '/');
        await openMobileMenu(page);
        await expect(page.locator('body')).toHaveClass(/is-nav-lock/);
        await closeMobileMenuWithEscape(page);
        await expect(page.locator('body')).not.toHaveClass(/is-nav-lock/);
    });
});

test.describe('tap targets', () => {
    test.use({ viewport: PHONE });

    test('home page controls are at least 24x24 CSS px', async ({ page }) => {
        await gotoAndSettle(page, '/');

        const undersized = await page.evaluate(() => {
            const rows: Array<{ label: string; width: number; height: number }> = [];
            const controls = document.querySelectorAll<HTMLElement>('a, button');
            for (const el of controls) {
                if (el.closest('[hidden]')) continue;
                if (el.getAttribute('aria-hidden') === 'true') continue;
                const rect = el.getBoundingClientRect();
                // Skip anything not rendered: display:none, visibility:hidden,
                // zero-size wrappers, and links that are only an image's
                // wrapper with no box of their own.
                if (rect.width === 0 || rect.height === 0) continue;
                const style = window.getComputedStyle(el);
                if (style.visibility === 'hidden' || style.display === 'none') continue;
                if (rect.top > window.innerHeight * 3) continue; // below the first few screens
                if (rect.width + 0.5 < 24 || rect.height + 0.5 < 24) {
                    const classes = el.className.trim().split(/\s+/).slice(0, 2).join('.');
                    rows.push({
                        label: `${el.tagName.toLowerCase()}${classes ? `.${classes}` : ''} href=${el.getAttribute('href') ?? ''}`,
                        width: Math.round(rect.width * 10) / 10,
                        height: Math.round(rect.height * 10) / 10
                    });
                }
            }
            return rows;
        });

        if (undersized.length > 0) {
            test.info().annotations.push({
                type: 'tap-target',
                description:
                    'WCAG 2.2 SC 2.5.8 (Target Size, minimum) findings at 375x667: ' +
                    undersized.map((r) => `${r.label} ${r.width}x${r.height}`).join('; ')
            });
        }
        expect(
            undersized.map((r) => `${r.label} is ${r.width}x${r.height}`),
            'home page tap targets below 24x24 CSS px (WCAG 2.2 SC 2.5.8)'
        ).toEqual([]);
    });
});
