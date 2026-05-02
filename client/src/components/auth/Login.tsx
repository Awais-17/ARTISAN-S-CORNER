import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { login } from '../../slices/authSlice';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error } = useSelector((state: RootState) => state.auth);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="bento-card" style={{ maxWidth: '450px', width: '100%', padding: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '0.5rem' }}>HELLO.</h2>
        <p style={{ textAlign: 'center', fontWeight: 600, color: '#555', marginBottom: '2.5rem' }}>SIGN IN TO YOUR WORKSHOP</p>
        
        {error && <div className="error-neubrutalist">{error}</div>}
        
        <form onSubmit={onSubmit}>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>EMAIL ADDRESS</label>
            <input
              type="email"
              className="form-input"
              style={{ 
                width: '100%', 
                padding: '1rem', 
                border: '3px solid black', 
                borderRadius: '8px', 
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: '4px 4px 0px black'
              }}
              placeholder="ARTISAN@EXAMPLE.COM"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>PASSWORD</label>
            <input
              type="password"
              className="form-input"
              style={{ 
                width: '100%', 
                padding: '1rem', 
                border: '3px solid black', 
                borderRadius: '8px', 
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: '4px 4px 0px black'
              }}
              placeholder="••••••••"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem' }}>
            LET'S GO
          </button>
        </form>
        
        <div style={{ marginTop: '2rem', textAlign: 'center', fontWeight: 700 }}>
          NEW HERE? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>CREATE ACCOUNT</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
