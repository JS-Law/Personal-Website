import React from 'react';
import '../styles/Hero.scss';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__container">
        <h1 className="hero__title">
            Hi, I'm Jeff. I build clean, interactive web experiences.
            </h1>
        <p className="hero__subtitle">
          Frontend developer & writer — passionate about simplicity, speed, and storytelling.
        </p>
        <button className="hero__button">
            View Projects
            </button>
      </div>
    </section>
  );
}
