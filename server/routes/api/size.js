const express = require('express');
const router = express.Router();

// Bring in Models & Utils
const Size = require('../../models/size');
const Product = require('../../models/product');
const Merchant = require('../../models/merchant');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const store = require('../../utils/store');
const { ROLES, MERCHANT_STATUS } = require('../../constants');

router.post('/add', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const isActive = req.body.isActive;

    if (!description || !name) {
      return res
        .status(400)
        .json({ error: 'You must enter description & name.' });
    }

    const size = new Size({
      name,
      description,
      isActive
    });

    const sizeDoc = await size.save();

    res.status(200).json({
      success: true,
      message: `size has been added successfully!`,
      size: sizeDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch store sizes api
router.get('/list', async (req, res) => {
  try {
    const sizes = await Size.find({
      isActive: true
    }).populate('merchant', 'name');

    res.status(200).json({
      sizes
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch sizes api
router.get(
  '/',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      let sizes = null;

      if (req.user.merchant) {
        sizes = await Size.find({
          merchant: req.user.merchant
        }).populate('merchant', 'name');
      } else {
        sizes = await Size.find({}).populate('merchant', 'name');
      }

      res.status(200).json({
        sizes
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.get('/:id', async (req, res) => {
  try {
    const sizeId = req.params.id;

    const sizeDoc = await Size.findOne({ _id: sizeId }).populate(
      'merchant',
      '_id'
    );

    if (!sizeDoc) {
      return res.status(404).json({
        message: `Cannot find size with the id: ${sizeId}.`
      });
    }

    res.status(200).json({
      size: sizeDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get(
  '/list/select',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      let sizes = null;

      if (req.user.merchant) {
        sizes = await Size.find(
          {
            merchant: req.user.merchant
          },
          'name'
        );
      } else {
        sizes = await Size.find({}, 'name');
      }

      res.status(200).json({
        sizes
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const sizeId = req.params.id;
      const update = req.body.size;
      const query = { _id: sizeId };
      const { slug } = req.body.size;

      const foundSize = await Size.findOne({
        $or: [{ slug }]
      });

      if (foundSize && foundSize._id != sizeId) {
        return res.status(400).json({ error: 'Slug is already in use.' });
      }

      await Size.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'size has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id/active',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const sizeId = req.params.id;
      const update = req.body.size;
      const query = { _id: sizeId };

      // disable size(sizeId) products
      if (!update.isActive) {
        const products = await Product.find({ size: sizeId });
        store.disableProducts(products);
      }

      await Size.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'size has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.delete(
  '/delete/:id',
  auth,
  role.check(ROLES.Admin),
  async (req, res) => {
    try {
      const sizeId = req.params.id;
      await deactivateMerchant(sizeId);
      const size = await Size.deleteOne({ _id: sizeId });

      res.status(200).json({
        success: true,
        message: `size has been deleted successfully!`,
        size
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

const deactivateMerchant = async sizeId => {
  const sizeDoc = await Size.findOne({ _id: sizeId }).populate(
    'merchant',
    '_id'
  );
  if (!sizeDoc || !sizeDoc.merchant) return;
  const merchantId = sizeDoc.merchant._id;
  const query = { _id: merchantId };
  const update = {
    status: MERCHANT_STATUS.Waiting_Approval,
    isActive: false,
    size: null
  };
  return await Merchant.findOneAndUpdate(query, update, {
    new: true
  });
};

module.exports = router;
