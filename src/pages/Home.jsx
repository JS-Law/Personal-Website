// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="home">
      <Header />
      <Hero />
    </div>
  );
}
