import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { clearCart } from '../../slices/cartSlice';
import { useNavigate } from 'react-router-dom';

interface CheckoutFormProps {
  amount: number;
  shippingAddress: any;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount, shippingAddress }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);

  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const { data: { clientSecret } } = await axios.post(
        `${import.meta.env.VITE_API_URL}/stripe/create-payment-intent`,
        { amount },
        { headers: { 'x-auth-token': token } }
      );

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true);

        // Create Order
        const orderData = {
          items: items.map((item) => ({
            product: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            vendor: item.vendor,
          })),
          shippingAddress,
          paymentMethod: 'Stripe',
          taxPrice: 0,
          shippingPrice: 0,
          totalPrice: amount,
        };

        await axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderData, {
          headers: { 'x-auth-token': token },
        });

        dispatch(clearCart());
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      <button
        disabled={processing || succeeded || !stripe}
        className="btn btn-primary"
        style={{ width: '100%', marginTop: '2rem' }}
      >
        {processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
