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

function clearInlineMotionStyles() {
    // Drop GSAP inline opacity/visibility/transform so soft nav never leaves a blank page.
    document
        .querySelectorAll<HTMLElement>(
            '[data-reveal], .work-card, [data-hero-claim], [data-hero-lede], [data-hero-actions], [data-hero-figure], .hero-name .line span, .hero-portrait-wrap, .hero-portrait'
        )
        .forEach((el) => {
            gsap.set(el, { clearProps: 'opacity,visibility,transform,borderRadius' });
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
        // gsap.ticker drives raf — avoid double rAF with Lenis autoRaf
        autoRaf: false,
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.2
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

/** Soft lava-lamp border morph on hero portrait */
function initLavaLamp() {
    if (reduced()) return;

    const wrap = document.querySelector<HTMLElement>('.hero-portrait-wrap');
    const img = document.querySelector<HTMLElement>('.hero-portrait');
    if (!wrap) return;

    const shapes = [
        '48% 52% 45% 55% / 52% 42% 58% 48%',
        '62% 38% 58% 42% / 44% 62% 38% 56%',
        '40% 60% 52% 48% / 58% 40% 60% 42%',
        '55% 45% 38% 62% / 48% 55% 45% 52%',
        '42% 58% 60% 40% / 55% 48% 52% 45%',
        '58% 42% 46% 54% / 40% 58% 42% 60%'
    ];

    const morphTargets = [wrap, img].filter(Boolean) as HTMLElement[];
    gsap.set(morphTargets, { borderRadius: shapes[0] });

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'sine.inOut' } });
    shapes.forEach((shape, i) => {
        if (i === 0) return;
        tl.to(morphTargets, {
            borderRadius: shape,
            duration: 2.6 + (i % 3) * 0.35
        });
    });
    tl.to(morphTargets, { borderRadius: shapes[0], duration: 2.8 });

    cleanups.push(() => tl.kill());

    const drift = gsap.to(wrap, {
        rotate: 2.5,
        scale: 1.03,
        duration: 5.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
    });
    cleanups.push(() => drift.kill());
}

function initHero() {
    const hero = document.querySelector('[data-hero]');
    if (!hero) return;

    if (reduced()) return;

    const nameSpans = hero.querySelectorAll<HTMLElement>('.hero-name .line span');
    const claim = hero.querySelector<HTMLElement>('[data-hero-claim]');
    const lede = hero.querySelector<HTMLElement>('[data-hero-lede]');
    const actions = hero.querySelector<HTMLElement>('[data-hero-actions]');
    const figure = hero.querySelector<HTMLElement>('[data-hero-figure]');
    const orbs = hero.querySelectorAll<HTMLElement>('.hero-orb');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (nameSpans.length) {
        gsap.set(nameSpans, { yPercent: 110, rotate: 4 });
        tl.to(
            nameSpans,
            {
                yPercent: 0,
                rotate: 0,
                duration: 0.85,
                stagger: 0.08,
                ease: 'power4.out',
                clearProps: 'transform'
            },
            0.08
        );
    }

    if (claim) {
        gsap.fromTo(
            claim,
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.65, clearProps: 'opacity,visibility,transform' }
        );
    }
    if (lede) {
        gsap.fromTo(
            lede,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.1, clearProps: 'opacity,visibility,transform' }
        );
    }
    if (actions) {
        gsap.fromTo(
            actions,
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.55, delay: 0.2, clearProps: 'opacity,visibility,transform' }
        );
    }
    if (figure) {
        gsap.fromTo(
            figure,
            { autoAlpha: 0, scale: 0.92, y: 24 },
            {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'opacity,visibility,transform'
            }
        );
    }

    if (orbs.length) {
        orbs.forEach((orb, i) => {
            const tween = gsap.to(orb, {
                y: i % 2 === 0 ? 22 : -18,
                x: i % 2 === 0 ? -14 : 16,
                scale: i % 2 === 0 ? 1.12 : 0.9,
                duration: 3.8 + i * 0.7,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            });
            cleanups.push(() => tween.kill());
        });
    }

    initLavaLamp();
    cleanups.push(() => tl.kill());
}

/**
 * Homepage section snap: wheel / keys / swipe jump between
 * hero → work → notes → closing (Lenis animates the scroll).
 */
function initSectionSnap(instance: Lenis | null) {
    const home = document.querySelector<HTMLElement>('[data-home-snap]');
    if (!home || reduced()) return;

    const sections = Array.from(home.querySelectorAll<HTMLElement>('[data-snap-section]'));
    if (sections.length < 2) return;

    const canSnap = () => window.matchMedia('(min-width: 768px) and (min-height: 560px)').matches;

    let index = 0;
    let locked = false;
    let touchY = 0;

    const navOffset = () => {
        const nav = document.querySelector<HTMLElement>('.site-nav');
        return (nav?.offsetHeight ?? 64) + 8;
    };

    const scrollY = () => instance?.scroll ?? window.scrollY;

    const nearestIndex = () => {
        const y = scrollY();
        let best = 0;
        let bestDist = Infinity;
        sections.forEach((section, i) => {
            const top = section.getBoundingClientRect().top + y;
            const dist = Math.abs(top - y - navOffset());
            if (dist < bestDist) {
                bestDist = dist;
                best = i;
            }
        });
        return best;
    };

    const goTo = (next: number) => {
        if (!canSnap() || locked) return;
        const clamped = Math.max(0, Math.min(sections.length - 1, next));
        index = clamped;
        locked = true;
        const target = sections[index];
        const offset = -navOffset();

        const unlock = () => {
            locked = false;
            ScrollTrigger.refresh();
        };

        if (instance) {
            instance.scrollTo(target, {
                offset,
                duration: 1.15,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                onComplete: unlock
            });
            // Failsafe if onComplete never runs
            window.setTimeout(unlock, 1400);
        } else {
            const top = target.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({ top, behavior: 'smooth' });
            window.setTimeout(unlock, 700);
        }
    };

    const onWheel = (e: WheelEvent) => {
        if (!canSnap()) return;
        if (Math.abs(e.deltaY) < 8) return;
        e.preventDefault();
        if (locked) return;
        index = nearestIndex();
        if (e.deltaY > 0) goTo(index + 1);
        else goTo(index - 1);
    };

    const onKey = (e: KeyboardEvent) => {
        if (!canSnap()) return;
        const keys = ['ArrowDown', 'PageDown', 'ArrowUp', 'PageUp', ' '];
        if (!keys.includes(e.key)) return;
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable) return;
        e.preventDefault();
        if (locked) return;
        index = nearestIndex();
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') goTo(index + 1);
        else goTo(index - 1);
    };

    const onTouchStart = (e: TouchEvent) => {
        touchY = e.touches[0]?.clientY ?? 0;
    };

    const onTouchEnd = (e: TouchEvent) => {
        if (!canSnap() || locked) return;
        const endY = e.changedTouches[0]?.clientY ?? touchY;
        const dy = touchY - endY;
        if (Math.abs(dy) < 48) return;
        index = nearestIndex();
        if (dy > 0) goTo(index + 1);
        else goTo(index - 1);
    };

    if (instance && canSnap()) {
        instance.options.smoothWheel = false;
    }

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    const mq = window.matchMedia('(min-width: 768px) and (min-height: 560px)');
    const onMq = () => {
        if (instance) instance.options.smoothWheel = !mq.matches;
    };
    mq.addEventListener('change', onMq);
    onMq();

    cleanups.push(() => {
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('keydown', onKey);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchend', onTouchEnd);
        mq.removeEventListener('change', onMq);
        if (instance) instance.options.smoothWheel = true;
    });
}

function revealEl(
    el: HTMLElement,
    observer: IntersectionObserver,
    opts: { y?: number; delay?: number } = {}
) {
    const y = opts.y ?? 28;
    const delay = opts.delay ?? 0;

    el.setAttribute('data-reveal-pending', '1');
    // Hide only after we have an observer — cleanup always clears this
    gsap.set(el, { autoAlpha: 0, y });
    observer.observe(el);

    // stash play options on the element for the observer callback
    (el as HTMLElement & { __revealOpts?: { y: number; delay: number } }).__revealOpts = {
        y,
        delay
    };
}

function playReveal(el: HTMLElement) {
    if (el.getAttribute('data-reveal-pending') !== '1') return;
    // Mark playing immediately so force/IO can't stack duplicate tweens
    el.setAttribute('data-reveal-pending', '0');
    const opts = (el as HTMLElement & { __revealOpts?: { y: number; delay: number } }).__revealOpts;
    gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        delay: opts?.delay ?? 0,
        ease: 'power3.out',
        overwrite: true,
        clearProps: 'opacity,visibility,transform',
        onComplete: () => {
            el.removeAttribute('data-reveal-pending');
            delete (el as HTMLElement & { __revealOpts?: unknown }).__revealOpts;
        }
    });
}

function initReveals() {
    const targets = [
        ...document.querySelectorAll<HTMLElement>('[data-reveal]'),
        ...document.querySelectorAll<HTMLElement>('.work-card')
    ];
    // de-dupe
    const seen = new Set<HTMLElement>();
    const unique = targets.filter((el) => {
        if (seen.has(el)) return false;
        seen.add(el);
        return true;
    });

    if (reduced()) {
        unique.forEach((el) => gsap.set(el, { clearProps: 'opacity,visibility,transform' }));
        return;
    }

    // IntersectionObserver survives ClientRouter better than ScrollTrigger start checks
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target as HTMLElement;
                observer.unobserve(el);
                playReveal(el);
            });
        },
        { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    unique.forEach((el, i) => {
        const isCard = el.classList.contains('work-card') && !el.hasAttribute('data-reveal');
        revealEl(el, observer, {
            y: isCard ? 36 : 28,
            delay: isCard ? (i % 3) * 0.06 : 0
        });
    });

    cleanups.push(() => {
        observer.disconnect();
        unique.forEach((el) => {
            if (el.hasAttribute('data-reveal-pending')) {
                gsap.set(el, { clearProps: 'opacity,visibility,transform' });
                el.removeAttribute('data-reveal-pending');
            }
            delete (el as HTMLElement & { __revealOpts?: unknown }).__revealOpts;
        });
    });

    // In-view elements should fire immediately after layout; IO usually does,
    // but force a pass after refresh in case root metrics were stale mid-transition.
    requestAnimationFrame(() => {
        unique.forEach((el) => {
            if (el.getAttribute('data-reveal-pending') !== '1') return;
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
                observer.unobserve(el);
                playReveal(el);
            }
        });
    });
}

/** Safety net for anything still hidden while near the viewport. */
function forceRevealStuck() {
    document.querySelectorAll<HTMLElement>('[data-reveal-pending="1"]').forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inOrNearView = rect.top < window.innerHeight * 1.2 && rect.bottom > -100;
        if (!inOrNearView) return;
        playReveal(el);
    });
}

function initScrollAccent() {
    if (reduced()) return;
    const nav = document.querySelector<HTMLElement>('.site-nav');
    if (!nav) return;

    const st = ScrollTrigger.create({
        start: 12,
        onUpdate: (self) => {
            nav.dataset.scrolled = self.scroll() > 12 ? '1' : '0';
        }
    });
    cleanups.push(() => st.kill());
}

export function initMotion() {
    killMotion();
    const instance = initLenis();
    initHero();
    initSectionSnap(instance);
    initReveals();
    initScrollAccent();

    // Layout after ClientRouter swap + images can shift triggers
    requestAnimationFrame(() => {
        ScrollTrigger.refresh(true);
        forceRevealStuck();
        window.setTimeout(() => {
            ScrollTrigger.refresh(true);
            forceRevealStuck();
        }, 120);
        window.setTimeout(forceRevealStuck, 500);
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
