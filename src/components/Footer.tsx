import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-left">
            <span className="footer-mark">PN</span>
            <span className="footer-name">Petr Nguyen</span>
          </div>
          <div className="footer-center">
            <span className="footer-reg">
              IČO (Entrepreneur Identification Code): 23238488 · VAT registered
            </span>
          </div>
          <div className="footer-right">
            <span className="footer-copy">© {year}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
