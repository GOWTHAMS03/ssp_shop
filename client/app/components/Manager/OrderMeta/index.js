import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { CART_ITEM_STATUS } from '../../../constants';
import { formatDate } from '../../../utils/date';
import Button from '../../Common/Button';
import { ArrowBackIcon } from '../../Common/Icon';
import AddOrderReturn from '../../../components/Store/ReturnOrder';

const OrderMeta = (props) => {
  const { order, cancelOrder, users, onBack, addresses,returnOrder } = props;
  const [showReturnComponent, setShowReturnComponent] = useState(false);


  const renderMetaAction = () => {
    const isNotDelivered =
      order.products.filter((i) => i.status === CART_ITEM_STATUS.Delivered)
        .length < 1;

    if (isNotDelivered) {
      return (
        <Button size='sm' text='Cancel Order' onClick={cancelOrder} />
      );
    } else {
      return (
        <Button
          size='sm'
          text='Return'
          onClick={() => setShowReturnComponent(true)}
        />
      );
    }
  };

  return (
    <div className='order-meta'>
      <div className='d-flex align-items-center justify-content-between mb-3 title'>
        <h2 className='mb-0'>Order Details</h2>
        <Button
          variant='link'
          icon={<ArrowBackIcon />}
          size='sm'
          text='Back to orders'
          onClick={onBack}
        ></Button>
      </div>

      <Row>
        <Col xs='12' md='8'>
          <Row>
           
            <Col xs='8'>
              <span className='order-label one-line-ellipsis'>{order.reasonForReturn}</span>
            </Col>
          </Row>
          <Row>
            <Col xs='4'>
              <p className='one-line-ellipsis'>Order Date</p>
            </Col>
            <Col xs='8'>
              <span className='order-label one-line-ellipsis'>{` ${formatDate(order.created)}`}</span>
            </Col>
            
          </Row>
          <Row>
            <Col xs='4'>
              <p className='one-line-ellipsis'>Order Address</p>
            </Col>
            <Col xs='8'>
              <span className='order-label one-line-ellipsis'>{` ${order.addressFormData.address}, `}</span>
         
              <span className='order-label one-line-ellipsis'>{`${order.addressFormData.city}, ${order.addressFormData.state}, ${order.addressFormData.zipCode}, ${order.addressFormData.country}`}</span>
            </Col>
          </Row>
          <Row>
          <Col xs='4'>
              <p className='one-line-ellipsis'>Phone Number</p>
            </Col>
            <Col xs='8'>
            <span className='order-label one-line-ellipsis'>{`${order.addressFormData.phonenumber}`}</span>
            </Col>
          </Row>
          <Row>
            <Col xs='4'>
              <p className='one-line-ellipsis'>Customer Name</p>
            </Col>
            <Col xs='8'>
              <span className='order-label one-line-ellipsis'>{order.userName}</span>
            </Col>
          </Row>
          <Row>
            <Col xs='4'>
              <p className='one-line-ellipsis'>Payment Method</p>
            </Col>
            <Col xs='8'>
              <span className='order-label one-line-ellipsis'>{order.paymentMethod}</span>
            </Col>
          </Row>
        </Col>
        <Col xs='12' md='4' className='text-left text-md-right'>
          {renderMetaAction()}
        </Col>
      </Row>

      {/* Show return component only when the button is clicked */}
      {showReturnComponent && <AddOrderReturn order={order} />}
    </div>
  );
};

export default OrderMeta;