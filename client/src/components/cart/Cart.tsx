import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { removeFromCart } from '../../slices/cartSlice';
import { Trash2 } from 'lucide-react';

const Cart: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const total = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

  const onCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=checkout');
    }
  };

  return (
    <div className="cart-container" style={{ marginTop: '2rem' }}>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/">Go back to marketplace</Link>
        </p>
      ) : (
        <div className="cart-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          <div className="cart-items">
            {items.map((item: any) => (
              <div
                key={item.id}
                className="cart-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  background: '#fff',
                  padding: '1rem',
                  borderRadius: '5px',
                  marginBottom: '1rem',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                }}
              >
                <img
                  src={item.image || 'https://via.placeholder.com/80'}
                  alt={item.name}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }}
                />
                <div style={{ flex: 1 }}>
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>
                <div>
                  <p>Qty: {item.quantity}</p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary" style={{ background: '#fff', padding: '1.5rem', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', height: 'fit-content' }}>
            <h3>Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button onClick={onCheckout} className="btn btn-primary" style={{ width: '100%' }}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
