import type { Lang } from '../i18n/ui';

export type TimelineItem = {
    period: string;
    title: string;
    org: string;
    location: string;
    locationId?: string;
    type: 'work' | 'education' | 'other';
    summary?: string;
    summaryId?: string;
    points?: string[];
    pointsId?: string[];
    link?: string;
};

export function localizeItem(item: TimelineItem, lang: Lang) {
    return {
        ...item,
        location: lang === 'id' && item.locationId ? item.locationId : item.location,
        summary: lang === 'id' && item.summaryId ? item.summaryId : item.summary,
        points: lang === 'id' && item.pointsId ? item.pointsId : item.points
    };
}

export const workTimeline: TimelineItem[] = [
    {
        period: 'Jan 2026 - Present',
        title: 'Junior DevOps Engineer',
        org: 'PT. Labdha Teknika Nusantara',
        location: 'Bandung, Indonesia · On-site',
        locationId: 'Bandung, Indonesia · On-site',
        type: 'work',
        summary:
            'Owning containerization, automation, reverse proxy, and release operations for IoT dashboard services and APIs.',
        summaryId:
            'Mengelola containerization, otomasi, reverse proxy, dan operasi rilis untuk layanan dashboard IoT serta API.',
        points: [
            'Own the full Docker and Docker Compose lifecycle across development, staging, and production to eliminate configuration drift and speed onboarding.',
            'Develop and maintain Ansible playbooks for automated provisioning, patch management, and configuration enforcement.',
            'Configure Caddy as the primary reverse proxy with automated SSL/TLS lifecycle management and zero-downtime certificate renewal.',
            'Implement proactive monitoring and alerting for application health, resource utilization, and uptime across IoT dashboards and REST APIs.',
            'Manage release cycles including dependency audits, security patches, rolling deployments, and rollback strategies.'
        ],
        pointsId: [
            'Mengelola siklus penuh Docker dan Docker Compose di development, staging, dan production agar konfigurasi tidak drift dan onboarding lebih cepat.',
            'Mengembangkan dan merawat playbook Ansible untuk provisioning otomatis, patch management, dan penegakan konfigurasi.',
            'Mengonfigurasi Caddy sebagai reverse proxy utama dengan manajemen siklus SSL/TLS otomatis dan perpanjangan sertifikat tanpa downtime.',
            'Menerapkan monitoring dan alerting proaktif untuk kesehatan aplikasi, utilisasi resource, dan uptime di dashboard IoT serta REST API.',
            'Mengelola siklus rilis: audit dependensi, patch keamanan, rolling deployment, dan strategi rollback.'
        ]
    },
    {
        period: 'Oct 2025 - Present',
        title: 'Junior Software Developer',
        org: 'PT. Labdha Teknika Nusantara',
        location: 'Bandung, Indonesia · On-site',
        locationId: 'Bandung, Indonesia · On-site',
        type: 'work',
        summary:
            'Designing and maintaining reliable software for embedded and connected systems: full-stack apps, sensor pipelines, and real-time dashboards.',
        summaryId:
            'Merancang dan merawat perangkat lunak andal untuk sistem tertanam dan terhubung: aplikasi full-stack, pipeline sensor, dan dashboard real-time.',
        points: [
            'Architect end-to-end IoT solutions spanning embedded firmware integration, backend APIs, and real-time visualization for energy and environmental monitoring.',
            'Lead full-stack development with React, TypeScript, Fastify, and PostgreSQL: from schema design through responsive UI.',
            'Design fuzzy logic inference engines and statistical analytics for sensor classification, energy analysis, and time-series forecasting.',
            'Developed trenvm, a Flutter trend-forecast magazine app with API integration and Figma UI/UX prototypes.',
            'Contributed to ITB PRISM financial stress-testing demo with responsive layouts and UI polish for stakeholder presentations.',
            'Drive quality through integration testing, peer reviews, and technical documentation; collaborate with hardware, design, and product stakeholders.'
        ],
        pointsId: [
            'Merancang solusi IoT ujung-ke-ujung: integrasi firmware tertanam, API backend, dan visualisasi real-time untuk monitoring energi dan lingkungan.',
            'Memimpin pengembangan full-stack dengan React, TypeScript, Fastify, dan PostgreSQL: dari desain skema hingga UI responsif.',
            'Merancang mesin inferensi fuzzy logic dan analitik statistik untuk klasifikasi sensor, analisis energi, dan peramalan time-series.',
            'Mengembangkan trenvm, aplikasi majalah trend-forecast berbasis Flutter dengan integrasi API dan prototipe UI/UX Figma.',
            'Berkontribusi pada demo stress-testing keuangan ITB PRISM dengan layout responsif dan polesan UI untuk presentasi stakeholder.',
            'Menjaga kualitas lewat integration testing, peer review, dan dokumentasi teknis; berkolaborasi dengan hardware, desain, dan produk.'
        ]
    },
    {
        period: 'Dec 2024 - Feb 2025',
        title: 'Data Analyst',
        org: 'PT. Global Kreatif Inovasi',
        location: 'South Jakarta, Indonesia · Remote',
        locationId: 'Jakarta Selatan, Indonesia · Remote',
        type: 'work',
        points: [
            'Aggregated and cleaned operational datasets in Google Sheets for weekly performance reports and KPI dashboards.',
            'Ran data validation and QA to protect accuracy across BI reporting pipelines.',
            'Tested Android ERM applications for workflow bottlenecks and UX friction.',
            'Documented defects with clear reproduction steps and collaborated through structured issue tracking.',
            'Designed visualizations and executive summaries that turned metrics into decisions.'
        ],
        pointsId: [
            'Mengagregasi dan membersihkan dataset operasional di Google Sheets untuk laporan kinerja mingguan dan dashboard KPI.',
            'Menjalankan validasi data dan QA agar akurasi pipeline pelaporan BI terjaga.',
            'Menguji aplikasi ERM Android untuk bottleneck alur kerja dan gesekan UX.',
            'Mendokumentasikan defect dengan langkah reproduksi yang jelas dan berkolaborasi lewat pelacakan isu terstruktur.',
            'Merancang visualisasi dan ringkasan eksekutif yang mengubah metrik menjadi keputusan.'
        ]
    },
    {
        period: 'Aug 2024 - Dec 2024',
        title: 'Software Tester',
        org: 'PT. Global Kreatif Inovasi',
        location: 'South Jakarta, Indonesia · Remote',
        locationId: 'Jakarta Selatan, Indonesia · Remote',
        type: 'work',
        points: [
            'Executed cross-platform responsive testing across devices, resolutions, and OS versions.',
            'Validated UI against Figma with pixel-level precision across screens and components.',
            'Ran exploratory testing to surface edge cases, usability gaps, and unhandled states.',
            'Delivered structured feedback to UI/UX designers from usability and heuristic evaluation.',
            'Authored test scenarios, edge-case docs, and bug reports with full discovery-to-resolution traceability.',
            'Researched Odoo ERP modules for reusable integration patterns (KompakApps).',
            'Participated in agile ceremonies across the full software development lifecycle.'
        ],
        pointsId: [
            'Menjalankan pengujian responsif lintas platform di berbagai perangkat, resolusi, dan versi OS.',
            'Memvalidasi UI terhadap Figma dengan presisi setingkat piksel di berbagai layar dan komponen.',
            'Menjalankan exploratory testing untuk menemukan edge case, celah usability, dan state yang belum ditangani.',
            'Memberi umpan balik terstruktur ke desainer UI/UX dari evaluasi usability dan heuristik.',
            'Menulis skenario uji, dokumentasi edge case, dan laporan bug dengan jejak penemuan hingga resolusi.',
            'Meneliti modul Odoo ERP untuk pola integrasi yang dapat dipakai ulang (KompakApps).',
            'Berpartisipasi dalam upacara agile di seluruh siklus pengembangan perangkat lunak.'
        ]
    },
    {
        period: 'Aug 2020 - Jan 2021',
        title: 'Assistant IT Officer',
        org: 'Wyndham Hotel Casablanca',
        location: 'South Jakarta, Indonesia · On-site',
        locationId: 'Jakarta Selatan, Indonesia · On-site',
        type: 'work',
        points: [
            'Ran daily IT operations: backups, security patching, and endpoint fleet maintenance.',
            'Programmed and deployed RFID keycard access for staff zones and guest rooms.',
            'Diagnosed hardware and software incidents across workstations, printers, and network gear.',
            'Installed and maintained Oracle POS for restaurant and front desk operations.',
            'Supported AV and network setup for bi-weekly corporate conferences.',
            'Delivered front-line support and kept accurate IT asset inventory.'
        ],
        pointsId: [
            'Menjalankan operasi IT harian: backup, patch keamanan, dan perawatan armada endpoint.',
            'Memprogram dan mendeploy akses keycard RFID untuk area staf dan kamar tamu.',
            'Mendiagnosis insiden hardware dan software di workstation, printer, dan perangkat jaringan.',
            'Menginstal dan merawat Oracle POS untuk operasional restoran dan front desk.',
            'Mendukung setup AV dan jaringan untuk konferensi korporat dua mingguan.',
            'Memberi dukungan garis depan dan menjaga inventaris aset IT yang akurat.'
        ]
    }
];

export const educationTimeline: TimelineItem[] = [
    {
        period: 'Aug 2021 - Present',
        title: 'B.App.Tech in Computer Engineering',
        org: 'Vocational School of IPB University',
        location: 'Bogor, Indonesia',
        type: 'education',
        summary: 'GPA 3.57 / 4.00 · 139 semester credit units completed.',
        summaryId: 'IPK 3,57 / 4,00 · 139 SKS diselesaikan.',
        points: [
            'Course coordinator for Basic Computer Networking (TEK108) and Computational Mathematics (TEK101).',
            'A grades: Embedded Systems, Web Programming, Cybersecurity, IoT Project.',
            'A− grades: Machine Learning, Advanced Networking, Object-Oriented Programming.'
        ],
        pointsId: [
            'Koordinator mata kuliah Jaringan Komputer Dasar (TEK108) dan Matematika Komputasi (TEK101).',
            'Nilai A: Sistem Tertanam, Pemrograman Web, Keamanan Siber, Proyek IoT.',
            'Nilai A−: Machine Learning, Jaringan Lanjut, Pemrograman Berorientasi Objek.'
        ]
    },
    {
        period: 'Aug 2018 - Aug 2021',
        title: 'Computer and Network Engineering',
        org: 'SMKN 2 Depok',
        location: 'Depok City, Indonesia',
        locationId: 'Kota Depok, Indonesia',
        type: 'education',
        points: [
            'Hands-on Cisco and MikroTik networking fundamentals.',
            'Class president (11th grade) and student library assistant.',
            'Configured TP-Link and MikroTik routers for school CBT examination infrastructure.',
            'LKS IT Networking Systems Administration: 11th of 24 participants (2019).'
        ],
        pointsId: [
            'Praktik fundamental jaringan Cisco dan MikroTik.',
            'Ketua kelas (kelas 11) dan asisten perpustakaan siswa.',
            'Mengonfigurasi router TP-Link dan MikroTik untuk infrastruktur ujian CBT sekolah.',
            'LKS IT Networking Systems Administration: peringkat 11 dari 24 peserta (2019).'
        ]
    }
];

export const additionalTimeline: TimelineItem[] = [
    {
        period: 'Aug 2019 - Jun 2021',
        title: 'Member · Nikukabu (Japanese Club)',
        org: 'Depok, West Java',
        location: 'Depok, Indonesia',
        locationId: 'Depok, Indonesia',
        type: 'other',
        points: [
            'Hiragana and Katakana literacy; basic conversation through media and games.',
            'Japanese culture, etiquette, and traditional arts (tea ceremony, calligraphy, festivals).'
        ],
        pointsId: [
            'Literasi Hiragana dan Katakana; percakapan dasar lewat media dan permainan.',
            'Budaya Jepang, etiket, dan seni tradisional (upacara teh, kaligrafi, festival).'
        ]
    },
    {
        period: 'Aug 2019 - Jan 2020',
        title: 'Member · Robotic Club',
        org: 'Depok, West Java',
        location: 'Depok, Indonesia',
        locationId: 'Depok, Indonesia',
        type: 'other',
        points: [
            'Schematic design and PCB layout in Eagle.',
            'Built and programmed a line-follower robot as a team project.'
        ],
        pointsId: [
            'Desain skematik dan layout PCB di Eagle.',
            'Membangun dan memprogram robot line-follower sebagai proyek tim.'
        ]
    },
    {
        period: 'Jan 2017 - Dec 2019',
        title: 'Self-Paced Learner · freeCodeCamp',
        org: 'Online',
        location: 'South Jakarta, Indonesia',
        locationId: 'Jakarta Selatan, Indonesia',
        type: 'other',
        points: [
            'Project-based front-end curriculum and multiple certifications.',
            'Built responsive projects with HTML, CSS, JavaScript, React, and Git/GitHub.',
            'Practiced mobile-first design, accessibility, and client-side rendering.'
        ],
        pointsId: [
            'Kurikulum front-end berbasis proyek dan beberapa sertifikasi.',
            'Membangun proyek responsif dengan HTML, CSS, JavaScript, React, dan Git/GitHub.',
            'Melatih desain mobile-first, aksesibilitas, dan client-side rendering.'
        ]
    }
];
