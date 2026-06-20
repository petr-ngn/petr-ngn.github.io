import React from 'react';
import { motion } from 'framer-motion';
import './Education.css';

interface EduItem {
  degree: string;
  institution: string;
  period: string;
  details: string[];
  honors?: string[];
  exchange?: boolean;
}

const education: EduItem[] = [
  {
    degree: "Data and Analytics for Business",
    institution: 'Prague University of Economics and Business — Faculty of Informatics and Statistics',
    period: '2022 — 2023',
    details: [
      'Pursued a 2nd Master\'s degree, completed the whole coursework, but did not finish the program due to focus on transition to my full-time AI/ML career and freelancing opportunities.',
      'Coursework: Cloud Computing, Python Programming, Agile ML Development, Cloud BI, Data Architectures',
      'Extracurricular: Data and Business Alumni Club',
    ],
    honors: [
      '3rd place — Data Challenge 2023',
      'Scholarship for exceptional academic results',
    ],
  },
  {
    degree: "Master's in Banking and Insurance",
    institution: 'Prague University of Economics and Business — Faculty of Finance and Accounting',
    period: '2020 — 2023',
    details: [
      'Thesis: Application of Machine Learning Models within Credit Risk Modelling',
      'Minor Specialisation: Data Engineering',
      'Coursework: Time Series Modelling, Risk Management, Monetary Economics, Data Mining, Business Intelligence',
      'Extracurricular: Prague Banking Club',
    ],
    honors: [
      'Award for Excellent Master\'s Thesis (ESOP)',
      'TOP 25 — Werner von Siemens Award',
      '2nd place — Atlas Copco Services Award',
      'Scholarship for exceptional academic results',
    ],
  },
  {
    degree: "Master's Erasmus+ Exchange",
    institution: 'University of Antwerp — Faculty of Business and Economics',
    period: '2021 — 2022',
    exchange: true,
    details: [
      'Coursework: Data Science, Econometrics, Financial Engineering',
      'Extracurricular: AXA Data Science Challenge 2021',
    ],
  },
  {
    degree: "Bachelor's in Banking and Insurance",
    institution: 'Prague University of Economics and Business — Faculty of Finance and Accounting',
    period: '2017 — 2020',
    details: [
      'Thesis: Bank Guarantees and Documentary Letters of Credit',
      'Coursework: Financial Mathematics, Insurance Mathematics, Statistics, Econometrics, Financial Analysis, Capital Markets, Banking',
    ],
  },
];

const inView = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] } },
};

const Education: React.FC = () => (
  <section id="education" className="education">
    <div className="container">

      <motion.div
        className="edu-header"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} viewport={{ once: true }}
      >
        <p className="section-eyebrow">Education</p>
        <h2 className="section-title">ACADEMIC RECORD</h2>
        <div className="section-divider" />
      </motion.div>

      <motion.div
        className="edu-grid"
        initial="hidden"
        whileInView="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        viewport={{ once: true, margin: '-60px' }}
      >
        {education.map((edu, i) => (
          <motion.article key={i} className="edu-card" variants={inView}>
            <div className="edu-card-top">
              <span className="edu-period">{edu.period}</span>
              {edu.exchange && <span className="edu-exchange-badge">Erasmus+</span>}
            </div>

            <h3 className="edu-degree">{edu.degree}</h3>
            <p className="edu-institution">{edu.institution}</p>

            <ul className="edu-details">
              {edu.details.map((d, j) => (
                <li key={j}>{d}</li>
              ))}
            </ul>

            {edu.honors && edu.honors.length > 0 && (
              <div className="edu-honors">
                <p className="edu-honors-label">Honours &amp; Awards</p>
                <ul className="edu-honors-list">
                  {edu.honors.map((h, j) => (
                    <li key={j}>
                      <span className="edu-honor-icon">◆</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.article>
        ))}
      </motion.div>

    </div>
  </section>
);

export default Education;
