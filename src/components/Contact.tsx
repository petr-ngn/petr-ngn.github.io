import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './Contact.css';

interface ContactForm {
  user_name: string;
  user_email: string;
  subject: string;
  message: string;
}

/** Honeypot name — must not be mapped in the EmailJS template (only sent if using sendForm). */
const HP_NAME = 'company';

const MAX = { user_name: 80, user_email: 254, subject: 120, message: 2000 } as const;
const THROTTLE_MS = 30_000;
const THROTTLE_KEY = 'portfolio_contact_last_submit';
const GENERIC_SEND_ERROR =
  'Could not send. Try again or email ngn.petr@gmail.com';
const RATE_LIMIT_MESSAGE = 'Please wait a moment before sending another message.';
const VALIDATION_ERROR = 'Please fill in all fields.';

const emptyForm = (): ContactForm => ({
  user_name: '',
  user_email: '',
  subject: '',
  message: '',
});

const inView = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] } },
};

const Contact: React.FC = () => {
  const hpRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<ContactForm>(emptyForm());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === HP_NAME) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      if (hpRef.current?.value.trim()) {
        hpRef.current.value = '';
        setFormData(emptyForm());
        setSubmitStatus('success');
        setTimeout(() => setSubmitStatus('idle'), 5000);
        return;
      }

      const now = Date.now();
      const lastRaw = typeof window !== 'undefined' ? sessionStorage.getItem(THROTTLE_KEY) : null;
      const last = lastRaw ? Number(lastRaw) : 0;
      if (last && now - last < THROTTLE_MS) {
        setErrorMessage(RATE_LIMIT_MESSAGE);
        setSubmitStatus('error');
        setTimeout(() => {
          setSubmitStatus('idle');
          setErrorMessage('');
        }, 8000);
        return;
      }

      const trimmed: ContactForm = {
        user_name: formData.user_name.trim(),
        user_email: formData.user_email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      if (!trimmed.user_name || !trimmed.user_email || !trimmed.subject || !trimmed.message) {
        setErrorMessage(VALIDATION_ERROR);
        setSubmitStatus('error');
        setTimeout(() => {
          setSubmitStatus('idle');
          setErrorMessage('');
        }, 8000);
        return;
      }

      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        if (process.env.NODE_ENV === 'development') {
          console.error('EmailJS env vars are missing');
        }
        setErrorMessage(GENERIC_SEND_ERROR);
        setSubmitStatus('error');
        setTimeout(() => {
          setSubmitStatus('idle');
          setErrorMessage('');
        }, 8000);
        return;
      }

      const templateParams: Record<string, unknown> = {
        user_name: trimmed.user_name,
        user_email: trimmed.user_email,
        subject: trimmed.subject,
        message: trimmed.message,
      };

      emailjs.init(publicKey);
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      sessionStorage.setItem(THROTTLE_KEY, String(Date.now()));
      setFormData(emptyForm());
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error: unknown) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
      setErrorMessage(GENERIC_SEND_ERROR);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">

        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
        >
          <p className="section-eyebrow">Contact</p>
          <h2 className="section-title">GET IN TOUCH</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="contact-layout">

          {/* Left: info */}
          <motion.div
            className="contact-info"
            initial="hidden" whileInView="show" variants={inView} viewport={{ once: true }}
          >
            <p className="contact-pitch">
              I'm open to new opportunities, consulting work, and interesting collaborations
              in AI, ML, and full-stack development. Don't hesitate to reach out.
            </p>

            <div className="contact-details">
              <a href="mailto:ngn.petr@gmail.com" className="contact-row">
                <span className="contact-row-icon"><FaEnvelope /></span>
                <span className="contact-row-value">ngn.petr@gmail.com</span>
              </a>
              <div className="contact-row">
                <span className="contact-row-icon"><FaMapMarkerAlt /></span>
                <span className="contact-row-value">Prague, Czech Republic</span>
              </div>
            </div>

            <div className="contact-social">
              <a href="https://linkedin.com/in/petr-ngn" target="_blank" rel="noopener noreferrer"
                 className="social-btn">
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/petr-ngn" target="_blank" rel="noopener noreferrer"
                 className="social-btn">
                <FaGithub />
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }}
            viewport={{ once: true }}
          >
            <form className="contact-form" onSubmit={handleSubmit} noValidate>

              <div className="contact-hp" aria-hidden="true">
                <label htmlFor={HP_NAME}>Company</label>
                <input
                  ref={hpRef}
                  id={HP_NAME}
                  name={HP_NAME}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label" htmlFor="user_name">Name</label>
                  <input
                    id="user_name" name="user_name" type="text"
                    className="form-input"
                    value={formData.user_name}
                    onChange={handleChange}
                    placeholder="Your name"
                    maxLength={MAX.user_name}
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="user_email">Email</label>
                  <input
                    id="user_email" name="user_email" type="email"
                    className="form-input"
                    value={formData.user_email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    maxLength={MAX.user_email}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input
                  id="subject" name="subject" type="text"
                  className="form-input"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  maxLength={MAX.subject}
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  id="message" name="message"
                  className="form-input form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or inquiry..."
                  rows={5}
                  maxLength={MAX.message}
                  required
                />
              </div>

              {submitStatus === 'success' && (
                <motion.p
                  className="form-status form-status--success"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                >
                  Message sent — I'll get back to you soon.
                </motion.p>
              )}

              {submitStatus === 'error' && (
                <motion.p
                  className="form-status form-status--error"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                >
                  {errorMessage}
                </motion.p>
              )}

              <motion.button
                type="submit"
                className="btn-acid form-submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </motion.button>

            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
