import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import './Experience.css';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string[];
  tools: string;
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      title: 'Data Scientist | GenAI Developer',
      company: 'BigHub',
      location: 'Prague, Czech Republic',
      period: '05/2025 - present',
      type: 'Contractor',
      description: [
        'Helping business to develop custom AI solutions, including predictive modelling or OCR and LLM applications.'
      ],
      tools: 'Python, Azure, OpenAI, Terraform, Azure Functions, Azure App Services, GitLab, Azure Document Intelligence, Azure AI Vision'
    },
    {
      title: 'AI Engineer Consultant',
      company: 'LutherOne',
      location: 'Prague, Czech Republic',
      period: '07/2025 - present',
      type: 'Contractor',
      description: [
        'Providing consultancy services and AI expertise to a HR-tech B2B start-up, including LLM deployment and integration into a platform product, AI tasks automation, RAG systems, AI agents, and other AI/ML support for a Data Science team.'
      ],
      tools: 'Python, AWS, AWS Bedrock, CI/CD, Docker, Linux, Bash, GitLab, Amazon EC2, Amazon Comprehend, AWS Lambda, Terraform'
    },
    {
      title: 'Data Science Mentor/Coach',
      company: 'Czechitas',
      location: 'Prague, Czech Republic',
      period: '05/2025 - present',
      type: 'Volunteer',
      description: [
        'Volunteering at a non-profit organization helping women to enter the IT world. Mentoring 2 students in Digital Academy and consulting their project. Coaching classes in AI, Python programming and Data Science.'
      ],
      tools: 'Python, SQL'
    },
    {
      title: 'Lead AI & ML Engineer',
      company: 'LutherOne',
      location: 'Prague, Czech Republic',
      period: '01/2024 - 06/2025',
      type: 'Full-time',
      description: [
        'Senior lead of AI and ML team at a HR-tech B2B start-up, responsible for delivery of LLM integration into the product, AI automation of processes, mentoring two junior ML engineers and data scientists, overseeing attrition modelling development, partial development of the backend microservices.'
      ],
      tools: 'Python, TypeScript, MongoDB, Bash, Docker, Linux, AWS EC2, AWS SageMaker, AWS Lambda, AWS ECR, AWS Glue, GitLab, AWS Step Functions, AWS Comprehend, AWS Bedrock, AWS Cognito, AWS EventBridge, AWS RDS'
    },
    {
      title: 'Machine Learning Engineer',
      company: 'LutherOne',
      location: 'Prague, Czech Republic',
      period: '07/2023 - 12/2023',
      type: 'Full-time',
      description: [
        'ML engineering at a HR-tech B2B start-up with a responsiblity for attrition modelling, natural language processing, web application development, data processing pipelines development and deployment.'
      ],
      tools: 'Python, Bash, Docker, Linux, AWS EC2, AWS SageMaker, AWS Bedrock, AWS Lambda, AWS ECR, AWS Glue, GitLab'
    },
    {
      title: 'Data Scientist',
      company: 'Ernst & Young (EY)',
      location: 'Prague, Czech Republic',
      period: '07/2023 - 12/2023',
      type: 'Part-time',
      description: [
        'Advanced analytics at one of the Big 4 consultancy companies, development of ML solutions in electromobility and energy sector, including energy consumption forecasting or heuristic algorithm for synthetic generation of EV utilization.'
      ],
      tools: 'Python, Docker, Streamlit, JavaScript, HTML, CSS, Power BI'
    },
    {
      title: 'Full Stack Developer',
      company: 'Česko.Digital',
      location: 'Prague, Czech Republic',
      period: '04/2023 - 08/2023',
      type: 'Volunteer',
      description: [
        'Development of a custom algorithm and web application for skills matching of volunteers for project engagement at Czech non-profit IT organization (3rd place in Data Challenge 2023).'
      ],
      tools: 'Python, Flask, Docker, GitHub Actions, AWS Lambda, JavaScript, HTML, CSS, Keboola, SQL'
    },
    {
      title: 'Data Science & Financial Risk Modeller',
      company: 'PricewaterhouseCoopers (PwC)',
      location: 'Prague, Czech Republic',
      period: '03/2022 - 06/2023',
      type: 'Part-time',
      description: [
        'Quantitave modelling at one of the Big 4 consultancy companies providing services in the field of credit risk modelling, including validation and back-testing of credit risk models, statistical modelling, audit support, ML research and development.'
      ],
      tools: 'Python, R, SQL, Azure ML'
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
    <section id="experience" className="experience">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Experience</h2>
          <p>My professional journey</p>
        </motion.div>

        <motion.div
          className="experience-timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="experience-item"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="experience-header">
                <div className="experience-title">
                  <h3>{exp.title}</h3>
                  <div className="experience-company">
                    <FaBuilding className="icon" />
                    <span>{exp.company}</span>
                  </div>
                </div>
                <div className="experience-meta">
                  <div className="experience-location">
                    <FaMapMarkerAlt className="icon" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="experience-period">
                    <FaCalendarAlt className="icon" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="experience-type">
                    <span className="type-badge">{exp.type}</span>
                  </div>
                </div>
              </div>
              
              <div className="experience-content">
                <ul className="experience-description">
                  {exp.description.map((desc, descIndex) => (
                    <li key={descIndex}>{desc}</li>
                  ))}
                </ul>
                <div className="experience-tools">
                  <strong>Tools:</strong> {exp.tools}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
