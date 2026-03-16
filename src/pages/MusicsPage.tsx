import { motion } from 'framer-motion';
import PageShell from '../components/ui/PageShell';
import SectionLabel from '../components/ui/SectionLabel';
import ImageWithSkeleton from '../components/ui/ImageWithSkeleton';
import { featuredRelease } from '../data/music';
import './MusicsPage.css';

const releaseDataRows: [string, string][] = [
    ['Artist', featuredRelease.artist],
    ['Year', featuredRelease.year],
    ['Format', featuredRelease.format],
    ['Platform', featuredRelease.platform],
];

export default function MusicsPage() {
    return (
        <PageShell wide>
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="music-hero"
            >
                <div className="music-hero-copy">
                    <div className="music-label">
                        <SectionLabel>Music</SectionLabel>
                    </div>
                    <h1 className="music-title">{featuredRelease.title}</h1>
                    <p className="music-subline">
                        {featuredRelease.artist} / {featuredRelease.year} / {featuredRelease.format}
                    </p>

                    <p className="music-intro">
                        A single-release listening page built with the same restraint as the rest of
                        the site: one cover, one title, one direct entry into the work.
                    </p>

                    <div className="music-actions">
                        <a
                            href={featuredRelease.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="music-action-link"
                        >
                            Listen on YouTube
                            <span className="music-action-line" />
                        </a>

                        <a
                            href="#release-player"
                            className="music-action-secondary"
                        >
                            Open player
                        </a>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="music-cover-column"
                >
                    <div className="music-cover-card">
                        <div className="music-cover-frame">
                            <ImageWithSkeleton
                                src={featuredRelease.cover}
                                alt={`${featuredRelease.title} cover artwork`}
                                loading="eager"
                                aspectRatio="1 / 1"
                                className="music-cover-image"
                            />
                            <span className="music-cover-glow" aria-hidden="true" />
                        </div>
                    </div>
                </motion.div>
            </motion.section>

            <section
                className="music-details-grid"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.16 }}
                    className="music-data-panel"
                >
                    <div className="music-label">
                        <SectionLabel>Release Data</SectionLabel>
                    </div>
                    <div className="music-data-table">
                        {releaseDataRows.map(([label, value]) => (
                            <div key={label} className="music-data-row">
                                <p className="music-data-label">{label}</p>
                                <p className="music-data-value">{value}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.22 }}
                    className="music-note-panel"
                >
                    <div className="music-label">
                        <SectionLabel>Release Note</SectionLabel>
                    </div>
                    <div className="music-note-grid">
                        <p className="music-note-tr">
                            {featuredRelease.noteTr}
                        </p>
                        <p className="music-note-en">
                            {featuredRelease.noteEn}
                        </p>
                    </div>
                </motion.div>
            </section>

            <motion.section
                id="release-player"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className="music-player-section"
            >
                <div className="music-player-head">
                    <div className="music-player-label">
                        <SectionLabel>Player</SectionLabel>
                    </div>
                    <a
                        href={featuredRelease.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="music-player-link"
                    >
                        Open original release
                    </a>
                </div>

                <div className="music-player-frame">
                    <div className="music-player-video">
                        <iframe
                            src={featuredRelease.youtubeEmbed}
                            className="music-player-iframe"
                            title={`${featuredRelease.title} player`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                </div>
            </motion.section>
        </PageShell>
    );
}
