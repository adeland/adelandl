import React from 'react';
import SparkBytesImage from '../images/SparkBytes.png';
import CrimeMapperImage from '../images/CrimeMapper.png';

const ProjectsSection = () => {
  return (
    <section className="projects-section" id="projects">
      <h2>Projects</h2>
      <p>Check out some of my work below:</p>
      <div className="projects-list">
        <div className="project-item">
          <div className="media-wrapper">
            <img src={SparkBytesImage} alt="Spark Bytes" />
          </div>
          <div className="project-content">
            <h3>Spark Bytes</h3>
            <p>Spark Bytes is a web application designed for Boston University students and faculty to post events that offer free food or snacks. The goal is to minimize food waste by making surplus food from events more accessible to the BU community. This initiative not only helps students find free food but also promotes sustainability by reducing the waste generated from over-purchasing food for campus events.</p>
            <a href="https://github.com/Shangmin-Chen/Spark-Bytes" target="_blank" rel="noopener noreferrer">Visit this project</a>
          </div>
        </div>
        <div className="project-item">
          <div className="media-wrapper">
            <img src={CrimeMapperImage} alt="Crime Mapper" />
          </div>
          <div className="project-content">
            <h3>Crime Mapper Boston</h3>
            <p>"CrimeMapper" is an interactive tool that maps and analyzes Boston crime data, using a Prophet-based AI model to forecast trends with yearly and weekly seasonality from Boston.gov data. Built with Python and Streamlit, it provides actionable insights for resource allocation.</p>
            <a href="https://github.com/Shangmin-Chen/CrimeMapper-Boston" target="_blank" rel="noopener noreferrer">Visit this project</a>
          </div>
        </div>
        <div className="project-item">
          <div className="media-wrapper">
            <span>*image*</span>
          </div>
          <div className="project-content">
            <h3>Project 3</h3>
            <p>A brief description of Project 3.</p>
            <a href="https://github.com/your-username/project-3" target="_blank" rel="noopener noreferrer">Visit this project</a>
          </div>
        </div>
        {/* ...existing project items... */}
      </div>
    </section>
  );
};

export default ProjectsSection;
