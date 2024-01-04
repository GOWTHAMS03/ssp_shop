const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');
const addressRoutes = require('./address');
const newsletterRoutes = require('./newsletter');
const productRoutes = require('./product');
const categoryRoutes = require('./category');
const sizeRoutes = require('./size');
const contactRoutes = require('./contact');
const merchantRoutes = require('./merchant');
const cartRoutes = require('./cart');
const orderRoutes = require('./order');
const reviewRoutes = require('./review');
const wishlistRoutes = require('./wishlist');
const CouponRoutes = require('./coupon');
const ReturnRoutes = require('./return');
const OrderTrack =require('../api/ordertrak');

const { createOrder } = require('./payment');
const { payOrder } = require('./payment');
const { paymentResponse } = require('./payment');
const {refundPayment} = require('./payment');

// auth routes
router.use('/auth', authRoutes);

//order track
router.get('/orders/:orderId',OrderTrack)


//payment
router.get('/getrazorpaykey', (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

router.post('/createorder', createOrder);
router.post('/payorder', payOrder);
router.get('/payres', paymentResponse);
router.post('/refund', refundPayment);

// user routes
router.use('/user', userRoutes);

// coupon routes
router.use('/coupons', CouponRoutes);

// retunr routes
router.use('/returnorder', ReturnRoutes);

// address routes
router.use('/address', addressRoutes);

// newsletter routes
router.use('/newsletter', newsletterRoutes);

// product routes
router.use('/product', productRoutes);

// category routes
router.use('/category', categoryRoutes);

// size routes
router.use('/size', sizeRoutes);

// contact routes
router.use('/contact', contactRoutes);

// merchant routes
router.use('/merchant', merchantRoutes);

// cart routes
router.use('/cart', cartRoutes);

// order routes
router.use('/order', orderRoutes);

// Review routes
router.use('/review', reviewRoutes);

// Wishlist routes
router.use('/wishlist', wishlistRoutes);

module.exports = router;