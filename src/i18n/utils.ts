import { defaultLang, languages, ui, type Lang, type UIKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
    const [, maybe] = url.pathname.split('/');
    if (maybe in languages) return maybe as Lang;
    return defaultLang;
}

export function useTranslations(lang: Lang) {
    return function t(key: UIKey): string {
        return ui[lang][key] ?? ui[defaultLang][key] ?? key;
    };
}

/** Localize an internal path. Default locale is unprefixed. */
export function localePath(lang: Lang, path = '/'): string {
    const clean = path.startsWith('/') ? path : `/${path}`;
    if (lang === defaultLang) return clean === '' ? '/' : clean;
    if (clean === '/') return `/${lang}/`;
    return `/${lang}${clean}`;
}

export function switchLocalePath(currentUrl: URL, nextLang: Lang): string {
    const current = getLangFromUrl(currentUrl);
    let path = currentUrl.pathname;
    if (current !== defaultLang) {
        path = path.replace(new RegExp(`^/${current}`), '') || '/';
    }
    return localePath(nextLang, path);
}

export const locales = Object.keys(languages) as Lang[];
