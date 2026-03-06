import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
                    backgroundSize: '100px 100px',
                }}
            />

            {/* Centered Content */}
            <div className="relative z-10 text-center" style={{ padding: '0 var(--space-page)' }}>
                {/* Pre-title */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-extralight mb-8"
                    style={{ color: 'var(--color-muted)' }}
                >
                    Filmmaker
                </motion.p>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-[14vw] md:text-[12vw] lg:text-[10vw] font-bold leading-[0.85] tracking-[-0.04em] uppercase"
                >
                    <span className="block">Rezan</span>
                    <span className="block font-extralight opacity-50">Mir Uğurlu</span>
                </motion.h1>


            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex flex-col items-center gap-3 opacity-30"
                >
                    <span className="text-[9px] tracking-[0.3em] uppercase font-light">
                        Scroll
                    </span>
                    <div className="w-px h-10" style={{ backgroundColor: 'var(--color-muted)' }} />
                </motion.div>
            </motion.div>
        </section>
    );
}
