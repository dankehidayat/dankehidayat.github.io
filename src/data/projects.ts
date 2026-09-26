/**
 * Per-project metadata for the folio record page (/folio/[slug]):
 * the tech stack chips and the outbound links (repo / live demo).
 *
 * The stack lives HERE and only here — the record body carries the story
 * and the particulars, never a second stack list (src/content/projects/
 * writes its narrative in the markdown body and its measured facts in the
 * `facts` frontmatter). Links render once, from here, as the record's
 * collection strip; the markdown bodies carry no link line.
 */
export type ProjectLink = {
    label: string;
    href: string;
};

export type ProjectMeta = {
    id: string;
    tech: string[];
    links: ProjectLink[];
    image?: string;
};

export const projectMeta: Record<string, ProjectMeta> = {
    selene: {
        id: 'selene',
        tech: ['React', 'TypeScript', 'Fastify', 'Bun', 'PostgreSQL', 'TimescaleDB', 'MQTT', 'EMQX', 'Docker', 'Caddy'],
        image: '/projects/Selene.png',
        links: [
            { label: 'Repository', href: 'https://github.com/dankehidayat/Selene' },
            { label: 'Live dashboard', href: 'https://selene.dankehidayat.my.id/' }
        ]
    },
    'flowpoint-next': {
        id: 'flowpoint-next',
        tech: ['Next.js', 'React', 'Prisma', 'Vercel Postgres', 'Tailwind CSS', 'Recharts'],
        image: '/projects/Flowpoint.png',
        links: [
            { label: 'Repository', href: 'https://github.com/dankehidayat/FlowPoint-Next' },
            { label: 'Live dashboard', href: 'https://flowpoint.dankehidayat.my.id/' }
        ]
    },
    flora: {
        id: 'flora',
        tech: ['ESP32', 'Arduino', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Blynk IoT', 'RTC DS3231'],
        image: '/projects/Flora.png',
        links: [
            { label: 'Repository', href: 'https://github.com/dankehidayat/Flora' },
            { label: 'Live dashboard', href: 'https://flora.dankehidayat.my.id/' }
        ]
    },
    neon: {
        id: 'neon',
        tech: ['Next.js', 'TypeScript'],
        image: '/projects/Neon.png',
        links: [{ label: 'Repository', href: 'https://github.com/dankehidayat/neon' }]
    },
    'eco-office': {
        id: 'eco-office',
        tech: ['ESP32', 'Arduino', 'DHT11', 'PZEM-004T', 'MQTT', 'TimescaleDB', 'Google Sheets'],
        image: '/projects/EcoOffice.png',
        links: [
            { label: 'Repository', href: 'https://github.com/dankehidayat/Eco-Office' },
            { label: 'Logged data', href: 'https://ipb.link/energy-temperature-monitoring-data' }
        ]
    },
    'ecobin-sorter': {
        id: 'ecobin-sorter',
        tech: ['ESP32', 'Arduino', 'Blynk IoT', 'WiFiManager', 'Servo & DC motors', '20×4 LCD'],
        image: '/projects/EcoBin-Sorter.jpeg',
        links: [{ label: 'Repository', href: 'https://github.com/dankehidayat/EcoBin-Sorter' }]
    },
    hydrolevi: {
        id: 'hydrolevi',
        tech: ['ESP32', 'Arduino', 'Laravel'],
        image: '/projects/HydroleVI.jpeg',
        links: [{ label: 'Repository', href: 'https://github.com/dankehidayat/HydroleVI' }]
    }
};
