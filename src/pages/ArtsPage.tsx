import PageShell from '../components/ui/PageShell';
import { artworks } from '../data/arts';
import './ArtsPage.css';

const strictArtworkOrder = [1, 3, 2, 4, 5] as const;

export default function ArtsPage() {
    const orderedArtworks = strictArtworkOrder
        .map((id) => artworks.find((art) => art.id === id))
        .filter((art): art is (typeof artworks)[number] => Boolean(art));

    return (
        <PageShell wide>
            <header className="arts-minimal-header">
                <h1 className="arts-minimal-title">Arts</h1>
            </header>

            <section className="arts-minimal-stack">
                {orderedArtworks.map((art) => (
                    <article key={art.id} className="arts-minimal-item">
                        <div className="arts-minimal-media">
                            <img
                                src={art.image}
                                alt={art.title}
                                loading="eager"
                                decoding="async"
                                className="arts-minimal-image"
                            />
                        </div>
                        <div className="arts-minimal-meta">
                            <h2 className="arts-minimal-name">{art.title}</h2>
                            <p className="arts-minimal-info">
                                {art.medium} / {art.dimensions} / {art.city} / {art.year}
                            </p>
                        </div>
                    </article>
                ))}
            </section>
        </PageShell>
    );
}
