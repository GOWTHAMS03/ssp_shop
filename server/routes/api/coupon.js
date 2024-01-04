const express = require('express');
const router = express.Router();
const Coupon = require('../../models/cupon');




// Route handler for GET /coupons
// router.get('/', (req, res) => {
//   res.json(coupons);
// });

// GET all coupons
router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// Apply a coupon to a total price and return the discounted price
router.post('/apply', async (req, res, next) => {

  try {
    const code = req.body.code;
    const totalPrice = req.body.totalPrice;
    const coupon = await Coupon.findOne({ code });
    if (!coupon) {
      return res.status(400).json({ error: 'Invalid coupon code' });
    }
    const discount = coupon.discount;
    const discountedPrice = totalPrice * (1 - discount / 100);
    return res.status(200).json({ discountedPrice });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});


// Create a new coupon
router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const coupon = await Coupon.create(data);
    return res.status(201).json({ coupon });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create coupon' });
  }
});

// Update a coupon by ID
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const coupon = await Coupon.findByIdAndUpdate(id, data, { new: true });
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    return res.status(200).json({ coupon });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to update coupon' });
  }
});

// Delete a coupon by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    return res.status(200).json({ message: 'Coupon deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to delete coupon' });
  }
});

module.exports = router;
