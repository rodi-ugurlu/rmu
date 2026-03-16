import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { films } from '../data/films';
import PageTransition from '../components/ui/PageTransition';
import './FilmsPage.css';

const filmsPageOrder = ['36', 'rec', 'stoppani', 'idyma'] as const;

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.06 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
    },
};

export default function FilmsPage() {
    const orderedFilms = [
        ...filmsPageOrder
            .map((id) => films.find((film) => film.id === id))
            .filter((film): film is (typeof films)[number] => Boolean(film)),
        ...films.filter((film) => !filmsPageOrder.includes(film.id as (typeof filmsPageOrder)[number])),
    ];

    return (
        <PageTransition>
            <main className="films-minimal-page">
                <div className="films-minimal-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="films-minimal-title"
                    >
                        FILMS
                    </motion.h1>

                    <motion.div
                        className="films-minimal-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {orderedFilms.map((film) => (
                            <motion.div key={film.id} variants={itemVariants}>
                                <Link
                                    to={`/films/${film.id}`}
                                    className="films-poster-link"
                                    aria-label={`Watch ${film.title}`}
                                >
                                    <img
                                        src={film.poster}
                                        alt={film.title}
                                        loading="eager"
                                        decoding="async"
                                        className="films-poster-image"
                                    />
                                    <span className="films-poster-watch">Watch</span>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </main>
        </PageTransition>
    );
}
