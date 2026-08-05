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
    subtitle: 'Junior Software Developer & DevOps Engineer',
    description:
        'Junior software developer and DevOps engineer in Bandung. Full-stack IoT systems, embedded firmware, real-time dashboards, and the containers that keep them reliable in production.',
    image: {
        src: hero,
        alt: 'Danke Hidayat'
    },
    socialLinks: [
        { text: 'GitHub', href: 'https://github.com/dankehidayat' },
        { text: 'Bluesky', href: 'https://bsky.app/profile/dankehidayat.my.id' },
        { text: 'LinkedIn', href: 'https://www.linkedin.com/in/dankehidayat/' },
        { text: 'RSS', href: '/rss.xml' }
    ],
    postsPerPage: 8
};

export default siteConfig;
