const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Store = require('../models/Store');
const User = require('../models/User');

// @route    POST api/stores
// @desc     Create or update store profile (Become a Seller)
// @access   Private
router.post('/', auth, async (req, res) => {
  const { name, description, logo } = req.body;

  const storeFields = {};
  storeFields.vendor = req.user.id;
  if (name) storeFields.name = name;
  if (description) storeFields.description = description;
  if (logo) storeFields.logo = logo;

  try {
    let store = await Store.findOne({ vendor: req.user.id });

    if (store) {
      // Update
      store = await Store.findOneAndUpdate(
        { vendor: req.user.id },
        { $set: storeFields },
        { new: true }
      );
      return res.json(store);
    }

    // Create
    store = new Store(storeFields);
    await store.save();

    // Update User Role to vendor
    await User.findByIdAndUpdate(req.user.id, {
      role: 'vendor',
      store: store.id,
    });

    res.json(store);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/stores/me
// @desc     Get current user's store
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const store = await Store.findOne({ vendor: req.user.id }).populate(
      'vendor',
      ['name', 'email']
    );

    if (!store) {
      return res.status(400).json({ msg: 'There is no store for this user' });
    }

    res.json(store);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/stores
// @desc     Get all stores
// @access   Public
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find().populate('vendor', ['name', 'email']);
    res.json(stores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
