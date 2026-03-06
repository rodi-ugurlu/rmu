import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';

export default function NotFoundPage() {
    return (
        <PageTransition>
            <main className="min-h-screen flex flex-col items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <p
                        className="uppercase font-bold"
                        style={{
                            fontSize: 'clamp(8rem, 25vw, 20rem)',
                            lineHeight: 0.85,
                            letterSpacing: '-0.04em',
                            color: 'rgba(0,0,0,0.08)',
                        }}
                    >
                        404
                    </p>
                    <p
                        className="uppercase font-bold mt-4"
                        style={{
                            fontSize: '14px',
                            letterSpacing: 'var(--letter-label)',
                        }}
                    >
                        Page Not Found
                    </p>
                    <p
                        className="mt-4"
                        style={{
                            fontSize: 'var(--font-body)',
                            color: 'var(--color-muted)',
                            maxWidth: '400px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-3 uppercase mt-8 transition-colors hover:text-black"
                        style={{
                            fontSize: 'var(--font-label)',
                            letterSpacing: 'var(--letter-label)',
                            color: 'var(--color-muted)',
                        }}
                    >
                        <span
                            style={{
                                width: '40px',
                                height: '1px',
                                backgroundColor: 'currentColor',
                                display: 'inline-block',
                            }}
                        />
                        Back to Home
                    </Link>
                </motion.div>
            </main>
        </PageTransition>
    );
}
