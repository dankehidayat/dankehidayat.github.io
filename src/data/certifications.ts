/** Credentials shown on the home dashboard. Sorted newest first. */
export type Certification = {
    id: string;
    title: string;
    issuer: string;
    /** Display date, e.g. "Jul 2026" */
    issued: string;
    /** Sort key YYYY-MM */
    issuedSort: string;
    credentialId?: string;
    url?: string;
    source: 'coursera' | 'credly' | 'cisco' | 'other';
};

export const certifications: Certification[] = [
    {
        id: 'iot-enabled-farming',
        title: 'IoT Enabled Farming',
        issuer: 'EDUCBA',
        issued: 'Jul 2026',
        issuedSort: '2026-07',
        credentialId: '7EWSCG9TF62X',
        url: 'https://coursera.org/share/767946ac46560821d79924d3599dd498',
        source: 'coursera'
    },
    {
        id: 'python-data-science-ai',
        title: 'Python for Data Science, AI & Development',
        issuer: 'IBM',
        issued: 'Jul 2026',
        issuedSort: '2026-07',
        credentialId: 'QK515PXEBE7W',
        url: 'https://coursera.org/share/2f7028025ccc4741fe544b1f448b2385',
        source: 'coursera'
    },
    {
        id: 'linux-shell',
        title: 'Hands-on Introduction to Linux Commands and Shell Scripting',
        issuer: 'IBM',
        issued: 'Jul 2026',
        issuedSort: '2026-07',
        credentialId: '4GQJ7HTS3EV7',
        url: 'https://coursera.org/share/4db4ef19d3a2f1daa1abc933f8cfcf71',
        source: 'coursera'
    },
    {
        id: 'git-github',
        title: 'Getting Started with Git and GitHub',
        issuer: 'IBM',
        issued: 'Jul 2026',
        issuedSort: '2026-07',
        credentialId: 'IN3TJC3ES3J7',
        url: 'https://coursera.org/share/fdfba6725b4b8a4a8301687d225ca181',
        source: 'coursera'
    },
    {
        id: 'software-engineering',
        title: 'Introduction to Software Engineering',
        issuer: 'IBM',
        issued: 'Jul 2026',
        issuedSort: '2026-07',
        credentialId: 'I9CDA0IB01D1',
        url: 'https://coursera.org/share/016a90c6570e5b5007bc0c6ffdf11141',
        source: 'coursera'
    },
    {
        id: 'agile-scrum',
        title: 'Introduction to Agile Development and Scrum',
        issuer: 'IBM',
        issued: 'Apr 2026',
        issuedSort: '2026-04',
        credentialId: 'DF9EEYG5YZ1L',
        url: 'https://coursera.org/share/1127e3a73b0c04f6190e5911cacd6676',
        source: 'coursera'
    },
    {
        id: 'cloud-computing',
        title: 'Introduction to Cloud Computing',
        issuer: 'IBM',
        issued: 'Mar 2026',
        issuedSort: '2026-03',
        credentialId: 'MCCXPBUZLNEH',
        url: 'https://coursera.org/share/c3d511222229d250376fd635bd940ea8',
        source: 'coursera'
    },
    {
        id: 'devops',
        title: 'Introduction to DevOps',
        issuer: 'IBM',
        issued: 'Mar 2026',
        issuedSort: '2026-03',
        credentialId: 'X21UKW2CRUP4',
        url: 'https://coursera.org/share/8ed8255f7faaf4569814cf64342834ee',
        source: 'coursera'
    },
    {
        id: 'ccna-cyber-ops',
        title: 'Cisco Certified Network Associate Cyber Ops (CCNA)',
        issuer: 'Cisco',
        issued: 'Jun 2024',
        issuedSort: '2024-06',
        url: 'https://www.credly.com/badges/d66457f3-3d0a-4f73-80a0-755cd5016890/linked_in_profile',
        source: 'credly'
    },
    {
        id: 'ccna-security',
        title: 'Cisco Certified Network Associate Security (CCNA)',
        issuer: 'Cisco Networking Academy',
        issued: 'Dec 2023',
        issuedSort: '2023-12',
        source: 'cisco'
    },
    {
        id: 'ccnp',
        title: 'Cisco Certified Network Professional (CCNP)',
        issuer: 'Cisco Networking Academy',
        issued: 'Dec 2023',
        issuedSort: '2023-12',
        source: 'cisco'
    }
];

export const certificationsByDate = [...certifications].sort((a, b) =>
    a.issuedSort < b.issuedSort ? 1 : a.issuedSort > b.issuedSort ? -1 : 0
);
