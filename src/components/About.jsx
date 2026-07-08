import React from 'react';
import { aboutData } from '../data/aboutData';
import SkillRange from './SkillRange';
import SessionStats from './SessionStats';
import { scrollToSection } from '../utils/scrollUtils';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head reveal">
          <div className="mono-label num">§ 01</div>
          <h2>
            About <em>- Me</em>
          </h2>
        </div>
        <div className="about-grid">
          <div className="mono-label reveal">Note</div>
          <div className="body reveal" style={{ '--delay': '80ms' }}>
            {aboutData.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            {aboutData.projectsLink && (
              <p>
                {aboutData.projectsLink.before}
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('projects');
                  }}
                >
                  {aboutData.projectsLink.linkText}
                </a>
                {aboutData.projectsLink.after}
              </p>
            )}
            <p>{aboutData.closing}</p>
            <div className="skills">
              <h3>{aboutData.skillsTitle}</h3>
              <SkillRange />
            </div>
          </div>
        </div>
        <SessionStats />
      </div>
    </section>
  );
};

export default About;
