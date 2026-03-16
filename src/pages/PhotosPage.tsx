import { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { photos } from '../data/photography';
import PageTransition from '../components/ui/PageTransition';
import Lightbox from '../components/ui/Lightbox';

const FIRST_BATCH_COUNT = 4;
const SECOND_BATCH_COUNT = 4;
const STREAM_BATCH_SIZE = 4;
const BATCH_DELAY_MS = 320;

function distributeColumns(count: number, cols: number): number[][] {
    const result: number[][] = Array.from({ length: cols }, () => []);
    for (let i = 0; i < count; i++) {
        result[i % cols].push(i);
    }
    return result;
}

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.55,
            delay: (index % STREAM_BATCH_SIZE) * 0.05,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    }),
};

interface PhotoGridProps {
    columns: number[][];
    loadedImages: Set<number>;
    onImageLoad: (index: number) => void;
    onOpenLightbox: (index: number) => void;
}

const PhotoGrid = memo(function PhotoGrid({
    columns,
    loadedImages,
    onImageLoad,
    onOpenLightbox,
}: PhotoGridProps) {
    return (
        <div className="flex gap-3 md:gap-4">
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
                                custom={photoIndex}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-80px' }}
                                className="group relative overflow-hidden cursor-pointer"
                                onClick={() => onOpenLightbox(photoIndex)}
                                whileHover={{ y: -3 }}
                                transition={{ duration: 0.3 }}
                            >
                                {!isLoaded && (
                                    <div
                                        className="absolute inset-0 animate-pulse"
                                        style={{
                                            backgroundColor: 'var(--color-ghost)',
                                            minHeight: '240px',
                                        }}
                                    />
                                )}

                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    fetchPriority={
                                        photoIndex < FIRST_BATCH_COUNT ? 'high' : 'auto'
                                    }
                                    loading={
                                        photoIndex < FIRST_BATCH_COUNT
                                            ? 'eager'
                                            : 'lazy'
                                    }
                                    decoding="async"
                                    onLoad={() => onImageLoad(photoIndex)}
                                    onError={() => onImageLoad(photoIndex)}
                                    className="w-full h-auto block transition-all duration-700 group-hover:scale-[1.04]"
                                    style={{
                                        opacity: isLoaded ? 1 : 0,
                                    }}
                                />

                                <div
                                    className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 pointer-events-none"
                                />

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
        </div>
    );
});

export default function PhotosPage() {
    const firstBatchCount = Math.min(FIRST_BATCH_COUNT, photos.length);
    const secondBatchCount = Math.min(
        SECOND_BATCH_COUNT,
        Math.max(photos.length - firstBatchCount, 0)
    );

    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [columnCount, setColumnCount] = useState(3);
    const [visibleCount, setVisibleCount] = useState(firstBatchCount);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
    const [loadingBatchSize, setLoadingBatchSize] = useState(0);
    const [secondBatchReleased, setSecondBatchReleased] = useState(secondBatchCount === 0);
    const loadTriggerRef = useRef<HTMLDivElement>(null);
    const batchTimeoutRef = useRef<number | null>(null);
    const batchInFlightRef = useRef(false);

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

    const firstBatchReady = useMemo(() => {
        for (let i = 0; i < firstBatchCount; i++) {
            if (!loadedImages.has(i)) return false;
        }
        return true;
    }, [firstBatchCount, loadedImages]);

    const scheduleBatchLoad = useCallback((batchSize: number, onDone?: () => void) => {
        if (batchSize <= 0 || batchInFlightRef.current) return;

        batchInFlightRef.current = true;
        setLoadingBatchSize(batchSize);

        batchTimeoutRef.current = window.setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + batchSize, photos.length));
            setLoadingBatchSize(0);
            batchInFlightRef.current = false;
            batchTimeoutRef.current = null;
            onDone?.();
        }, BATCH_DELAY_MS);
    }, []);

    useEffect(() => {
        if (secondBatchReleased || !firstBatchReady) return;
        scheduleBatchLoad(secondBatchCount, () => setSecondBatchReleased(true));
    }, [firstBatchReady, scheduleBatchLoad, secondBatchCount, secondBatchReleased]);

    useEffect(() => {
        if (!secondBatchReleased) return;
        if (visibleCount >= photos.length) return;

        const target = loadTriggerRef.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry?.isIntersecting) return;
                const nextBatchSize = Math.min(STREAM_BATCH_SIZE, photos.length - visibleCount);
                scheduleBatchLoad(nextBatchSize);
            },
            {
                rootMargin: '420px 0px 420px 0px',
            }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [visibleCount, secondBatchReleased, scheduleBatchLoad]);

    useEffect(
        () => () => {
            if (batchTimeoutRef.current !== null) {
                window.clearTimeout(batchTimeoutRef.current);
            }
        },
        []
    );

    const columns = useMemo(
        () => distributeColumns(visibleCount, columnCount),
        [visibleCount, columnCount]
    );
    const remainingCount = photos.length - visibleCount;
    const nextBatchPreview = secondBatchReleased
        ? Math.min(STREAM_BATCH_SIZE, remainingCount)
        : Math.min(secondBatchCount, remainingCount);

    const handleImageLoad = useCallback((index: number) => {
        setLoadedImages((prev) => new Set(prev).add(index));
    }, []);

    const handleOpenLightbox = useCallback((index: number) => {
        setLightboxIndex(index);
    }, []);

    const handleCloseLightbox = useCallback(() => {
        setLightboxIndex(null);
    }, []);

    const handleNavigateLightbox = useCallback((index: number) => {
        setLightboxIndex(index);
    }, []);

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
                                fontSize: 'clamp(1.95rem, 4.6vw, 4rem)',
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
                                {photos.length.toString().padStart(2, '0')} Loaded Photographs
                            </p>
                            <p
                                className="uppercase hidden sm:block"
                                style={{
                                    fontSize: '10px',
                                    letterSpacing: 'var(--letter-wide)',
                                    color: 'var(--color-muted)',
                                }}
                            >

                            </p>
                        </div>
                    </motion.div>
                </div>

                <div
                    className="mx-auto"
                    style={{
                        maxWidth: 'var(--max-wide)',
                        padding:
                            remainingCount > 0
                                ? '0 var(--space-page) var(--space-block)'
                                : '0 var(--space-page) var(--space-section)',
                    }}
                >
                    <PhotoGrid
                        columns={columns}
                        loadedImages={loadedImages}
                        onImageLoad={handleImageLoad}
                        onOpenLightbox={handleOpenLightbox}
                    />
                </div>

                {remainingCount > 0 && (
                    <div
                        ref={loadTriggerRef}
                        className="mx-auto"
                        style={{
                            maxWidth: 'var(--max-wide)',
                            padding: '0 var(--space-page) var(--space-section)',
                        }}
                    >
                        <motion.div
                            animate={
                                loadingBatchSize > 0
                                    ? { opacity: [0.35, 0.85, 0.35] }
                                    : { opacity: 0.65 }
                            }
                            transition={
                                loadingBatchSize > 0
                                    ? { duration: 1.3, repeat: Infinity, ease: 'easeInOut' }
                                    : { duration: 0.25 }
                            }
                            className="flex items-center justify-center gap-4"
                        >
                            <span
                                style={{
                                    width: '42px',
                                    height: '1px',
                                    backgroundColor: 'var(--color-subtle)',
                                }}
                            />
                            <p
                                className="uppercase"
                                style={{
                                    fontSize: '10px',
                                    letterSpacing: 'var(--letter-wide)',
                                    color: 'var(--color-muted)',
                                }}
                            >
                                {loadingBatchSize > 0
                                    ? `Loading next ${loadingBatchSize} photographs`
                                    : `Scroll for next ${nextBatchPreview} photographs`}
                            </p>
                            <span
                                style={{
                                    width: '42px',
                                    height: '1px',
                                    backgroundColor: 'var(--color-subtle)',
                                }}
                            />
                        </motion.div>
                    </div>
                )}

                <AnimatePresence initial={false}>
                    {lightboxIndex !== null && (
                        <Lightbox
                            photos={photos}
                            currentIndex={lightboxIndex}
                            onClose={handleCloseLightbox}
                            onNavigate={handleNavigateLightbox}
                        />
                    )}
                </AnimatePresence>
            </main>
        </PageTransition>
    );
}
