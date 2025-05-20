// src/pages/About.jsx
import React from 'react';
import Header from '../components/Header';
import '../styles/About.scss';

export default function About() {
  const workHistory = [
    {
      id: 1,
      period: '2023 - Present',
      title: 'Remote Support Technician',
      company: 'Integrity Systems & Solutions, LLC',
      description: 'Deliver remote support in a healthcare environment with a focus on system administration and automation. Manage Active Directory, troubleshoot network and application issues, and perform routine maintenance across Windows-based infrastructure. Develop and deploy PowerShell scripts to automate tasks, reduce response time, and improve consistency. Built a Grafana dashboard to monitor system health and surface key operational metrics. Maintain detailed documentation to support process continuity and team efficiency. Blend proactive monitoring with reactive support to ensure uptime and service reliability.',
    },
    {
      id: 2,
      period: '2017 - 2023',
      title: 'Gate Technician/IT Support',
      company: 'Global Systems',
      description: 'Led on-site preparation and installation of gate operator systems, ensuring safety compliance and coordination with contractors across high-volume projects. Oversaw logistics, wiring, and system configuration to support efficient, code-compliant deployments. Gained hands-on expertise in low-voltage wiring and entrapment safety systems through proactive, self-guided learning. Also provided T1 support for internal employees during downtime.',
    },
    {
      id: 3,
      period: '2013 - 2017',
      title: 'Advanced Repair Agent',
      company: 'Geek Squad',
      description: 'Resolved computer hardware and software, printing, installation, word processing, email and operating system issues. Ensured network, system and data availability and integrity through preventative maintenance and upgrades.',
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
              I'm a passionate self-taught developer who aspires to transition from IT support to full-stack development. 
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

