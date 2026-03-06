import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { films } from '../data/films';
import PageShell from '../components/ui/PageShell';
import ImageWithSkeleton from '../components/ui/ImageWithSkeleton';

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
};

export default function FilmsPage() {
    return (
        <PageShell wide>
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ marginBottom: 'var(--space-block)' }}
            >
                <h1
                    className="font-bold uppercase tracking-tighter"
                    style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', lineHeight: 0.9 }}
                >
                    Films
                </h1>
                <p
                    className="uppercase mt-4"
                    style={{
                        fontSize: '12px',
                        letterSpacing: 'var(--letter-label)',
                        color: 'var(--color-muted)',
                    }}
                >
                    {films.length.toString().padStart(2, '0')} Projects — Short Films &
                    Documentaries
                </p>
            </motion.div>

            {/* Films Grid — Stagger cascade (Task 4.4) */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {films.map((film) => (
                    <motion.div key={film.id} variants={cardVariants}>
                        <Link
                            to={`/films/${film.id}`}
                            className="group relative block overflow-hidden cursor-pointer"
                            style={{ aspectRatio: '3 / 4' }}
                        >
                            {/* Poster with skeleton */}
                            <div className="w-full h-full">
                                <ImageWithSkeleton
                                    src={film.poster}
                                    alt={film.title}
                                    loading="eager"
                                    className="group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </PageShell>
    );
}
