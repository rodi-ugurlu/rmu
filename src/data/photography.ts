export interface Photo {
    id: number;
    src: string;
    alt: string;
}

/**
 * 46 photographs, ordered by priority (1 = highest).
 * All images are served from /photography/*.webp
 */
export const photos: Photo[] = Array.from({ length: 46 }, (_, i) => ({
    id: i + 1,
    src: `/photography/${i + 1}.webp`,
    alt: `Photography ${i + 1} — Rezan Mir Uğurlu`,
}));
