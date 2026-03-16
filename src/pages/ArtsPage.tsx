import { useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Photo } from '../data/photography';
import { artworks } from '../data/arts';
import PageShell from '../components/ui/PageShell';
import SectionLabel from '../components/ui/SectionLabel';
import ImageWithSkeleton from '../components/ui/ImageWithSkeleton';
import Lightbox from '../components/ui/Lightbox';
import './ArtsPage.css';

const layoutClasses = {
    wide: 'md:col-span-7',
    standard: 'md:col-span-5',
    compact: 'md:col-span-4',
    balanced: 'md:col-span-6',
} as const;

const cardToneClasses = {
    wide: 'arts-card--wide',
    standard: 'arts-card--standard',
    compact: 'arts-card--compact',
    balanced: 'arts-card--balanced',
} as const;

export default function ArtsPage() {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const featuredArtwork = artworks.find((art) => art.featured) ?? artworks[0];
    const galleryArtworks = artworks.filter((art) => art.id !== featuredArtwork.id);

    const lightboxItems = useMemo<Photo[]>(
        () => artworks.map((art) => ({ id: art.id, src: art.image, alt: art.title })),
        []
    );

    const yearsLabel = useMemo(() => {
        const years = artworks
            .map((art) => Number.parseInt(art.year, 10))
            .filter((year) => Number.isFinite(year));
        if (years.length === 0) return 'Selected';
        return `${Math.min(...years)}—${Math.max(...years)}`;
    }, []);

    const mediumCount = useMemo(() => new Set(artworks.map((art) => art.medium)).size, []);

    const handleOpenByArtworkId = useCallback((artId: number) => {
        setLightboxIndex(artworks.findIndex((item) => item.id === artId));
    }, []);

    const handleCloseLightbox = useCallback(() => {
        setLightboxIndex(null);
    }, []);

    const handleNavigateLightbox = useCallback((index: number) => {
        setLightboxIndex(index);
    }, []);

    return (
        <PageShell wide>
            <motion.header
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="arts-header"
            >
                <div className="arts-header-grid">
                    <div>
                        <h1 className="arts-title">Arts</h1>
                    </div>

                    <p className="arts-dek">
                        Paintings and collages moving between figure, memory, and place. The
                        sequence behaves like a gallery wall, not a list.
                    </p>
                </div>

                <div className="arts-stats-grid">
                    {[
                        { label: 'Works', value: artworks.length.toString().padStart(2, '0') },
                        { label: 'Years', value: yearsLabel },
                        { label: 'Mediums', value: mediumCount.toString().padStart(2, '0') },
                        { label: 'Interaction', value: 'Open any work' },
                    ].map((stat) => (
                        <div key={stat.label} className="arts-stat-item">
                            <p className="arts-stat-label">{stat.label}</p>
                            <p className="arts-stat-value">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </motion.header>

            <section className="arts-featured-section">
                <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    onClick={() => handleOpenByArtworkId(featuredArtwork.id)}
                    className="arts-featured-media group"
                    style={{ background: 'transparent' }}
                >
                    <div className="arts-featured-image-shell">
                        <ImageWithSkeleton
                            src={featuredArtwork.image}
                            alt={featuredArtwork.title}
                            loading="eager"
                            aspectRatio="1 / 1"
                            className="arts-featured-image"
                        />
                        <div className="arts-featured-overlay" />
                        <div className="arts-featured-open-pill">Open Artwork</div>
                    </div>
                </motion.button>

                <motion.aside
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.18 }}
                    className="arts-featured-panel"
                >
                    <SectionLabel>Featured Work</SectionLabel>
                    <h2 className="arts-featured-title">{featuredArtwork.title}</h2>
                    <p className="arts-featured-subline">
                        {featuredArtwork.dimensions} / {featuredArtwork.medium}
                    </p>

                    <div className="arts-featured-meta-grid">
                        {[
                            { label: 'Medium', value: featuredArtwork.medium },
                            { label: 'Dimensions', value: featuredArtwork.dimensions },
                            { label: 'City', value: featuredArtwork.city },
                            { label: 'Year', value: featuredArtwork.year },
                        ].map((item) => (
                            <div key={item.label} className="arts-featured-meta-item">
                                <p className="arts-featured-meta-label">{item.label}</p>
                                <p className="arts-featured-meta-value">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    <p className="arts-featured-copy">
                        This opening work establishes the pace of the page: figure and structure
                        coexisting in a single, tactile surface.
                    </p>

                    {featuredArtwork.note && (
                        <p className="arts-featured-note">{featuredArtwork.note}</p>
                    )}

                    <button
                        type="button"
                        onClick={() => handleOpenByArtworkId(featuredArtwork.id)}
                        className="arts-featured-cta"
                    >
                        View full image
                        <span className="arts-featured-cta-line" />
                    </button>
                </motion.aside>
            </section>

            <section className="arts-gallery-section">
                <div className="arts-gallery-header">
                    <SectionLabel>Gallery Wall</SectionLabel>
                    <p className="arts-gallery-hint">Click any work to expand</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
                    {galleryArtworks.map((art, index) => (
                        <motion.button
                            key={art.id}
                            type="button"
                            initial={{ opacity: 0, y: 26 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-120px' }}
                            transition={{ duration: 0.7, delay: Math.min(index * 0.05, 0.35) }}
                            onClick={() => handleOpenByArtworkId(art.id)}
                            className={`group text-left cursor-pointer arts-card ${layoutClasses[art.layout]} ${cardToneClasses[art.layout]}`}
                            style={{ background: 'transparent' }}
                        >
                            <div className="arts-card-media">
                                <ImageWithSkeleton
                                    src={art.image}
                                    alt={art.title}
                                    aspectRatio="1 / 1"
                                    className="arts-card-image"
                                />
                                <span className="arts-card-index">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>

                            <div className="arts-card-content">
                                <h3 className="arts-card-title">{art.title}</h3>
                                <p className="arts-card-meta">
                                    {art.medium} / {art.dimensions} / {art.city} / {art.year}
                                </p>
                                {art.note && <p className="arts-card-note">{art.note}</p>}
                            </div>
                        </motion.button>
                    ))}
                </div>
            </section>

            <AnimatePresence initial={false}>
                {lightboxIndex !== null && (
                    <Lightbox
                        photos={lightboxItems}
                        currentIndex={lightboxIndex}
                        onClose={handleCloseLightbox}
                        onNavigate={handleNavigateLightbox}
                    />
                )}
            </AnimatePresence>
        </PageShell>
    );
}
