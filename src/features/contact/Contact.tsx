import { motion } from 'framer-motion';
import { useState } from 'react';
import profile from '../../data/profile';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in name, email and message.');
      return;
    }
    const subject = form.subject || `Contact from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    const mailHref = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    globalThis.location.href = mailHref;
    setStatus('Opening mail client…');
  };

  return (
    <section id="contact" className="section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Contact
      </motion.h2>

      <div className="contact-grid">
        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="contact-info-box">
            <h3 className="contact-info-title">Let's Work Together</h3>

            <div className="contact-info-item">
              <div className="contact-info-icon" aria-hidden>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="contact-info-label">Email</div>
                <div className="contact-info-value">
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </div>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon" aria-hidden>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7 9.91a16 16 0 006.6 6.6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                <div className="contact-info-label">Phone</div>
                <div className="contact-info-value">
                  <a href={`tel:${profile.phone}`}>{profile.phone}</a>
                </div>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon" aria-hidden>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="contact-info-label">Location</div>
                <div className="contact-info-value">{profile.location}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.form
          onSubmit={handleSubmit}
          aria-label="Contact form"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="contact-form-grid"
        >
          <div className="form-field">
            <label className="form-label" htmlFor="cf-name">Your Name</label>
            <input
              id="cf-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="form-input"
              autoComplete="name"
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="cf-email">Email Address</label>
            <input
              id="cf-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="form-input"
              autoComplete="email"
            />
          </div>
          <div className="form-field full">
            <label className="form-label" htmlFor="cf-subject">Subject</label>
            <input
              id="cf-subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="How can I help you?"
              className="form-input"
            />
          </div>
          <div className="form-field full">
            <label className="form-label" htmlFor="cf-message">Message</label>
            <textarea
              id="cf-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message here…"
              rows={6}
              className="form-input"
            />
          </div>
          <button type="submit" className="btn-submit">Send Message</button>
          {status && (
            <p style={{ gridColumn: '1 / -1', fontSize: '0.82rem', color: 'var(--accent)' }}>
              {status}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;

