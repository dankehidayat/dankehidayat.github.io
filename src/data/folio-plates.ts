/**
 * Folio plate imagery — static imports of the seven engraved/botanical
 * plates (no runtime fetching, no external backends). Alt text is factual:
 * subject + species/artist/source, drawn from src/assets/images/folio/CREDITS.md
 * (which is not modified here).
 */
import type { FolioWorkId } from './works';

import agapanthus from '../assets/images/folio/agapanthus-redoute.jpg';
import liliumMartagon from '../assets/images/folio/lilium-martagon-hero.jpg';
import liliumPomponium from '../assets/images/folio/lilium-pomponium-redoute.jpg';
import nymphaea from '../assets/images/folio/nymphaea-alba.jpg';
import papaver from '../assets/images/folio/papaver-kohler.jpg';
import quercus from '../assets/images/folio/quercus-kohler.jpg';
import selenicereus from '../assets/images/folio/selenicereus-curtis.jpg';

export type FolioPlateImage = {
    src: ImageMetadata;
    alt: string;
};

/** Title-plate specimen — the home first-viewport plate (Flora Batava, 1881). */
export const HERO_PLATE_IMAGE: FolioPlateImage = {
    src: liliumMartagon,
    alt: 'Lilium martagon, Flora Batava XVI. Deel (1881)'
};

/** Florilegium hero specimen — a Redouté lily for the leisure shelf. */
export const FLORILEGIUM_PLATE_IMAGE: FolioPlateImage = {
    src: liliumPomponium,
    alt: 'Lilium pomponium, Redouté, Les liliacées'
};

/** Atelier hero specimen — a Flora Batava water lily for the workbench. */
export const ATELIER_PLATE_IMAGE: FolioPlateImage = {
    src: nymphaea,
    alt: 'Nymphaea alba, Flora Batava vol. 7 (1830)'
};

const workImages = {
    selene: {
        src: selenicereus,
        alt: 'Selenicereus macdonaldiae (as Cereus macdonaldiae), Free-images.com'
    },
    'flowpoint-next': {
        src: agapanthus,
        alt: 'Agapanthus umbellatus, Redouté, Les liliacées'
    },
    flora: {
        src: liliumPomponium,
        alt: 'Lilium pomponium, Redouté, Les liliacées'
    },
    'eco-office': {
        src: quercus,
        alt: 'Quercus (oak), Köhlers Medizinal-Pflanzen'
    },
    'ecobin-sorter': {
        src: papaver,
        alt: 'Papaver (poppy), Köhlers Medizinal-Pflanzen'
    },
    hydrolevi: {
        src: nymphaea,
        alt: 'Nymphaea alba, Flora Batava vol. 7 (1830)'
    }
} satisfies Record<FolioWorkId, FolioPlateImage>;

/** Plate image + factual alt per folio work id (string-indexable at call sites). */
export const PLATE_IMAGES: Record<string, FolioPlateImage> = workImages;
