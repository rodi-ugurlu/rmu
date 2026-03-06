import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { biography } from '../data/biography';
import { films } from '../data/films';
import PageShell from '../components/ui/PageShell';
import SectionLabel from '../components/ui/SectionLabel';

export default function BiographyPage() {
    const totalFestivals = films.reduce((acc, f) => acc + f.festivals.length, 0);

    return (
        <PageShell>
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ marginBottom: '100px' }}
            >
                <h1
                    className="font-bold uppercase tracking-tighter"
                    style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', lineHeight: 0.9 }}
                >
                    Biography
                </h1>
            </motion.div>

            {/* Name & Title */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ marginBottom: 'var(--space-block)' }}
            >
                <h2
                    className="font-bold tracking-tight"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
                >
                    Rezan Mir Uğurlu
                </h2>
                <p
                    className="uppercase mt-3"
                    style={{
                        fontSize: '12px',
                        letterSpacing: '0.25em',
                        color: 'var(--color-muted)',
                    }}
                >
                    Filmmaker — Attorney — Multidisciplinary Artist
                </p>
            </motion.div>

            {/* Biography Text — TR / EN Side-by-Side */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20"
                style={{ marginBottom: '100px' }}
            >
                <div>
                    <SectionLabel>Türkçe</SectionLabel>
                    <p
                        className="leading-relaxed"
                        style={{
                            fontSize: '20px',
                            lineHeight: 1.8,
                            color: 'rgba(0,0,0,0.8)',
                        }}
                    >
                        {biography.tr}
                    </p>
                </div>
                <div>
                    <SectionLabel>English</SectionLabel>
                    <p
                        className="leading-relaxed italic"
                        style={{
                            fontSize: 'var(--font-body-lg)',
                            lineHeight: 1.8,
                            color: 'var(--color-muted)',
                        }}
                    >
                        {biography.en}
                    </p>
                </div>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 border-t border-b"
                style={{
                    padding: 'var(--space-page) 0',
                    borderColor: 'var(--color-subtle)',
                }}
            >
                {[
                    { label: 'Films', value: films.length.toString().padStart(2, '0') },
                    { label: 'Festival Selections', value: totalFestivals.toString() },
                    { label: 'Based In', value: 'Istanbul' },
                    { label: 'Since', value: '2022' },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="text-center"
                        style={{ padding: 'var(--space-tight) 0' }}
                    >
                        <p
                            className="font-bold tracking-tight"
                            style={{ fontSize: '2.5rem', lineHeight: 1 }}
                        >
                            {stat.value}
                        </p>
                        <p
                            className="uppercase mt-2"
                            style={{
                                fontSize: '10px',
                                letterSpacing: 'var(--letter-label)',
                                color: 'var(--color-muted)',
                            }}
                        >
                            {stat.label}
                        </p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Filmography — Task 4.1: Fixed <a> → <Link> */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                style={{ marginTop: '100px' }}
            >
                <SectionLabel>Filmography</SectionLabel>
                <div
                    className="border-t"
                    style={{ borderColor: 'var(--color-subtle)' }}
                >
                    {films.map((film, i) => (
                        <motion.div
                            key={film.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <Link
                                to={`/films/${film.id}`}
                                className="flex items-center justify-between border-b group transition-colors"
                                style={{
                                    padding: '24px var(--space-tight)',
                                    borderColor: 'var(--color-subtle)',
                                }}
                            >
                                <div className="flex items-center gap-6">
                                    <span
                                        className="font-bold uppercase tracking-tighter group-hover:text-black transition-colors"
                                        style={{ fontSize: '1.5rem' }}
                                    >
                                        {film.title}
                                    </span>
                                    <span
                                        className="uppercase hidden md:inline"
                                        style={{
                                            fontSize: 'var(--font-label)',
                                            letterSpacing: 'var(--letter-wide)',
                                            color: 'var(--color-muted)',
                                        }}
                                    >
                                        {film.category}
                                    </span>
                                </div>
                                <span
                                    className="font-medium"
                                    style={{ fontSize: '14px', color: 'var(--color-muted)' }}
                                >
                                    {film.year}
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </PageShell>
    );
}
