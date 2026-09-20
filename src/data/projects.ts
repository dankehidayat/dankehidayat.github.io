/**
 * Per-project metadata for the Projects grid on the home page:
 * tech stack chips and outbound links (repo / live demo).
 *
 * The five projects below are the curated set (the superseded FlowPoint
 * entry was removed from src/content/projects/). Descriptions come from
 * each project's frontmatter in src/content/projects/.
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
        tech: ['React', 'TypeScript', 'Fastify', 'PostgreSQL', 'TimescaleDB', 'MQTT', 'EMQX', 'Docker', 'Caddy'],
        image: '/projects/Selene.png',
        links: [
            { label: 'GitHub', href: 'https://github.com/dankehidayat/Selene' },
            { label: 'Live', href: 'https://selene.dankehidayat.my.id/' }
        ]
    },
    'flowpoint-next': {
        id: 'flowpoint-next',
        tech: ['Next.js', 'Prisma', 'PostgreSQL'],
        image: '/projects/Flowpoint.png',
        links: [
            { label: 'GitHub', href: 'https://github.com/dankehidayat/FlowPoint-Next' },
            { label: 'Live', href: 'https://flowpoint.dankehidayat.my.id/' }
        ]
    },
    flora: {
        id: 'flora',
        tech: ['ESP32', 'Arduino'],
        image: '/projects/Flora.png',
        links: [
            { label: 'GitHub', href: 'https://github.com/dankehidayat/Flora' },
            { label: 'Live', href: 'https://flora.dankehidayat.my.id/' }
        ]
    },
    neon: {
        id: 'neon',
        tech: ['Next.js', 'TypeScript'],
        image: '/projects/Neon.png',
        links: [
            { label: 'GitHub', href: 'https://github.com/dankehidayat/neon' }
        ]
    },
    'eco-office': {
        id: 'eco-office',
        tech: ['ESP32', 'Arduino'],
        image: '/projects/EcoOffice.png',
        links: [{ label: 'GitHub', href: 'https://github.com/dankehidayat/Eco-Office' }]
    },
    'ecobin-sorter': {
        id: 'ecobin-sorter',
        tech: ['ESP32', 'Arduino'],
        image: '/projects/EcoBin-Sorter.jpeg',
        links: [{ label: 'GitHub', href: 'https://github.com/dankehidayat/EcoBin-Sorter' }]
    },
    hydrolevi: {
        id: 'hydrolevi',
        tech: ['ESP32', 'Arduino', 'Laravel'],
        image: '/projects/HydroleVI.jpeg',
        links: [{ label: 'GitHub', href: 'https://github.com/dankehidayat/HydroleVI' }]
    }
};
