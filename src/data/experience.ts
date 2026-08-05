export type TimelineItem = {
    period: string;
    title: string;
    org: string;
    location: string;
    type: 'work' | 'education' | 'other';
    summary?: string;
    points?: string[];
    link?: string;
};

export const workTimeline: TimelineItem[] = [
    {
        period: 'Jan 2026 - Present',
        title: 'Junior DevOps Engineer',
        org: 'PT. Labdha Teknika Nusantara',
        location: 'Bandung, Indonesia · On-site',
        type: 'work',
        summary:
            'Operating the infrastructure behind the company\u2019s dashboards and APIs — deployment, automation, and reliability.',
        points: [
            'Develop and maintain Ansible playbooks for provisioning, configuration, and patch management across the server fleet.',
            'Manage release cycles end to end — dependency audits, security patches, rolling deployments, and rollback strategies.',
            'Own containerization and orchestration of application services across development, staging, and production environments.',
            'Configure and maintain the reverse proxy layer, including automated TLS certificate management.',
            'Monitor service health, uptime, and capacity, and respond to incidents until they are resolved.',
            'Enforce reliability and security practices — backups, access control, secrets management, and rollback drills.'
        ]
    },
    {
        period: 'Oct 2025 - Present',
        title: 'Junior Software Developer',
        org: 'PT. Labdha Teknika Nusantara',
        location: 'Bandung, Indonesia · On-site',
        type: 'work',
        summary:
            'Designing and building software across the stack — from user interface to backend — for connected products.',
        points: [
            'Design and build full-stack applications with the Labdha Design System, from user interface to backend API.',
            'Develop Trenvm, a trend-forecasting application built with Flutter for Android and iOS. The platform combines causal and generative modeling with natural-language understanding to give small businesses, designers, marketers, and entrepreneurs fast, reliable, and affordable market predictions.',
            'Own features through the full development cycle — planning, implementation, testing, and release.'
        ]
    },
    {
        period: 'Dec 2024 - Feb 2025',
        title: 'Data Analyst',
        org: 'PT. Global Kreatif Inovasi',
        location: 'South Jakarta, Indonesia · Remote',
        type: 'work',
        points: [
            'Aggregated and cleaned operational datasets in Google Sheets for weekly performance reports and KPI dashboards.',
            'Ran data validation and QA to protect accuracy across BI reporting pipelines.',
            'Tested Android ERM applications for workflow bottlenecks and UX friction.',
            'Documented defects with clear reproduction steps and collaborated through structured issue tracking.',
            'Designed visualizations and executive summaries that turned metrics into decisions.'
        ]
    },
    {
        period: 'Aug 2024 - Dec 2024',
        title: 'Software Tester',
        org: 'PT. Global Kreatif Inovasi',
        location: 'South Jakarta, Indonesia · Remote',
        type: 'work',
        points: [
            'Executed cross-platform responsive testing across devices, resolutions, and OS versions.',
            'Validated UI against Figma with pixel-level precision across screens and components.',
            'Ran exploratory testing to surface edge cases, usability gaps, and unhandled states.',
            'Delivered structured feedback to UI/UX designers from usability and heuristic evaluation.',
            'Authored test scenarios, edge-case docs, and bug reports with full discovery-to-resolution traceability.',
            'Researched Odoo ERP modules for reusable integration patterns (KompakApps).',
            'Participated in agile ceremonies across the full software development lifecycle.'
        ]
    },
    {
        period: 'Aug 2020 - Jan 2021',
        title: 'Assistant IT Officer',
        org: 'Wyndham Hotel Casablanca',
        location: 'South Jakarta, Indonesia · On-site',
        type: 'work',
        points: [
            'Ran daily IT operations: backups, security patching, and endpoint fleet maintenance.',
            'Programmed and deployed RFID keycard access for staff zones and guest rooms.',
            'Diagnosed hardware and software incidents across workstations, printers, and network gear.',
            'Installed and maintained Oracle POS for restaurant and front desk operations.',
            'Supported AV and network setup for bi-weekly corporate conferences.',
            'Delivered front-line support and kept accurate IT asset inventory.'
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
        points: [
            'Course coordinator for Basic Computer Networking (TEK108) and Computational Mathematics (TEK101).',
            'A grades: Embedded Systems, Web Programming, Cybersecurity, IoT Project.',
            'A− grades: Machine Learning, Advanced Networking, Object-Oriented Programming.'
        ]
    },
    {
        period: 'Aug 2018 - Aug 2021',
        title: 'Computer and Network Engineering',
        org: 'SMKN 2 Depok',
        location: 'Depok City, Indonesia',
        type: 'education',
        points: [
            'Hands-on Cisco and MikroTik networking fundamentals.',
            'Class president (11th grade) and student library assistant.',
            'Configured TP-Link and MikroTik routers for school CBT examination infrastructure.',
            'LKS IT Networking Systems Administration: 11th of 24 participants (2019).'
        ]
    }
];

export const additionalTimeline: TimelineItem[] = [
    {
        period: 'Aug 2019 - Jun 2021',
        title: 'Member · Nikukabu (Japanese Club)',
        org: 'Depok, West Java',
        location: 'Depok, Indonesia',
        type: 'other',
        points: [
            'Hiragana and Katakana literacy; basic conversation through media and games.',
            'Japanese culture, etiquette, and traditional arts (tea ceremony, calligraphy, festivals).'
        ]
    },
    {
        period: 'Aug 2019 - Jan 2020',
        title: 'Member · Robotic Club',
        org: 'Depok, West Java',
        location: 'Depok, Indonesia',
        type: 'other',
        points: [
            'Schematic design and PCB layout in Eagle.',
            'Built and programmed a line-follower robot as a team project.'
        ]
    },
    {
        period: 'Jan 2017 - Dec 2019',
        title: 'Self-Paced Learner · freeCodeCamp',
        org: 'Online',
        location: 'South Jakarta, Indonesia',
        type: 'other',
        points: [
            'Project-based front-end curriculum and multiple certifications.',
            'Built responsive projects with HTML, CSS, JavaScript, React, and Git/GitHub.',
            'Practiced mobile-first design, accessibility, and client-side rendering.'
        ]
    }
];
