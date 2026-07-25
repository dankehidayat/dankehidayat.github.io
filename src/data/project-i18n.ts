/** Indonesian short descriptions for project cards (keys = content collection ids). */
export const projectDescriptionId: Record<string, string> = {
    selene:
        'Dashboard energi & iklim pintar: monitoring IoT real-time, dual mesin fuzzy Mamdani, dan peramalan ML untuk jaringan sensor ESP32.',
    flora: 'Monitoring lingkungan ESP32: suhu, kelembapan, tekanan, ketinggian, dan kelembapan tanah dengan akses jarak jauh Blynk.',
    'eco-office': 'Sistem IoT ESP32 dengan fuzzy logic Mamdani untuk analisis listrik dan suhu real-time di kantor.',
    flowpoint: 'Aplikasi IoT Flutter untuk manajemen energi real-time dan analisis lingkungan lewat jaringan sensor Blynk.',
    'flowpoint-next': 'Dashboard monitoring energi real-time dengan Next.js, Prisma, PostgreSQL, dan pembaruan WebSocket.',
    hydrolevi: 'Monitoring level air tiga tingkat dengan sirine, Blynk, LCD offline, dan situs tim Laravel.',
    'ecobin-sorter':
        'Tempat sampah otomatis IoT yang memilah organik, anorganik, dan logam dengan fusi sensor dan laporan Blynk.'
};

export function projectBlurb(
    id: string,
    lang: 'en' | 'id',
    fallback?: string,
    descriptionIdField?: string
): string | undefined {
    if (lang === 'id') {
        return projectDescriptionId[id] ?? descriptionIdField ?? fallback;
    }
    return fallback;
}
