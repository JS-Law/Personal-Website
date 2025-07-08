// src/pages/Projects.jsx
import React from 'react';
import Header from '../components/Header';
import '../styles/Projects.scss';

export default function Projects() {
  // Sample project data - you can replace this with your actual projects
  const projects = [
    {
      id: 1,
      title: 'Example Project 1',
      description: 'A brief description of this project and what it accomplishes. This is a placeholder that you can replace with your actual project details.',
      technologies: ['React', 'Node.js', 'CSS'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/project1',
      iframeUrl: 'https://example.com'
    },
    {
      id: 2,
      title: 'Example Project 2',
      description: 'Another project description showcasing different technologies and approaches. This demonstrates the card layout structure.',
      technologies: ['JavaScript', 'HTML', 'Sass'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/project2',
      iframeUrl: 'https://example.com'
    }
  ];

  return (
    <div className="projects">
      <Header />
      
      <div className="page-overlay">
        <div className="projects__header">
          <h1 className="projects__title">My Projects</h1>
          <p className="projects__description">
            A collection of projects I've built, showcasing my skills in web development and problem-solving.
          </p>
        </div>
        
        <div className="projects__grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-card__preview">
                <iframe
                  src={project.iframeUrl}
                  title={`${project.title} preview`}
                  className="project-card__iframe"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
              
              <div className="project-card__content">
                <h2 className="project-card__title">{project.title}</h2>
                <p className="project-card__description">{project.description}</p>
                
                <div className="project-card__technologies">
                  {project.technologies.map((tech, index) => (
                    <span className="tech-tag" key={index}>{tech}</span>
                  ))}
                </div>
                
                <div className="project-card__links">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link project-link--live"
                  >
                    View Live
                  </a>
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link project-link--github"
                  >
                    View Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
