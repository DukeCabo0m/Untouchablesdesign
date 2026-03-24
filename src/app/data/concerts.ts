export interface Concert {
  id: number;
  slug: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  status: 'upcoming' | 'past' | 'sold-out' | 'cancelled';
  festival?: string;
  ticketsUrl?: string;
  attendance?: string;
  support?: string;
}

export const concerts: Concert[] = [
  // Upcoming concerts - Tournée 2026
  {
    id: 1,
    slug: 'las-vegas-sick-new-world-2026',
    date: '2026-04-25',
    venue: 'Sick New World Las Vegas 2026',
    city: 'Las Vegas',
    country: 'États-Unis',
    status: 'upcoming',
    ticketsUrl: '#',
  },
  {
    id: 2,
    slug: 'bogota-coliseo-medplus-2026',
    date: '2026-05-02',
    venue: 'Coliseo Medplus Bogotá',
    city: 'Bogotá',
    country: 'Colombie',
    status: 'upcoming',
    ticketsUrl: '#',
  },
  {
    id: 3,
    slug: 'san-miguel-costa-21-2026',
    date: '2026-05-05',
    venue: 'Costa 21',
    city: 'San Miguel',
    country: 'Pérou',
    status: 'upcoming',
    ticketsUrl: '#',
  },
  {
    id: 4,
    slug: 'santiago-parque-estadio-2026',
    date: '2026-05-08',
    venue: 'Parque Estadio',
    city: 'Santiago',
    country: 'Chili',
    status: 'upcoming',
    ticketsUrl: '#',
  },
  {
    id: 5,
    slug: 'buenos-aires-parque-sarmiento-2026',
    date: '2026-05-10',
    venue: 'Parque Sarmiento',
    city: 'Buenos Aires',
    country: 'Argentine',
    status: 'upcoming',
    ticketsUrl: '#',
  },
  {
    id: 6,
    slug: 'asuncion-jockey-club-2026',
    date: '2026-05-13',
    venue: 'Jockey Club del Paraguay',
    city: 'Asunción',
    country: 'Paraguay',
    status: 'upcoming',
    ticketsUrl: '#',
  },
  {
    id: 7,
    slug: 'sao-paulo-allianz-parque-2026',
    date: '2026-05-16',
    venue: 'Allianz Parque',
    city: 'São Paulo',
    country: 'Brésil',
    status: 'upcoming',
    ticketsUrl: '#',
  },
  {
    id: 8,
    slug: 'mexico-city-palacio-deportes-2026',
    date: '2026-05-19',
    venue: 'Palacio de los Deportes',
    city: 'Mexico City',
    country: 'Mexique',
    status: 'sold-out',
    ticketsUrl: '#',
  },
  // Past concerts
  {
    id: 100,
    slug: 'paris-accor-arena-2023',
    date: '2023-11-28',
    venue: 'Accor Arena',
    city: 'Paris',
    country: 'France',
    status: 'past',
    attendance: '20,000',
    support: 'Code Orange',
  },
  {
    id: 101,
    slug: 'clisson-hellfest-2023',
    date: '2023-06-17',
    venue: 'Hellfest',
    city: 'Clisson',
    country: 'France',
    status: 'past',
    festival: 'Hellfest 2023',
    attendance: '60,000+',
    support: 'Gojira, Mastodon',
  },
  {
    id: 102,
    slug: 'clisson-hellfest-2022',
    date: '2022-06-19',
    venue: 'Hellfest',
    city: 'Clisson',
    country: 'France',
    status: 'past',
    festival: 'Hellfest 2022',
    attendance: '55,000+',
    support: 'Lamb of God, Deftones',
  },
  {
    id: 103,
    slug: 'clisson-hellfest-2019',
    date: '2019-06-21',
    venue: 'Hellfest',
    city: 'Clisson',
    country: 'France',
    status: 'past',
    festival: 'Hellfest 2019',
    attendance: '60,000+',
    support: 'Gojira, Parkway Drive',
  },
  {
    id: 104,
    slug: 'paris-accorhotels-arena-2019',
    date: '2019-11-15',
    venue: 'AccorHotels Arena',
    city: 'Paris',
    country: 'France',
    status: 'past',
    attendance: '18,500',
    support: 'Ho99o9',
  },
];