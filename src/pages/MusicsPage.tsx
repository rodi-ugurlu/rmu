import { motion } from 'framer-motion';
import PageShell from '../components/ui/PageShell';
import { featuredRelease } from '../data/music';
import './MusicsPage.css';

export default function MusicsPage() {
    return (
        <PageShell wide>
            <section className="music-minimal-page">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="music-minimal-title"
                >
                    MUSIC
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.08 }}
                    className="music-minimal-player-wrap"
                >
                    <div className="music-minimal-player">
                        <iframe
                            src={featuredRelease.youtubeEmbed}
                            className="music-minimal-iframe"
                            title="Music player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                </motion.div>
            </section>
        </PageShell>
    );
}
