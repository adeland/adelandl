import React from 'react';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">about me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              i'm a passionate developer and data scientist with a strong foundation in 
              building modern web applications and machine learning solutions. i love 
              exploring new technologies and creating impactful projects that solve 
              real-world problems.
            </p>
            <p>
              with expertise in full-stack development, data analysis, and machine learning, 
              i'm always eager to take on new challenges and learn from every project.
            </p>
            <div className="skills">
              <h3>skills</h3>
              <div className="skills-grid">
                <span className="skill-tag">react</span>
                <span className="skill-tag">javascript</span>
                <span className="skill-tag">python</span>
                <span className="skill-tag">node.js</span>
                <span className="skill-tag">sql</span>
                <span className="skill-tag">machine learning</span>
                <span className="skill-tag">data analysis</span>
                <span className="skill-tag">git</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
