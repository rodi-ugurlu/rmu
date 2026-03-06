import { type PropsWithChildren } from 'react';
import PageTransition from './PageTransition';

interface PageShellProps extends PropsWithChildren {
    /** Use max-wide (1800px) instead of default max-content (1400px) */
    wide?: boolean;
}

export default function PageShell({ children, wide = false }: PageShellProps) {
    return (
        <PageTransition>
            <main
                className="min-h-screen bg-white"
                style={{ paddingTop: 'calc(var(--nav-height) + 64px)' }}
            >
                <div
                    className="mx-auto"
                    style={{
                        maxWidth: wide ? 'var(--max-wide)' : 'var(--max-content)',
                        padding: '0 var(--space-page) var(--space-section)',
                    }}
                >
                    {children}
                </div>
            </main>
        </PageTransition>
    );
}
