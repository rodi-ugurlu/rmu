import { motion } from 'framer-motion';
import PageShell from '../components/ui/PageShell';
import SectionLabel from '../components/ui/SectionLabel';
import './ContactPage.css';

const contactFields = [
    { id: 'contact-name', label: 'Name', type: 'text' },
    { id: 'contact-email', label: 'Email', type: 'email' },
    { id: 'contact-subject', label: 'Subject', type: 'text', fullWidth: true },
];

const socialLinks = [
    { name: 'Instagram', url: '#' },
    { name: 'Vimeo', url: '#' },
    { name: 'IMDb', url: '#' },
];

export default function ContactPage() {
    return (
        <PageShell>
            <motion.section
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="contact-header"
            >
                <div>
                    <div className="contact-label">
                        <SectionLabel>Direct Contact</SectionLabel>
                    </div>
                    <h1 className="contact-title">Contact</h1>
                </div>
                <p className="contact-dek">
                    Get in touch for film screenings, collaborations, commissioned visual work, or
                    legal consultation requests.
                </p>
            </motion.section>

            <section className="contact-layout">
                <motion.aside
                    initial={{ opacity: 0, y: 34 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="contact-info-panel"
                >
                    <div className="contact-info-row">
                        <p className="contact-info-kicker">Email</p>
                        <a
                            href="mailto:info@rezanmir.com"
                            className="contact-email"
                        >
                            info@rezanmir.com
                        </a>
                    </div>

                    <div className="contact-info-row">
                        <p className="contact-info-kicker">Location</p>
                        <p className="contact-info-value">Istanbul, Turkey</p>
                    </div>

                    <div className="contact-info-row">
                        <p className="contact-info-kicker">Social</p>
                        <div className="contact-social-list">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-social-link"
                                >
                                    <span>{link.name}</span>
                                    <span className="contact-social-line" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="contact-availability">
                        <p className="contact-info-kicker">Availability</p>
                        <p className="contact-availability-copy">
                            Open for selected projects and festival communication in Turkish and
                            English.
                        </p>
                    </div>
                </motion.aside>

                <motion.div
                    initial={{ opacity: 0, y: 34 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.18 }}
                    className="contact-form-panel"
                >
                    <div className="contact-form-head">
                        <div className="contact-label">
                            <SectionLabel>Message</SectionLabel>
                        </div>
                        <p className="contact-form-help">
                            Use the fields below to draft your message.
                        </p>
                    </div>

                    <form onSubmit={(e) => e.preventDefault()} className="contact-form">
                        <div className="contact-form-grid">
                            {contactFields.map((field) => (
                                <div
                                    key={field.id}
                                    className={`contact-field ${field.fullWidth ? 'contact-field--full' : ''}`}
                                >
                                    <label htmlFor={field.id} className="contact-field-label">
                                        {field.label}
                                    </label>
                                    <input
                                        id={field.id}
                                        type={field.type}
                                        className="contact-input"
                                    />
                                </div>
                            ))}

                            <div className="contact-field contact-field--full">
                                <label htmlFor="contact-message" className="contact-field-label">
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    rows={7}
                                    className="contact-textarea"
                                />
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.99 }}
                            className="contact-submit"
                        >
                            Send Message
                        </motion.button>
                    </form>
                </motion.div>
            </section>
        </PageShell>
    );
}
