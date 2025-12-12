import avatar from '../assets/images/avatar.jpeg';
import hero from '../assets/images/hero.jpeg';
import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://dankehidayat.my.id',
    avatar: {
        src: avatar,
        alt: 'Danke Hidayat'
    },
    title: 'Danke Hidayat',
    subtitle: 'Junior Software Developer & IoT Engineer',
    description:
        'Junior software developer at PT. Labdha Teknika Nusantara specializing in embedded electronics, IoT integration, web development with SvelteKit, and Android apps with Flutter.',
    image: {
        src: hero,
        alt: 'Danke Hidayat working on embedded systems and software development'
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
        title: 'Hi there, and welcome to my corner of the web!',
        text: "I'm **Danke Hidayat**, a junior software developer at [PT. Labdha Teknika Nusantara](https://www.linkedin.com/company/labdha), where I spend most of my days blending hardware and software into things that actually work in the real world.\n\nI like projects you can hold, test, and iterate on — systems with tiny sensors, custom firmware, and interfaces that make data feel understandable rather than overwhelming. My work ranges from low-power device prototypes and LoRaWAN deployments to mobile apps, quick demos, and the occasional UI/UX build when a project needs clarity.\n\nAt heart, I care about stability and simplicity: edge devices that behave predictably, data pipelines that stay out of the way, and user experiences that help people make decisions without thinking twice.\n\nOutside of work, I recharge by reading manga and light novels (especially **yuri** stories), tinkering with small electronics, or getting lost in music from **BanG Dream!** and **The iDOLM@STER**. I also track what I watch and read on [AniList](https://anilist.co/user/Nishihime/), so feel free to peek if you're curious.\n\nIf you want to see what I'm building, explore my work on [GitHub](https://github.com/dankehidayat) or connect with me on [Bluesky](https://bsky.app/profile/dankehidayat.my.id).",
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
