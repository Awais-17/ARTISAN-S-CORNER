import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { getProduct } from '../../slices/productSlice';
import { addToCart } from '../../slices/cartSlice';
import { ShoppingCart } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { product, loading } = useSelector((state: RootState) => state.product);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);

  const onAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          quantity,
          stock: product.stock,
          vendor: product.vendor,
        })
      );
      navigate('/cart');
    }
  };

  if (loading || !product) return <div>Loading...</div>;

  return (
    <div className="product-detail" style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
      <div className="product-image" style={{ flex: 1 }}>
        <img
          src={product.images[0] || 'https://via.placeholder.com/400'}
          alt={product.name}
          style={{ width: '100%', borderRadius: '5px' }}
        />
      </div>
      <div className="product-info" style={{ flex: 1 }}>
        <h2>{product.name}</h2>
        <p style={{ color: '#777', marginBottom: '1rem' }}>Store: {product.store?.name}</p>
        <p className="price" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4a90e2' }}>
          ${product.price}
        </p>
        <p style={{ margin: '1rem 0' }}>{product.description}</p>
        <p>Category: {product.category}</p>
        <p>Status: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>

        {product.stock > 0 && (
          <div className="add-to-cart" style={{ marginTop: '2rem' }}>
            <div className="quantity" style={{ marginBottom: '1rem' }}>
              <label>Quantity: </label>
              <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {[...Array(product.stock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={onAddToCart} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        )}

        <div className="reviews" style={{ marginTop: '3rem' }}>
          <h3>Reviews</h3>
          {product.numReviews === 0 && <p>No reviews yet</p>}
          {/* Review list and form would go here */}
          <p>Rating: {product.ratings.toFixed(1)} / 5 ({product.numReviews} reviews)</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
