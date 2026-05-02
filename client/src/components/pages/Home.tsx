import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { getProducts } from '../../slices/productSlice';
import ProductCard from '../products/ProductCard';
import Hero from '../layout/Hero';
import { ArrowUpRight, Zap, Sparkles, Globe, Mail } from 'lucide-react';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="bento-grid">
        <Hero />
        
        <div className="bento-card" style={{ gridColumn: 'span 4', background: 'var(--secondary)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ background: 'rgba(255,255,255,0.2)', width: 'fit-content', padding: '0.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <Zap size={24} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>FLASH SALES</h3>
            <p style={{ fontWeight: 500 }}>Limited edition suede collections dropping this Friday. Set your alarms.</p>
          </div>
          <div style={{ alignSelf: 'flex-end', cursor: 'pointer' }}>
            <ArrowUpRight size={32} />
          </div>
        </div>
        
        <div className="bento-card" style={{ gridColumn: 'span 4', background: 'white', color: 'black' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Sparkles size={20} color="var(--primary)" />
            <span style={{ fontWeight: 900, fontSize: '0.8rem' }}>CURATED SELECTION</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>PREMIUM FOOTWEAR</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['DERBY', 'OXFORD', 'LOAFER', 'BOOTS'].map(cat => (
              <span key={cat} className="badge" style={{ background: 'var(--bg-main)', border: '2px solid black' }}>{cat}</span>
            ))}
          </div>
        </div>

        <div className="bento-card" style={{ gridColumn: 'span 4', background: 'var(--accent)', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'black', color: 'white', borderRadius: '50%', padding: '1rem', marginBottom: '1rem' }}>
            <Globe size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem' }}>GLOBAL ARTISANS</h3>
          <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Connecting you to the finest workshops worldwide.</p>
        </div>

        {loading ? (
          <div style={{ gridColumn: 'span 12', textAlign: 'center', padding: '5rem', fontWeight: 900, fontSize: '2rem' }}>
            LOADING MARKETPLACE...
          </div>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}

        <div className="bento-card" style={{ gridColumn: 'span 12', background: 'black', color: 'white', border: '3px solid white', boxShadow: '6px 6px 0px white', padding: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ maxWidth: '500px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>STAY IN THE LOOP</h2>
            <p style={{ fontWeight: 500, color: '#aaa' }}>Get exclusive early access to handcrafted drops and artisan stories.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flex: 1, maxWidth: '400px', marginLeft: '2rem' }}>
            <input 
              type="text" 
              placeholder="YOUR EMAIL" 
              style={{ flex: 1, padding: '1rem', border: '3px solid white', borderRadius: '8px', background: 'transparent', color: 'white', fontWeight: 900 }}
            />
            <button className="btn btn-primary" style={{ boxShadow: '4px 4px 0px white' }}>
              <Mail size={20} />
              JOIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
