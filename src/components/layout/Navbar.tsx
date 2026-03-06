import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Films', path: '/films' },
    { name: 'Photos', path: '/photos' },
    { name: 'Arts', path: '/arts' },
    { name: 'Musics', path: '/musics' },
    { name: 'Biography', path: '/biography' },
    { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Task 3.2: Scroll-aware background
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <>
            <nav
                className="fixed top-0 left-0 w-full z-50 border-b transition-colors duration-300"
                style={{
                    height: 'var(--nav-height)',
                    padding: '0 var(--space-page)',
                    backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderColor: 'var(--color-ghost)',
                }}
            >
                <div className="w-full h-full grid grid-cols-3 items-center">
                    {/* BRAND */}
                    <div className="flex justify-start">
                        <Link
                            to="/"
                            className="relative flex items-center h-full hover:opacity-70 transition-opacity"
                            onClick={() => setMobileOpen(false)}
                            style={{ minWidth: '200px' }}
                        >
                            <img
                                src="/logownbg.png"
                                alt="Rezan Mir Uğurlu"
                                className="absolute left-[-20px] top-[85%] -translate-y-1/2 h-[100px] md:h-[130px] w-auto max-w-none object-contain scale-[1.7] md:scale-[2.0] origin-left"
                            />
                        </Link>
                    </div>

                    {/* DESKTOP NAV */}
                    <div className="hidden md:flex justify-center">
                        <ul className="flex items-center gap-8 lg:gap-12">
                            {navLinks.map((link) => {
                                const isActive =
                                    link.path === '/'
                                        ? location.pathname === '/'
                                        : location.pathname.startsWith(link.path);

                                return (
                                    <li key={link.path} className="relative">
                                        <Link
                                            to={link.path}
                                            className={`text-xs font-medium tracking-widest uppercase transition-opacity hover:opacity-50 ${isActive ? 'opacity-100' : 'opacity-60'
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                        {/* Task 5.2: Active route indicator */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-active-indicator"
                                                className="absolute -bottom-1 left-0 right-0 bg-black"
                                                style={{ height: '2px' }}
                                                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                            />
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* BALANCE COLUMN */}
                    <div className="hidden md:flex justify-end" />

                    {/* MOBILE HAMBURGER */}
                    <div className="flex md:hidden justify-end col-span-2">
                        <button
                            className="relative z-[60] p-3"
                            onClick={() => setMobileOpen((v) => !v)}
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileOpen}
                        >
                            {/* Task 3.1: Proper centered X animation */}
                            <div className="flex flex-col justify-center items-center" style={{ width: 24, height: 14 }}>
                                <motion.span
                                    className="block bg-black absolute"
                                    style={{ height: '1.5px', width: 24 }}
                                    animate={{
                                        rotate: mobileOpen ? 45 : 0,
                                        y: mobileOpen ? 0 : -4,
                                    }}
                                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                />
                                <motion.span
                                    className="block bg-black absolute"
                                    style={{ height: '1.5px' }}
                                    animate={{
                                        width: mobileOpen ? 24 : 16,
                                        rotate: mobileOpen ? -45 : 0,
                                        y: mobileOpen ? 0 : 4,
                                    }}
                                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBILE FULLSCREEN OVERLAY */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center md:hidden"
                    >
                        <nav className="flex flex-col items-center" style={{ gap: '32px' }}>
                            {navLinks.map((link, i) => {
                                const isActive =
                                    link.path === '/'
                                        ? location.pathname === '/'
                                        : location.pathname.startsWith(link.path);

                                return (
                                    <motion.div
                                        key={link.path}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3, delay: i * 0.04 }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={() => setMobileOpen(false)}
                                            className={`font-bold uppercase tracking-tighter transition-opacity hover:opacity-50 ${isActive ? 'opacity-100' : 'opacity-50'
                                                }`}
                                            style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
