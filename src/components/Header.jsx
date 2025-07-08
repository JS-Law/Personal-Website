// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.scss';
import profilePicture from '../assets/pictureOfMe.png'
export default function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="logo-link">
          <h1 className="header__logo">Jeff Stanley</h1>
        </Link>
        <nav>
          <ul className="header__nav">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </nav>
        <img src={profilePicture} alt="A picture of a man in front of a mountain range in Italy" className="profilePicture"/>
      </div>
    </header>
  );
}
