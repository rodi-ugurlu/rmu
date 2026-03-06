import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { films } from '../data/films';
import PageTransition from '../components/ui/PageTransition';
import SectionLabel from '../components/ui/SectionLabel';
import ImageWithSkeleton from '../components/ui/ImageWithSkeleton';

export default function FilmDetailPage() {
    const { id } = useParams<{ id: string }>();
    const filmIndex = films.findIndex((f) => f.id === id);
    const film = filmIndex >= 0 ? films[filmIndex] : null;

    const prevFilm = films[(filmIndex - 1 + films.length) % films.length];
    const nextFilm = films[(filmIndex + 1) % films.length];

    if (!film) {
        return (
            <PageTransition>
                <main className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center">
                        <h1
                            className="font-bold uppercase tracking-tighter"
                            style={{ fontSize: '4rem' }}
                        >
                            Not Found
                        </h1>
                        <Link
                            to="/films"
                            className="inline-block mt-6 uppercase transition-colors hover:text-black"
                            style={{
                                fontSize: 'var(--font-label)',
                                letterSpacing: 'var(--letter-label)',
                                color: 'var(--color-muted)',
                            }}
                        >
                            ← Back to Films
                        </Link>
                    </div>
                </main>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <main className="min-h-screen bg-white">
                {/* ═══════════════════════════════════════
            SECTION 1: HERO — Two Column Layout
           ═══════════════════════════════════════ */}
                <section
                    style={{
                        paddingTop: 'calc(var(--nav-height) + 48px)',
                        padding: 'calc(var(--nav-height) + 48px) var(--space-page) var(--space-section)',
                    }}
                >
                    <div
                        className="mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.618fr] gap-12 md:gap-16 lg:gap-20"
                        style={{ maxWidth: 'var(--max-content)' }}
                    >
                        {/* LEFT COLUMN: Poster (2:3 aspect ratio) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            <div style={{ aspectRatio: '2 / 3' }}>
                                <ImageWithSkeleton
                                    src={film.poster}
                                    alt={`${film.title} — Poster`}
                                    loading="eager"
                                    aspectRatio="2 / 3"
                                />
                            </div>
                        </motion.div>

                        {/* RIGHT COLUMN: Typography & Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                            className="flex flex-col"
                        >
                            {/* Overline badge */}
                            <p
                                className="uppercase font-medium tracking-widest"
                                style={{
                                    fontSize: '10px',
                                    letterSpacing: '0.35em',
                                    color: 'var(--color-muted)',
                                    marginBottom: '16px',
                                }}
                            >
                                {film.category} — {film.year}
                            </p>

                            {/* Film Title */}
                            <h1
                                className="font-bold uppercase tracking-tighter"
                                style={{
                                    fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                                    lineHeight: 0.9,
                                    marginBottom: '48px',
                                }}
                            >
                                {film.title}
                            </h1>

                            {/* ── Sinopsis ── */}
                            <div style={{ marginBottom: '48px' }}>
                                <SectionLabel>Sinopsis</SectionLabel>

                                {/* Turkish */}
                                <p
                                    className="leading-relaxed"
                                    style={{
                                        fontSize: 'var(--font-body-lg)',
                                        lineHeight: 1.75,
                                        color: 'rgba(0,0,0,0.85)',
                                        marginBottom: '32px',
                                    }}
                                >
                                    {film.synopsis}
                                </p>

                                {/* English */}
                                <p
                                    className="leading-relaxed italic"
                                    style={{
                                        fontSize: 'var(--font-body)',
                                        lineHeight: 1.75,
                                        color: 'var(--color-muted)',
                                    }}
                                >
                                    {film.synopsisEn}
                                </p>
                            </div>

                            {/* ── Director's Statement (if exists) ── */}
                            {film.directorStatement && (
                                <div style={{ marginBottom: '48px' }}>
                                    <SectionLabel>Director's Statement</SectionLabel>
                                    <p
                                        className="leading-relaxed"
                                        style={{
                                            fontSize: 'var(--font-body-lg)',
                                            lineHeight: 1.75,
                                            color: 'rgba(0,0,0,0.85)',
                                            marginBottom: '32px',
                                        }}
                                    >
                                        {film.directorStatement}
                                    </p>
                                    <p
                                        className="leading-relaxed italic"
                                        style={{
                                            fontSize: 'var(--font-body)',
                                            lineHeight: 1.75,
                                            color: 'var(--color-muted)',
                                        }}
                                    >
                                        {film.directorStatementEn}
                                    </p>
                                </div>
                            )}

                            {/* ── Credits — CSS Grid ── */}
                            <div>
                                <SectionLabel>Credits</SectionLabel>
                                <div
                                    className="grid gap-y-3"
                                    style={{
                                        gridTemplateColumns: 'auto 1fr',
                                        columnGap: '32px',
                                    }}
                                >
                                    {film.credits.map((credit, i) => (
                                        <div key={i} className="contents">
                                            <span
                                                className="uppercase font-medium"
                                                style={{
                                                    fontSize: '11px',
                                                    letterSpacing: 'var(--letter-wide)',
                                                    color: 'var(--color-muted)',
                                                    lineHeight: 1.7,
                                                    paddingTop: '1px',
                                                }}
                                            >
                                                {credit.role}
                                            </span>
                                            <span
                                                className="font-medium"
                                                style={{
                                                    fontSize: '15px',
                                                    lineHeight: 1.7,
                                                }}
                                            >
                                                {credit.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
            SECTION 2: Media & Accolades
           ═══════════════════════════════════════ */}

                {/* ── Vimeo Player ── */}
                {film.vimeoId && (
                    <motion.section
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8 }}
                        className="mx-auto"
                        style={{
                            maxWidth: 'var(--max-content)',
                            padding: '0 var(--space-page)',
                            marginBottom: 'var(--space-section)',
                        }}
                    >
                        <SectionLabel>Film</SectionLabel>
                        <div
                            className="relative w-full overflow-hidden bg-black"
                            style={{ aspectRatio: '16 / 9' }}
                        >
                            <iframe
                                src={`https://player.vimeo.com/video/${film.vimeoId}?badge=0&autopause=0&player_id=0&byline=0&title=0&portrait=0`}
                                className="absolute inset-0 w-full h-full"
                                style={{ border: 'none' }}
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                title={`${film.title} — Film`}
                            />
                        </div>
                    </motion.section>
                )}

                {/* ── Festivals — Purely Typographic ── */}
                {film.festivals.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8 }}
                        className="mx-auto"
                        style={{
                            maxWidth: 'var(--max-content)',
                            padding: '0 var(--space-page)',
                            marginBottom: 'var(--space-section)',
                        }}
                    >
                        <SectionLabel>Festivals</SectionLabel>
                        <ul className="flex flex-col" style={{ gap: '14px' }}>
                            {film.festivals.map((festival, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.03 }}
                                    style={{
                                        fontSize: '15px',
                                        lineHeight: 1.6,
                                        color: 'rgba(0,0,0,0.65)',
                                    }}
                                >
                                    {festival}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.section>
                )}

                {/* ═══════════════════════════════════════
            NAVIGATION: Prev / Next
           ═══════════════════════════════════════ */}
                <section
                    style={{
                        padding: 'var(--space-page)',
                        marginTop: 'var(--space-element)',
                    }}
                >
                    <div
                        className="mx-auto flex justify-between items-center"
                        style={{ maxWidth: 'var(--max-content)' }}
                    >
                        <Link
                            to={`/films/${prevFilm.id}`}
                            className="inline-flex items-center gap-3 uppercase transition-colors hover:text-black group"
                            style={{
                                fontSize: 'var(--font-label)',
                                letterSpacing: 'var(--letter-label)',
                                color: 'var(--color-muted)',
                            }}
                        >
                            <span
                                className="inline-block group-hover:-translate-x-1 transition-transform"
                                style={{
                                    width: '40px',
                                    height: '1px',
                                    backgroundColor: 'currentColor',
                                }}
                            />
                            {prevFilm.title}
                        </Link>
                        <Link
                            to="/films"
                            className="hidden md:inline-block uppercase transition-colors hover:text-black"
                            style={{
                                fontSize: 'var(--font-label)',
                                letterSpacing: 'var(--letter-label)',
                                color: 'var(--color-muted)',
                            }}
                        >
                            All Films
                        </Link>
                        <Link
                            to={`/films/${nextFilm.id}`}
                            className="inline-flex items-center gap-3 uppercase transition-colors hover:text-black group"
                            style={{
                                fontSize: 'var(--font-label)',
                                letterSpacing: 'var(--letter-label)',
                                color: 'var(--color-muted)',
                            }}
                        >
                            {nextFilm.title}
                            <span
                                className="inline-block group-hover:translate-x-1 transition-transform"
                                style={{
                                    width: '40px',
                                    height: '1px',
                                    backgroundColor: 'currentColor',
                                }}
                            />
                        </Link>
                    </div>
                </section>
            </main>
        </PageTransition>
    );
}
