import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const skillGroups = [
  {
    label: 'AI & Machine Learning',
    items: ['Scikit-learn', 'PyTorch', 'TensorFlow', 'HuggingFace', 'OpenAI', 'AWS Bedrock',
            'AWS SageMaker', 'LangChain', 'LangGraph', 'LangSmith', 'Optuna', 'SHAP', 'Pydantic'],
  },
  {
    label: 'Cloud & DevOps',
    items: ['AWS', 'Azure', 'Docker', 'Terraform', 'Jenkins', 'GitLab CI/CD',
            'GitHub Actions', 'Azure DevOps', 'Linux', 'Bash'],
  },
  {
    label: 'Web Development',
    items: ['FastAPI', 'Django', 'Flask', 'Streamlit', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    label: 'Languages & Data',
    items: ['Python', 'TypeScript', 'JavaScript', 'R', 'SQL', 'Polars', 'PostgreSQL', 'MongoDB', 'Redis', 'Databricks'],
  },
];

const coreCaps = [
  { title: 'AI Engineering', desc: 'Chatbots, RAG, RAG systems, Multi-agent Orchestration, MCP server development.' },
  { title: 'ML Engineering', desc: 'Predictive Modelling, Deep Learning, NLP, Computer Vision, OCR.' },
  { title: 'Cloud & DevOps', desc: 'AWS, Azure, Terraform IaC, CI/CD pipelines, Unit and Integration Testing, Containerization, Shell Scripting' },
  { title: 'Full-Stack Dev',  desc: 'Python backends (FastAPI/Django), React frontends, REST APIs, database design.' },
  { title: 'Data Engineering', desc: 'ETL Pipelines, Polars/SQL, AWS Glue, Databricks.' },
  { title: 'Mentoring',        desc: 'Leading Junior ML engineers; Coaching Data Science, AI & Python at Czechitas.' },
];

const inView = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.19, 1, 0.22, 1] } },
};

const About: React.FC = () => (
  <section id="about" className="about">
    <div className="container">

      {/* Header */}
      <motion.div
        className="about-header"
        initial="hidden" whileInView="show" variants={inView} viewport={{ once: true }}
      >
        <p className="section-eyebrow">About</p>
        <h2 className="section-title">WHO I AM</h2>
        <div className="section-divider" />
      </motion.div>

      {/* Bio + capabilities grid */}
      <div className="about-top">
        <motion.div
          className="about-bio"
          initial="hidden" whileInView="show" variants={inView} viewport={{ once: true }}
        >
          <p>
            I'm a Full Stack AI &amp; ML Developer with diverse experience across finance,
            Big&nbsp;4 consulting, start-up, and non-profit. Currently working as an idependent
            <strong> Data Scientist / GenAI Developer for BigHub</strong> and as an
            <strong> AI Engineer &amp; Architect Consultant for LutherOne</strong>.
          </p>
          <p>
            My work covers the entiner lifecycle — from data pipelines and model training to
            ML/LLM orchestration, CI/CD pipelines, cloud deployment, and production-ready integration. I'm finishing my
            2nd Master's degree in Data &amp; AI, and volunteer as a AI / Python &amp; Data Science
            mentor at Czechitas.
          </p>
        </motion.div>

        <motion.div
          className="about-caps"
          initial="hidden"
          whileInView="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
          viewport={{ once: true }}
        >
          {coreCaps.map(cap => (
            <motion.div key={cap.title} className="cap-card" variants={inView}>
              <h4 className="cap-title">{cap.title}</h4>
              <p className="cap-desc">{cap.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Tech stack */}
      <motion.div
        className="about-stack"
        initial="hidden" whileInView="show" variants={inView} viewport={{ once: true }}
      >
        <h3 className="about-stack-heading">Tech Stack</h3>
        <div className="stack-groups">
          {skillGroups.map(group => (
            <div key={group.label} className="stack-group">
              <p className="stack-group-label">{group.label}</p>
              <div className="stack-tags">
                {group.items.map(item => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  </section>
);

export default About;
