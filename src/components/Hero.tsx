import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Hero.css';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Animated particle mesh */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let raf: number;

    const NODES = Math.min(Math.floor((W * H) / 18000), 55);
    const CONN_DIST = 160;
    const ACID = [0, 150, 255];

    interface Node { x: number; y: number; vx: number; vy: number; }
    const nodes: Node[] = Array.from({ length: NODES }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONN_DIST) {
            const alpha = (1 - dist / CONN_DIST) * 0.18;
            ctx.strokeStyle = `rgba(${ACID[0]},${ACID[1]},${ACID[2]},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACID[0]},${ACID[1]},${ACID[2]},0.35)`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Parent stagger for eyebrow / desc / ctas / socials
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const slide = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.19, 1, 0.22, 1] } },
  };

  // PETR — per-letter stagger container
  const petrContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.28 } },
  };
  // Each letter: clip-reveal upward
  const letterVariant = {
    hidden: { y: '105%' },
    show:   { y: '0%', transition: { duration: 0.55, ease: [0.19, 1, 0.22, 1] } },
  };
  // NGUYEN — whole-word, delayed after PETR letters finish
  const nguyenSlide = {
    hidden: { opacity: 0, y: 32 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.72, ease: [0.19, 1, 0.22, 1] } },
  };

  return (
    <section id="home" className="hero">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

      {/* Dot grid */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Gradient vignette */}
      <div className="hero-vignette" aria-hidden="true" />

      <div className="container">
        <motion.div
          className="hero-body"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Label */}
          <motion.div className="hero-eyebrow" variants={slide}>
            <span className="hero-eyebrow-dot" />
            <span className="hero-eyebrow-text">Full Stack AI &amp; ML Developer</span>
            <span className="hero-eyebrow-loc">Prague, CZ</span>
          </motion.div>

          {/* Name */}
          <div className="hero-name-block">
            {/* PETR — per-letter clip reveal */}
            <motion.h1
              className="hero-name-line hero-name-petr"
              variants={petrContainer}
              initial="hidden"
              animate="show"
              aria-label="Petr"
            >
              {'PETR'.split('').map((char, i) => (
                <span key={i} className="hero-letter-clip">
                  <motion.span className="hero-letter" variants={letterVariant}>
                    {char}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            {/* NGUYEN — delayed whole-word with acid gradient */}
            <motion.h1
              className="hero-name-line hero-name-nguyen"
              variants={nguyenSlide}
              initial="hidden"
              animate="show"
              aria-label="Nguyen"
            >
              NGUYEN
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p className="hero-desc" variants={slide}>
            Experienced and versatile full-stack AI &amp; ML developer specialising in GenAI / LLM / Multi-AI-Agent Systems, DevOps, Machine Learning, Data Science, Web App Development (Backend &amp; Frontend), and Cloud Infrastructure. 
            Currently&nbsp;building and delivering end-to-end and production-ready AI / ML solutions at&nbsp;
            <span className="hero-highlight">BigHub</span> and at&nbsp;
            <span className="hero-highlight">LutherOne</span> as an independent contractor.
          </motion.p>

          {/* CTAs */}
          <motion.div className="hero-ctas" variants={slide}>
            <button className="btn-acid" onClick={() => scrollTo('experience')}>
              View Experience
            </button>
            <button className="btn-ghost" onClick={() => scrollTo('contact')}>
              Get In Touch
            </button>
          </motion.div>

          {/* Socials */}
          <motion.div className="hero-socials" variants={slide}>
            <a href="https://linkedin.com/in/petr-ngn" target="_blank" rel="noopener noreferrer"
               className="hero-social-link" aria-label="LinkedIn">
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/petr-ngn" target="_blank" rel="noopener noreferrer"
               className="hero-social-link" aria-label="GitHub">
              <FaGithub />
              <span>GitHub</span>
            </a>
            <a href="mailto:ngn.petr@gmail.com"
               className="hero-social-link" aria-label="Email">
              <FaEnvelope />
              <span>ngn.petr@gmail.com</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          className="hero-scroll-cue"
          onClick={() => scrollTo('about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 1 }}
          aria-label="Scroll down"
        >
          <span className="hero-scroll-label">scroll</span>
          <motion.span
            className="hero-scroll-arrow"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
