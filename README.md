# Artisan's Corner - Multi-Vendor Marketplace

Artisan's Corner is a centralized hub for unique, handcrafted items, where individual artisans can set up shop, list products, and reach customers without worrying about hosting, security, or payment processing.

## Tech Stack

- **Frontend:** React, Redux Toolkit, Axios, Lucide React, Stripe.js
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Cloud Services:** Cloudinary (Image Hosting), Stripe (Payments)

## Key Features

- **Multi-Vendor System:** Users can be Buyers, Vendors, or both.
- **Vendor Onboarding:** Standard users can "Become a Seller" by creating a Store Profile.
- **Product Management:** Vendors have a dedicated dashboard for CRUD operations on their products.
- **Image Handling:** Seamless Cloudinary integration for product images.
- **Shopping Cart:** Redux-managed shopping cart with localStorage persistence.
- **Secure Checkout:** Full Stripe integration for credit card processing.
- **Commission Logic:** Platform automatically takes a 5% cut on every sale.
- **Reviews & Ratings:** Buyers can leave feedback on products they have purchased.

## Setup Instructions

### 1. Backend Setup

1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file based on the provided template and add your credentials:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
4. Start the server: `npm start` (or `node index.js`)

### 2. Frontend Setup

1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `npm install`
3. In `src/components/cart/Checkout.tsx`, replace the placeholder Stripe publishable key with your own.
4. Start the development server: `npm run dev`

## Demo Credentials

- **Demo Vendor:**
  - Email: `vendor@demo.com`
  - Password: `password123`
- **Demo Buyer:**
  - Email: `buyer@demo.com`
  - Password: `password123`

## Project Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI Components (Auth, Cart, Dashboard, etc.)
│   │   ├── slices/      # Redux Toolkit Slices
│   │   ├── store/       # Redux Store configuration
│   │   └── App.tsx      # Main App component
├── server/              # Node.js backend
│   ├── config/          # Database & Cloudinary config
│   ├── models/          # Mongoose Schemas
│   ├── routes/          # API Endpoints
│   ├── middleware/      # Auth & Upload middleware
│   └── index.js         # Entry point
```
