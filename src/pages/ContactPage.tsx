import { motion } from 'framer-motion';
import PageShell from '../components/ui/PageShell';
import SectionLabel from '../components/ui/SectionLabel';

export default function ContactPage() {
    return (
        <PageShell>
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ marginBottom: '100px' }}
            >
                <h1
                    className="font-bold uppercase tracking-tighter"
                    style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', lineHeight: 0.9 }}
                >
                    Contact
                </h1>
                <p
                    className="uppercase mt-4"
                    style={{
                        fontSize: '12px',
                        letterSpacing: 'var(--letter-label)',
                        color: 'var(--color-muted)',
                    }}
                >
                    Get in touch for collaborations, inquiries, or screenings
                </p>
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {/* Left: Contact Info */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div style={{ marginBottom: 'var(--space-page)' }}>
                        <SectionLabel>Email</SectionLabel>
                        <a
                            href="mailto:info@rezanmir.com"
                            className="font-medium hover:opacity-60 transition-opacity"
                            style={{ fontSize: '20px' }}
                        >
                            info@rezanmir.com
                        </a>
                    </div>

                    <div style={{ marginBottom: 'var(--space-page)' }}>
                        <SectionLabel>Location</SectionLabel>
                        <p className="font-medium" style={{ fontSize: '20px' }}>
                            Istanbul, Turkey
                        </p>
                    </div>

                    <div>
                        <SectionLabel>Social</SectionLabel>
                        <div className="flex flex-col gap-3">
                            {[
                                { name: 'Instagram', url: '#' },
                                { name: 'Vimeo', url: '#' },
                                { name: 'IMDb', url: '#' },
                            ].map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 transition-colors hover:text-black group"
                                    style={{ fontSize: 'var(--font-body)', color: 'rgba(0,0,0,0.6)' }}
                                >
                                    {link.name}
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 text-xs">
                                        ↗
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right: Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex flex-col gap-8"
                    >
                        {[
                            { id: 'contact-name', label: 'Name', type: 'text' },
                            { id: 'contact-email', label: 'Email', type: 'email' },
                            { id: 'contact-subject', label: 'Subject', type: 'text' },
                        ].map((field) => (
                            <div key={field.id}>
                                <label
                                    htmlFor={field.id}
                                    className="block uppercase font-bold"
                                    style={{
                                        fontSize: '10px',
                                        letterSpacing: 'var(--letter-label)',
                                        color: 'var(--color-muted)',
                                        marginBottom: '12px',
                                    }}
                                >
                                    {field.label}
                                </label>
                                <input
                                    id={field.id}
                                    type={field.type}
                                    className="w-full border-b bg-transparent outline-none transition-colors"
                                    style={{
                                        padding: '12px 0',
                                        fontSize: 'var(--font-body)',
                                        borderColor: 'rgba(0,0,0,0.2)',
                                    }}
                                    onFocus={(e) =>
                                        (e.currentTarget.style.borderColor = 'var(--color-fg)')
                                    }
                                    onBlur={(e) =>
                                        (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)')
                                    }
                                />
                            </div>
                        ))}

                        {/* Message */}
                        <div>
                            <label
                                htmlFor="contact-message"
                                className="block uppercase font-bold"
                                style={{
                                    fontSize: '10px',
                                    letterSpacing: 'var(--letter-label)',
                                    color: 'var(--color-muted)',
                                    marginBottom: '12px',
                                }}
                            >
                                Message
                            </label>
                            <textarea
                                id="contact-message"
                                rows={5}
                                className="w-full border-b bg-transparent outline-none transition-colors resize-none"
                                style={{
                                    padding: '12px 0',
                                    fontSize: 'var(--font-body)',
                                    borderColor: 'rgba(0,0,0,0.2)',
                                }}
                                onFocus={(e) =>
                                    (e.currentTarget.style.borderColor = 'var(--color-fg)')
                                }
                                onBlur={(e) =>
                                    (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)')
                                }
                            />
                        </div>

                        {/* Submit */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="self-start uppercase font-bold tracking-widest text-white transition-colors"
                            style={{
                                padding: '18px 48px',
                                fontSize: 'var(--font-label)',
                                letterSpacing: 'var(--letter-label)',
                                marginTop: 'var(--space-tight)',
                                backgroundColor: 'var(--color-fg)',
                            }}
                        >
                            Send Message
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </PageShell>
    );
}
