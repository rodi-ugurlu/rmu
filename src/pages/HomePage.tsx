import Hero from '../components/home/Hero';
import FeaturedFilms from '../components/home/FeaturedFilms';
import PageTransition from '../components/ui/PageTransition';

export default function HomePage() {
    return (
        <PageTransition>
            <main className="bg-white">
                {/* Hero - Full Viewport */}
                <section id="hero">
                    <Hero />
                </section>

                {/* Films Section - Distinct Block */}
                <section id="films">
                    <FeaturedFilms />
                </section>
            </main>
        </PageTransition>
    );
}
