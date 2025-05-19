// src/pages/About.jsx
import React from 'react';
import Header from '../components/Header';
import '../styles/About.scss';

export default function About() {
  const workHistory = [
    {
      id: 1,
      period: '2023 - Present',
      title: 'Software Developer',
      company: 'Tech Solutions Inc.',
      description: 'Working on full-stack web applications using React, Node.js, and MongoDB. Implemented key features that improved user engagement by 30%.',
    },
    {
      id: 2,
      period: '2020 - 2023',
      title: 'IT Support Specialist',
      company: 'Global Systems',
      description: 'Provided technical support for over 500 employees. Automated routine tasks using Python scripts which reduced resolution time by 40%.',
    },
    {
      id: 3,
      period: '2018 - 2020',
      title: 'Technical Assistant',
      company: 'Digital Networks',
      description: 'Assisted with network configuration and hardware installation. Contributed to a major system upgrade that improved performance by 25%.',
    },
  ];

  return (
    <div className="about">
      <Header />
      
      <div className="page-overlay">
        <section className="about__intro">
          <div className="about__intro-content">
            <h1 className="about__title">About Me</h1>
            <p className="about__blurb">
              I'm a passionate self-taught developer who transitioned from IT support to full-stack development. 
              With a background in technical problem-solving and a love for creating elegant solutions, 
              I bring both technical expertise and creative thinking to every project.
            </p>
            <p className="about__blurb">
              When I'm not coding, you can find me hiking in the mountains, experimenting with 
              new recipes, or diving into a good book on technology and innovation.
            </p>
          </div>
        </section>

        <section className="about__timeline-section">
          <h2 className="about__subtitle">My Journey</h2>
          <div className="timeline">
          {workHistory.map((job) => (
            <div className="timeline__item" key={job.id}>
              <div className="timeline__period">{job.period}</div>
              <div className="timeline__content">
                <h3 className="timeline__title">{job.title}</h3>
                <h4 className="timeline__company">{job.company}</h4>
                <p className="timeline__description">{job.description}</p>
              </div>
            </div>
          ))}
        </div>
        </section>
      </div>
    </div>
  );
}

