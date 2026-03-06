import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { photos } from '../data/photography';
import PageTransition from '../components/ui/PageTransition';
import Lightbox from '../components/ui/Lightbox';

/* ───────────────────────────────────────
   Distribute photos across columns for masonry
   ─────────────────────────────────────── */
function distributeColumns(count: number, cols: number): number[][] {
    const result: number[][] = Array.from({ length: cols }, () => []);
    for (let i = 0; i < count; i++) {
        result[i % cols].push(i);
    }
    return result;
}

/* ───────────────────────────────────────
   Stagger animation variants
   ─────────────────────────────────────── */
const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.06 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

export default function PhotosPage() {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [columnCount, setColumnCount] = useState(3);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
    const gridRef = useRef<HTMLDivElement>(null);

    /* Responsive column count */
    useEffect(() => {
        const updateCols = () => {
            const w = window.innerWidth;
            if (w < 640) setColumnCount(1);
            else if (w < 1024) setColumnCount(2);
            else if (w < 1536) setColumnCount(3);
            else setColumnCount(4);
        };
        updateCols();
        window.addEventListener('resize', updateCols);
        return () => window.removeEventListener('resize', updateCols);
    }, []);

    const columns = distributeColumns(photos.length, columnCount);

    const handleImageLoad = (index: number) => {
        setLoadedImages((prev) => new Set(prev).add(index));
    };

    return (
        <PageTransition>
            <main
                className="min-h-screen bg-white"
                style={{ paddingTop: 'calc(var(--nav-height) + 48px)' }}
            >
                {/* ── Page Header ── */}
                <div
                    className="mx-auto"
                    style={{
                        maxWidth: 'var(--max-wide)',
                        padding: '0 var(--space-page)',
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ marginBottom: 'var(--space-block)' }}
                    >
                        <h1
                            className="font-bold uppercase tracking-tighter"
                            style={{
                                fontSize: 'clamp(3rem, 10vw, 8rem)',
                                lineHeight: 0.9,
                            }}
                        >
                            Photos
                        </h1>

                        <div
                            className="flex items-center justify-between mt-6"
                            style={{
                                paddingBottom: 'var(--space-tight)',
                                borderBottom: '1px solid var(--color-subtle)',
                            }}
                        >
                            <p
                                className="uppercase"
                                style={{
                                    fontSize: '12px',
                                    letterSpacing: 'var(--letter-label)',
                                    color: 'var(--color-muted)',
                                }}
                            >
                                {photos.length.toString().padStart(2, '0')} Selected
                                Photographs
                            </p>
                            <p
                                className="uppercase hidden sm:block"
                                style={{
                                    fontSize: '10px',
                                    letterSpacing: 'var(--letter-wide)',
                                    color: 'var(--color-muted)',
                                }}
                            >
                                Click to explore
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* ── Masonry Grid ── */}
                <div
                    ref={gridRef}
                    className="mx-auto"
                    style={{
                        maxWidth: 'var(--max-wide)',
                        padding: '0 var(--space-page) var(--space-section)',
                    }}
                >
                    <motion.div
                        className="flex gap-3 md:gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {columns.map((colIndices, colIdx) => (
                            <div
                                key={colIdx}
                                className="flex-1 flex flex-col gap-3 md:gap-4"
                            >
                                {colIndices.map((photoIndex) => {
                                    const photo = photos[photoIndex];
                                    const isLoaded = loadedImages.has(photoIndex);

                                    return (
                                        <motion.div
                                            key={photo.id}
                                            variants={itemVariants}
                                            className="group relative overflow-hidden cursor-pointer"
                                            onClick={() => setLightboxIndex(photoIndex)}
                                            whileHover={{ y: -3 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {/* Skeleton */}
                                            {!isLoaded && (
                                                <div
                                                    className="absolute inset-0 animate-pulse"
                                                    style={{
                                                        backgroundColor: 'var(--color-ghost)',
                                                        minHeight: '240px',
                                                    }}
                                                />
                                            )}

                                            {/* Photo */}
                                            <img
                                                src={photo.src}
                                                alt={photo.alt}
                                                loading={photoIndex < 8 ? 'eager' : 'lazy'}
                                                decoding="async"
                                                onLoad={() => handleImageLoad(photoIndex)}
                                                className="w-full h-auto block transition-all duration-700 group-hover:scale-[1.04]"
                                                style={{
                                                    opacity: isLoaded ? 1 : 0,
                                                }}
                                            />

                                            {/* Hover overlay */}
                                            <div
                                                className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 pointer-events-none"
                                            />

                                            {/* Hover zoom icon */}
                                            <div
                                                className="absolute inset-0 flex items-center justify-center 
                                                           opacity-0 group-hover:opacity-100 
                                                           transition-opacity duration-500 pointer-events-none"
                                            >
                                                <div
                                                    className="w-12 h-12 rounded-full border border-white/50 
                                                               flex items-center justify-center backdrop-blur-sm"
                                                    style={{
                                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                                    }}
                                                >
                                                    <svg
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="white"
                                                        strokeWidth="1.5"
                                                    >
                                                        <circle cx="11" cy="11" r="8" />
                                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                                        <line x1="11" y1="8" x2="11" y2="14" />
                                                        <line x1="8" y1="11" x2="14" y2="11" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Photo number badge */}
                                            <div
                                                className="absolute bottom-3 right-3 
                                                           opacity-0 group-hover:opacity-100 
                                                           translate-y-2 group-hover:translate-y-0 
                                                           transition-all duration-500"
                                                style={{
                                                    fontSize: '9px',
                                                    letterSpacing: '0.15em',
                                                    color: 'rgba(255,255,255,0.7)',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {String(photoIndex + 1).padStart(2, '0')}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ── Lightbox ── */}
                <AnimatePresence>
                    {lightboxIndex !== null && (
                        <Lightbox
                            photos={photos}
                            currentIndex={lightboxIndex}
                            onClose={() => setLightboxIndex(null)}
                            onNavigate={setLightboxIndex}
                        />
                    )}
                </AnimatePresence>
            </main>
        </PageTransition>
    );
}
