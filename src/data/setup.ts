/**
 * Setup — the machine, the hardware on the desk, and the tools on the machine.
 * Every item carries a slug so any row can grow into its own page
 * later without a migration.
 */

export type SetupItem = {
    slug: string;
    name: string;
    role: string;
    href?: string;
};

export const setupHardware: SetupItem[] = [
    {
        slug: 'macbook-pro',
        name: 'MacBook Pro (M1 Pro)',
        role: 'The machine — macOS.'
    },
    {
        slug: 'weikav-alice-record',
        name: 'Weikav Alice Record',
        role: 'Keyboard — MMD Holy Panda switches, stock stabilizers.'
    },
    {
        slug: 'switch-stash',
        name: 'Spare switches',
        role: 'Akko Matcha, Akko Lavender Purple, Aflion Holy Panda, WS Morandi, C3 Equalz Banana Split, Akko Sakura Pink.'
    },
    {
        slug: 'fantech-sakura-vx7',
        name: 'Fantech Sakura VX7',
        role: 'Mouse — current.'
    },
    {
        slug: 'logitech-m170',
        name: 'Logitech M170',
        role: 'Wireless mouse.'
    },
    {
        slug: 'tecware-torque-plus',
        name: 'Tecware Torque Plus',
        role: 'Mouse.'
    },
    {
        slug: 'fantech-sakura-mousepad',
        name: 'Fantech Sakura mousepad',
        role: 'Mousepad.'
    },
    {
        slug: 'moondrop-space-travel-2',
        name: 'Moondrop Space Travel 2',
        role: 'Wireless earbuds — current.'
    },
    {
        slug: 'cca-c10',
        name: 'CCA C10',
        role: 'Wired earphones.'
    },
    {
        slug: 'g-shock-ga-100',
        name: 'Casio G-Shock GA-100-1A4',
        role: 'Watch.'
    },
    {
        slug: 'ugreen-36w-pd',
        name: 'Ugreen 36 W Dual PD',
        role: 'Charger — two USB-C ports.'
    }
];

export const setupTools: SetupItem[] = [
    {
        slug: 'brave',
        name: 'Brave',
        role: 'Browser.',
        href: 'https://brave.com'
    },
    {
        slug: 'vs-code',
        name: 'VS Code',
        role: 'Editor.',
        href: 'https://code.visualstudio.com'
    },
    {
        slug: 'opencode',
        name: 'opencode',
        role: 'AI coding agent, in the terminal.',
        href: 'https://opencode.ai'
    },
    {
        slug: 'iterm2',
        name: 'iTerm2',
        role: 'Terminal.',
        href: 'https://iterm2.com'
    }
];

/** Where the old setup lives, for the curious. */
export const setupRepos = [
    {
        label: 'Archrice (2019)',
        href: 'https://github.com/nishimi-ya/Archrice'
    },
    {
        label: 'BSPWM dotfiles',
        href: 'https://github.com/nishimi-ya/dotfiles'
    },
    {
        label: 'Openbox dotfiles',
        href: 'https://github.com/nishimi-ya/dotfiles/tree/openbox'
    },
    {
        label: 'Hyprland dotfiles',
        href: 'https://github.com/nishimi-ya/hyprland-dotfiles'
    },
    {
        label: 'Hyprland bootstrap',
        href: 'https://github.com/nishimi-ya/hyprland-bootstrap'
    }
];
