import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: "Project Alpha",
      description: "A full-stack web application that helps users manage their daily tasks efficiently. Built with modern technologies and responsive design.",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/username/project-alpha",
      demo: "https://project-alpha-demo.com"
    },
    {
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for analyzing and visualizing complex datasets. Features real-time updates and customizable charts.",
      technologies: ["Python", "D3.js", "Flask", "PostgreSQL"],
      github: "https://github.com/username/data-dashboard",
      demo: "https://data-dashboard-demo.com"
    },
    {
      title: "Machine Learning Model",
      description: "Predictive model for customer behavior analysis. Achieved 85% accuracy in predictions and helped improve business decisions.",
      technologies: ["Python", "Scikit-learn", "Pandas", "Jupyter"],
      github: "https://github.com/username/ml-model",
      demo: null
    }
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                  github
                </a>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                    live demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
