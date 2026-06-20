import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

interface NavItem { id: string; label: string; }

const navItems: NavItem[] = [
  { id: 'about',      label: 'About'      },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects'   },
  { id: 'education',  label: 'Education'  },
  { id: 'contact',    label: 'Contact'    },
];

const Navbar: React.FC = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 40);
      setProgress(docH > 0 ? (scrollTop / docH) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Progress bar */}
      <div className="nav-progress-track">
        <motion.div
          className="nav-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }}
      >
        <div className="nav-inner">
          {/* Logo */}
          <button className="nav-logo" onClick={() => scrollTo('home')}>
            <span className="nav-logo-mark">PN</span>
            <span className="nav-logo-slash">/</span>
            <span className="nav-logo-title">Petr Nguyen</span>
          </button>

          {/* Desktop links */}
          <nav className="nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="nav-link"
                onClick={() => scrollTo(item.id)}
              >
                <span className="nav-link-label">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="nav-toggle"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`nav-toggle-bar ${menuOpen ? 'open' : ''}`} />
            <span className={`nav-toggle-bar ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="nav-mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  className="nav-mobile-link"
                  onClick={() => scrollTo(item.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
