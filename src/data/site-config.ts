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
        "I'm a junior software developer and DevOps engineer in Bandung. I build IoT dashboards, embedded firmware, and the containers that keep them running in production.",
    image: {
        src: hero,
        alt: 'Danke Hidayat'
    },
    socialLinks: [
        { text: 'GitHub', href: 'https://github.com/dankehidayat' },
        { text: 'Bluesky', href: 'https://bsky.app/profile/dankehidayat.my.id' },
        { text: 'LinkedIn', href: 'https://www.linkedin.com/in/dankehidayat/' },
        { text: 'Telegram', href: 'https://t.me/dankehidayat' }
    ]
};

export default siteConfig;
