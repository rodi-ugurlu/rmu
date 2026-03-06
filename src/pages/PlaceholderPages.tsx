import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';

interface PlaceholderPageProps {
    title: string;
    subtitle?: string;
}

export function PlaceholderPage({ title, subtitle }: PlaceholderPageProps) {
    return (
        <PageTransition>
            <main className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
                {/* Animated gradient background */}
                <motion.div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        background:
                            'radial-gradient(ellipse at 30% 50%, #000 0%, transparent 70%)',
                    }}
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />

                {/* Grain texture overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.015]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                />

                <div className="relative z-10 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="uppercase font-light tracking-[0.4em]"
                        style={{ fontSize: '10px', color: 'var(--color-muted)', marginBottom: '24px' }}
                    >
                        Coming Soon
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.02em]"
                    >
                        {title}
                    </motion.h1>
                    {subtitle && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="uppercase mt-6 text-center"
                            style={{
                                fontSize: '12px',
                                letterSpacing: 'var(--letter-label)',
                                color: 'var(--color-muted)',
                                maxWidth: '500px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}
                        >
                            {subtitle}
                        </motion.p>
                    )}

                    {/* Notify Me input — visual only */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex items-center gap-0 mt-12 mx-auto"
                        style={{ maxWidth: '360px' }}
                    >
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 border-b bg-transparent outline-none transition-colors"
                            style={{
                                padding: '12px 0',
                                fontSize: '14px',
                                borderColor: 'var(--color-subtle)',
                            }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-fg)')}
                            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-subtle)')}
                        />
                        <button
                            type="button"
                            className="uppercase font-bold tracking-widest text-white shrink-0"
                            style={{
                                padding: '12px 24px',
                                fontSize: '10px',
                                letterSpacing: 'var(--letter-label)',
                                backgroundColor: 'var(--color-fg)',
                            }}
                            onClick={(e) => e.preventDefault()}
                        >
                            Notify
                        </button>
                    </motion.div>
                </div>
            </main>
        </PageTransition>
    );
}

export function PhotosPage() {
    return (
        <PlaceholderPage
            title="Photos"
            subtitle="A curated selection of photography work — coming soon"
        />
    );
}

export function ArtsPage() {
    return (
        <PlaceholderPage
            title="Arts"
            subtitle="Visual arts and installations — coming soon"
        />
    );
}

export function MusicsPage() {
    return (
        <PlaceholderPage
            title="Musics"
            subtitle="Original soundtracks and musical compositions — coming soon"
        />
    );
}
