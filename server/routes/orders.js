const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');

// @route    POST api/orders
// @desc     Create new order
// @access   Private
router.post('/', auth, async (req, res) => {
  const {
    items,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (items && items.length === 0) {
    return res.status(400).json({ msg: 'No order items' });
  } else {
    const platformFee = totalPrice * 0.05;
    const vendorPayout = totalPrice - platformFee;

    const order = new Order({
      items,
      buyer: req.user.id,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
      platformFee,
      vendorPayout,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @route    GET api/orders/:id
// @desc     Get order by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'buyer',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ msg: 'Order not found' });
  }
});

// @route    GET api/orders/myorders
// @desc     Get logged in user orders
// @access   Private
router.get('/myorders', auth, async (req, res) => {
  const orders = await Order.find({ buyer: req.user.id });
  res.json(orders);
});

module.exports = router;
