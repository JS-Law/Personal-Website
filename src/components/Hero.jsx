// src/components/Hero.jsx
import React from 'react';
import '../styles/Hero.scss';
import heroImage from '../assets/hero-bg.jpg'; // or use CSS background instead



export default function Hero() {
  return (
    <section className="hero"> 
      <div className="hero__overlay">
        <h2 className="hero__welcome">Hello!</h2>
        <h1 className="hero__headline">I'm Jeff and I love to tinker. I'm currently </h1>
        <a href="#projects" className="hero__cta">View My Work</a>
      </div>
    </section>
  );
}


// style={{ backgroundImage: `url(${heroImage})` }}
