import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="bento-card hero-neubrutalist">
      <div style={{ maxWidth: '600px', zIndex: 1 }}>
        <h2 style={{ fontSize: '4.5rem', lineHeight: '0.9', marginBottom: '1.5rem' }}>
          BOLDLY <br /> HANDCRAFTED.
        </h2>
        <p style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '2rem', borderLeft: '4px solid #000', paddingLeft: '1rem' }}>
          Discover raw talent and unique treasures from independent artisans. 
          Support small creators. Buy authentic.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/" className="btn btn-primary" style={{ fontSize: '1.1rem' }}>EXPLORE NOW</Link>
          <Link to="/register" className="btn" style={{ background: 'white', color: '#000' }}>START SELLING</Link>
        </div>
      </div>
      <div style={{ 
        width: '300px', 
        height: '300px', 
        background: 'var(--primary)', 
        border: '4px solid #000', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        transform: 'rotate(-5deg)',
        boxShadow: '10px 10px 0px #000'
      }}>
        <span style={{ fontSize: '4rem', fontWeight: 900, color: 'white' }}>100%</span>
      </div>
    </section>
  );
};

export default Hero;
