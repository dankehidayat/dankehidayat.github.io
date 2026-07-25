/** Bilingual About page body (markdown). Image handled in the page template. */
export const aboutByLang = {
    en: `
Hi. I'm **Danke Hidayat**.

I work in Bandung at **PT. Labdha Teknika Nusantara** as a junior software developer and junior DevOps engineer. The title is tidy. The day-to-day is messier: APIs, real-time dashboards, containers, reverse proxies, firmware that only fails on-site, and the glue that keeps all of that talking.

I grew up on the hardware side and kept sliding into software and ops, because a sensor reading is useless if nobody can see it, and a dashboard is useless if the box behind it dies every Tuesday.

## What I actually do

A lot of my work lives between the physical world and a browser tab. ESP32 boards, power meters, temperature and humidity, fuzzy rules that try to say whether a room is wasting electricity, databases that fill up with noisy samples until you clean them. React and TypeScript on the front. Fastify, Postgres, TimescaleDB, Docker, Ansible, Caddy on the rest. Calibration math when the numbers refuse to line up.

I care more about systems that keep running without me than about demos that only work on my laptop. Still shipping the demo first is fine. Leaving it half-deployed is not.

## Outside work

I study Japanese when I can. I read a lot of **yuri**. I write **novels and fan fiction** when a story refuses to leave me alone.

Things that keep showing up in my free time: **Revue Starlight**, **BanG Dream!** (**Ave Mujica**, **MyGO!!!!!**, **Mugendai Mewtype**), and **Path to Nowhere**. For longer sessions I still open **Cities: Skylines**. For shooters I go back to **Insurgency**.

This site is where I put technical notes too. Calibration, automation, small craft posts. Blog posts are MDX files in the repo. If I want to fix a sentence, I edit a file and rebuild.

## Working together

I'm open to:

- **IoT / embedded** work (sensors, edge, dashboards, ops around them)
- **Farm** monitoring and automation that has to survive heat, dust, and bad connectivity
- **City / local government** ideas around smart IoT, and machine learning only when the data is real enough to deserve it
- Junior software, full-stack, and DevOps roles on connected systems

Resume is [a PDF](/Resume_Danke_Hidayat.pdf). Fastest path is [email](/contact). Short messages are fine. Tell me what broke or what you want to build.
`,
    id: `
Halo. Saya **Danke Hidayat**.

Saya kerja di Bandung, di **PT. Labdha Teknika Nusantara**, sebagai junior software developer dan junior DevOps engineer. Judulnya rapi. Harinya lebih berantakan: API, dashboard real-time, container, reverse proxy, firmware yang baru error di lapangan, plus lem yang bikin semuanya masih saling nyambung.

Saya mulai dari sisi hardware, lalu pelan-pelan masuk software dan ops. Bacaan sensor nggak ada gunanya kalau nggak ada yang bisa lihat, dan dashboard juga sia-sia kalau mesin di belakangnya mati tiap Selasa.

## Yang biasa saya kerjain

Banyak kerjaan saya ada di antara dunia fisik dan tab browser. Papan ESP32, meteran listrik, suhu dan kelembapan, aturan fuzzy yang coba bilang apakah ruangan boros listrik, database yang penuh sample berisik sampai dibersihin. React dan TypeScript di depan. Fastify, Postgres, TimescaleDB, Docker, Ansible, Caddy di sisanya. Matematika kalibrasi kalau angkanya ngotot nggak pas.

Saya lebih peduli sistem yang tetap hidup tanpa saya jaga malam-malam daripada demo yang cuma jalan di laptop. Demo dulu boleh. Nggak pernah di-deploy, jangan.

## Di luar kerja

Saya belajar bahasa Jepang pelan-pelan. Banyak baca **yuri**. Saya juga **nulis novel dan fan fiction** kalau ada cerita yang nggak mau pergi dari kepala.

Yang sering nempel di waktu luang: **Revue Starlight**, **BanG Dream!** (**Ave Mujica**, **MyGO!!!!!**, **Mugendai Mewtype**), sama **Path to Nowhere**. Buat sesi panjang masih buka **Cities: Skylines**. Buat shooter saya balik ke **Insurgency**.

Situs ini juga tempat saya taruh catatan teknis. Kalibrasi, otomasi, tulisan kecil soal craft. Postingan blog file MDX di repo. Mau benahi kalimat, edit file, build ulang.

## Kerja bareng

Saya terbuka untuk:

- Kerjaan **IoT / embedded** (sensor, edge, dashboard, ops di sekitarnya)
- Monitoring dan otomasi **pertanian** yang harus tahan panas, debu, dan koneksi jelek
- Ide **kota / pemda** soal smart IoT, dan machine learning hanya kalau datanya memang layak
- Peran junior software, full-stack, dan DevOps di sistem yang saling terhubung

Resume ada [PDF-nya](/Resume_Danke_Hidayat.pdf). Paling cepat lewat [email](/id/contact). Pesan pendek juga oke. Cerita aja apa yang rusak, atau apa yang mau dibangun.
`
} as const;
