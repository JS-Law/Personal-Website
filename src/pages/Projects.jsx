// src/pages/Projects.jsx
import React from 'react';
import Header from '../components/Header';
import '../styles/Projects.scss';

export default function Projects() {
  // Handle iframe load event to hide loading spinner
  const handleIframeLoad = (event) => {
    const iframe = event.target;
    const previewContainer = iframe.parentElement;
    previewContainer.classList.add('loaded');
  };

  // Sample project data - you can replace this with your actual projects
  const projects = [
    {
      id: 1,
      title: 'React Documentation',
      description: 'The official React documentation - a great example of clean, modern web design and excellent user experience for developers.',
      technologies: ['React', 'Next.js', 'TypeScript'],
      liveUrl: 'https://react.dev',
      githubUrl: 'https://github.com/reactjs/react.dev',
      iframeUrl: 'https://react.dev'
    },
    {
      id: 2,
      title: 'Example Portfolio Site',
      description: 'A sample portfolio website demonstrating modern web development practices with clean design and responsive layout.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://www.w3schools.com',
      githubUrl: 'https://github.com/example/portfolio',
      iframeUrl: 'https://www.w3schools.com'
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
          {projects.map((project, index) => (
            <div 
              className="project-card" 
              key={project.id}
              style={{ '--animation-delay': `${index * 0.2}s` }}
            >
              <div className="project-card__preview">
                <iframe
                  src={project.iframeUrl}
                  title={`${project.title} preview`}
                  className="project-card__iframe"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                  onLoad={handleIframeLoad}
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
