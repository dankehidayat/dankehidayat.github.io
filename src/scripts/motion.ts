import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;
let cleanups: Array<() => void> = [];
let tickerAttached = false;
let listenersBound = false;
let bootToken = 0;

const MOTION_SELECTOR = '[data-hero-item], [data-hero-photo], [data-head], [data-row], [data-plate], [data-reveal]';

function clearInlineMotionStyles() {
    // Drop any GSAP inline styles so a failed boot never leaves a blank page.
    document.querySelectorAll<HTMLElement>(MOTION_SELECTOR).forEach((el) => {
        gsap.set(el, { clearProps: 'opacity,visibility,transform,clipPath' });
        el.style.setProperty('--line', '1');
    });
}

function killMotion() {
    cleanups.forEach((fn) => {
        try {
            fn();
        } catch {
            /* ignore */
        }
    });
    cleanups = [];
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf('*');
    clearInlineMotionStyles();
    lenis?.destroy();
    lenis = null;
}

function initLenis() {
    if (reduced()) return null;

    lenis = new Lenis({
        autoRaf: false,
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
        smoothWheel: true,
        touchMultiplier: 1.2,
        anchors: false
    });

    lenis.on('scroll', ScrollTrigger.update);

    if (!tickerAttached) {
        gsap.ticker.add((time) => {
            lenis?.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
        tickerAttached = true;
    }

    cleanups.push(() => {
        lenis?.destroy();
        lenis = null;
    });

    return lenis;
}

/** One authored hero entrance: status, name lockup, headline, actions, portrait card. */
function initHero() {
    const hero = document.querySelector('[data-hero]');
    if (!hero || reduced()) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
        '.hero-status',
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.5 },
        0.05
    )
        .fromTo(
            '.hero-first',
            { autoAlpha: 0, yPercent: 45, clipPath: 'inset(0 0 100% 0)' },
            { autoAlpha: 1, yPercent: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.75 },
            0.15
        )
        .fromTo(
            '.hero-last',
            { autoAlpha: 0, yPercent: 45, clipPath: 'inset(0 0 100% 0)' },
            { autoAlpha: 1, yPercent: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.75 },
            0.28
        )
        .fromTo(
            '.hero-headline',
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.55 },
            0.4
        )
        .fromTo(
            '.hero-actions',
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.5 },
            0.48
        )
        .fromTo(
            '[data-hero-photo]',
            { autoAlpha: 0, y: 30, scale: 0.96 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' },
            0.35
        );

    // Gentle scroll parallax on the portrait card.
    const photo = hero.querySelector<HTMLElement>('[data-hero-photo]');
    if (photo) {
        const parallax = gsap.to(photo, {
            y: 46,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
        cleanups.push(() => parallax.scrollTrigger?.kill());
    }

    cleanups.push(() => tl.kill());
}

/** Section heads: signal tick pops, title clips up, intro fades. */
function initSectionHeaders() {
    if (reduced()) return;

    document.querySelectorAll<HTMLElement>('[data-head]').forEach((head) => {
        const tick = head.querySelector<HTMLElement>('.section-tick');
        if (tick) {
            const tt = gsap.fromTo(
                tick,
                { scale: 0 },
                {
                    scale: 1,
                    duration: 0.5,
                    ease: 'back.out(1.8)',
                    clearProps: 'transform',
                    scrollTrigger: { trigger: head, start: 'top 88%', once: true }
                }
            );
            cleanups.push(() => {
                tt.scrollTrigger?.kill();
                tt.kill();
            });
        }

        const title = head.querySelector<HTMLElement>('.section-title');
        if (title) {
            const tt = gsap.fromTo(
                title,
                { yPercent: 60, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)' },
                {
                    yPercent: 0,
                    autoAlpha: 1,
                    clipPath: 'inset(0 0 0% 0)',
                    duration: 0.7,
                    ease: 'power3.out',
                    clearProps: 'opacity,visibility,transform,clipPath',
                    scrollTrigger: { trigger: head, start: 'top 88%', once: true }
                }
            );
            cleanups.push(() => {
                tt.scrollTrigger?.kill();
                tt.kill();
            });
        }

        const intro = head.querySelector<HTMLElement>('.section-intro');
        if (intro) {
            const ti = gsap.fromTo(
                intro,
                { autoAlpha: 0, y: 14 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.55,
                    delay: 0.12,
                    ease: 'power2.out',
                    clearProps: 'opacity,visibility,transform',
                    scrollTrigger: { trigger: head, start: 'top 86%', once: true }
                }
            );
            cleanups.push(() => {
                ti.scrollTrigger?.kill();
                ti.kill();
            });
        }
    });
}

/**
 * Ledger rows and project plates: the hairline draws across (--line),
 * then the content rises. Staggered within a container for rhythm.
 */
function initRows() {
    if (reduced()) return;

    document.querySelectorAll<HTMLElement>('[data-row], [data-plate]').forEach((el) => {
        const line = gsap.fromTo(
            el,
            { '--line': 0 },
            {
                '--line': 1,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 92%', once: true }
            }
        );
        const rise = gsap.fromTo(
            el,
            { autoAlpha: 0, y: 22 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.55,
                ease: 'power2.out',
                clearProps: 'opacity,visibility,transform',
                scrollTrigger: { trigger: el, start: 'top 92%', once: true }
            }
        );
        cleanups.push(() => {
            line.scrollTrigger?.kill();
            line.kill();
            rise.scrollTrigger?.kill();
            rise.kill();
        });
    });
}

/** Generic [data-reveal] blocks (about body, stats ledger, contact blocks). */
function initDataReveals() {
    if (reduced()) return;

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        const tween = gsap.fromTo(
            el,
            { autoAlpha: 0, y: 24 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                overwrite: true,
                clearProps: 'opacity,visibility,transform',
                scrollTrigger: { trigger: el, start: 'top 88%', once: true }
            }
        );
        cleanups.push(() => {
            tween.scrollTrigger?.kill();
            tween.kill();
        });
    });
}

/** Smooth-scroll in-page anchors through Lenis (hero scroll + nav links). */
function initAnchorScroll() {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));

    const onClick = (e: MouseEvent) => {
        const link = e.currentTarget as HTMLAnchorElement;
        const href = link.getAttribute('href') ?? '';
        if (href.length < 2) return;
        const target = document.getElementById(href.slice(1));
        if (!target) return;
        e.preventDefault();
        const offset = -76; // sticky nav + breathing room
        if (lenis) {
            lenis.scrollTo(target, { offset, duration: 1.15 });
        } else {
            const top = target.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    links.forEach((a) => a.addEventListener('click', onClick));
    cleanups.push(() => links.forEach((a) => a.removeEventListener('click', onClick)));
}

export function initMotion() {
    killMotion();
    initLenis();
    initAnchorScroll();
    initHero();
    initSectionHeaders();
    initRows();
    initDataReveals();

    // Layout after ClientRouter swap + images can shift triggers
    requestAnimationFrame(() => {
        ScrollTrigger.refresh(true);
        window.setTimeout(() => ScrollTrigger.refresh(true), 120);
    });
}

function boot() {
    const token = ++bootToken;
    // Two rAFs: wait until after View Transition paint + layout
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            if (token !== bootToken) return;
            initMotion();
        });
    });
}

function bindLifecycle() {
    if (listenersBound) return;
    listenersBound = true;

    document.addEventListener('astro:before-swap', () => {
        bootToken += 1;
        killMotion();
    });

    document.addEventListener('astro:page-load', boot);
}

bindLifecycle();
// ClientRouter fires `astro:page-load` on first paint and every soft nav.
// Fallback only if the module somehow evaluates after that event.
if (document.readyState === 'complete') {
    boot();
}
