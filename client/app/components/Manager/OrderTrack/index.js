import React, { useState, useEffect } from 'react';
import { Col } from 'reactstrap';
import axios from 'axios';

const OrderTrack = props => {
  const { order } = props;
  const [trackingDetails, setTrackingDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderTracking = async () => {
      try {
        const response = await axios.get(`/api/orders/${order._id}/track`);
        setTrackingDetails(response.data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch order tracking details');
      }
    };

    if (order && order._id) {
      fetchOrderTracking();
    }
  }, [order]);

  return (
    <Col className='order-summary pt-3'>
      <h2>Order Track</h2>
      <p>Order ID: {order && order._id}</p>
      {error && <p>{error}</p>}
      {trackingDetails && (
         <div>
         <h2>Order Details</h2>
         <p>Order ID: {trackingDetails.orderId}</p>
         <p>Status: {trackingDetails.status}</p>
         <p>Location: {trackingDetails.location}</p>
       </div>
      )}
    </Col>
  );
};

export default OrderTrack;
