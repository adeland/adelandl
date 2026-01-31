import React from 'react';
import { experiences } from '../data/experiences';
import Card from './ui/Card';
import Tag from './ui/Tag';

const Experience = () => {
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <Card key={index} variant="experience">
              <div className="experience-header">
                <h3 className="experience-title">{exp.title}</h3>
                <div className="experience-meta">
                  <span className="company">{exp.company}{exp.location ? ` • ${exp.location}` : ''}</span>
                  <span className="period">{exp.period}</span>
                </div>
              </div>
              <p className="experience-description">{exp.description}</p>
              <div className="technologies">
                {exp.technologies.map((tech, techIndex) => (
                  <Tag key={techIndex} variant="tech">{tech}</Tag>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
