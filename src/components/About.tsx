import React from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaCloud, FaBrain, FaCode, FaDatabase, FaRocket } from 'react-icons/fa';
import './About.css';

interface Skill {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const About: React.FC = () => {
  const skills: Skill[] = [
    {
      icon: <FaPython />,
      title: 'Python Development',
      description: 'Expert in Python programming, data science, and ML libraries'
    },
    {
      icon: <FaBrain />,
      title: 'AI & Machine Learning',
      description: 'Deep learning, predictive modeling, and LLM applications'
    },
    {
      icon: <FaCloud />,
      title: 'Cloud Computing',
      description: 'AWS, Azure, Docker, and serverless deployment'
    },
    {
      icon: <FaCode />,
      title: 'Web Development',
      description: 'Full-stack development with modern frameworks'
    },
    {
      icon: <FaDatabase />,
      title: 'Data Engineering',
      description: 'Data processing, pipelines, and database management'
    },
    {
      icon: <FaRocket />,
      title: 'DevOps & CI/CD',
      description: 'Automated deployment and infrastructure management'
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
    <section id="about" className="about">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>About Me</h2>
          <p>Get to know me better</p>
        </motion.div>

        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3>Who I Am</h3>
          <p>
            I'm an experienced ML Engineer / AI Developer / Python Developer / Data Scientist 
            with diverse experience across industries including banking, Big 4 consulting, 
            start-up, and non-profit sectors. Currently, I work as a Data Scientist / Gen AI 
            Developer at BigHub, helping enterprises leverage AI for a data-driven edge.
          </p>
          
          <p>
            I also serve as an AI Engineer Consultant at HR-tech start-up LutherOne, where I 
            provide AI expertise to deploy and integrate LLM features into products. My 
            excellence lies in Python programming, predictive modelling, deep learning, 
            cloud deployment, machine learning, web app development and AI.
          </p>

          <p>
            I'm currently finishing my 2nd Master's degree in Data & AI and work at a 
            non-profit IT organization as a Data Science and Python Mentor.
          </p>
        </motion.div>

        <motion.div
          className="about-skills"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3>Core Expertise</h3>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="skill-icon">
                  {skill.icon}
                </div>
                <h4>{skill.title}</h4>
                <p>{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="about-languages"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3>Languages & Technologies</h3>
          <div className="languages-grid">
            <div className="language-category">
              <h4>Programming Languages</h4>
              <div className="tech-tags">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">TypeScript</span>
                <span className="tech-tag">JavaScript</span>
                <span className="tech-tag">R</span>
                <span className="tech-tag">SQL</span>
                <span className="tech-tag">Bash</span>
              </div>
            </div>
            
            <div className="language-category">
              <h4>Cloud & DevOps</h4>
              <div className="tech-tags">
                <span className="tech-tag">AWS</span>
                <span className="tech-tag">Azure</span>
                <span className="tech-tag">Docker</span>
                <span className="tech-tag">Linux</span>
                <span className="tech-tag">Terraform</span>
                <span className="tech-tag">GitLab CI/CD</span>
                <span className="tech-tag">GitHub Actions</span>
              </div>
            </div>
            
            <div className="language-category">
              <h4>AI & ML</h4>
              <div className="tech-tags">
                <span className="tech-tag">Scikit-learn</span>
                <span className="tech-tag">Optuna</span>
                <span className="tech-tag">HuggingFace</span>
                <span className="tech-tag">TensorFlow</span>
                <span className="tech-tag">PyTorch</span>
                <span className="tech-tag">OpenAI</span>
                <span className="tech-tag">AWS Bedrock</span>
                <span className="tech-tag">AWS SageMaker</span>
                <span className="tech-tag">LangChain</span>
                <span className="tech-tag">LangGraph</span>
                <span className="tech-tag">Pydantic</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
