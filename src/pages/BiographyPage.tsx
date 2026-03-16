import { motion } from 'framer-motion';
import { biography } from '../data/biography';
import { films } from '../data/films';
import PageShell from '../components/ui/PageShell';
import SectionLabel from '../components/ui/SectionLabel';
import './BiographyPage.css';

export default function BiographyPage() {
    const totalFestivals = films.reduce((acc, f) => acc + f.festivals.length, 0);
    const quickFacts = [
        { label: 'Born', value: '1992' },
        { label: 'Based in', value: 'Istanbul' },
        { label: 'Attorney since', value: '2017' },
        { label: 'Filmmaking since', value: '2022' },
    ];

    const stats = [
        { label: 'Films', value: films.length.toString().padStart(2, '0') },
        { label: 'Festival Selections', value: totalFestivals.toString() },
        { label: 'Based In', value: 'Istanbul' },
        { label: 'Since', value: '2022' },
    ];

    return (
        <PageShell>
            <motion.header
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="biography-header"
            >
                <SectionLabel>Curriculum Vitae</SectionLabel>
                <h1 className="biography-title">Biography</h1>
            </motion.header>

            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="biography-layout"
            >
                <div className="biography-photo-column">
                    <div className="biography-photo-frame">
                        <div className="biography-photo-glow" />
                        <img
                            src="/biography-photo.jpg"
                            alt="Rezan Mir Ugurlu portrait"
                            className="biography-photo"
                        />
                    </div>
                </div>

                <div className="biography-content-column">
                    <div className="biography-intro">
                        <h2 className="biography-name">Rezan Mir Uğurlu</h2>
                        <p className="biography-role">
                            Filmmaker
                        </p>

                        <div className="biography-facts-grid">
                            {quickFacts.map((fact) => (
                                <div key={fact.label} className="biography-fact-chip">
                                    <p className="biography-fact-label">{fact.label}</p>
                                    <p className="biography-fact-value">{fact.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="biography-copy-grid">
                        <article className="biography-copy-card">
                            <p className="biography-copy-label">Türkçe</p>
                            <p className="biography-copy-text">{biography.tr}</p>
                        </article>
                        <article className="biography-copy-card biography-copy-card-en">
                            <p className="biography-copy-label">English</p>
                            <p className="biography-copy-text biography-copy-text-en">
                                {biography.en}
                            </p>
                        </article>
                    </div>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="biography-stats-grid"
            >
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="biography-stat-item"
                    >
                        <p className="biography-stat-value">{stat.value}</p>
                        <p className="biography-stat-label">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.section>
        </PageShell>
    );
}
