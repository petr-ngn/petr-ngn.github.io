import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const App: React.FC = () => {
  const isBrowser = typeof window !== 'undefined' &&
    window.navigator &&
    !window.navigator.userAgent.includes('HeadlessChrome');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isBrowser) return;
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1100);
    return () => clearTimeout(timer);
  }, [isBrowser]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="loading-screen"
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="loading-inner">
              <motion.div
                className="loading-monogram"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                P<span>N</span>
              </motion.div>
              <motion.p
                className="loading-label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Full-stack AI &amp; ML Developer
              </motion.p>
              <motion.div
                className="loading-bar-track"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="loading-bar-fill" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="App">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Education />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
