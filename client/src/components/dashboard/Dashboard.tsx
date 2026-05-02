import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BecomeSeller from './BecomeSeller';
import { Package, DollarSign, TrendingUp, Plus, Edit2, Trash2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [vendorProducts, setVendorProducts] = useState<any[]>([]);

  useEffect(() => {
    if (user?.role === 'vendor') {
      const fetchVendorProducts = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
          const filtered = res.data.filter((p: any) => p.vendor === user._id);
          setVendorProducts(filtered);
        } catch (err) {
          console.error(err);
        }
      };
      fetchVendorProducts();
    }
  }, [user]);

  if (user?.role === 'buyer') {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <BecomeSeller />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="bento-grid">
        <div className="bento-card" style={{ gridColumn: 'span 12', background: 'var(--accent)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem' }}>YOUR WORKSHOP</h2>
            <p style={{ fontWeight: 600 }}>Manage your creations and track your growth.</p>
          </div>
          <Link to="/add-product" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
            <Plus size={20} strokeWidth={3} />
            <span>NEW PRODUCT</span>
          </Link>
        </div>

        <div className="bento-card stat-bento" style={{ gridColumn: 'span 4', background: 'var(--secondary)', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <Package size={32} />
            <span style={{ fontSize: '2.5rem', fontWeight: 900 }}>{vendorProducts.length}</span>
          </div>
          <p style={{ fontWeight: 800 }}>ACTIVE PRODUCTS</p>
        </div>

        <div className="bento-card stat-bento" style={{ gridColumn: 'span 4', background: '#2ecc71' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <DollarSign size={32} />
            <span style={{ fontSize: '2.5rem', fontWeight: 900 }}>$0</span>
          </div>
          <p style={{ fontWeight: 800 }}>TOTAL EARNINGS</p>
        </div>

        <div className="bento-card stat-bento" style={{ gridColumn: 'span 4', background: 'var(--primary)', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <TrendingUp size={32} />
            <span style={{ fontSize: '2.5rem', fontWeight: 900 }}>0</span>
          </div>
          <p style={{ fontWeight: 800 }}>ORDER HISTORY</p>
        </div>

        <div className="bento-card table-bento" style={{ gridColumn: 'span 12' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textDecoration: 'underline' }}>INVENTORY</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '4px solid black' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 900 }}>PRODUCT</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 900 }}>PRICE</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 900 }}>STOCK</th>
                  <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 900 }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {vendorProducts.map((product) => (
                  <tr key={product._id} style={{ borderBottom: '2px solid black' }}>
                    <td style={{ padding: '1rem', fontWeight: 700 }}>{product.name}</td>
                    <td style={{ padding: '1rem', fontWeight: 900 }}>${product.price}</td>
                    <td style={{ padding: '1rem' }}>
                      <span className="badge" style={{ background: product.stock > 0 ? '#2ecc71' : '#ff4444' }}>
                        {product.stock} IN STOCK
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <Link to={`/edit-product/${product._id}`} className="btn" style={{ padding: '0.4rem', boxShadow: '2px 2px 0px black' }}>
                          <Edit2 size={16} />
                        </Link>
                        <button className="btn" style={{ padding: '0.4rem', background: '#ff4444', color: 'white', boxShadow: '2px 2px 0px black' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
