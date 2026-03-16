import { useEffect, useCallback, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Photo } from '../../data/photography';

const THUMBNAIL_WINDOW_SIZE = 7;

function getOptimizedLightboxSrc(src: string): string {
    if (src.startsWith('/photography/') && src.endsWith('.webp')) {
        return src.replace('/photography/', '/photography-lightbox/').replace(/\.webp$/i, '.jpg');
    }
    if (src.startsWith('/arts/') && src.endsWith('.webp')) {
        return src.replace('/arts/', '/arts-lightbox/').replace(/\.webp$/i, '.jpg');
    }
    return src;
}

function getThumbnailIndices(total: number, currentIndex: number): number[] {
    if (total <= THUMBNAIL_WINDOW_SIZE) {
        return Array.from({ length: total }, (_, i) => i);
    }

    const half = Math.floor(THUMBNAIL_WINDOW_SIZE / 2);
    return Array.from({ length: THUMBNAIL_WINDOW_SIZE }, (_, i) => {
        const offset = i - half;
        return (currentIndex + offset + total) % total;
    });
}

function navigationDirection(currentIndex: number, targetIndex: number, total: number): number {
    const forward = (targetIndex - currentIndex + total) % total;
    const backward = (currentIndex - targetIndex + total) % total;
    return forward <= backward ? 1 : -1;
}

interface LightboxProps {
    photos: Photo[];
    currentIndex: number;
    onClose: () => void;
    onNavigate: (index: number) => void;
}

export default function Lightbox({
    photos,
    currentIndex,
    onClose,
    onNavigate,
}: LightboxProps) {
    const [direction, setDirection] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showThumbnails, setShowThumbnails] = useState(false);
    const mainImageRef = useRef<HTMLImageElement | null>(null);
    const photo = photos[currentIndex];
    const total = photos.length;
    const displayPhotoSrc = useMemo(() => getOptimizedLightboxSrc(photo.src), [photo.src]);
    const thumbnailIndices = useMemo(
        () => getThumbnailIndices(total, currentIndex),
        [total, currentIndex]
    );

    const goTo = useCallback(
        (delta: number) => {
            setDirection(delta);
            setImageLoaded(false);
            const next = (currentIndex + delta + total) % total;
            onNavigate(next);
        },
        [currentIndex, total, onNavigate]
    );

    useEffect(() => {
        setImageLoaded(false);
        setShowThumbnails(false);

        if (mainImageRef.current?.complete) {
            setImageLoaded(true);
        }
    }, [displayPhotoSrc]);

    /* Keyboard navigation */
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') goTo(1);
            if (e.key === 'ArrowLeft') goTo(-1);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [goTo, onClose]);

    /* Lock body scroll */
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    /* Defer adjacent preloads so opening stays responsive */
    useEffect(() => {
        if (!imageLoaded) return;

        const timer = window.setTimeout(() => {
            const preload = (idx: number) => {
                const img = new Image();
                img.decoding = 'async';
                img.src = getOptimizedLightboxSrc(photos[(currentIndex + idx + total) % total].src);
            };

            preload(1);
            preload(-1);
        }, 120);

        return () => window.clearTimeout(timer);
    }, [currentIndex, photos, total, imageLoaded]);

    useEffect(() => {
        if (!imageLoaded) return;

        const timer = window.setTimeout(() => {
            setShowThumbnails(true);
        }, 180);

        return () => window.clearTimeout(timer);
    }, [imageLoaded, currentIndex]);

    const handleClose = useCallback(
        (e?: { stopPropagation?: () => void }) => {
            e?.stopPropagation?.();
            onClose();
        },
        [onClose]
    );

    const handleMainImageReady = useCallback(() => {
        setImageLoaded(true);
    }, []);

    /* Slide animation variants */
    const slideVariants = {
        enter: (d: number) => ({
            x: d > 0 ? 52 : -52,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                x: { duration: 0.22, ease: 'easeOut' as const },
                opacity: { duration: 0.24, ease: 'easeOut' as const },
            },
        },
        exit: (d: number) => ({
            x: d > 0 ? -52 : 52,
            opacity: 0,
            transition: {
                x: { duration: 0.16, ease: 'easeOut' as const },
                opacity: { duration: 0.16, ease: 'easeOut' as const },
            },
        }),
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.94)' }}
            onClick={handleClose}
        >
            {/* Close button */}
            <button
                className="absolute top-6 right-6 z-[110] text-white/60 hover:text-white transition-colors cursor-pointer"
                onClick={handleClose}
                aria-label="Close lightbox"
            >
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            {/* Counter */}
            <div
                className="absolute top-6 left-6 z-[110] uppercase font-medium"
                style={{
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    color: 'rgba(255,255,255,0.4)',
                }}
            >
                {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>

            {/* Left Arrow */}
            <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[110] 
                           w-12 h-12 md:w-14 md:h-14 flex items-center justify-center 
                           text-white/40 hover:text-white 
                           border border-white/10 hover:border-white/30 
                           rounded-full backdrop-blur-sm
                           transition-all duration-300 cursor-pointer
                           hover:bg-white/5"
                onClick={(e) => {
                    e.stopPropagation();
                    goTo(-1);
                }}
                aria-label="Previous photo"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>

            {/* Right Arrow */}
            <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[110] 
                           w-12 h-12 md:w-14 md:h-14 flex items-center justify-center 
                           text-white/40 hover:text-white 
                           border border-white/10 hover:border-white/30 
                           rounded-full backdrop-blur-sm
                           transition-all duration-300 cursor-pointer
                           hover:bg-white/5"
                onClick={(e) => {
                    e.stopPropagation();
                    goTo(1);
                }}
                aria-label="Next photo"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>

            {/* Image container */}
            <div
                className="relative w-full h-full flex items-center justify-center"
                style={{ padding: '80px 80px 60px' }}
                onClick={(e) => e.stopPropagation()}
            >
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={photo.id}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute flex items-center justify-center"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            willChange: 'transform, opacity',
                        }}
                    >
                        {/* Skeleton loader */}
                        {!imageLoaded && (
                            <div
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div
                                    className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"
                                />
                            </div>
                        )}
                        <img
                            ref={mainImageRef}
                            src={displayPhotoSrc}
                            alt={photo.alt}
                            loading="eager"
                            decoding="async"
                            fetchPriority="high"
                            className="max-w-full max-h-[calc(100vh-140px)] object-contain select-none"
                            style={{
                                opacity: imageLoaded ? 1 : 0,
                                transition: 'opacity 0.28s ease',
                            }}
                            draggable={false}
                            onLoad={handleMainImageReady}
                            onError={handleMainImageReady}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom thumbnail strip */}
            {imageLoaded && showThumbnails && (
                <div
                    className="absolute bottom-0 left-0 right-0 z-[110] hidden md:flex items-center justify-center gap-1 overflow-x-auto"
                    style={{
                        padding: '12px 80px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {thumbnailIndices.map((thumbIndex) => {
                        const thumbPhoto = photos[thumbIndex];
                        const isActive = thumbIndex === currentIndex;

                        return (
                            <button
                                key={thumbPhoto.id}
                                onClick={() => {
                                    setDirection(
                                        navigationDirection(currentIndex, thumbIndex, total)
                                    );
                                    setImageLoaded(false);
                                    onNavigate(thumbIndex);
                                }}
                                className="shrink-0 overflow-hidden transition-all duration-300 cursor-pointer"
                                style={{
                                    width: isActive ? '48px' : '34px',
                                    height: isActive ? '48px' : '34px',
                                    opacity: isActive ? 1 : 0.45,
                                    border: isActive
                                        ? '1px solid rgba(255,255,255,0.65)'
                                        : '1px solid transparent',
                                }}
                            >
                                <img
                                    src={getOptimizedLightboxSrc(thumbPhoto.src)}
                                    alt=""
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                    fetchPriority="low"
                                    aria-hidden="true"
                                />
                            </button>
                        );
                    })}
                </div>
            )}
        </motion.div>
    );
}
