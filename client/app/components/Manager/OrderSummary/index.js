import React, { useEffect, useState } from 'react';
import { Col } from 'reactstrap';

const OrderSummary = props => {
  const { order } = props;
  const [shippingPrice, setShippingPrice] = useState(0);

  useEffect(() => {
    if (order.total < 500) {
      setShippingPrice(50);
    } else {
      setShippingPrice(0);
    }
  }, [order.total]);

  const final = order.total + shippingPrice;

  return (
    <Col className='order-summary pt-3'>
      <h2>Order Summary</h2>
      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Subtotal</p>
        <p className='summary-value ml-auto'>₹{order.total.toLocaleString()}</p>
      </div>
   

      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Shipping & Handling</p>
        <p className='summary-value ml-auto'>₹{shippingPrice.toLocaleString()}</p>
      </div>

      <hr />
      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Total</p>
        <p className='summary-value ml-auto'>₹{final.toLocaleString()}</p>
      </div>
    </Col>
  );
};

export default OrderSummary;
