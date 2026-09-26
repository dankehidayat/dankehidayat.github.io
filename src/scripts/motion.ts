import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;
let cleanups: Array<() => void> = [];
let splits: SplitText[] = [];
let tickerAttached = false;
let listenersBound = false;
let bootToken = 0;
let marqueeTweens: gsap.core.Tween[] = [];

const MOTION_SELECTOR =
    '[data-hero-item], [data-hero-plate], [data-title-letter], [data-head], [data-row], [data-plate], [data-reveal], [data-growth-node], [data-fan-item], [data-filmstrip-track], [data-wall-card]';

function clearInlineMotionStyles() {
    // Drop any GSAP inline styles so a failed boot never leaves a blank page.
    document.querySelectorAll<HTMLElement>(MOTION_SELECTOR).forEach((el) => {
        gsap.set(el, { clearProps: 'opacity,visibility,transform,clipPath' });
        el.style.setProperty('--line', '1');
    });
    document.querySelectorAll<HTMLElement>('[data-growth]').forEach((el) => {
        el.style.removeProperty('--grow');
    });
}

function killMotion() {
    // Revert SplitText first: restores original innerHTML so the clears
    // below act on plain text nodes again (view-transition swaps need this).
    splits.forEach((split) => {
        try {
            split.revert();
        } catch {
            /* ignore */
        }
    });
    splits = [];
    cleanups.forEach((fn) => {
        try {
            fn();
        } catch {
            /* ignore */
        }
    });
    cleanups = [];
    marqueeTweens = [];
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

/**
 * Botanical spore field — a fixed full-viewport canvas behind content.
 * Sparse dots and petal shards drift upward with a slow lateral sway and
 * respond to scroll velocity (parallax by depth layer). Theme-aware colors
 * re-read on theme swap. Absent entirely under prefers-reduced-motion.
 */
function initSpores() {
    const canvas = document.querySelector<HTMLCanvasElement>('[data-spores]');
    if (!canvas) return;
    if (reduced()) {
        canvas.style.display = 'none';
        return;
    }
    canvas.style.display = '';

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const style = getComputedStyle(document.documentElement);
    const palette = {
        sage: style.getPropertyValue('--color-sage').trim() || '#7fa37a',
        lilac: style.getPropertyValue('--color-lilac').trim() || '#7b5c9e',
        border: style.getPropertyValue('--color-border-strong').trim() || '#c2b294'
    };
    const colors = [palette.sage, palette.lilac, palette.border];

    type Spore = {
        x: number;
        y: number;
        r: number;
        depth: number;
        speed: number;
        sway: number;
        phase: number;
        rot: number;
        spin: number;
        petal: boolean;
        color: string;
        alpha: number;
    };

    const spores: Spore[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const compact = window.innerWidth < 768;
    const count = compact ? 30 : 60;

    const resize = () => {
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    for (let i = 0; i < count; i++) {
        const depth = 0.25 + Math.random() * 0.75;
        spores.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: 0.8 + Math.random() * 1.8 * depth,
            depth,
            speed: 6 + Math.random() * 14 * depth,
            sway: 6 + Math.random() * 14,
            phase: Math.random() * Math.PI * 2,
            rot: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.4,
            petal: Math.random() < 0.35,
            color: colors[i % colors.length],
            alpha: 0.16 + Math.random() * 0.3
        });
    }

    let scrollY = window.scrollY;
    let lastScroll = scrollY;
    let scrollVel = 0;
    let raf = 0;
    let running = true;

    const onScroll = () => {
        scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    const start = performance.now();
    const frame = (now: number) => {
        if (!running) return;
        const t = (now - start) / 1000;
        const instantVel = scrollY - lastScroll;
        lastScroll = scrollY;
        scrollVel += (instantVel - scrollVel) * 0.08;

        const w = window.innerWidth;
        const h = window.innerHeight;
        ctx.clearRect(0, 0, w, h);

        for (const s of spores) {
            // upward drift + scroll parallax (deeper spores move further)
            let y = s.y - t * s.speed - scrollY * s.depth * 0.12;
            const span = h + 80;
            y = ((y % span) + span) % span - 40;

            const x = s.x + Math.sin(t * 0.5 + s.phase) * s.sway + scrollVel * s.depth * 0.05;
            const rot = s.rot + t * s.spin;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rot);
            ctx.globalAlpha = s.alpha;
            ctx.fillStyle = s.color;
            if (s.petal) {
                ctx.beginPath();
                ctx.ellipse(0, 0, s.r * 2.4, s.r * 0.9, 0, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, s.r, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
        raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    cleanups.push(() => {
        running = false;
        cancelAnimationFrame(raf);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // keep the canvas element: initMotion kills before it re-inits
    });
}

/**
 * Velocity marquees — GSAP takes each CSS marquee over so scroll speed
 * modulates timeScale: fast scroll whips the band, stillness settles it
 * back to base. Falls back to the CSS keyframe under reduced motion.
 */
function initMarquees() {
    const tracks = Array.from(document.querySelectorAll<HTMLElement>('.marquee-track'));
    if (!tracks.length || reduced()) return;

    let targetScale = 1;
    let currentScale = 1;

    for (const track of tracks) {
        track.style.animation = 'none';
        const base = 52; // seconds — matches folio.css folio-marquee
        const tween = gsap.fromTo(
            track,
            { xPercent: 0 },
            { xPercent: -50, duration: base, ease: 'none', repeat: -1 }
        );
        marqueeTweens.push(tween);
    }

    const onScroll = () => {
        const v = Math.abs(lenis?.velocity ?? 0);
        targetScale = 1 + Math.min(v / 8, 6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    lenis?.on('scroll', onScroll);

    const tick = () => {
        currentScale += (targetScale - currentScale) * 0.06;
        targetScale += (1 - targetScale) * 0.02;
        for (const tween of marqueeTweens) tween.timeScale(currentScale);
    };
    gsap.ticker.add(tick);

    cleanups.push(() => {
        window.removeEventListener('scroll', onScroll);
        gsap.ticker.remove(tick);
        for (const tween of marqueeTweens) {
            tween.kill();
        }
        marqueeTweens = [];
        tracks.forEach((track) => {
            track.style.animation = '';
            gsap.set(track, { clearProps: 'transform' });
        });
    });
}

/**
 * Growth timeline — the experience stem. Sticky chapter head (CSS), scrubbed
 * stem draw, buds waking from dormant → growing → bloom as scroll passes.
 * Current role (first node) rests at bloom state by default.
 */
function initGrowth() {
    const growth = document.querySelector<HTMLElement>('[data-growth]');
    if (!growth) return;

    const nodes = Array.from(growth.querySelectorAll<HTMLElement>('[data-growth-node]'));
    if (!nodes.length) return;

    if (reduced()) {
        nodes.forEach((n) => n.classList.add('is-awake'));
        return;
    }

    // stem: a pseudo element scaled by --grow on the growth list
    const stem = gsap.fromTo(
        growth,
        { '--grow': 0 },
        {
            '--grow': 1,
            ease: 'none',
            scrollTrigger: {
                trigger: growth,
                start: 'top 75%',
                end: 'bottom 55%',
                scrub: 0.6
            }
        }
    );
    cleanups.push(() => stem.scrollTrigger?.kill());

    nodes.forEach((node) => {
        const st = ScrollTrigger.create({
            trigger: node,
            start: 'top 70%',
            onEnter: () => node.classList.add('is-awake'),
            onLeaveBack: () => node.classList.remove('is-awake')
        });
        cleanups.push(() => st.kill());

        const rise = gsap.fromTo(
            node,
            { autoAlpha: 0, y: 30 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                ease: 'power3.out',
                clearProps: 'opacity,visibility,transform',
                scrollTrigger: { trigger: node, start: 'top 85%', once: true }
            }
        );
        cleanups.push(() => {
            rise.scrollTrigger?.kill();
            rise.kill();
        });
    });
}

/**
 * Title-plate entrance: kicker, then each letter of DANKE HIDAYAT clips up
 * in sequence, then the role, positioning line, actions, and the featured
 * plate settle in. One authored timeline — the folio's opening registration.
 */
function initTitlePlate() {
    const hero = document.querySelector('[data-hero]');
    if (!hero || reduced()) return;

    const letters = hero.querySelectorAll<HTMLElement>('[data-title-letter]');
    const items = hero.querySelectorAll<HTMLElement>('[data-hero-item]');
    const plate = hero.querySelector<HTMLElement>('[data-hero-plate]');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (items.length) {
        tl.fromTo(
            items[0],
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.5 },
            0.05
        );
    }

    if (letters.length) {
        tl.fromTo(
            letters,
            { autoAlpha: 0, yPercent: 40, clipPath: 'inset(0 0 100% 0)' },
            {
                autoAlpha: 1,
                yPercent: 0,
                clipPath: 'inset(0 0 0% 0)',
                duration: 0.7,
                stagger: 0.04,
                clearProps: 'clipPath'
            },
            0.15
        );
    }

    items.forEach((item, i) => {
        if (i === 0) return; // kicker already placed
        tl.fromTo(
            item,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.55 },
            i === 1 ? 0.55 : 0.6 + i * 0.05
        );
    });

    if (plate) {
        tl.fromTo(
            plate,
            { autoAlpha: 0, y: 34, rotate: -1.2 },
            { autoAlpha: 1, y: 0, rotate: 0, duration: 0.7, ease: 'power3.out' },
            0.4
        );

        // gentle scroll parallax on the featured plate
        const parallax = gsap.to(plate, {
            y: 36,
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

    // Desktop-only differential parallax (owner 2026-09-25): the hero's
    // background layers — paper grain, then the copy block — lag slowly
    // while the plate rides the faster scrub above, so the two planes
    // separate as you scroll and the plate reads as a layer in front of
    // the page (shallow 3D). Mobile keeps the single plate scrub; the
    // entrance timeline above is untouched.
    if (hero.classList.contains('folio-hero')) {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
            gsap.to(hero, {
                '--hero-grain-shift': '16px',
                ease: 'none',
                scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
            });
            const copy = hero.querySelector<HTMLElement>('.folio-hero-copy');
            if (copy) {
                gsap.to(copy, {
                    y: 12,
                    ease: 'none',
                    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
                });
            }
        });
        cleanups.push(() => mm.revert());
    }

    cleanups.push(() => tl.kill());
}

/**
 * SplitText reveals — owner directive 2026-09 (gsap.com = source of truth).
 * Every page/section title in <main> rises character-by-character behind a
 * word mask; every block paragraph rises line-by-line behind a line mask.
 * Both are pure from-states fired once on scroll entry, fully static under
 * prefers-reduced-motion, and reverted in killMotion before each nav swap.
 *
 * Guards: home-hero letter split owns its h1 ([data-title-letter]); hero
 * paragraph items keep their authored entrance ([data-hero-item]); live
 * regions ([aria-live]) are rewritten by page scripts; flex/inline paragraphs
 * would break their layout when sliced into line wrappers.
 */
function initSplitText() {
    if (reduced()) return;

    document.querySelectorAll<HTMLElement>('main h1, main h2, main h3').forEach((el) => {
        if (!el.textContent?.trim()) return;
        if (el.hasAttribute('data-no-split')) return;
        if (el.querySelector('[data-title-letter]')) return;

        const split = SplitText.create(el, {
            type: 'words, chars',
            mask: 'words',
            aria: 'auto',
            onSplit: (self) =>
                gsap.from(self.chars, {
                    yPercent: 115,
                    duration: 0.75,
                    ease: 'power4.out',
                    stagger: 0.016,
                    scrollTrigger: { trigger: el, start: 'top 87%', once: true },
                    clearProps: 'opacity,visibility,transform'
                })
        });
        splits.push(split);
    });

    // Kept per element, not shared: SplitText.split(vars) is typed as
    // required, and onSplit closes over that element for its ScrollTrigger.
    // Storing each split beside its own vars lets the re-measure below
    // re-split with the matching config, so a later resize-driven autoSplit
    // still has the entrance attached.
    const paragraphSplits: Array<{ split: SplitText; vars: SplitText.Vars }> = [];
    let remeasuring = false;

    document.querySelectorAll<HTMLElement>('main p').forEach((el) => {
        if (el.hasAttribute('data-no-split')) return;
        if (el.hasAttribute('aria-live')) return;
        if (el.hasAttribute('data-hero-item')) return;
        if (!el.textContent?.trim()) return;
        if (getComputedStyle(el).display !== 'block') return;

        const vars: SplitText.Vars = {
            type: 'lines',
            mask: 'lines',
            aria: 'none',
            autoSplit: true,
            onSplit: (self) => {
                // A re-measure must not replay the entrance (below).
                if (remeasuring) return;
                gsap.from(self.lines, {
                    yPercent: 110,
                    duration: 0.7,
                    ease: 'power3.out',
                    stagger: 0.09,
                    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
                    clearProps: 'opacity,visibility,transform'
                });
            }
        };

        const split = SplitText.create(el, vars);
        splits.push(split);
        paragraphSplits.push({ split, vars });
    });

    // Re-measure once the real webfonts are in.
    //
    // `autoSplit` re-splits through a ResizeObserver, which only fires when
    // the element's BOX changes. A webfont swap keeps the same box and moves
    // only the line breaks, so nothing re-fires and every per-line mask stays
    // sized to the fallback metrics: the paragraph breaks at the wrong points
    // and the tail of the text sits loose below the masks. That is what made
    // long prose read as ragged half-width blocks.
    //
    // `split()` re-runs the split in place, which is what we want; the
    // remeasuring guard keeps onSplit from replaying the entrance animation
    // on a page that is already settled.
    if (paragraphSplits.length && document.fonts?.status !== 'loaded') {
        let live = true;
        cleanups.push(() => {
            live = false;
        });
        document.fonts.ready
            .then(() => {
                if (!live) return;
                remeasuring = true;
                paragraphSplits.forEach(({ split, vars }) => {
                    try {
                        split.split(vars);
                    } catch {
                        /* reverted by killMotion on a view-transition swap */
                    }
                });
                remeasuring = false;
                ScrollTrigger.refresh(true);
            })
            .catch(() => {
                /* fonts.ready never rejects in practice; ignore if it does */
            });
    }
}

/**
 * Plate registration: inside a [data-plate-group] the plates rise in
 * staggered left-to-right like sheets being laid on the baseline;
 * standalone [data-row]/[data-plate] draw their hairline (--line) then rise.
 */
function initPlates() {
    if (reduced()) return;

    document.querySelectorAll<HTMLElement>('[data-plate-group]').forEach((group) => {
        const plates = Array.from(group.querySelectorAll<HTMLElement>(':scope > [data-plate]'));
        if (!plates.length) return;

        // Parallax groups: the children carry the scrub drift, so the
        // entrance belongs to the group container — one transform owner
        // per element, always.
        const tween = group.hasAttribute('data-plate-parallax')
            ? gsap.fromTo(
                  group,
                  { autoAlpha: 0, y: 34 },
                  {
                      autoAlpha: 1,
                      y: 0,
                      duration: 0.6,
                      ease: 'power3.out',
                      clearProps: 'opacity,visibility,transform',
                      scrollTrigger: { trigger: group, start: 'top 90%', once: true }
                  }
              )
            : gsap.fromTo(
                  plates,
                  { autoAlpha: 0, y: 26, rotate: -0.6 },
                  {
                      autoAlpha: 1,
                      y: 0,
                      rotate: 0,
                      duration: 0.4,
                      stagger: 0.035,
                      ease: 'power2.out',
                      clearProps: 'opacity,visibility,transform',
                      scrollTrigger: { trigger: group, start: 'top 90%', once: true }
                  }
              );
        cleanups.push(() => {
            tween.scrollTrigger?.kill();
            tween.kill();
        });
    });

    document
        .querySelectorAll<HTMLElement>('[data-row], [data-plate]')
        .forEach((el) => {
            // group plates already animate above; the hero plate runs the title timeline
            if (el.matches('[data-plate]') && el.parentElement?.hasAttribute('data-plate-group')) return;
            if (el.matches('[data-plate]') && el.closest('[data-hero]')) return;
            if (el.matches('[data-growth-node]')) return; // growth nodes animate in initGrowth

            const line = gsap.fromTo(
                el,
                { '--line': 0 },
                {
                    '--line': 1,
                    duration: 0.65,
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
                    duration: 0.5,
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

/**
 * Generic [data-reveal] blocks with authored pacing variants:
 * data-reveal="rise" (default), "mask" (clip wipe), "rule" (hairline + rise),
 * "blur" (spread entrance — focus pulls in as the object arrives).
 */
function initDataReveals() {
    if (reduced()) return;

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
        const variant = el.dataset.reveal || 'blur';
        const inGroup = el.closest('[data-plate-group]');
        if (inGroup && inGroup !== el) return;

        // Owner (2026-09-25): blur-on-scroll is the house entrance across all
        // pages, at a stronger radius. One-shot tween on entry (never scrubbed
        // per frame), so a 20px start stays cheap.
        let from: gsap.TweenVars;
        let to: gsap.TweenVars;
        if (variant === 'rise') {
            from = { autoAlpha: 0, y: 24 };
            to = {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
                overwrite: true,
                clearProps: 'opacity,visibility,transform',
                scrollTrigger: { trigger: el, start: 'top 88%', once: true }
            };
        } else if (variant === 'mask') {
            from = { autoAlpha: 0, y: 18, clipPath: 'inset(12% 0% 0% 0%)' };
            to = {
                autoAlpha: 1,
                y: 0,
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 0.65,
                ease: 'power3.out',
                overwrite: true,
                clearProps: 'opacity,visibility,transform,clipPath',
                scrollTrigger: { trigger: el, start: 'top 88%', once: true }
            };
        } else if (variant === 'rule') {
            from = { autoAlpha: 0, y: 20, '--line': 0 };
            to = {
                autoAlpha: 1,
                y: 0,
                '--line': 1,
                duration: 0.5,
                ease: 'power2.out',
                overwrite: true,
                clearProps: 'opacity,visibility,transform',
                scrollTrigger: { trigger: el, start: 'top 88%', once: true }
            };
        } else {
            from = { autoAlpha: 0, y: 26, filter: 'blur(20px)' };
            to = {
                autoAlpha: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.7,
                ease: 'power3.out',
                overwrite: true,
                clearProps: 'opacity,visibility,transform,filter',
                scrollTrigger: { trigger: el, start: 'top 88%', once: true }
            };
        }

        const tween = gsap.fromTo(el, from, to);
        // stagger siblings that share a parent and same variant
        void i;
        cleanups.push(() => {
            tween.scrollTrigger?.kill();
            tween.kill();
        });
    });
}

/* ── Chapter-rail fill: luminance-aware sampling ──────────────────────
   The lilac fill reads on plate cream but can vanish over the tinted
   bands (marquees, colophon). Sample the ground painted behind the rail
   itself: a DOM hit-test at the rail's
   centre point, then walk up to the first painted background and
   composite it over the page ground. Compare WCAG contrast of the two
   fill candidates — lilac vs the on-heat cream (dark: near-ink) — and
   mark the rail so CSS picks the legible one.

   Sampling the rail's own spot (rather than "the active section") keeps
   the answer right across section seams, the colophon that follows
   contact, and full-bleed bands — the rail is fixed, so what it sits on
   is what matters. No canvas/pixel sampling: one hit-test per scroll
   update, and the data attribute only changes when the choice does.
   Skipped under prefers-reduced-motion (the fill is static there). */

type Rgb = { r: number; g: number; b: number; a: number };

function parseColor(value: string | null | undefined): Rgb | null {
    const v = (value ?? '').trim();
    if (!v || v === 'transparent') return null;

    if (v.startsWith('#')) {
        const hex = v.slice(1);
        const digit = (s: string) => parseInt(s.length === 1 ? s + s : s, 16);
        if (hex.length === 3 || hex.length === 4) {
            return {
                r: digit(hex[0]),
                g: digit(hex[1]),
                b: digit(hex[2]),
                a: hex.length === 4 ? digit(hex[3]) / 255 : 1
            };
        }
        if (hex.length === 6 || hex.length === 8) {
            return {
                r: parseInt(hex.slice(0, 2), 16),
                g: parseInt(hex.slice(2, 4), 16),
                b: parseInt(hex.slice(4, 6), 16),
                a: hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1
            };
        }
        return null;
    }

    // rgb()/rgba()/color(srgb …) — what computed backgroundColor returns
    if (!/^(rgb|color)/i.test(v)) return null;
    const parts = (v.match(/-?\d*\.?\d+%?/g) ?? []).map((n) =>
        n.endsWith('%') ? (parseFloat(n) / 100) * 255 : parseFloat(n)
    );
    if (parts.length < 3) return null;
    const srgb = /^color/i.test(v) && !v.includes('%'); // channels 0–1
    return {
        r: srgb ? parts[0] * 255 : parts[0],
        g: srgb ? parts[1] * 255 : parts[1],
        b: srgb ? parts[2] * 255 : parts[2],
        a: parts.length > 3 ? parts[3] : 1
    };
}

function channelLuminance(c: number): number {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function relativeLuminance(c: Rgb): number {
    return (
        0.2126 * channelLuminance(c.r) +
        0.7152 * channelLuminance(c.g) +
        0.0722 * channelLuminance(c.b)
    );
}

function contrastRatio(a: Rgb, b: Rgb): number {
    const la = relativeLuminance(a);
    const lb = relativeLuminance(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function compositeOver(src: Rgb, dst: Rgb): Rgb {
    const a = src.a + dst.a * (1 - src.a);
    if (a <= 0) return { r: 0, g: 0, b: 0, a: 0 };
    return {
        r: (src.r * src.a + dst.r * dst.a * (1 - src.a)) / a,
        g: (src.g * src.a + dst.g * dst.a * (1 - src.a)) / a,
        b: (src.b * src.a + dst.b * dst.a * (1 - src.a)) / a,
        a
    };
}

/** First painted background under `el`, composited over the page ground. */
function sectionBackground(el: Element | null): Rgb {
    const layers: Rgb[] = [];
    let node: Element | null = el;
    while (node) {
        const color = parseColor(getComputedStyle(node).backgroundColor);
        if (color && color.a > 0) {
            layers.push(color);
            if (color.a >= 1) break;
        }
        node = node.parentElement;
    }

    const rootStyle = getComputedStyle(document.documentElement);
    const ground =
        parseColor(rootStyle.getPropertyValue('--color-bg')) ??
        ({ r: 246, g: 241, b: 230, a: 1 } satisfies Rgb);
    let out: Rgb = { ...ground, a: 1 };
    for (let i = layers.length - 1; i >= 0; i--) out = compositeOver(layers[i], out);
    return out;
}

/**
 * Pick the fill that actually contrasts with the ground under the rail
 * and hand it to CSS via `data-rail-fill` (see folio.css .rail-progress).
 * No-op while the rail is not rendered (below the 1440px breakpoint).
 */
function applyRailFill(rail: HTMLElement): void {
    if (!rail.getClientRects().length) return; // display:none — nothing to tint

    const box = rail.getBoundingClientRect();
    const hit =
        document
            .elementsFromPoint(box.left + box.width / 2, box.top + box.height / 2)
            .find((el) => el !== rail && !rail.contains(el)) ?? null;
    const bg = sectionBackground(hit);

    const rootStyle = getComputedStyle(document.documentElement);
    const lilac =
        parseColor(rootStyle.getPropertyValue('--color-lilac')) ??
        ({ r: 123, g: 92, b: 158, a: 1 } satisfies Rgb);
    // `--color-ink-on-tangerine` is the folio's on-lilac cream (dark: near-ink)
    const cream =
        parseColor(rootStyle.getPropertyValue('--color-ink-on-tangerine')) ??
        ({ r: 251, g: 247, b: 238, a: 1 } satisfies Rgb);

    const fill = contrastRatio(lilac, bg) >= contrastRatio(cream, bg) ? 'lilac' : 'on-heat';
    if (rail.dataset.railFill !== fill) rail.dataset.railFill = fill;
}

/**
 * Chapter rail: active state from an IntersectionObserver (no motion —
 * works under reduced-motion too), progress fill from a scrubbed tween.
 * The active chapter is re-resolved from geometry on every observer
 * callback, so a jump (anchor, restored scroll, the stretch past the
 * last chapter) never strands a stale label. The fill tracks the
 * luminance of whatever is painted behind the rail (applyRailFill) so
 * the lilac never disappears into a tinted band or the colophon.
 */
function initChapterRail() {
    const rail = document.querySelector<HTMLElement>('[data-chapter-rail]');
    if (!rail) return;

    const links = Array.from(rail.querySelectorAll<HTMLAnchorElement>('[data-rail-link]'));
    const targets = links
        .map((link) => document.getElementById(link.dataset.railLink ?? ''))
        .filter((el): el is HTMLElement => Boolean(el));

    if (targets.length) {
        // Active = the last chapter whose top has crossed a line inside the
        // observer's band (rootMargin -30%/-55% → 30–45% of the viewport).
        // Reading geometry instead of the changed entries matters: a jump
        // delivers one batch where every target has *left* the band, and
        // "pick the most visible of the visible ones" then updates nothing.
        const evaluate = () => {
            const line = window.innerHeight * 0.4;
            let id: string | null = null;
            for (const target of targets) {
                if (target.getBoundingClientRect().top <= line) id = target.id;
            }
            links.forEach((link) => {
                link.classList.toggle('is-active', id !== null && link.dataset.railLink === id);
            });
        };

        const observer = new IntersectionObserver(evaluate, {
            rootMargin: '-30% 0px -55% 0px',
            threshold: [0, 0.2, 0.5, 1]
        });
        targets.forEach((t) => observer.observe(t));
        cleanups.push(() => observer.disconnect());
        evaluate();
    }

    if (reduced()) {
        rail.classList.add('is-static');
        return;
    }

    const progress = rail.querySelector<HTMLElement>('[data-rail-progress]');
    if (progress) {
        // Luminance fill: re-sample on every scroll update (the rail is
        // fixed, so the ground under it moves) and on layout refreshes.
        const refreshFill = () => applyRailFill(rail);
        const tween = gsap.to(progress, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
                start: 0,
                end: 'max',
                scrub: 0.35,
                onUpdate: refreshFill,
                onRefresh: refreshFill
            }
        });
        cleanups.push(() => tween.scrollTrigger?.kill());
    }

    // A theme flip recolours both the ground and the fill candidates —
    // re-sample at once instead of waiting for the next scroll.
    const themeObserver = new MutationObserver(() => applyRailFill(rail));
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
    cleanups.push(() => themeObserver.disconnect());
}

/** Smooth-scroll in-page anchors through Lenis (hero strip + nav links). */
function initAnchorScroll() {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));

    const onClick = (e: MouseEvent) => {
        const link = e.currentTarget as HTMLAnchorElement;
        const href = link.getAttribute('href') ?? '';
        if (href.length < 2) return;
        const target = document.getElementById(href.slice(1));
        if (!target) return;
        e.preventDefault();
        const offset = -76; // sticky running head + breathing room
        if (lenis) {
            lenis.scrollTo(target, { offset, duration: 1.15 });
        } else {
            const top = target.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({ top, behavior: reduced() ? 'auto' : 'smooth' });
        }
    };

    links.forEach((a) => a.addEventListener('click', onClick));
    cleanups.push(() => links.forEach((a) => a.removeEventListener('click', onClick)));
}

/**
 * 005 · Contact — quiet letterpress chapter (round 4: the lilac field is
 * retired). Only the email address still wipes open along its baseline as
 * the chapter arrives; content blocks rise via their own [data-reveal].
 */
function initContact() {
    if (reduced()) return;
    const section = document.querySelector<HTMLElement>('[data-contact]');
    if (!section) return;

    const email = section.querySelector<HTMLElement>('.contact-email');
    if (email) {
        const te = gsap.fromTo(
            email,
            { clipPath: 'inset(0 100% 0 0)' },
            {
                clipPath: 'inset(0 0% 0 0)',
                duration: 0.6,
                delay: 0.1,
                ease: 'power3.out',
                clearProps: 'clipPath',
                scrollTrigger: { trigger: section, start: 'top 62%', once: true }
            }
        );
        cleanups.push(() => {
            te.scrollTrigger?.kill();
            te.kill();
        });
    }
}

/** Native <details> — animate open height softly when motion is allowed. */
function initDetails() {
    if (reduced()) return;
    document.querySelectorAll<HTMLDetailsElement>('.growth-details').forEach((details) => {
        const body = details.querySelector<HTMLElement>('.growth-details-body');
        if (!body) return;
        details.addEventListener('toggle', () => {
            if (details.open) {
                gsap.fromTo(
                    body,
                    { height: 0, opacity: 0 },
                    {
                        height: 'auto',
                        opacity: 1,
                        duration: 0.45,
                        ease: 'power2.out',
                        clearProps: 'height,opacity'
                    }
                );
            }
        });
    });
}

/* ═══ round-3 motion (2026-09-25) — chapter snap + scrubbed sets ═════════ */

/**
 * Snap-on-settle (owner directive): the page drifts freely while the wheel
 * moves, then GSAP eases to the nearest chapter top after a short pause.
 * Needs ≥3 chapters — single-section pages (works detail) never snap.
 * The offset matches the anchor-scroll offset (-76) so clicks and snaps
 * land on the same line.
 */
function initSectionSnap() {
    if (reduced()) return;

    const SNAP_OFFSET = 76;

    const chapterPoints = (): number[] => {
        const max = ScrollTrigger.maxScroll(window);
        if (max <= 0) return [];
        const pts: number[] = [];
        document
            .querySelectorAll<HTMLElement>('main section[id], main [data-chapter]')
            .forEach((el) => {
                const top = el.getBoundingClientRect().top + window.scrollY - SNAP_OFFSET;
                const p = gsap.utils.clamp(0, 1, top / max);
                if (pts.length && Math.abs(p - pts[pts.length - 1]) < 0.012) return;
                pts.push(p);
            });
        return pts.sort((a, b) => a - b);
    };

    if (chapterPoints().length < 3) return;

    // Owner (2026-09-25): settle only AT boundaries — free-scroll anywhere
    // else, never yank back mid-scroll. snapTo returns the raw value (no
    // tween) unless the resting position is already within SNAP_NEAR px of
    // a chapter point, which keeps small scrolls in open sections intact.
    const SNAP_NEAR = 96;

    const trigger = ScrollTrigger.create({
        start: 0,
        end: 'max',
        snap: {
            snapTo: (value: number) => {
                const max = ScrollTrigger.maxScroll(window);
                const pts = chapterPoints();
                if (pts.length < 3 || max <= 0) return value;
                let nearest = pts[0];
                let best = Math.abs(value - pts[0]);
                for (const p of pts) {
                    const d = Math.abs(value - p);
                    if (d < best) {
                        best = d;
                        nearest = p;
                    }
                }
                return best * max <= SNAP_NEAR ? nearest : value;
            },
            duration: { min: 0.3, max: 0.65 },
            delay: 0.35,
            inertia: false,
            ease: 'power2.inOut'
        }
    });
    cleanups.push(() => trigger.kill());
}

/**
 * Chapter scrub — every chapter gets continuous scroll-linked motion while
 * it passes (not just an entrance): the head plane lags the page, and the
 * italic key phrase draws its own underline as the chapter arrives.
 */
function initChapterScrub() {
    if (reduced()) return;

    document.querySelectorAll<HTMLElement>('main [data-chapter]').forEach((section) => {
        const head = section.querySelector<HTMLElement>('[data-head]');
        if (head && !head.classList.contains('chapter-head--sticky')) {
            const drift = gsap.fromTo(
                head,
                { y: 44 },
                {
                    y: -44,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 0.7
                    }
                }
            );
            cleanups.push(() => {
                drift.scrollTrigger?.kill();
                drift.kill();
            });
        }

        const em = section.querySelector<HTMLElement>('[data-head] .chapter-title em, .page-title em');
        if (em) {
            const draw = gsap.fromTo(
                em,
                { '--u': 0 },
                {
                    '--u': 1,
                    ease: 'none',
                    scrollTrigger: { trigger: em, start: 'top 94%', end: 'top 48%', scrub: 0.45 }
                }
            );
            cleanups.push(() => {
                draw.scrollTrigger?.kill();
                draw.kill();
            });
        }
    });
}

/** Plate parallax groups: the block rises once, children drift differentially. */
function initPlateParallax() {
    if (reduced()) return;

    document.querySelectorAll<HTMLElement>('[data-plate-parallax]').forEach((group) => {
        const kids = Array.from(group.children) as HTMLElement[];
        kids.forEach((kid, i) => {
            const amp = i % 2 ? -18 : 13;
            const drift = gsap.fromTo(
                kid,
                { y: -amp },
                {
                    y: amp,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: group,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 0.9
                    }
                }
            );
            cleanups.push(() => {
                drift.scrollTrigger?.kill();
                drift.kill();
            });
        });
    });
}

/** Generic differential drift for composed scene pieces ([data-drift="24"]). */
function initDrift() {
    if (reduced()) return;

    document.querySelectorAll<HTMLElement>('[data-drift]').forEach((el) => {
        const amp = parseFloat(el.dataset.drift || '24');
        const triggerEl = (el.closest('[data-chapter]') as HTMLElement | null) ?? el;
        const drift = gsap.fromTo(
            el,
            { y: amp },
            {
                y: -amp,
                ease: 'none',
                scrollTrigger: {
                    trigger: triggerEl,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.9
                }
            }
        );
        cleanups.push(() => {
            drift.scrollTrigger?.kill();
            drift.kill();
        });
    });
}

/**
 * Fanned table stage (florilegium · freshly cut): covers start stacked and
 * fan open — rotation/offset per item from data-rot/data-x/data-y — scrubbed
 * as the stage arrives. Hover straightening lives on the inner card (CSS),
 * so it never fights the scrub transform.
 */
function initFanStage() {
    const fan = document.querySelector<HTMLElement>('[data-fan]');
    if (!fan || reduced()) return;

    const items = Array.from(fan.querySelectorAll<HTMLElement>('[data-fan-item]'));
    if (!items.length) return;

    // phones stack the cards in a column — no fanned offsets there; tablets
    // get a gentler spread
    const scale = () => {
        if (window.innerWidth < 640) return 0;
        if (window.innerWidth < 760) return 0.45;
        return 1;
    };

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: fan,
            start: 'top 85%',
            end: 'top 32%',
            scrub: 0.6,
            invalidateOnRefresh: true
        }
    });

    items.forEach((item, i) => {
        const rot = parseFloat(item.dataset.rot ?? '0');
        const x = parseFloat(item.dataset.x ?? '0');
        const y = parseFloat(item.dataset.y ?? '0');
        tl.fromTo(
            item,
            { rotation: 0, x: 0, y: 16, scale: 0.97 },
            {
                rotation: () => rot * scale(),
                x: () => x * scale(),
                y: () => y * scale(),
                scale: 1,
                ease: 'none'
            },
            i * 0.04
        );
    });

    cleanups.push(() => {
        tl.scrollTrigger?.kill();
        tl.kill();
    });
}

/**
 * Staggered cover wall (florilegium · drawer): entrance is a masked rise on
 * the body layer, differential scrub drift rides the outer card, and the CSS
 * tilt/hover lives on the middle layer — three layers so none of them share
 * a transform.
 */
function initCoverWall() {
    const wall = document.querySelector<HTMLElement>('[data-wall]');
    if (!wall || reduced()) return;

    const cards = Array.from(wall.querySelectorAll<HTMLElement>('[data-wall-card]'));
    if (!cards.length) return;

    const bodies = cards
        .map((card) => card.querySelector<HTMLElement>('.wall-card-body'))
        .filter((el): el is HTMLElement => Boolean(el));

    // Owner (2026-09-25): unread shelf items arrive blurred — stronger
    // radius, one-shot entrance, staggered so only a few are live at once.
    const enter = gsap.fromTo(
        bodies,
        { autoAlpha: 0, y: 42, clipPath: 'inset(10% 0% 0% 0%)', filter: 'blur(16px)' },
        {
            autoAlpha: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            filter: 'blur(0px)',
            duration: 0.55,
            stagger: 0.045,
            ease: 'power3.out',
            clearProps: 'opacity,visibility,transform,clipPath,filter',
            scrollTrigger: { trigger: wall, start: 'top 88%', once: true }
        }
    );
    cleanups.push(() => {
        enter.scrollTrigger?.kill();
        enter.kill();
    });

    cards.forEach((card, i) => {
        const amp = [12, -16, 7, -10][i % 4];
        const drift = gsap.fromTo(
            card,
            { y: -amp },
            {
                y: amp,
                ease: 'none',
                scrollTrigger: {
                    trigger: wall,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            }
        );
        cleanups.push(() => {
            drift.scrollTrigger?.kill();
            drift.kill();
        });
    });
}

/** Archive filmstrip (atelier): slides left as the chapter passes; native
 *  touch scroll below the desktop breakpoint. */
function initFilmstrip() {
    const strip = document.querySelector<HTMLElement>('[data-filmstrip]');
    if (!strip || reduced()) return;
    const track = strip.querySelector<HTMLElement>('[data-filmstrip-track]');
    if (!track) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
        const tween = gsap.fromTo(
            track,
            { x: 0 },
            {
                x: () => -Math.max(0, track.scrollWidth - strip.clientWidth),
                ease: 'none',
                invalidateOnRefresh: true,
                scrollTrigger: {
                    trigger: strip,
                    start: 'top 92%',
                    end: 'bottom 25%',
                    scrub: 0.7
                }
            }
        );
        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    });
    cleanups.push(() => mm.revert());
}

/**
 * TCG-style card tilt — owner 2026-09-25. The three freshly-cut cards on the
 * florilegium lean toward the cursor with rotateX/rotateY under a shared
 * perspective, a glare highlight tracking the pointer. Desktop, fine-pointer,
 * reduced-motion-gated only. Transform-owner rule: the outer card carries the
 * scrub (fan stage), .cut-card-in carries the CSS hover lift, and this owns
 * the innermost .cut-tilt layer — no two systems ever touch one transform.
 */
function initCardTilt() {
    const mm = gsap.matchMedia();
    mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-tilt]'));
        if (!cards.length) return;

        const clampY = gsap.utils.clamp(-14, 14); // rotationY
        const clampX = gsap.utils.clamp(-12, 12); // rotationX

        const undos: Array<() => void> = [];
        cards.forEach((card) => {
            const glare = card.parentElement?.querySelector<HTMLElement>('[data-tilt-glare]');
            gsap.set(card, { transformOrigin: '50% 50%' });

            const rotY = gsap.quickTo(card, 'rotationY', {
                duration: 0.45,
                ease: 'power2.out',
                overwrite: 'auto'
            });
            const rotX = gsap.quickTo(card, 'rotationX', {
                duration: 0.45,
                ease: 'power2.out',
                overwrite: 'auto'
            });

            const onMove = (e: PointerEvent) => {
                if (e.pointerType !== 'mouse') return;
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                rotY(clampY(px * 28));
                rotX(clampX(-py * 24));
                if (glare) {
                    card.parentElement?.style.setProperty('--gx', `${(px + 0.5) * 100}%`);
                    card.parentElement?.style.setProperty('--gy', `${(py + 0.5) * 100}%`);
                    gsap.to(glare, { opacity: 0.5, duration: 0.3, overwrite: 'auto' });
                }
            };
            const onLeave = () => {
                rotY(0);
                rotX(0);
                if (glare) {
                    gsap.to(glare, { opacity: 0, duration: 0.45, overwrite: 'auto' });
                }
            };

            const host = card.parentElement ?? card;
            host.addEventListener('pointermove', onMove);
            host.addEventListener('pointerleave', onLeave);
            undos.push(() => {
                host.removeEventListener('pointermove', onMove);
                host.removeEventListener('pointerleave', onLeave);
            });
        });

        return () => {
            undos.forEach((fn) => fn());
            cards.forEach((card) => gsap.set(card, { rotationX: 0, rotationY: 0, clearProps: 'transform' }));
        };
    });
    cleanups.push(() => mm.revert());
}

/**
 * Hero letter parallax — owner 2026-09-25. Each letter of the home title
 * drifts opposite the pointer by its own depth (data-depth), returning with
 * an elastic settle when the pointer leaves the heading. Desktop only.
 * The entrance animates yPercent/autoAlpha/clipPath; this animates x/y px —
 * separate channels on one element, per the layered-motion convention.
 */
function initLetterParallax() {
    const hero = document.querySelector('[data-hero]');
    if (!hero) return;
    const letters = Array.from(hero.querySelectorAll<HTMLElement>('[data-title-letter]'));
    if (letters.length < 4) return;
    const heading = letters[0].closest<HTMLElement>('h1');
    if (!heading) return;

    const mm = gsap.matchMedia();
    mm.add(
        '(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
            const xTo = letters.map((l) =>
                gsap.quickTo(l, 'x', { duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
            );
            const yTo = letters.map((l) =>
                gsap.quickTo(l, 'y', { duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
            );

            const onMove = (e: PointerEvent) => {
                if (e.pointerType !== 'mouse') return;
                const r = heading.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                letters.forEach((l, i) => {
                    const d = Number(l.dataset.depth) || [10, 6, 14, 8, 12, 5][i % 6];
                    xTo[i](-px * d);
                    yTo[i](-py * d * 0.65);
                });
            };
            const onLeave = () => {
                gsap.to(letters, {
                    x: 0,
                    y: 0,
                    duration: 1.1,
                    ease: 'elastic.out(1, 0.45)',
                    overwrite: 'auto'
                });
            };

            heading.addEventListener('pointermove', onMove);
            heading.addEventListener('pointerleave', onLeave);
            return () => {
                heading.removeEventListener('pointermove', onMove);
                heading.removeEventListener('pointerleave', onLeave);
                gsap.set(letters, { x: 0, y: 0 });
            };
        }
    );
    cleanups.push(() => mm.revert());
}

/**
 * Hero plate lift — the freshly-cut treatment for every page's specimen
 * (owner 2026-09-26: "3D effect motion for all the hero's flowers").
 *
 * Layer rule, straight from the cut-card system: three layers, three
 * transform owners, never two systems on one element.
 *   outer   figure[data-hero-plate] — the reveal + scroll parallax own its
 *           transform (initTitlePlate); this block only gives it a
 *           perspective, which is a layout property, not a transform.
 *   middle  .plate (PlateFigure heroes) or the cover image on the
 *           florilegium record — rotateX/rotateY follows the pointer here.
 *   inner   the glare ::after on .plate-frame / .record-cover, lit through
 *           --gx/--gy/--glare written on the figure, plus a shade pool that
 *           blooms from the same --glare (folio.css).
 * The settle entrance below plays with the hero reveal (outer fades/slides,
 * inner eases out of a laid-back angle) so they compose instead of compete.
 *
 * Gated like initCardTilt: hover+fine pointer for the tracking, and
 * no-preference for the settle. mm.revert() lands in cleanups, so a route
 * swap or a reduced-motion flip unwinds listeners, tweens, and inline props.
 */
function initHeroPlateTilt() {
    const plates: Array<{ figure: HTMLElement; tilt: HTMLElement; settle: gsap.core.Tween | null }> = [];
    document.querySelectorAll<HTMLElement>('[data-hero-plate]').forEach((figure) => {
        const tilt =
            figure.querySelector<HTMLElement>(':scope > .plate') ??
            figure.querySelector<HTMLElement>(':scope > img, :scope > .record-mono');
        if (tilt) plates.push({ figure, tilt, settle: null });
    });
    if (!plates.length) return;

    const mm = gsap.matchMedia();

    // entrance settle — fires wherever motion is allowed (touch included):
    // the plate eases up from 6° laid-back as the reveal lands. Owns
    // rotationX until a pointer claims it (first move kills the settle, so
    // the two never fight over one channel).
    mm.add('(prefers-reduced-motion: no-preference)', () => {
        plates.forEach((plate) => {
            plate.settle = gsap.fromTo(
                plate.tilt,
                { rotationX: 6 },
                { rotationX: 0, duration: 1.05, delay: 0.4, ease: 'power3.out' }
            );
        });
        return () => {
            plates.forEach((plate) => {
                plate.settle?.kill();
                plate.settle = null;
            });
        };
    });

    mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        // small angles by design — a pressed plate lifting off paper
        const clampY = gsap.utils.clamp(-7, 7); // rotationY
        const clampX = gsap.utils.clamp(-6, 6); // rotationX

        const undos: Array<() => void> = [];

        plates.forEach((plate) => {
            const { figure, tilt } = plate;
            gsap.set(tilt, { transformOrigin: '50% 45%' });
            figure.style.setProperty('--gx', '50%');
            figure.style.setProperty('--gy', '50%');

            const rotY = gsap.quickTo(tilt, 'rotationY', {
                duration: 0.5,
                ease: 'power2.out',
                overwrite: 'auto'
            });
            const rotX = gsap.quickTo(tilt, 'rotationX', {
                duration: 0.5,
                ease: 'power2.out',
                overwrite: 'auto'
            });

            let lit = false;
            let sheen: gsap.core.Tween | null = null;
            const setLit = (on: boolean) => {
                if (on === lit) return;
                lit = on;
                sheen?.kill();
                sheen = gsap.to(figure, {
                    '--glare': on ? 0.55 : 0,
                    duration: on ? 0.3 : 0.5,
                    ease: 'power2.out'
                });
            };

            const onMove = (e: PointerEvent) => {
                if (e.pointerType !== 'mouse') return;
                // the pointer owns rotationX from here on
                plate.settle?.kill();
                plate.settle = null;
                const box = figure.getBoundingClientRect();
                if (!box.width || !box.height) return;
                const px = (e.clientX - box.left) / box.width - 0.5;
                const py = (e.clientY - box.top) / box.height - 0.5;
                rotY(clampY(px * 14));
                rotX(clampX(-py * 12));
                figure.style.setProperty('--gx', `${(px + 0.5) * 100}%`);
                figure.style.setProperty('--gy', `${(py + 0.5) * 100}%`);
                setLit(true);
            };
            const onLeave = () => {
                rotY(0);
                rotX(0);
                setLit(false);
            };

            figure.addEventListener('pointermove', onMove);
            figure.addEventListener('pointerleave', onLeave);
            undos.push(() => {
                figure.removeEventListener('pointermove', onMove);
                figure.removeEventListener('pointerleave', onLeave);
                sheen?.kill();
            });
        });

        return () => {
            undos.forEach((fn) => fn());
            plates.forEach(({ figure, tilt }) => {
                figure.style.removeProperty('--gx');
                figure.style.removeProperty('--gy');
                figure.style.removeProperty('--glare');
                gsap.set(tilt, { rotationX: 0, rotationY: 0, clearProps: 'transform' });
            });
        };
    });

    cleanups.push(() => mm.revert());
}

export function initMotion() {
    killMotion();
    initLenis();
    initAnchorScroll();
    initSpores();
    initMarquees();
    initTitlePlate();
    initSplitText();
    initPlates();
    initPlateParallax();
    initDataReveals();
    initGrowth();
    initContact();
    initDetails();
    initChapterScrub();
    initDrift();
    initFanStage();
    initCoverWall();
    initFilmstrip();
    initChapterRail();
    initSectionSnap();
    initCardTilt();
    initLetterParallax();
    initHeroPlateTilt();

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

    // Leafing overdrive — the route sweep: fires only on a real DOM swap
    // (never on hash/anchor scrolls), measured against the live running
    // head so the hairline lands on the nav's double rule.
    document.addEventListener('astro:after-swap', () => {
        const sweep = document.querySelector<HTMLElement>('.route-sweep');
        if (!sweep) return;
        const nav = document.querySelector<HTMLElement>('.site-nav');
        if (nav) sweep.style.top = `${nav.offsetHeight + 3}px`;
        sweep.classList.remove('is-sweeping');
        void sweep.offsetWidth; // restart the animation
        sweep.classList.add('is-sweeping');
    });

    document.addEventListener('astro:page-load', boot);
}

bindLifecycle();
// ClientRouter fires `astro:page-load` on first paint and every soft nav.
// Fallback only if the module somehow evaluates after that event.
if (document.readyState === 'complete') {
    boot();
}
