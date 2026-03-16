import PageShell from '../components/ui/PageShell';
import { biography } from '../data/biography';
import './BiographyPage.css';

export default function BiographyPage() {
    return (
        <PageShell wide>
            <header className="biography-minimal-header">
                <h1 className="biography-minimal-title">Biography</h1>
            </header>

            <section className="biography-minimal-layout">
                <div className="biography-minimal-photo-column">
                    <img
                        src="/biography-photo.jpg"
                        alt="Rezan Mir Uğurlu portrait"
                        className="biography-minimal-photo"
                    />
                </div>

                <div className="biography-minimal-content">
                    <h2 className="biography-minimal-name">Rezan Mir Uğurlu</h2>
                    <p className="biography-minimal-text">{biography.tr}</p>
                    <p className="biography-minimal-text biography-minimal-text-en">
                        {biography.en}
                    </p>
                </div>
            </section>
        </PageShell>
    );
}
