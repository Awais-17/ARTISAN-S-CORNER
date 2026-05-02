const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Product = require('../models/Product');
const Store = require('../models/Store');
const User = require('../models/User');

const upload = require('../middleware/upload');

// @route    POST api/products
// @desc     Create a product
// @access   Private (Vendor only)
router.post('/', [auth, upload.array('images', 5)], async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'vendor') {
      return res.status(403).json({ msg: 'Only vendors can add products' });
    }

    const store = await Store.findOne({ vendor: req.user.id });
    if (!store) {
      return res.status(400).json({ msg: 'Please create a store first' });
    }

    const imageUrls = req.files ? req.files.map((file) => file.path) : [];

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      images: imageUrls,
      stock,
      vendor: req.user.id,
      store: store.id,
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/products
// @desc     Get all products
// @access   Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ date: -1 }).populate('store', ['name']);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/products/:id
// @desc     Get product by ID
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('store', ['name']);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
