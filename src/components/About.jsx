import React from 'react';
import { scrollToSection } from '../utils/scrollUtils';
import { skills } from '../data/skills';
import Tag from './ui/Tag';
import Button from './ui/Button';

const About = () => {
  const handleScrollToSection = (sectionId) => {
    scrollToSection(sectionId);
  };

  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I build things when I see a need worth addressing, and I make them beautiful because I can.
            </p>
            <p>
              Full-stack developer with a passion for ML/AI integration. Always exploring new ways 
              to solve problems through elegant code and thoughtful design.
            </p>
            <p>
              I also enjoy solving problems on Codeforces and participating in algorithmic contests. 
              It's a great way to sharpen problem-solving skills and think algorithmically.
            </p>
            <div className="about-actions">
              <Button 
                variant="secondary" 
                onClick={() => handleScrollToSection('codeforces')}
              >
                View My Submissions
              </Button>
            </div>
            
            <div className="skills">
              <h3>Skills</h3>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <Tag key={index} variant="skill">{skill}</Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
