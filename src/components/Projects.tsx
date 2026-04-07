import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AI-Powered OCR Financial Analyzer',
    category: 'Hackathon Winner',
    description: 'Deepnote hackathon winning project combining AWS Textract OCR with Anthropic LLM and Tavily search for intelligent financial document analysis.',
    technologies: ['AWS','Python','AWS Textract','AWS Bedrock','Anthropic LLM','Tavily API','GitHub Actions','Streamlit','AWS S3'],
    githubUrl: 'https://github.com/petr-ngn/deepnote-hackathon',
  },
  {
    id: 2,
    title: 'LLM Integration into HR-Tech Platform',
    category: 'Product',
    description: 'End-to-end LLM integration into an HR-tech platform for people engagement, continuous feedback, and talent development at scale.',
    technologies: ['Python','TypeScript','AWS','MongoDB','AWS Bedrock','Anthropic LLM','AWS Fargate','GitLab','Pydantic'],
  },
  {
    id: 3,
    title: 'AI Shopping Assistant MCP Server in E-commerce',
    category: 'Enterprise AI',
    description: 'Development and deployment of AI-powered shopping assistant as a MCP server in e-commerce, including integration into OpenAI and Claude UI clients, and custom chatbot agent.',
    technologies: [
      'Python', 'TypeScript', 'React', 'FastMCP', 'FastAPI', 'Docker', 'OpenAI Apps SDK', 'Claude', 'Pydantic'],
  },
  {
    id: 4,
    title: 'OCR for Insurance Claims',
    category: 'Enterprise AI',
    description: 'Multi-modal extraction pipeline for structured and unstructured insurance documents — document classification, OCR/LLM-based extraction, and async API. Built on Azure AI Vision + Document Intelligence.',
    technologies: ['Python','FastAPI','Docker','OpenAI','LangGraph','Azure','OpenCV','Azure AI Vision','Azure Document Intelligence','Terraform','Jenkins','Azure App Services','Pydantic'],
  },
  {
    id: 5,
    title: 'OCR for Automotive / Invoice Documents',
    category: 'Enterprise AI',
    description: 'Text and semantic extraction engine of documents within automotive industry.',
    technologies: ['Python','FastAPI','Docker','OpenAI','LangGraph','Azure', 'OpenCV','Azure Document Intelligence','Terraform','Azure DevOps','Azure Container Apps', 'Pydantic'],
  },

  {
    id: 6,
    title: 'Serverless Employee Comments Pipeline',
    category: 'MLOps',
    description: 'Automated, cost-efficient AWS serverless pipeline for multilingual employee comment analysis: translation, sentiment, and topic modelling via HuggingFace and Bedrock.',
    technologies: ['Python','AWS','HuggingFace','Transformers','AWS Bedrock','AWS Step Functions','AWS SageMaker','AWS Lambda','AWS EventBridge','PostgreSQL','AWS RDS'],
  },
  {
    id: 7,
    title: 'Employee Attrition Modelling',
    category: 'Predictive ML',
    description: 'Predictive ML system for employee churn — custom algorithms for missing value treatment, feature selection, ensemble modelling, and SHAP-based explainability.',
    technologies: ['Python','Polars','Scikit-learn','PyTorch','SHAP','AWS SageMaker','AWS ECR','AWS Step Functions'],
  },
  {
    id: 8,
    title: 'Internal LLM Web Apps Suite',
    category: 'Internal Tools',
    description: 'Suite of internal AI-powered web apps for Data Science and Customer Success teams — chatbots, data analysis, PowerPoint/Excel generation, summarisation, and report automation.',
    technologies: ['Python','Streamlit','AWS','Docker','AWS EC2','AWS Cognito','GitLab','Terraform','AWS ECR','AWS Lambda','NGINX','Linux'],
  },
  {
    id: 9,
    title: 'IT Volunteer Skill Matching App',
    category: 'Non-profit',
    description: 'Web application for recruiters to match IT volunteers with non-profit projects using a custom cosine-similarity skill-matching algorithm. 3rd place at Data Challenge 2023.',
    technologies: ['Python','Flask','Docker','GitHub Actions','AWS Lambda','JavaScript','HTML','CSS','SQL','Keboola','SciPy','Scikit-learn'],
    githubUrl: 'https://github.com/petr-ngn/deepnote-hackathon',
  },
];

const inView = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } },
};

const Projects: React.FC = () => (
  <section id="projects" className="projects">
    <div className="container">

      <motion.div
        className="projects-header"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} viewport={{ once: true }}
      >
        <p className="section-eyebrow">Projects</p>
        <h2 className="section-title">SELECTED WORK</h2>
        <div className="section-divider" />
      </motion.div>

      <motion.div
        className="projects-grid"
        initial="hidden"
        whileInView="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
        viewport={{ once: true, margin: '-60px' }}
      >
        {projects.map((p, i) => (
          <motion.article
            key={p.id}
            className={`project-card ${i === 0 ? 'project-card--featured' : ''}`}
            variants={inView}
          >
            <div className="project-card-inner">
              <header className="project-card-header">
                <div className="project-card-meta">
                  <span className="project-category">{p.category}</span>
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-github"
                      aria-label="GitHub"
                      onClick={e => e.stopPropagation()}
                    >
                      <FaGithub />
                    </a>
                  )}
                </div>
                <h3 className="project-title">{p.title}</h3>
              </header>

              <p className="project-desc">{p.description}</p>

              <footer className="project-tech">
                {p.technologies.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </footer>
            </div>

            {/* Accent line on hover */}
            <div className="project-card-glow" aria-hidden="true" />
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="projects-cta-row"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }} viewport={{ once: true }}
      >
        <a
          href="https://github.com/petr-ngn"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost projects-more"
        >
          <FaGithub />
          <span>More on GitHub</span>
        </a>
      </motion.div>

    </div>
  </section>
);

export default Projects;
