import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const CartSummary = props => {
  const { cartTotal } = props;

  // Convert the cartTotal.total to a number using parseFloat()
  const totalAmount = parseFloat(cartTotal) || 0;
  const shippingCost = totalAmount >= 500 ? 0 : 50;
  const totalWithShipping = totalAmount + shippingCost;

  return (
    <div className='cart-summary'>
      <Container>
        <Row className='mb-2 d-flex justify-content-around'>
          <Col xs='9'>
   
            <p className='summary-label'>Free Shipping</p>
          </Col>
          <Col xs='3' className='text-right'>
            <p className='summary-value'>₹ {`    ${shippingCost}`}</p>
          </Col>
        </Row>
        <Row className='mb-2 d-flex justify-content-around'>
          <Col xs='9'>
            <p className='summary-label'>Total</p>
          </Col>
          <Col xs='3' className='text-right'>
            <p className='summary-value'>₹   {  `  ${totalWithShipping}`}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartSummary;
