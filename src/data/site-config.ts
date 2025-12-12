import avatar from '../assets/images/avatar.jpg';
import hero from '../assets/images/hero.jpg';
import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://example.com',
    avatar: {
        src: avatar,
        alt: 'Danke Hidayat'
    },
    title: 'Danke Hidayat',
    subtitle: 'Junior Software Developer & IoT Engineer',
    description:
        'Junior software developer at PT. Labdha Teknika Nusantara specializing in embedded electronics, IoT integration, web development with SvelteKit, and Android apps with Flutter.',
    image: {
        src: '/dante-preview.jpg',
        alt: 'Dante - Astro.js and Tailwind CSS theme'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Experience',
            href: '/experience'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'Tags',
            href: '/tags'
        }
    ],
    footerNavLinks: [
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Contact',
            href: '/contact'
        }
    ],
    socialLinks: [
        {
            text: 'Github',
            href: 'https://github.com/dankehidayat'
        },
        {
            text: 'Bluesky',
            href: 'https://bsky.app/profile/dankehidayat.my.id'
        },
        {
            text: 'RSS',
            href: '/rss.xml'
        }
    ],
    hero: {
        title: 'Building Connected Systems & Elegant Interfaces',
        text: "I'm **Danke Hidayat**, a junior software developer at [PT. Labdha Teknika Nusantara](https://www.linkedin.com/company/labdha), focused on bridging hardware and software to build real-world solutions.\n\nI design and ship connected systems that combine embedded electronics, resilient firmware, and clear user interfaces — from low‑power sensor integrations and LoRaWAN deployments to mobile apps and web dashboards. I also prototype UI/UX in Figma and develop cross‑platform apps with Flutter (for example, *trenvm*), and help deliver client demos such as the ITB PRISM financial stress‑testing prototype.\n\nI specialize in **embedded electronics**, **IoT integration**, **web development with SvelteKit**, and **Android apps with Flutter**. I prioritize pragmatic solutions: robust edge software, efficient data pipelines, and approachable UX that helps people act on data.\n\nWhen I'm not prototyping hardware or coding UIs, I enjoy measuring system performance, iterating on designs, and mentoring teammates.\n\nExplore my work on [GitHub](https://github.com/dankehidayat) or connect with me on [Bluesky](https://bsky.app/profile/dankehidayat.my.id).",
        image: {
            src: hero,
            alt: 'Danke Hidayat working on embedded systems and software development'
        },
        actions: [
            {
                text: 'Get in Touch',
                href: '/contact'
            }
        ]
    },
    subscribe: {
        enabled: true,
        title: 'Subscribe to My Blog',
        text: 'Get the latest posts delivered to your RSS reader.',
        rssLink: 'https://dankehidayat.my.id/rss.xml'
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
