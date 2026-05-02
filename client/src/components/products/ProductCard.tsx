import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';

interface ProductProps {
  product: any;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="bento-card product-card-bento">
      <div className="product-image-bento">
        <img src={product.images[0] || 'https://via.placeholder.com/300'} alt={product.name} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <span className="badge" style={{ background: 'var(--accent)' }}>{product.category}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 900 }}>
            <Star size={16} fill="white" stroke="white" />
            <span>{product.ratings.toFixed(1)}</span>
          </div>
        </div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{product.name}</h3>
        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '1rem' }}>BY {product.store?.name || 'ARTISAN'}</p>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>${product.price}</span>
        <div className="btn" style={{ padding: '0.5rem', borderRadius: '50%', boxShadow: '4px 4px 0px white' }}>
          <ArrowRight size={20} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
