type IconElement = readonly [string, { readonly [key: string]: string | number }];

type IconSvgObject = readonly IconElement[];

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

function attrsString(attrs: { [key: string]: string | number }): string {
    return Object.entries(attrs)
        .filter(([k]) => k !== 'key')
        .map(([k, v]) => `${kebab(k)}="${v}"`)
        .join(' ');
}

export function renderIconSvg(data: IconSvgObject): string {
    return data.map(([tag, attrs]) => `<${tag} ${attrsString(attrs)} />`).join('');
}
