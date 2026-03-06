import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { films } from '../../data/films';

/* Cinematic red for hover state */
const HOVER_RED = '#c41e1e';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
};

export default function FeaturedFilms() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const sectionRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    const hoveredFilm = films.find((f) => f.id === hoveredId);

    return (
        <section
            className="w-full bg-white"
            style={{ padding: 'var(--space-section) var(--space-page)' }}
        >
            <div className="mx-auto" style={{ maxWidth: 'var(--max-wide)' }}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-between items-end border-b"
                    style={{
                        marginBottom: 'var(--space-block)',
                        paddingBottom: 'var(--space-tight)',
                        borderColor: 'var(--color-subtle)',
                    }}
                >
                    <h2
                        className="font-bold uppercase"
                        style={{
                            fontSize: 'var(--font-label)',
                            letterSpacing: 'var(--letter-label)',
                            color: 'var(--color-muted)',
                        }}
                    >
                        Selected Works
                    </h2>
                    <span
                        style={{
                            fontSize: 'var(--font-label)',
                            letterSpacing: 'var(--letter-wide)',
                            color: 'var(--color-muted)',
                        }}
                    >
                        {films.length.toString().padStart(2, '0')} Projects
                    </span>
                </motion.div>

                {/* Films List */}
                <motion.div
                    ref={sectionRef}
                    className="flex flex-col relative"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    onMouseMove={handleMouseMove}
                >
                    {/* Floating poster preview */}
                    <motion.div
                        className="hidden md:block fixed pointer-events-none z-30 overflow-hidden"
                        style={{ width: 220, height: 300 }}
                        animate={{
                            x: mousePos.x + 20,
                            y: mousePos.y - 150,
                            opacity: hoveredId ? 1 : 0,
                            scale: hoveredId ? 1 : 0.8,
                        }}
                        transition={{
                            x: { duration: 0.15, ease: 'linear' },
                            y: { duration: 0.15, ease: 'linear' },
                            opacity: { duration: 0.25 },
                            scale: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
                        }}
                    >
                        {hoveredFilm && (
                            <img
                                src={hoveredFilm.poster}
                                alt=""
                                className="w-full h-full object-cover"
                                aria-hidden="true"
                            />
                        )}
                    </motion.div>

                    {films.map((film) => {
                        const isHovered = hoveredId === film.id;
                        const isDimmed = hoveredId !== null && !isHovered;

                        return (
                            <motion.div key={film.id} variants={itemVariants}>
                                <Link
                                    to={`/films/${film.id}`}
                                    className="group relative flex items-center justify-between cursor-pointer"
                                    style={{
                                        padding: 'var(--space-page) 0',
                                        borderBottom: '1px solid var(--color-subtle)',
                                    }}
                                    onMouseEnter={() => setHoveredId(film.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {/* Film Title — solid black base, red on hover */}
                                    <h3
                                        className="font-bold uppercase tracking-tighter"
                                        style={{
                                            fontSize: 'clamp(3rem, 8vw, 7rem)',
                                            lineHeight: 0.9,
                                            color: isHovered ? HOVER_RED : 'var(--color-fg)',
                                            opacity: isDimmed ? 0.15 : 1,
                                            transition: 'color 0.2s ease-in-out, opacity 0.3s ease',
                                        }}
                                    >
                                        {film.title}
                                    </h3>

                                    {/* Metadata — Right aligned */}
                                    <div
                                        className="hidden md:flex flex-col items-end"
                                        style={{
                                            gap: '4px',
                                            opacity: isHovered ? 1 : 0,
                                            transform: isHovered
                                                ? 'translateY(0)'
                                                : 'translateY(16px)',
                                            transition:
                                                'opacity 0.3s ease, transform 0.3s ease',
                                        }}
                                    >
                                        <span
                                            className="font-medium uppercase"
                                            style={{
                                                fontSize: '14px',
                                                letterSpacing: 'var(--letter-wide)',
                                                color: isHovered ? HOVER_RED : 'var(--color-fg)',
                                                transition: 'color 0.2s ease-in-out',
                                            }}
                                        >
                                            {film.year}
                                        </span>
                                        <span
                                            className="uppercase"
                                            style={{
                                                fontSize: 'var(--font-label)',
                                                letterSpacing: 'var(--letter-wide)',
                                                color: 'var(--color-muted)',
                                            }}
                                        >
                                            {film.category}
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* View All */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ marginTop: '64px' }}
                >
                    <Link
                        to="/films"
                        className="inline-flex items-center gap-3 uppercase transition-colors"
                        style={{
                            fontSize: 'var(--font-label)',
                            letterSpacing: 'var(--letter-label)',
                            color: 'var(--color-muted)',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = HOVER_RED)}
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.color = 'var(--color-muted)')
                        }
                    >
                        View All Films
                        <span
                            style={{
                                width: '40px',
                                height: '1px',
                                backgroundColor: 'currentColor',
                            }}
                        />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
