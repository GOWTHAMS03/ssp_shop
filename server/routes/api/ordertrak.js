const axios = require('axios');
const express = require('express');
const router = express.Router();

// GET /api/orders/:orderId/track
router.get('/track', async (req, res) => {
  const { orderId } = req.params;


  try {

    axios.get(`https://api.delhivery.com/cmu/push/json/?waybill=${orderId}`, {
      headers: {
        Authorization: 'Bearer YOUR_DELHIVERY_SECRET_KEY',
        'Content-Type': 'application/json',
      },
    })
    
    const trackingDetails = response.data;
    res.json(trackingDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch order tracking details' });
  }
});

module.exports = router;
