import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { loadUser } from '../../slices/authSlice';

const BecomeSeller: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const { name, description } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/stores`, formData, config);
      await dispatch(loadUser());
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err.response.data);
      alert('Error creating store');
    }
  };

  return (
    <div className="auth-container">
      <h2>Become a Seller</h2>
      <p>Set up your shop to start selling your handcrafted items.</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Shop Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Shop Description"
            name="description"
            value={description}
            onChange={onChange}
            rows={4}
            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Shop
        </button>
      </form>
    </div>
  );
};

export default BecomeSeller;
