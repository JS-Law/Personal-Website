// src/components/Header.jsx
import React from 'react';
import '../styles/Header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__logo">Jeff Stanley</h1>
        <nav>
          <ul className="header__nav">
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
