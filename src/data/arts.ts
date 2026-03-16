export interface Artwork {
    id: number;
    image: string;
    title: string;
    dimensions: string;
    medium: string;
    city: string;
    year: string;
    aspectRatio: string;
    note?: string;
    featured?: boolean;
    layout: 'wide' | 'standard' | 'compact' | 'balanced';
}

export const artworks: Artwork[] = [
    {
        id: 1,
        image: '/arts/1.webp',
        title: 'A Friday in the Stadium of Aphrodisias',
        dimensions: '25 x 35 cm',
        medium: 'Acrylic on paper',
        city: 'Ahlat',
        year: '2025',
        aspectRatio: '5 / 7',
        note: 'Stone, crowd, and stillness are held in the same surface.',
        featured: true,
        layout: 'wide',
    },
    {
        id: 2,
        image: '/arts/2.webp',
        title: 'Şahane Rüyalar Gördük',
        dimensions: '50 x 70 cm',
        medium: 'Acrylic collage',
        city: 'Beyoğlu',
        year: '2023',
        aspectRatio: '5 / 7',
        note: 'A cut-and-paste memory field where image fragments keep rubbing against each other.',
        layout: 'wide',
    },
    {
        id: 3,
        image: '/arts/3.webp',
        title: 'İçtimaya Geç Kalan İnek',
        dimensions: '25 x 35 cm',
        medium: 'Acrylic on paper',
        city: 'Ahlat',
        year: '2024',
        aspectRatio: '5 / 7',
        layout: 'standard',
    },
    {
        id: 4,
        image: '/arts/4.webp',
        title: 'Jeff Buckley ve Geç Gelen Kadın',
        dimensions: '50 x 70 cm',
        medium: 'Oil on canvas',
        city: 'Diyarbakır',
        year: '2016',
        aspectRatio: '5 / 7',
        layout: 'compact',
    },
    {
        id: 5,
        image: '/arts/5.webp',
        title: 'New Woman',
        dimensions: '50 x 70 cm',
        medium: 'Oil on canvas',
        city: 'Diyarbakır',
        year: '2016',
        aspectRatio: '5 / 7',
        layout: 'compact',
    },
    {
        id: 6,
        image: '/arts/6.webp',
        title: 'Sad Story of Anatolia',
        dimensions: '50 x 70 cm',
        medium: 'Oil on canvas',
        city: 'Diyarbakır',
        year: '2016',
        aspectRatio: '5 / 7',
        layout: 'compact',
    },
    {
        id: 7,
        image: '/arts/7.webp',
        title: 'The Anatomy of a Love',
        dimensions: '50 x 70 cm',
        medium: 'Oil on canvas',
        city: 'Diyarbakır',
        year: '2016',
        aspectRatio: '5 / 7',
        note: 'A quieter closing image, held back until the end of the sequence.',
        layout: 'balanced',
    },
];
