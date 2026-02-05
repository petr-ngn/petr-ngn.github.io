import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer-section">
            <p className="copyright">
              © {currentYear} Petr Nguyen
            </p>
          </div>
          
          <div className="footer-section">
            <p className="entrepreneur-info">
            Entrepreneur Identification Code: <span className="placeholder">23238488</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
