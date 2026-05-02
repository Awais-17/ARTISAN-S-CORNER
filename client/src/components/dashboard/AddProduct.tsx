import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const { name, description, price, category, stock } = formData;
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const productData = new FormData();
    productData.append('name', name);
    productData.append('description', description);
    productData.append('price', price);
    productData.append('category', category);
    productData.append('stock', stock);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        productData.append('images', images[i]);
      }
    }

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/products`, productData, config);
      setLoading(false);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err.response.data);
      alert('Error adding product');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Add New Product</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Product Name" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <textarea placeholder="Description" name="description" value={description} onChange={onChange} rows={4} style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} required />
        </div>
        <div className="form-group">
          <input type="number" placeholder="Price" name="price" value={price} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Category" name="category" value={category} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="number" placeholder="Stock" name="stock" value={stock} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Product Images</label>
          <input type="file" multiple onChange={onFileChange} accept="image/*" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
