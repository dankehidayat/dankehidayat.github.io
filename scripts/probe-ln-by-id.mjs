// Fetch LN covers by AniList ID.
const Q = 'query ($id: Int) { Media(id: $id, type: MANGA) { id title { romaji } format coverImage { extraLarge } } }';
const targets = [
    { id: 159977, slug: 'shuuniichido-classmate-wo-kau-hanashi-ln' },
    { id: 159972, slug: 'watashi-no-yuri-mo-eigyou-da-to-omotta' },
    { id: 211650, slug: 'kirai-doushi-no-watashitachi' }
];
for (const t of targets) {
    const r = await fetch('https://graphql.anilist.co', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: Q, variables: { id: t.id } })
    });
    const d = await r.json();
    const m = d?.data?.Media;
    console.log(JSON.stringify({ id: t.id, romaji: m?.title?.romaji, format: m?.format, hasCover: !!m?.coverImage?.extraLarge, url: m?.coverImage?.extraLarge ?? null }));
    await new Promise((res) => setTimeout(res, 400));
}
