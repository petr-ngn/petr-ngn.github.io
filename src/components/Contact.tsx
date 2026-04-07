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

const inView = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.19, 1, 0.22, 1] } },
};

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<ContactForm>({
    user_name: '', user_email: '', subject: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const serviceId  = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS not configured. Please contact me directly at ngn.petr@gmail.com');
      }

      emailjs.init(publicKey);
      await emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey);

      setFormData({ user_name: '', user_email: '', subject: '', message: '' });
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error: any) {
      setErrorMessage(error.message ?? 'Sorry, something went wrong. Please try again or email ngn.petr@gmail.com');
      setSubmitStatus('error');
      setTimeout(() => { setSubmitStatus('idle'); setErrorMessage(''); }, 8000);
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
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            viewport={{ once: true }}
          >
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label" htmlFor="user_name">Name</label>
                  <input
                    id="user_name" name="user_name" type="text"
                    className="form-input"
                    value={formData.user_name}
                    onChange={handleChange}
                    placeholder="Your name"
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
