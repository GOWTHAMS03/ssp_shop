const Mongoose = require('mongoose');

exports.getStoreProductsQuery = (min, max, rating) => {
  rating = Number(rating);
  max = Number(max);
  min = Number(min);

  const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
  const ratingFilter = rating
    ? { rating: { $gte: rating } }
    : { rating: { $gte: rating } };

  const matchQuery = {
    isActive: true,
    price: priceFilter.price,
    averageRating: ratingFilter.rating
  };

  const basicQuery = [
    {
      $lookup: {
        from: 'sizes',
        localField: 'size',
        foreignField: '_id',
        as: 'sizes'
      }
    },
    {
      $unwind: {
        path: '$sizes',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: {
        'size.name': '$sizes.name',
        'size._id': '$sizes._id',
        'size.isActive': '$sizes.isActive'
      }
    },
    {
      $match: {
        'size.isActive': true
      }
    },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'product',
        as: 'reviews'
      }
    },
    {
      $addFields: {
        totalRatings: { $sum: '$reviews.rating' },
        totalReviews: { $size: '$reviews' }
      }
    },
    {
      $addFields: {
        averageRating: {
          $cond: [
            { $eq: ['$totalReviews', 0] },
            0,
            { $divide: ['$totalRatings', '$totalReviews'] }
          ]
        }
      }
    },
    {
      $match: matchQuery
    },
    {
      $project: {
        sizes: 0,
        reviews: 0
      }
    }
  ];

  return basicQuery;
};

exports.getStoreProductsWishListQuery = userId => {
  const wishListQuery = [
    {
      $lookup: {
        from: 'wishlists',
        let: { product: '$_id' },
        pipeline: [
          {
            $match: {
              $and: [
                { $expr: { $eq: ['$$product', '$product'] } },
                { user: new Mongoose.Types.ObjectId(userId) }
              ]
            }
          }
        ],
        as: 'isLiked'
      }
    },
    {
      $addFields: {
        isLiked: { $arrayElemAt: ['$isLiked.isLiked', 0] }
      }
    }
  ];

  return wishListQuery;
};
