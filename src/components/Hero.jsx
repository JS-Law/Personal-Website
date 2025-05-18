// src/components/Hero.jsx
import React from 'react';
import '../styles/Hero.scss';



export default function Hero() {
  return (
    <section className="hero"> 
      <div className="hero__overlay">
        <h2 className="hero__welcome">
          Solving problems is my job. Creating solutions is my passion.
        </h2>
        <br></br>
        <h1 className="hero__headline">
          I'm Jeff—a self-taught developer on a journey from IT support to full-stack creation. I live for the ‘aha’ moments.
        </h1>
        <br />
        <a href="#projects" className="hero__cta">View My Work</a>
      </div>
    </section>
  );
}


// style={{ backgroundImage: `url(${heroImage})` }}
