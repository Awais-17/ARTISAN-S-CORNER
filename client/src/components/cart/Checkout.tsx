import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key');

const Checkout: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const total = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });

  return (
    <div className="checkout-container" style={{ marginTop: '2rem' }}>
      <h2>Checkout</h2>
      <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="shipping-info">
          <h3>Shipping Address</h3>
          <div className="form-group">
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={shippingAddress.address}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="City"
              name="city"
              value={shippingAddress.city}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Postal Code"
              name="postalCode"
              value={shippingAddress.postalCode}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={shippingAddress.country}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="payment-info">
          <h3>Payment</h3>
          <p>Order Total: <strong>${total.toFixed(2)}</strong></p>
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={total} shippingAddress={shippingAddress} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
