import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for the Astro 5 static site.
 *
 * Every project runs against a *production* build served by `astro preview`
 * (never `astro dev`): the responsive-image ladders, the pre-paint theme
 * resolver, and the deferred motion bundle only behave the way production
 * does once the site has been through the Vite build.
 */

const PORT = 4321;
const BASE_URL = `http://localhost:${PORT}`;

/** Only the reduced-motion project owns this file; the other two skip it. */
const REDUCED_MOTION_SPEC = /reduced-motion\.spec\.ts/;

/**
 * The responsive suite sets its own viewport per describe block, so running
 * it inside the device-emulated project would only mean "a Pixel 7 that
 * claims to be 1440px wide". It runs once, in the desktop project.
 */
const RESPONSIVE_SPEC = /responsive\.spec\.ts/;

const OWNED_BY_ANOTHER_PROJECT = new RegExp(`${REDUCED_MOTION_SPEC.source}|${RESPONSIVE_SPEC.source}`);

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    // A slow-but-correct assertion is better than a flake: give every
    // expect() a generous window so real regressions are what fails CI.
    expect: {
        timeout: 10_000
    },
    reporter: [['list'], ['html', { open: 'never' }]],
    outputDir: 'test-results',
    // The site keeps a requestAnimationFrame loop alive on every page (the
    // spore field, Lenis, the GSAP ticker), so each worker holds a core for
    // as long as its page is open. Playwright's default of cores/2 starves
    // them on an 8-core machine and turns actionability waits — which poll
    // per frame — into timeouts. Two workers is the measured stable setting.
    workers: 2,
    use: {
        baseURL: BASE_URL,
        trace: 'retain-on-failure',
        // Every suite assumes a settled document; motion boots on `load`.
        actionTimeout: 15_000
    },
    webServer: {
        command: `pnpm build && pnpm preview --port ${PORT}`,
        port: PORT,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000
    },
    projects: [
        {
            name: 'desktop-chrome',
            testIgnore: REDUCED_MOTION_SPEC,
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1440, height: 900 }
            }
        },
        {
            name: 'mobile-chrome',
            testIgnore: OWNED_BY_ANOTHER_PROJECT,
            use: {
                ...devices['Pixel 7']
            }
        },
        {
            name: 'reduced-motion',
            testMatch: REDUCED_MOTION_SPEC,
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1440, height: 900 },
                contextOptions: { reducedMotion: 'reduce' }
            }
        }
    ]
});
