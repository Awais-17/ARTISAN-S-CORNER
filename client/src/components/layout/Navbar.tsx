import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { logout } from '../../slices/authSlice';
import { ShoppingCart, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="brand">
          ARTISAN'S CORNER
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/" style={{ fontWeight: 700 }}>MARKET</Link>
          
          <Link to="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <ShoppingCart size={24} strokeWidth={2.5} />
            {items.length > 0 && (
              <span style={{ 
                position: 'absolute', 
                top: '-10px', 
                right: '-12px', 
                background: 'var(--primary)', 
                color: 'white', 
                border: '2px solid white', 
                borderRadius: '50%', 
                width: '20px', 
                height: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '0.7rem', 
                fontWeight: 900 
              }}>
                {items.length}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/dashboard" className="btn btn-accent" style={{ padding: '0.5rem 1rem' }}>
                <LayoutDashboard size={18} />
                <span>DASHBOARD</span>
              </Link>
              <button onClick={onLogout} className="btn" style={{ padding: '0.5rem' }}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" style={{ fontWeight: 700 }}>LOGIN</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>JOIN</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
