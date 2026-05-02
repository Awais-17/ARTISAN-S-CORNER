const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Store = require('./models/Store');
const Product = require('./models/Product');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Store.deleteMany({});
    await Product.deleteMany({});

    // Create a Demo Artisan
    const artisan = new User({
      name: 'Julian Thorne',
      email: 'artisan@demo.com',
      password: 'password123', // In a real app, this should be hashed
      role: 'vendor',
    });
    // Normally we'd hash the password, but for seeding direct DB access is fine if we match the login logic later.
    // However, our login uses bcrypt.compare, so we MUST hash it here.
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    artisan.password = await bcrypt.hash('password123', salt);
    await artisan.save();

    // Create a Store
    const store = new Store({
      vendor: artisan._id,
      name: 'Thorne & Co. Handcrafted',
      description: 'Masterfully crafted leather goods and footwear with a legacy of three generations.',
    });
    await store.save();

    // Update User with store ID
    artisan.store = store._id;
    await artisan.save();

    // Products
    const products = [
      {
        name: 'Rosewood Italian Suede Derbys',
        description: 'New-generation Derbys beautifully handcrafted by 3rd generation artisans. Finished with the finest creams and gently polished to an effortlessly stylish yet durable finish.',
        price: 249.00,
        category: 'Footwear',
        images: ['https://www.louisstitch.com/cdn/shop/products/LSSXSUPLRW__1.jpg'],
        stock: 12,
        vendor: artisan._id,
        store: store._id,
        ratings: 4.8,
        numReviews: 24,
      },
      {
        name: 'Classic Black Suede Oxfords',
        description: 'Elevate your style with these classic black suede shoes, meticulously handcrafted to blend timeless elegance with modern sophistication. Perfect for formal or semi-formal occasions.',
        price: 189.00,
        category: 'Footwear',
        images: ['https://koranm.com/cdn/shop/files/NMS-046-BLACK-SUEDE_1.jpg'],
        stock: 8,
        vendor: artisan._id,
        store: store._id,
        ratings: 4.9,
        numReviews: 15,
      },
      {
        name: 'Midnight Suede Artisan Loafers',
        description: 'Crafted from the softest midnight blue suede, these loafers feature a minimalist silhouette and a cushioned sole for ultimate comfort without compromising on raw, artistic style.',
        price: 215.00,
        category: 'Footwear',
        images: ['https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop'],
        stock: 5,
        vendor: artisan._id,
        store: store._id,
        ratings: 5.0,
        numReviews: 9,
      },
      {
        name: 'Tan Heritage Suede Boots',
        description: 'Rugged yet refined, these heritage boots are built with double-stitched welts and premium tan suede that develops a beautiful patina over time.',
        price: 295.00,
        category: 'Footwear',
        images: ['https://images.unsplash.com/photo-1520639889313-7272175b1c39?q=80&w=1000&auto=format&fit=crop'],
        stock: 10,
        vendor: artisan._id,
        store: store._id,
        ratings: 4.7,
        numReviews: 32,
      }
    ];

    await Product.insertMany(products);

    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
