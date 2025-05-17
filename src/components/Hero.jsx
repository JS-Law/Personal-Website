// src/components/Hero.jsx
import React from 'react';
import '../styles/Hero.scss';



export default function Hero() {
  return (
    <section className="hero"> 
      <div className="hero__overlay">
        <h2 className="hero__welcome">Hello!</h2>
        <br></br>
        <h1 className="hero__headline">
          I'm Jeff and <i>I love</i> solving problems. I'm currently a remote support technician who spends all his free time working on projects, learning and growing my skillsets.   
        </h1>
        <br />
        <a href="#projects" className="hero__cta">View My Work</a>
      </div>
    </section>
  );
}


// style={{ backgroundImage: `url(${heroImage})` }}
