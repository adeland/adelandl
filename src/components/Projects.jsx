import React from 'react';
import { projects } from '../data/projects';
import ProjectHand from './ProjectHand';

const Projects = () => (
  <section id="projects" className="section">
    <div className="container">
      <div className="section-head reveal">
        <div className="mono-label num">§ 03</div>
        <h2>
          Projects <em>- The Hand</em>
        </h2>
      </div>
      <ProjectHand projects={projects} />
    </div>
  </section>
);

export default Projects;
