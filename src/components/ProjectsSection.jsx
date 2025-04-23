import React from 'react';
import SparkBytesImage from '../images/SparkBytes.png';
import CrimeMapperImage from '../images/CrimeMapper.png';
import DataScienceImage from '../images/DataScience.png';

const projects = [
  {
    title: "Spark Bytes",
    description: "Spark Bytes is a web application designed for Boston University students and faculty to post events that offer free food or snacks. The goal is to minimize food waste by making surplus food from events more accessible to the BU community. This initiative not only helps students find free food but also promotes sustainability by reducing the waste generated from over-purchasing food for campus events.",
    link: "https://github.com/Shangmin-Chen/Spark-Bytes",
    image: SparkBytesImage
  },
  {
    title: "Crime Mapper Boston",
    description: "\"CrimeMapper\" is an interactive tool that maps and analyzes Boston crime data, using a Prophet-based AI model to forecast trends with yearly and weekly seasonality from Boston.gov data. Built with Python and Streamlit, it provides actionable insights for resource allocation.",
    link: "https://github.com/Shangmin-Chen/CrimeMapper-Boston",
    image: CrimeMapperImage
  },
  {
    title: "Project 3",
    description: "A brief description of Project 3.",
    link: "https://github.com/your-username/project-3",
    image: null // No image available
  },
  {
    title: "Data Science Portfolio",
    description: "Explore a collection of my data science and machine learning projects, including assignments and interactive visualizations.",
    link: "/#/data-science-portfolio",
    image: DataScienceImage
  }
];

const ProjectsSection = () => {
  return (
    <section className="projects-section" id="projects">
      <h2>Projects</h2>
      <p>Check out some of my work below:</p>
      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <div className="media-placeholder">
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title} 
                />
              ) : (
                <span>*image*</span>
              )}
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">Visit this project</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
