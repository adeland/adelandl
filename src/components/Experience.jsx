import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: "Software Developer",
      company: "Company Name",
      period: "2023 - Present",
      description: "Developed and maintained web applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      technologies: ["React", "Node.js", "Python", "AWS"]
    },
    {
      title: "Data Science Intern",
      company: "Tech Company",
      period: "2022 - 2023",
      description: "Analyzed large datasets and built machine learning models to extract actionable insights. Created data visualizations and reports for stakeholders.",
      technologies: ["Python", "Pandas", "Scikit-learn", "Tableau"]
    },
    {
      title: "Web Development Intern",
      company: "Startup Inc",
      period: "2021 - 2022",
      description: "Built responsive web applications and contributed to the development of user-facing features. Gained experience in agile development practices.",
      technologies: ["JavaScript", "React", "CSS", "Git"]
    }
  ];

  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">experience</h2>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h3 className="experience-title">{exp.title}</h3>
                <div className="experience-meta">
                  <span className="company">{exp.company}</span>
                  <span className="period">{exp.period}</span>
                </div>
              </div>
              <p className="experience-description">{exp.description}</p>
              <div className="technologies">
                {exp.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
