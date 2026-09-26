/**
 * Motion loader — keeps the motion bundle off the critical path.
 *
 * The home folio's choreography is worth ~160KB of GSAP + ScrollTrigger +
 * SplitText + Lenis. Statically imported, that module is fetched, parsed and
 * evaluated while the browser is still trying to paint the largest plate, and
 * it registered 7 long tasks (~735ms of blocking time at 4× CPU throttle on a
 * mid-range phone). None of it is visible until after first paint, so there is
 * no reason for it to compete with LCP.
 *
 * This waits for `load` — by which point ClientRouter has already fired its
 * first `astro:page-load`, and motion.ts's own `readyState === 'complete'`
 * fallback boots it — then hands over on the next frame. Every animation is
 * identical; it simply starts one frame later than the document.
 *
 * Each page imports this module (a few hundred bytes) instead of motion.ts.
 * Both specifiers resolve to one module instance, so the `listenersBound` and
 * `bootToken` guards in motion.ts still hold across soft navigations.
 */
const startMotion = () => {
    void import('./motion');
};

if (document.readyState === 'complete') {
    requestAnimationFrame(startMotion);
} else {
    window.addEventListener('load', () => requestAnimationFrame(startMotion), { once: true });
}
