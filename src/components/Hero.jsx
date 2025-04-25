// src/components/Hero.jsx
import React from 'react';
import '../styles/Hero.scss';
import heroImage from '../assets/hero-bg.jpg'; // or use CSS background instead



export default function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}> 
      <div className="hero__overlay">
        <h2 className="hero__welcome">Welcome</h2>
        <h1 className="hero__headline">I build modern web applications</h1>
        <a href="#projects" className="hero__cta">View My Work</a>
      </div>
    </section>
  );
}


// style={{ backgroundImage: `url(${heroImage})` }}