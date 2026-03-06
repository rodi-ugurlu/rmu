import { Link } from 'react-router-dom';

const navLinks = [
    'Home',
    'Films',
    'Photos',
    'Arts',
    'Musics',
    'Biography',
    'Contact',
];

const socialLinks = [
    { name: 'Instagram', url: '#' },
    { name: 'Vimeo', url: '#' },
    { name: 'IMDb', url: '#' },
];

export default function Footer() {
    return (
        <footer
            className="w-full bg-white border-t"
            style={{
                marginTop: 'var(--space-section)',
                borderColor: 'var(--color-subtle)',
            }}
        >
            <div
                className="mx-auto"
                style={{
                    maxWidth: 'var(--max-wide)',
                    padding: 'var(--space-page) var(--space-page) 32px',
                }}
            >
                {/* Top Row */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
                    {/* LEFT: Identity */}
                    <div className="text-center md:text-left">
                        <h3
                            className="font-bold uppercase tracking-tight"
                            style={{ fontSize: '24px' }}
                        >
                            Rezan Mir Uğurlu
                        </h3>
                        <p
                            className="uppercase mt-2"
                            style={{
                                fontSize: 'var(--font-label)',
                                letterSpacing: 'var(--letter-wide)',
                                color: 'var(--color-muted)',
                            }}
                        >
                            Filmmaker — Attorney — Multidisciplinary Artist
                        </p>
                    </div>

                    {/* RIGHT: Social Links */}
                    <div className="flex items-center gap-6">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="uppercase font-medium transition-colors hover:text-black"
                                style={{
                                    fontSize: 'var(--font-label)',
                                    letterSpacing: 'var(--letter-wide)',
                                    color: 'var(--color-muted)',
                                }}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Task 5.1: Navigation Row — mobile 2 columns */}
                <nav
                    className="border-t"
                    style={{
                        marginTop: '24px',
                        paddingTop: '24px',
                        borderColor: 'var(--color-ghost)',
                    }}
                >
                    <ul
                        className="grid grid-cols-2 md:flex md:flex-wrap justify-center md:justify-start"
                        style={{ gap: '24px 32px' }}
                    >
                        {navLinks.map((item) => (
                            <li key={item}>
                                <Link
                                    to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                                    className="font-medium uppercase transition-colors hover:opacity-50"
                                    style={{
                                        fontSize: '12px',
                                        letterSpacing: 'var(--letter-wide)',
                                    }}
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom Copyright */}
                <div
                    className="border-t flex flex-col md:flex-row justify-between items-center gap-2"
                    style={{
                        marginTop: '24px',
                        paddingTop: '24px',
                        borderColor: 'var(--color-ghost)',
                    }}
                >
                    <p
                        className="uppercase"
                        style={{
                            fontSize: '10px',
                            letterSpacing: 'var(--letter-wide)',
                            color: 'var(--color-muted)',
                        }}
                    >
                        © {new Date().getFullYear()} All Rights Reserved.
                    </p>
                    <p
                        className="uppercase"
                        style={{
                            fontSize: '10px',
                            letterSpacing: 'var(--letter-wide)',
                            color: 'var(--color-muted)',
                        }}
                    >
                        Istanbul, TR
                    </p>
                </div>
            </div>
        </footer>
    );
}
