const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const OrderReturn = require('../../models/return');
const Order = require('../../models/order');
const auth = require('../../middleware/auth');
const { RETURNORDER_STATUS } = require('../../constants');

router.post('/add', auth, async (req, res) => {
  try {

    
    const user = req.user;

    const returnOrder = new OrderReturn({
      ...req.body,
      user: user._id,
      imageUrl:req.body.imageUrl
    });

    const returnOrderDoc = await returnOrder.save();

    res.status(200).json({
      success: true,
      message: `Your order return has been added successfully and will appear when approved!`,
      returnOrder: returnOrderDoc
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


// fetch all return api
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const returnOrder = await OrderReturn.find()
      .sort('-created')
      .populate({
        path: 'user',
        select: 'firstName'
      })
      .populate({
        path: 'product',
        select: 'name slug imageUrl'
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

      
    // Extract the order IDs from each OrderReturn
    const arrayOfOrderIds = returnOrder.map(order => order.order);

    // Fetch the corresponding Order items based on the extracted IDs
    const order = await Order.find({ _id: { $in: arrayOfOrderIds } });

    // Map the order items to an array to select only the necessary fields
    const mappedOrders = order.map(orderItem => ({
      _id: orderItem._id,
      // Add other necessary fields from the 'Order' model
      // For example: name, slug, imageUrl, etc.
    }));

    const count = await OrderReturn.countDocuments();

    res.status(200).json({
      returnOrder,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      count,
      order: mappedOrders // Send the mapped order array
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


router.get('/:slug', async (req, res) => {
  try {
    const OrderDoc = await Order.findOne({ slug: req.params.slug });


    res.status(200).json({
      OrderDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


// approve review
router.put('/approve/:orderReturnId', auth, async (req, res) => {
  try {
    const orderReturnId = req.params.orderReturnId;

    const query = { _id: orderReturnId };
    const update = {
      status: RETURNORDER_STATUS.Approved,
      isActive: true
    };

    await OrderReturn.findOneAndUpdate(query, update, {
      new: true
    });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// reject review
router.put('/reject/:orderReturnId', auth, async (req, res) => {
  try {
    const orderReturnId = req.params.orderReturnId;

    const query = { _id: orderReturnId };
    const update = {
      status: RETURNORDER_STATUS.Rejected
    };

    await OrderReturn.findOneAndUpdate(query, update, {
      new: true
    });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const orderReturn = await OrderReturn.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: `order return has been deleted successfully!`,
      orderReturn
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

module.exports = router;
