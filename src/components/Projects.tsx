import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'AI-Powered OCR Financial Analyzer',
      description: 'Deepnote hackathon winning project',
      technologies: ['AWS', 'Python', 'Deepnote', 'AWS Textract', 'AWS Bedrock', 'Anthropic LLM', 'Tavily API', 'GitHub Actions', 'Streamlit', 'AWS S3'],
      githubUrl: 'https://github.com/petr-ngn/deepnote-hackathon',
    },
    {
      id: 2,
      title: 'LLM integration into HR-tech Product Platform',
      description: 'Integration of LLM\'s into HR-tech platform for people engagement, feedbacks and people development.',
      technologies: ['Python', 'TypeScript', 'AWS', 'MongoDB', 'AWS Bedrock', 'Anthropic LLM', 'AWS Fargate', 'Gitlab', 'Pydantic'],
    },
    {
      id: 3,
      title: 'OCR for Insurance Claims',
      description: 'Extraction of information from both structured and unstructured documents within automated insurance claims procesing pipelines, including document classification, OCR/LLM based extraction and asynchronous API development.',
      technologies: ['Python', 'FastAPI', 'Docker', 'OpenAI', 'LangGraph', 'Azure', 'OpenCV', 'Azure AI Vision', 'Azure Document Intelligence', 'Terraform', 'Jenkins', 'Azure App Services', 'Pydantic'],
    },
    {
      id: 4,
      title: 'Serverless Pipeline for Employee Comments Processing',
      description: 'Automated and cost-friendly analysis of employee comments, deployed in AWS, which performs comments translations, sentiment analysis, and topic modelling.',
      technologies: ['Python', 'AWS', 'HuggingFace', 'Transformers', 'AWS Bedrock', 'Anthropic LLM', 'AWS Step Functions', 'AWS SageMaker', 'AWS Lambda', 'AWS EventBridge', 'PostgreSQL', 'AWS RDS'],
    },
    {
      id: 5,
      title: 'Employee Attrition Modelling',
      description: 'Predictive modelling of of leaving employees, with main focus and data cleaning, custom algorithms for treating missing values and feature selection, and ensemble modelling',
      technologies: ['Python', 'Polars', 'Scikit-learn', 'PyTorch', 'SHAP', 'AWS SageMaker', 'AWS ECR', 'AWS Step Functions'],
    },
    {
      id: 6,
      title: 'Internal LLM-based Web Apps',
      description: "Web application development for automation of internal tasks, mainly in Data Science team and Customer Success/Experience team (e.g., chatbots, data analysis, PowerPoint preparation, Excel preparation, text summarization, report generation, etc.)",
      technologies: ['Python', 'Streamlit', 'AWS', 'Docker', 'AWS EC2', 'AWS Cognito', 'GitLab', 'Terraform', 'Poetry', 'AWS ECR', 'AWS Lambda', 'AWS Route53', 'Amazon Q', 'NGINX', 'Linux'],
    },
    {
      id: 7,
      title: 'Web Application for Skill Matching of IT Volunteers  ',
      description: 'Web application for recruiters for finding the most suitable IT volunteers for non-profit projects based on custom algorithm for skill matching.',
      githubUrl: 'https://github.com/petr-ngn/deepnote-hackathon',
      technologies: ['Python', 'Flask', 'Docker', 'GitHub Actions', 'AWS Lambda', 'JavaScript', 'HTML', 'CSS', 'SQL', 'Keboola', 'Requests', 'SciPy', 'Scikit-learn'],
    },
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
    <section id="projects" className="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Projects</h2>
          <p>Showcasing my latest work and achievements</p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="project-header">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub />
                  </a>
                )}
              </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="projects-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3>Interested in working together?</h3>
          <p>Let's discuss how I can help bring your ideas to life</p>
          <a href="#contact" className="cta-button">
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
