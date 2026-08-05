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
            { name: 'Python', icon: 'python' },
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
            { name: 'MongoDB', icon: 'mongodb' }
        ]
    },
    {
        label: 'DevOps & Infrastructure',
        items: [
            { name: 'Docker', icon: 'docker' },
            { name: 'Ansible', icon: 'ansible' },
            { name: 'Caddy', icon: 'caddy' },
            { name: 'Linux', icon: 'linux' },
            { name: 'macOS', icon: 'apple' },
            { name: 'Git', icon: 'git' }
        ]
    },
    {
        label: 'Networking',
        items: [
            { name: 'Cisco', icon: 'cisco' },
            { name: 'MikroTik', icon: 'mikrotik' }
        ]
    },
    {
        label: 'Embedded & IoT',
        items: [
            { name: 'ESP32', icon: 'espressif' },
            { name: 'Arduino', icon: 'arduino' },
            { name: 'MQTT', icon: 'mqtt' }
        ]
    },
    {
        label: 'Design & Tools',
        items: [
            { name: 'Figma', icon: 'figma' },
            { name: 'Proteus', icon: 'proteus' },
            { name: 'KiCAD', icon: 'kicad' }
        ]
    }
];
