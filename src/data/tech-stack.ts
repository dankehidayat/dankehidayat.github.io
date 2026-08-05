/**
 * Tech stack groups shown on the home page.
 * Grounded in the roles, projects, and notes in this repo — not a wish list.
 * `icon` maps to a key in src/data/brand-icons.ts (brand mark or glyph).
 */
export type StackItem = {
    name: string;
    icon: string;
};

export type StackGroup = {
    label: string;
    items: StackItem[];
};

export const stackGroups: StackGroup[] = [
    {
        label: 'Languages',
        items: [
            { name: 'TypeScript', icon: 'typescript' },
            { name: 'JavaScript', icon: 'javascript' },
            { name: 'Dart', icon: 'dart' },
            { name: 'C / C++', icon: 'cplusplus' },
            { name: 'SQL', icon: 'sql' }
        ]
    },
    {
        label: 'Frameworks & Libraries',
        items: [
            { name: 'React', icon: 'react' },
            { name: 'Next.js', icon: 'nextdotjs' },
            { name: 'Svelte', icon: 'svelte' },
            { name: 'Astro', icon: 'astro' },
            { name: 'Fastify', icon: 'fastify' },
            { name: 'Flutter', icon: 'flutter' },
            { name: 'Laravel', icon: 'laravel' },
            { name: 'Prisma', icon: 'prisma' }
        ]
    },
    {
        label: 'Data & Backend',
        items: [
            { name: 'PostgreSQL', icon: 'postgresql' },
            { name: 'TimescaleDB', icon: 'timescale' },
            { name: 'WebSocket', icon: 'websocket' },
            { name: 'REST APIs', icon: 'rest-api' }
        ]
    },
    {
        label: 'DevOps & Infrastructure',
        items: [
            { name: 'Docker', icon: 'docker' },
            { name: 'Docker Compose', icon: 'docker-compose' },
            { name: 'Ansible', icon: 'ansible' },
            { name: 'Caddy', icon: 'caddy' },
            { name: 'Linux', icon: 'linux' },
            { name: 'Git', icon: 'git' },
            { name: 'CI/CD', icon: 'ci-cd' }
        ]
    },
    {
        label: 'Embedded & IoT',
        items: [
            { name: 'ESP32', icon: 'espressif' },
            { name: 'Arduino', icon: 'arduino' },
            { name: 'Blynk', icon: 'blynk' },
            { name: 'MQTT', icon: 'mqtt' },
            { name: 'EMQX', icon: 'emqx' },
            { name: 'Sensor Fusion', icon: 'sensor-fusion' },
            { name: 'Fuzzy Logic', icon: 'fuzzy-logic' }
        ]
    },
    {
        label: 'Design & Tools',
        items: [
            { name: 'Figma', icon: 'figma' },
            { name: 'Labdha Design System', icon: 'labdha-design-system' }
        ]
    }
];
