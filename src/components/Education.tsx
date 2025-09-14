import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaTrophy } from 'react-icons/fa';
import './Education.css';

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description: string[];
  honors?: string[];
}

const Education: React.FC = () => {
  const education: EducationItem[] = [
    {
      degree: 'Master\'s in Data and Analytics for Business',
      institution: 'Faculty of Informatics and Statistics, Prague University of Economics and Business',
      period: '2022 - present',
      description: [
        'Thesis: Deployment of LLM-based Applications in AWS (in progress)',
        'Coursework: Cloud Computing, Python Programming, Agile ML Development, Cloud BI, Data Architectures, SSBI',
        'Extracurricular Activity: Data and Business Alumni Club'
      ],
      honors: [
        '3rd place in Data Challenge 2023',
        'Scholarship for exceptional academic results'
      ]
    },
    {
      degree: 'Master\'s in Banking and Insurance',
      institution: 'Faculty of Finance and Accounting, Prague University of Economics and Business',
      period: '2020 - 2023',
      description: [
        'Thesis: Application of Machine Learning Models within Credit Risk Modelling',
        'Minor Specialization: Data Engineering',
        'Coursework: Time Series Modelling, Risk Management, Monetary Economics, Asset Management, Business Intelligence, Database Systems, Data Mining',
        'Extracurricular Activity: Prague Banking Club'
      ],
      honors: [
        'Award for an excellent Master\'s thesis (ESOP)',
        'TOP 25 of Werner von Siemens Award',
        '2nd place at Atlas Copco Services Award',
        'Scholarship for exceptional academic results'
      ]
    },
    {
      degree: 'Master\'s Erasmus+ Exchange',
      institution: 'Faculty of Business and Economics, University of Antwerp',
      period: '2021 - 2022',
      description: [
        'Coursework: Data Science, Econometrics, Financial Engineering',
        'Extracurricular Activity: AXA Data Science Challenge 2021'
      ]
    },
    {
      degree: 'Bachelor\'s in Banking and Insurance',
      institution: 'Faculty of Finance and Accounting, Prague University of Economics and Business',
      period: '2017 - 2020',
      description: [
        'Thesis: Bank Guarantees and Documentary Letters of Credit',
        'Coursework: Financial Mathematics, Insurance Mathematics, Statistics, Econometrics, Financial Analysis, Accounting, Capital Markets, Taxes, Corporate Finance, Banking'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="education" className="education">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Education</h2>
          <p>My academic background</p>
        </motion.div>

        <motion.div
          className="education-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="education-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="education-header">
                <div className="education-icon">
                  <FaGraduationCap />
                </div>
                <div className="education-info">
                  <h3>{edu.degree}</h3>
                  <div className="education-institution">
                    <span>{edu.institution}</span>
                  </div>
                  <div className="education-period">
                    <FaCalendarAlt className="icon" />
                    <span>{edu.period}</span>
                  </div>
                </div>
              </div>

              <div className="education-content">
                <ul className="education-description">
                  {edu.description.map((desc, descIndex) => (
                    <li key={descIndex}>{desc}</li>
                  ))}
                </ul>

                {edu.honors && edu.honors.length > 0 && (
                  <div className="education-honors">
                    <div className="honors-header">
                      <FaTrophy className="icon" />
                      <span>Honours & Awards</span>
                    </div>
                    <ul className="honors-list">
                      {edu.honors.map((honor, honorIndex) => (
                        <li key={honorIndex}>{honor}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
