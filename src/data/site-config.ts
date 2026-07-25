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
    subtitle: 'Computer & IoT engineer',
    description:
        'Computer and IoT engineer in Bandung. Embedded systems, full-stack software, DevOps, and real-time monitoring at PT. Labdha Teknika Nusantara.',
    image: {
        src: hero,
        alt: 'Danke Hidayat'
    },
    headerNavLinks: [
        { text: 'Home', href: '/' },
        { text: 'Work', href: '/projects' },
        { text: 'Path', href: '/experience' },
        { text: 'Notes', href: '/blog' },
        { text: 'Tags', href: '/tags' }
    ],
    footerNavLinks: [
        { text: 'About', href: '/about' },
        { text: 'Contact', href: '/contact' }
    ],
    socialLinks: [
        { text: 'Github', href: 'https://github.com/dankehidayat' },
        { text: 'Bluesky', href: 'https://bsky.app/profile/dankehidayat.my.id' },
        { text: 'LinkedIn', href: 'https://www.linkedin.com/in/dankehidayat/' },
        { text: 'RSS', href: '/rss.xml' }
    ],
    hero: {
        title: 'Danke Hidayat',
        text: 'I build software that has to survive real sensors, real networks, and real people.',
        image: {
            src: hero,
            alt: 'Danke Hidayat'
        },
        actions: [
            { text: 'Write me', href: '/contact' },
            { text: 'See what I built', href: '/projects' }
        ]
    },
    subscribe: {
        enabled: true,
        title: 'RSS',
        text: 'New notes in your reader.',
        rssLink: 'https://dankehidayat.my.id/rss.xml'
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
