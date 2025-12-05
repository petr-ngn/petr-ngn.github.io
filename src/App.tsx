import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  // Check if we're in a browser (not during pre-rendering)
  const isBrowser = typeof window !== 'undefined' && 
    window.navigator && 
    window.navigator.userAgent && 
    !window.navigator.userAgent.includes('HeadlessChrome');
  
  // Start with no loading screen to avoid hydration mismatches
  // Only show loading screen in actual browser, not during pre-rendering
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Only show loading screen in actual browser
    if (!isBrowser) {
      return;
    }
    
    // Show loading screen briefly
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isBrowser]);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="loading-content"
        >
          <h2>Petr Nguyen</h2>
          <p>AI & ML Engineer</p>
          <div className="loading-spinner"></div>
        </motion.div>
      </div>
    );
  }

  return (
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
  );
};

export default App;
