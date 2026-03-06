import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Photo } from '../../data/photography';

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
    const photo = photos[currentIndex];
    const total = photos.length;

    const goTo = useCallback(
        (delta: number) => {
            setDirection(delta);
            setImageLoaded(false);
            const next = (currentIndex + delta + total) % total;
            onNavigate(next);
        },
        [currentIndex, total, onNavigate]
    );

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

    /* Preload adjacent images for buttery transitions */
    useEffect(() => {
        const preload = (idx: number) => {
            const img = new Image();
            img.src = photos[(currentIndex + idx + total) % total].src;
        };
        preload(1);
        preload(-1);
    }, [currentIndex, photos, total]);

    /* Slide animation variants */
    const slideVariants = {
        enter: (d: number) => ({
            x: d > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.92,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: 'spring' as const, stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
            },
        },
        exit: (d: number) => ({
            x: d > 0 ? -200 : 200,
            opacity: 0,
            scale: 0.92,
            transition: {
                x: { type: 'spring' as const, stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.3 },
            },
        }),
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.94)' }}
            onClick={onClose}
        >
            {/* Close button */}
            <button
                className="absolute top-6 right-6 z-[110] text-white/60 hover:text-white transition-colors cursor-pointer"
                onClick={onClose}
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
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={photo.id}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute flex items-center justify-center"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
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
                            src={photo.src}
                            alt={photo.alt}
                            className="max-w-full max-h-[calc(100vh-140px)] object-contain select-none"
                            style={{
                                opacity: imageLoaded ? 1 : 0,
                                transition: 'opacity 0.4s ease',
                            }}
                            draggable={false}
                            onLoad={() => setImageLoaded(true)}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom thumbnail strip */}
            <div
                className="absolute bottom-0 left-0 right-0 z-[110] hidden md:flex items-center justify-center gap-1 overflow-x-auto"
                style={{
                    padding: '12px 80px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {photos.map((p, i) => (
                    <button
                        key={p.id}
                        onClick={() => {
                            setDirection(i > currentIndex ? 1 : -1);
                            setImageLoaded(false);
                            onNavigate(i);
                        }}
                        className="shrink-0 overflow-hidden transition-all duration-300 cursor-pointer"
                        style={{
                            width: i === currentIndex ? '48px' : '32px',
                            height: i === currentIndex ? '48px' : '32px',
                            opacity: i === currentIndex ? 1 : 0.35,
                            border: i === currentIndex ? '1px solid rgba(255,255,255,0.6)' : '1px solid transparent',
                        }}
                    >
                        <img
                            src={p.src}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                            aria-hidden="true"
                        />
                    </button>
                ))}
            </div>
        </motion.div>
    );
}
