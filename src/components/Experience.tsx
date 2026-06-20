import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

interface ExpItem {
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  tools: string[];
}

const experiences: ExpItem[] = [
  {
    title: 'Data Scientist | GenAI Developer',
    company: 'BigHub',
    location: 'Prague, CZ',
    period: '05/2025 — present',
    type: 'Contractor',
    description: 'End-to-end AI solutions: computer vision / OCR for document processing, multi-agent orchestrated RAG platforms for enterprise, and MCP servers for e-commerce AI assistants. Real-time Speech-to-Text WebSocket app for insurance and medical transcription. Backend architecture, API development, CI/CD pipelines, and Azure cloud deployment. Presales activities, cost analysis, and PoC delivery.',
    tools: ['Python','FastAPI','Azure','OpenAI SDK','Terraform','FastMCP','LangGraph','LangChain','LangSmith','Azure Container Apps','Azure Document Intelligence','Azure AI Vision','Azure Speech','GitLab CI/CD','React','Docker'],
  },
  {
    title: 'AI Engineer & Architect Consultant',
    company: 'LutherOne',
    location: 'Prague, CZ',
    period: '07/2025 — present',
    type: 'Contractor',
    description: 'AI consultancy for an HR-tech B2B start-up: LLM deployment and product integration, multi-agent systems, RAG pipelines, AI automation, and Data Science support for an engineering team.',
    tools: ['Python','AWS Bedrock','Strands SDK','LangGraph','LangChain','LangSmith','Langfuse','pgvector','MongoDB','Redis','Terraform','Docker','GitLab','Amazon EC2','AWS Lambda','Amazon Comprehend'],
  },
  {
    title: 'AI & Data Science Mentor/Coach',
    company: 'Czechitas',
    location: 'Prague, CZ',
    period: '05/2025 — present',
    type: 'Volunteer',
    description: 'Volunteering at a non-profit organisation helping women enter IT. Mentoring students in the Digital Academy and coaching AI, Python programming, and Data Science.',
    tools: ['Python','SQL'],
  },
  {
    title: 'Lead AI & ML Engineer',
    company: 'LutherOne',
    location: 'Prague, CZ',
    period: '01/2024 — 06/2025',
    type: 'Full-time',
    description: 'Senior lead of the AI/ML team — responsible for LLM product integration, AI process automation, mentoring two junior engineers, overseeing attrition modelling, and partial backend microservices development.',
    tools: ['Python','TypeScript','MongoDB','Bash','Docker','Linux','AWS EC2','AWS SageMaker','AWS Lambda','AWS ECR','AWS Glue','GitLab','AWS Step Functions','AWS Comprehend','AWS Bedrock','AWS Cognito','AWS EventBridge','AWS RDS'],
  },
  {
    title: 'Machine Learning Engineer',
    company: 'LutherOne',
    location: 'Prague, CZ',
    period: '07/2023 — 12/2023',
    type: 'Full-time',
    description: 'ML engineering for attrition modelling, NLP, web application development, and data processing pipeline deployment.',
    tools: ['Python','Bash','Docker','Linux','AWS EC2','AWS SageMaker','AWS Bedrock','AWS Lambda','AWS ECR','AWS Glue','GitLab'],
  },
  {
    title: 'Data Scientist',
    company: 'Ernst & Young (EY)',
    location: 'Prague, CZ',
    period: '07/2023 — 12/2023',
    type: 'Part-time',
    description: 'Advanced analytics at a Big 4 consultancy — ML solutions for electromobility and the energy sector, including energy consumption forecasting and EV utilisation synthetic data generation.',
    tools: ['Python','Docker','Streamlit','JavaScript','HTML','CSS','Power BI'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Česko.Digital',
    location: 'Prague, CZ',
    period: '04/2023 — 08/2023',
    type: 'Volunteer',
    description: 'Built a custom algorithm and web application for volunteer skill matching at a Czech non-profit IT organisation — 3rd place in Data Challenge 2023.',
    tools: ['Python','Flask','Docker','GitHub Actions','AWS Lambda','JavaScript','HTML','CSS','Keboola','SQL'],
  },
  {
    title: 'Data Science & Financial Risk Modeller',
    company: 'PricewaterhouseCoopers (PwC)',
    location: 'Prague, CZ',
    period: '03/2022 — 06/2023',
    type: 'Part-time',
    description: 'Quantitative modelling at a Big 4 consultancy — credit risk model validation, back-testing, statistical modelling, audit support, and ML R&D.',
    tools: ['Python','R','SQL','Azure ML'],
  },
];

const badgeColor: Record<string, string> = {
  'Contractor': 'badge--acid',
  'Full-time':  'badge--coral',
  'Volunteer':  'badge--muted',
  'Part-time':  'badge--outline',
};

const inView = {
  hidden: { opacity: 0, x: -20 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] } },
};

const Experience: React.FC = () => {
  return (
    <section id="experience" className="experience">
      <div className="container">

        <motion.div
          className="exp-header"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
        >
          <p className="section-eyebrow">Experience</p>
          <h2 className="section-title">WORK HISTORY</h2>
          <div className="section-divider" />
        </motion.div>

        <motion.div
          className="exp-timeline"
          initial="hidden"
          whileInView="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          viewport={{ once: true, margin: '-80px' }}
        >
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="exp-item exp-item--open"
              variants={inView}
            >
              {/* Timeline dot */}
              <div className="exp-dot">
                <span className="exp-dot-inner" />
              </div>

              {/* Content */}
              <div className="exp-content">
                <div className="exp-top">
                  <div className="exp-meta-left">
                    <span className={`exp-badge ${badgeColor[exp.type] ?? 'badge--outline'}`}>
                      {exp.type}
                    </span>
                    <span className="exp-period">{exp.period}</span>
                    <span className="exp-loc">{exp.location}</span>
                  </div>
                </div>

                <h3 className="exp-title">{exp.title}</h3>
                <p className="exp-company">{exp.company}</p>

                <div className="exp-body">
                  <p className="exp-desc">{exp.description}</p>
                  <div className="exp-tools">
                    {exp.tools.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
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
