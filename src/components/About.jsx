import React from 'react';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a passionate developer and data scientist with a strong foundation in 
              building modern web applications and machine learning solutions. I love 
              exploring new technologies and creating impactful projects that solve 
              real-world problems.
            </p>
            <p>
              With expertise in full-stack development, data analysis, and machine learning, 
              I'm always eager to take on new challenges and learn from every project.
            </p>
            <div className="skills">
              <h3>Skills</h3>
              <div className="skills-grid">
                <span className="skill-tag">React</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">Machine Learning</span>
                <span className="skill-tag">Data Analysis</span>
                <span className="skill-tag">Git</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
