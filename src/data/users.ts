export type UserStatus = 'active' | 'inactive';

export interface User {
  id: number;
  name: string;
  email: string;
  location: string;
  status: UserStatus;
  jobTitle: string;
  university: string;
  avatarUrl?: string;
}

export const USERS: User[] = [
  {
    id: 1,
    name: 'Ayesha Khan',
    email: 'ayesha.khan@example.com',
    location: 'Lahore, Pakistan',
    status: 'active',
    jobTitle: 'Lead UI/UX Designer',
    university: 'LUMS Lahore',
  },
  {
    id: 2,
    name: 'Bilal Ahmed',
    email: 'bilal.ahmed@example.com',
    location: 'Islamabad, Pakistan',
    status: 'active',
    jobTitle: 'Full Stack Developer',
    university: 'NUST Islamabad',
  },
  {
    id: 3,
    name: 'Sara Malik',
    email: 'sara.malik@example.com',
    location: 'Karachi, Pakistan',
    status: 'inactive',
    jobTitle: 'Scrum Master',
    university: 'IBA Karachi',
  },
  {
    id: 4,
    name: 'Usman Tariq',
    email: 'usman.tariq@example.com',
    location: 'Rawalpindi, Pakistan',
    status: 'active',
    jobTitle: 'DevOps Architect',
    university: 'FAST-NUCES',
  },
  {
    id: 5,
    name: 'Fatima Zahra',
    email: 'fatima.zahra@example.com',
    location: 'Islamabad, Pakistan',
    status: 'active',
    jobTitle: 'Product Manager',
    university: 'Quaid-i-Azam University',
  },
  {
    id: 6,
    name: 'Hassan Raza',
    email: 'hassan.raza@example.com',
    location: 'Peshawar, Pakistan',
    status: 'active',
    jobTitle: 'Software Engineer',
    university: 'GIKI Topi',
  },
  {
    id: 7,
    name: 'Zara Hussain',
    email: 'zara.hussain@example.com',
    location: 'Lahore, Pakistan',
    status: 'active',
    jobTitle: 'QA Specialist',
    university: 'UET Lahore',
  },
  {
    id: 8,
    name: 'Ali Nawaz',
    email: 'ali.nawaz@example.com',
    location: 'Faisalabad, Pakistan',
    status: 'inactive',
    jobTitle: 'Cybersecurity Analyst',
    university: 'COMSATS Islamabad',
  },
  {
    id: 9,
    name: 'Mahnoor Iqbal',
    email: 'mahnoor.iqbal@example.com',
    location: 'Karachi, Pakistan',
    status: 'active',
    jobTitle: 'Frontend Engineer',
    university: 'NED University',
  },
  {
    id: 10,
    name: 'Hamza Sheikh',
    email: 'hamza.sheikh@example.com',
    location: 'Multan, Pakistan',
    status: 'inactive',
    jobTitle: 'Backend Developer',
    university: 'Punjab University',
  },
];
