/**
 * Fun — the leisurely corner. Yuri manga, anime, light novels, and music.
 * All creator/artist credits verified against AniList / MAL / publisher pages.
 * Covers live in /fun/covers/*.jpg (downloaded from AniList CDN).
 *
 * Each entry carries a short list of links shown in the detail view:
 * one to a series database (MAL / AniList) and one to buy or read it
 * (official publisher / store / streaming). All links verified to return
 * HTTP 200 at authoring time.
 */

export type FunLink = {
    label: string;
    href: string;
};

export type FunEntry = {
    slug: string;
    /** Cover file slug when it differs from `slug` (reused key visuals). */
    cover?: string;
    title: string;
    english?: string;
    creator: string;
    note?: string;
    badge?: 'favorite' | 'all-time';
    links?: FunLink[];
};

export const funManga: FunEntry[] = [
    {
        slug: 'tsuki-wa-hitsuji-wo-kazoenai',
        title: 'Tsuki wa Hitsuji wo Kazoenai',
        english: 'So Fall Asleep, Held by Thee',
        creator: 'Ren Sakuragi',
        description: 'A girl in a dead-end life is summoned to another world to be the sleeping companion of a handsome cross-dressing princess.',
        note: 'Serialized in Comic Newtype (Kadokawa), 3 volumes.',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/manga/182132/Tsuki_wa_Hitsuji_wo_Kazoenai' },
            { label: 'ComicWalker', href: 'https://comic-walker.com/detail/KC_006665_S' }
        ]
    },
    {
        slug: 'haikei-arishi-hinisaku-hanatachie',
        title: 'Haikei, Arishi Hinisaku Hanatachie',
        creator: 'Jun Igarashi',
        description: 'A serious new student at an all-girls school finds a letter tucked in an old library book, yearning for a bond like the one it describes.',
        note: 'Web comic on Comic Apanta (Kadokawa).',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/manga/180941/Haikei_Arishihi_ni_Saku_Hana-tachi_e' },
            { label: 'ComicWalker', href: 'https://comic-walker.com/detail/KC_006092_S' }
        ]
    },
    {
        slug: 'ano-koro-no-aoi-hoshi',
        title: 'Ano Koro no Aoi Hoshi',
        creator: 'Kani',
        description: 'An ordinary high school girl falls for the beautiful, mysterious girl in the class next door.',
        note: 'A self-published web / doujin work.',
        links: [
            { label: 'Details', href: 'https://anilist.co/manga/127894' },
            { label: 'Amazon JP', href: 'https://www.amazon.co.jp/dp/B07R1TZVZK' }
        ]
    },
    {
        slug: 'zenbu-kowashite-jigoku-de-aishite',
        title: 'Zenbu Kowashite Jigoku de Aishite',
        english: 'If That\'s Love, Break It.',
        creator: 'Tamotsu Kuwabara',
        description: 'A picture-perfect student council president, crushed by expectations, is drawn into a vicious game with a truant classmate who sees through her.',
        note: 'Serialized in Comic Yuri Hime (Ichijinsha).',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/manga/157273/Zenbu_Kowashite_Jigoku_de_Aishite' },
            { label: 'Amazon JP', href: 'https://www.amazon.co.jp/dp/4758025908' }
        ]
    },
    {
        slug: 'shuuniichido-classmate-wo-kau-hanashi',
        title: 'Shuuniichido Classmate wo Kau Hanashi',
        english: 'Buying a Classmate Once a Week',
        creator: 'Story: Usa Haneda · Art: Migihara',
        description: 'Once a week, a girl at the bottom of the school caste pays 5,000 yen to buy three hours of her popular classmate\'s time.',
        note: 'Manga adaptation of the light novel by Usa Haneda (art by Migihara).',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/manga/156052/Shuu_ni_Ichido_Classmate_wo_Kau_Hanashi__Futari_no_Jikan_Iiwake_no_5000-en' },
            { label: 'Publisher', href: 'https://www.akitashoten.co.jp/comics/4253312330' }
        ]
    },
    {
        slug: 'rock-wa-lady-no-tashinami-deshite',
        title: 'Rock wa Lady no Tashinami Deshite',
        english: 'Rock Is a Lady\'s Modesty',
        creator: 'Hiroshi Fukuda',
        description: 'A girl dragged into high society finds her passion for rock music reignited by a secretly rebellious young lady.',
        note: 'Serialized in Young Animal (Hakusensha); TV anime in 2025.',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/manga/153031/Rock_wa_Lady_no_Tashinami_deshite' },
            { label: 'Publisher', href: 'https://younganimal.com/series/88091737601a5' }
        ]
    },
    {
        slug: 'ura-sekai-picnic',
        title: 'Ura Sekai Picnic',
        english: 'Otherside Picnic',
        creator: 'Story: Iori Miyazawa · Art: Eita Mizuno',
        description: 'Two women search a shifting, dangerous otherworld linked to internet urban legends, and each other.',
        note: 'Manga in Shonen Gangan (Square Enix); based on the light novel by Iori Miyazawa.',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/manga/110766/Urasekai_Picnic' },
            { label: 'Manga UP!', href: 'https://www.manga-up.com/titles/489' }
        ]
    },
    {
        slug: 'tayutau-koi-no-chirigiwa-ni',
        title: 'Tayutau Koi no Chirigiwa ni',
        creator: 'Yuama',
        description: 'At an all-girls academy, the "Princess" and "Prince" of the school hide a real friendship behind their perfect public roles.',
        note: 'Serialized in Comic Yuri Hime (Ichijinsha).',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/manga/184083/Tayutau_Koi_no_Chirigiwa_ni' },
            { label: 'Publisher', href: 'https://www.ichijinsha.co.jp/yurihime/title/%E3%82%86%E3%81%82%E3%81%BE/%E3%81%9F%E3%82%86%E3%81%9F%E3%81%86%E6%81%8B%E3%81%AE%E6%95%A3%E3%82%8A%E9%9A%9B%E3%81%AB/' }
        ]
    },
    {
        slug: 'kimi-to-tsuzuru-utakata',
        title: 'Kimi to Tsuzuru Utakata',
        english: 'The Summer You Were There',
        creator: 'Yuama',
        description: 'A shy girl who writes for herself has her secret manuscript found by a popular classmate who asks her to date for inspiration.',
        note: 'Serialized in Comic Yuri Hime; completed in 2024.',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/manga/128365/Kimi_to_Tsuzuru_Utakata' },
            { label: 'Publisher', href: 'https://www.ichijinsha.co.jp/yurihime/title/%E3%82%86%E3%81%82%E3%81%BE/%E5%90%9B%E3%81%A8%E7%B6%B4%E3%82%8B%E3%81%86%E3%81%9F%E3%81%8B%E3%81%9F/' }
        ]
    },
    {
        slug: 'amayo-no-tsuki',
        title: 'Amayo no Tsuki',
        english: 'The Moon on a Rainy Night',
        creator: 'Kuzushiro',
        description: 'A hearing-impaired girl who refuses special treatment slowly lets a new classmate past her cold exterior.',
        note: 'Serialized on Comic Days (Kodansha); TV anime announced.',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/manga/142310/Amayo_no_Tsuki' },
            { label: 'Publisher', href: 'https://www.kodansha.co.jp/titles/1000039575' }
        ]
    },
    {
        slug: 'lycoris-recoil-manga',
        title: 'Lycoris Recoil',
        creator: 'Art: Yasunori Bizen',
        description: 'The manga adaptation of the anime about a café staffed by secret agents and its two mismatched partners.',
        note: 'Manga in Monthly Comic Flapper (Kadokawa), based on the anime.',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/manga/150973/Lycoris_Recoil' },
            { label: 'ComicWalker', href: 'https://comic-walker.com/detail/KC_003821_S' }
        ]
    }
];

export const funAnime: FunEntry[] = [
    {
        slug: 'tai-ari-deshita',
        title: 'Tai-Ari deshita.: Ojou-sama wa Kakutou Game nante Shinai',
        english: 'Young Ladies Don\'t Play Fighting Games',
        creator: 'Original: Eri Ejima (manga) · Director: Shouta Ibata · Studio: diomedéa',
        description: 'A girl out to perfect her elegant image discovers her flawless idol is secretly a hardcore fighting-game player.',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/anime/46488/Tai-Ari_deshita_Ojousama_wa_Kakutou_Game_nante_Shinai' },
            { label: 'Official site', href: 'https://taiari-anime.com/' }
        ]
    },
    {
        slug: 'sayonara-lara',
        title: 'Sayonara Lara',
        english: 'Goodbye, Lara',
        creator: 'Original anime · Director: Takushi Koide · Studio: Kinema Citrus',
        description: 'A mermaid princess who gave up her voice for love gets one last chance at life, 200 years after turning human.',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/anime/58878/Sayonara_Lara' },
            { label: 'Official site', href: 'https://goodbyelara.com/' }
        ]
    },
    {
        slug: 'kimi-ga-shinu-made-koi-wo-shitai',
        title: 'Kimi ga Shinu made Koi wo Shitai',
        english: 'I Want to Love You Till Your Dying Day',
        creator: 'Original: Aono Nachi (manga) · Director: Yasushi Tomoda · Studio: ROLL2',
        description: 'At an orphanage where girls are raised as weapons, a girl who wants the fighting to end is paired with an immortal who cannot die.',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/anime/61126/Kimi_ga_Shinu_made_Koi_wo_Shitai' },
            { label: 'Official site', href: 'https://kimishinu.com' }
        ]
    },
    {
        slug: 'shoujo-kageki-revue-starlight',
        title: 'Shoujo☆Kageki Revue Starlight',
        english: 'Revue Starlight',
        creator: 'Original: Bushiroad · Director: Tomohiro Furukawa · Studio: Kinema Citrus',
        description: 'Stage girls compete in secret revues where every performance is a battle for the lead role.',
        badge: 'favorite',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/anime/35503/Shoujo%E2%98%86Kageki_Revue_Starlight' },
            { label: 'Official site', href: 'https://revuestarlight.com' }
        ]
    },
    {
        slug: 'watashi-wo-tabetai-hitodenashi',
        title: 'Watashi wo Tabetai, Hitodenashi',
        english: 'This Monster Wants to Eat Me',
        creator: 'Original: Sai Naekawa (manga) · Director: Yuusuke Suzuki · Studio: Studio Lings',
        description: 'A girl and the mermaid who promises to one day eat her build a strange, tender bond in the meantime.',
        badge: 'favorite',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/anime/60168/Watashi_wo_Tabetai_Hitodenashi' },
            { label: 'Official site', href: 'https://wata-tabe.com/' }
        ]
    },
    {
        slug: 'yagate-kimi-ni-naru',
        title: 'Yagate Kimi ni Naru',
        english: 'Bloom Into You',
        creator: 'Original: Nio Nakatani (manga) · Director: Makoto Katou · Studio: TROYCA',
        description: 'A girl who has never understood love is confused when the student council president she admires confesses to her.',
        badge: 'all-time',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/anime/37786/Yagate_Kimi_ni_Naru' },
            { label: 'Official site', href: 'https://yagakimi.com' }
        ]
    },
    {
        slug: 'kageki-shoujo',
        title: 'Kageki Shoujo!!',
        creator: 'Original: Kumiko Saiki (manga) · Director: Kazuhiro Yoneda · Studio: PINE JAM',
        description: 'An aspiring actress chasing a male lead role rooms with a former idol who also hopes to join the all-female troupe.',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/anime/43691/Kageki_Shoujo' },
            { label: 'Official site', href: 'https://kageki-anime.com/' }
        ]
    },
    {
        slug: 'watashi-ga-koibito-ni-neru-wake-nai',
        title: 'Watashi ga Koibito ni Nareru Wake Nai jan, Muri Muri! (※Muri ja Nakatta!?)',
        english: 'There\'s No Freaking Way I\'ll Be Your Lover! Unless…',
        creator: 'Original: Teren Mikami (LN, ill. Eku Takeshima) · Director: Natsumi Uchinuma · Studio: studio MOTHER',
        description: 'A girl desperate to be normal is confessed to by the school\'s glamorous model, and argues they should just stay best friends.',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/anime/60326/Watashi_ga_Koibito_ni_Nareru_Wake_Nai_jan_Muri_Muri_%E2%80%BBMuri_ja_Nakatta' },
            { label: 'Official site', href: 'https://www.watanare-anime.com/' }
        ]
    },
    {
        slug: 'bang-dream-ave-mujica',
        title: 'BanG Dream! Ave Mujica',
        english: 'Ave Mujica - The Die is Cast -',
        creator: 'Original: Bushiroad · Director: Koudai Kakimoto · Studio: SANZIGEN',
        description: 'After losing everything in a single night, a girl gathers others burdened by their own troubles and raises the curtain on a masked band.',
        badge: 'favorite',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/anime/56653/BanG_Dream_Ave_Mujica' },
            { label: 'Official site', href: 'https://bang-dream.com' }
        ]
    },
    {
        slug: 'maria-sama-ga-miteru',
        title: 'Maria-sama ga Miteru',
        english: 'Maria Watches Over Us',
        creator: 'Original: Oyuki Konno (LN, ill. Hibiki Reine) · Director: Yukihiro Matsushita · Studio: Studio DEEN',
        description: "A quiet Catholic girls' school where senior-junior 'sister' bonds shape the students' lives.",
        links: [
            { label: 'Details', href: 'https://myanimelist.net/anime/158/Maria-sama_ga_Miteru' },
            { label: 'Bandai Channel', href: 'https://www.b-ch.com/titles/2456' }
        ]
    },
    {
        slug: 'adachi-to-shimamura',
        title: 'Adachi to Shimamura',
        english: 'Adachi and Shimamura',
        creator: 'Original: Hitoma Iruma (LN, ill. Nozomi Ousaka) · Director: Satoshi Kuwabara · Studio: Tezuka Productions',
        description: 'Two girls who skip class together find their friendship slowly turning into something neither is sure how to name.',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/anime/39790/Adachi_to_Shimamura' },
            { label: 'Official site', href: 'https://www.tbs.co.jp/anime/adashima/' }
        ]
    },
    {
        slug: 'strawberry-panic',
        title: 'Strawberry Panic',
        creator: 'Original: Sakurako Kimino (LN, ill. Namuchi Takumi) · Director: Masayuki Sakoi · Studio: Madhouse',
        description: 'A classic academy yuri where students across three sister schools chase love and status.',
        badge: 'favorite',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/anime/855/Strawberry_Panic' },
            { label: 'Bandai Channel', href: 'https://www.b-ch.com/titles/538/001' }
        ]
    },
    {
        slug: 'kamiina-botan-yuri-no-hana',
        title: 'Kamiina Botan, Yoeru Sugata wa Yuri no Hana',
        english: 'Botan Kamiina Fully Blossoms When Drunk',
        creator: 'Original: Hey (web manga) · Director: Takashi Sakuma · Studio: Soigne',
        description: 'A university student takes her first sip of alcohol and bonds with her quiet dorm leader over drinks.',
        badge: 'favorite',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/anime/61186/Kamiina_Botan_Yoeru_Sugata_wa_Yuri_no_Hana' },
            { label: 'Official site', href: 'https://kamiina-botan.com/' }
        ]
    },
    {
        slug: 'lycoris-recoil',
        title: 'Lycoris Recoil',
        creator: 'Original anime · Director: Shingo Adachi · Studio: A-1 Pictures',
        description: 'A secret agent and her laid-back partner run a café between missions, balancing lethal work with gentle days.',
        note: 'The anime I keep going back to for its balance of slick action and soft warmth.',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/anime/50709/Lycoris_Recoil' },
            { label: 'Official site', href: 'https://lycoris-recoil.com' }
        ]
    }
];

export const funNovels: FunEntry[] = [
    {
        slug: 'watashi-ga-koibito-ni-neru-wake-nai-ln',
        title: 'Watashi ga Koibito ni Nareru Wake Nai jan, Muri Muri! (※Muri ja Nakatta!?)',
        english: 'There\'s No Freaking Way I\'ll Be Your Lover! Unless…',
        creator: 'Author: Teren Mikami · Art: Eku Takeshima',
        description: "The original light novel: two girls who insist they'd never date end up playing lovers anyway.",
        note: 'Dash X Bunko (Shueisha).',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/manga/128538/Watashi_ga_Koibito_ni_Nareru_Wake_Nai_jan_Muri_Muri_%E2%80%BBMuri_ja_Nakatta' },
            { label: 'Publisher', href: 'https://dash.shueisha.co.jp/feature/watanare/' }
        ]
    },
    {
        slug: 'shuuniichido-classmate-wo-kau-hanashi-ln',
        title: 'Shuuniichido Classmate wo Kau Hanashi: Futari no Jikan, Iiwake no Gosen Yen',
        english: 'Buying a Classmate Once a Week',
        creator: 'Author: Usa Haneda · Art: U35',
        description: 'A weekly-contract friendship between a classmate and the girl who pays for her time.',
        note: 'Fantasia Bunko (KADOKAWA).',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/manga/171320/Shuu_ni_Ichido_Classmate_wo_Kau_Hanashi__Futari_no_Jikan_Iiwake_no_5000-en' },
            { label: 'Publisher', href: 'https://promo.kadokawa.co.jp/fantasiabunko/special/202302shuichi/' }
        ]
    },
    {
        slug: 'watashi-no-hatsukoi-aite-ga-kiss-shiteta',
        title: 'Watashi no Hatsukoi Aite ga Kiss Shiteta',
        creator: 'Author: Hitoma Iruma · Art: Fly',
        description: 'Two high school girls are thrown together when one of them and her mother move into the other\'s cramped apartment.',
        note: 'Dengeki Bunko, 3 volumes.',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/manga/146908/Watashi_no_Hatsukoi_Aite_ga_Kiss_shiteta' },
            { label: 'Publisher', href: 'https://dengekibunko.jp/product/hatsukiss/' }
        ]
    },
    {
        slug: 'watashi-no-yuri-mo-eigyou-da-to-omotta',
        title: 'Watashi no Yuri mo, Eigyou da to Omotta?',
        english: 'Did You Think My Yuri Was Just for Show?',
        creator: 'Author: Nell Asakura · Art: Minori Chigusa',
        description: 'A voice actress still hung up on her retired idol gets a shock when the idol joins the same agency — and pursues her.',
        note: 'Dengeki Bunko.',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/manga/156767/Watashi_no_Yuri_mo_Eigyou_da_to_Omotta' },
            { label: 'Publisher', href: 'https://dengekibunko.jp/product/watayuri/322201000054.html' }
        ]
    },
    {
        slug: 'kirai-doushi-no-watashitachi',
        title: 'Kirai Doushi no Watashitachi wa Ichiya no Ayamachi de',
        creator: 'Author: 4ka Enpitsu · Art: Huna Kuga',
        description: "Two people who can't stand each other are bound together by a single night's mistake.",
        note: 'Kadokawa Sneaker Bunko.',
        links: [
            { label: 'Details', href: 'https://anilist.co/manga/211650' },
            { label: 'Publisher', href: 'https://sneakerbunko.jp/product/322601001308.html' }
        ]
    },
    {
        slug: 'ura-sekai-picnic-ln',
        cover: 'ura-sekai-picnic',
        title: 'Ura Sekai Picnic',
        english: 'Otherside Picnic',
        creator: 'Author: Iori Miyazawa · Art: shirakaba',
        description: 'The original light novel of two women venturing into a dangerous, impossible otherworld.',
        note: 'Hayakawa Bunko JA. Shown with the series key visual.',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/manga/120616/Urasekai_Picnic' },
            { label: 'Amazon JP', href: 'https://www.amazon.co.jp/dp/4150312648' }
        ]
    },
    {
        slug: 'lycoris-recoil-ordinary-days',
        title: 'Lycoris Recoil: Ordinary Days',
        creator: 'Author: Asaura · Art: Imigimuru',
        description: "A side-story collection of quiet everyday moments between the anime's episodes.",
        note: 'Dengeki Bunko. A side-story novel set between the episodes.',
        links: [
            { label: 'Details', href: 'https://myanimelist.net/manga/151431/Lycoris_Recoil' },
            { label: 'Publisher', href: 'https://dengekibunko.jp/product/lycoreco/322205000797.html' }
        ]
    }
];

export type MusicTrack = {
    spotifyId: string;
    title: string;
    meta: string;
};

export type MusicGroup = {
    artist: string;
    tracks: MusicTrack[];
};

export type MusicArtist = {
    name: string;
    href?: string;
};

export const musicGroups: MusicGroup[] = [
    {
        artist: 'CHiCO with HoneyWorks',
        tracks: [
            {
                spotifyId: '3lrLWugodcmk6bKQNFoG2e',
                title: 'Senjou no Hana (戦場の華)',
                meta: 'single'
            },
            {
                spotifyId: '59qhl6pSyp67qvkmVrWPYz',
                title: 'Minikui Ikimono (醜い生き物)',
                meta: 'single'
            }
        ]
    },
    {
        artist: '初星学園 · Gakuen iDOLM@STER',
        tracks: [
            {
                spotifyId: '1MQFWZEYYsgfq6GDAQajrI',
                title: 'Yellow Big Bang!',
                meta: '藤田ことね (Fujita Kotone)'
            },
            {
                spotifyId: '3KlwLipVYjiaXtGoil8aHR',
                title: 'メクルメ',
                meta: '篠澤 広 (Shinosawa Hiro)'
            },
            {
                spotifyId: '3zXHeutFzEDxJfSGnXfeft',
                title: 'Cosmetic',
                meta: '十王星南 (Juo Sena)'
            }
        ]
    }
];

export const musicArtists: MusicArtist[] = [
    { name: 'Ariabl\'eyeS', href: 'https://open.spotify.com/artist/5Ww5uWmy2GuecgPbwj02xM' },
    { name: 'ALI PROJECT', href: 'https://open.spotify.com/artist/1kCSjswFJFcjTauk0sKaOn' },
    { name: 'X JAPAN', href: 'https://open.spotify.com/artist/4VrqQQy6X0hlMtqY5gp6Wx' },
    { name: 'Millsage', href: 'https://open.spotify.com/artist/7cBKwPovugxX15beVkPZGA' },
    { name: 'Ave Mujica', href: 'https://open.spotify.com/artist/5BKIH2Kwc6LbetG04Boai7' },
    { name: 'MyGO!!!!', href: 'https://open.spotify.com/artist/5o5tkWvWYdyyAKhNr8vlMq' },
    { name: 'Love Solfege', href: 'https://open.spotify.com/artist/4rZ2TRw8s98ttQQOxM268O' },
    { name: 'Nirvana', href: 'https://open.spotify.com/artist/6olE6TJLqED3rqDCT0FyPh' }
];
