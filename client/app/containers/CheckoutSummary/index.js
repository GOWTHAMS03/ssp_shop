import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import Button from '../../components/Common/Button';
import actions from '../../actions';
import Payment from '../Payment';

const Checkout = (props) => {
  const { addressFormData, cartItems, placeOrder, orderitems,cartTotal } = props;
  const [showPayment, setShowPayment] = useState(false); // State to control Payment component visibility

  const [shippingPrice, setShippingPrice] = useState(0);
  const history = useHistory();
 
  useEffect(() => {
    if (!orderitems || !orderitems.items || orderitems.items.length === 0) {
      history.push('/checkout');
    }
  }, [orderitems, history]);

  useEffect(() => {
    if (cartTotal < 500) {
      setShippingPrice(50);
    } else {
      setShippingPrice(0);
    }
  }, [cartTotal]);

  let finalamount=cartTotal + shippingPrice;


  const renderOrderDetails = (item) => {
    if (item) {
      return (
        <div key={item._id}>
          {/* Add the 'item-image-container' class for fixed-size container */}
          <div className='item-image-container '>
            <img className='item-image' src={item.imageUrl[0]} alt={item.name} />
          </div>
        </div>
      );
    } else {
      return (
        <div className='item-image-container'>
          <img className='item-image' src='/images/placeholder-image.png' alt='Placeholder' />
        </div>
      );
    }
  };

  const handlePaymentButtonClick = () => {
    // Show the Payment component when the button is clicked
    setShowPayment(true);
  };

  return (
    <div>
      <div>
        <h2>Checkout Summary</h2>
        <p>Shipping Address:</p>
        <p>{addressFormData.address}</p>
        <p>
          {addressFormData.city}, {addressFormData.state} {addressFormData.zipCode}
        </p>
        <p>{addressFormData.phonenumber}</p>
        <p>{addressFormData.country}</p>
      </div>

      <div className='checkoutsum-list '>

        {cartItems.map((item, index) => (

          <div key={index} className='checkoutsum-box flex '>
            <div className='d-block box-link'>
              <div className='d-flex flex-column flex-lg-row mb-3' >

                <div className='checkoutsum-first-item p-lg-3'>

                  {renderOrderDetails(item)}
                </div>

                <div className='d-flex flex-column flex-xl-row justify-content-between flex-1 ml-lg-2 mr-xl-4 p-3'>
                  <div className='checkoutsum-details'>

                    <div className='mb-1'>
                      <span>Order Id : </span>
                      <span className='order-label'>{item._id}</span>
                    </div>
                    <div className='mb-1'>
                      <span>Order Name : </span>
                      <span className='order-label'>{item.name}</span>
                    </div>
                    <div className='mb-1'>
                      <span>Order Total : </span>
                      <span className='order-label'>₹{`  ${item.totalPrice}`}</span>
                    </div>
                    <div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>

      <div className='cart-summary'>
      <Container>
        <Row className='mb-2 d-flex justify-content-around'>
          <Col xs='9'>
            <p className='summary-label'>Free Shipping</p>
          </Col>
          <Col xs='3' className='text-right'>
          <p className='summary-value'>₹{`  ${shippingPrice}`}</p>
          </Col>
        </Row>
        <Row className='mb-2 d-flex justify-content-around'>
          <Col xs='9'>
            <p className='summary-label'>Total</p>
          </Col>
          <Col xs='3' className='text-right'>
          <p className='summary-value'>₹{` ${finalamount}`}</p>
          </Col>
        </Row>
      </Container>
    </div>
      <div className='d-flex justify-content-center'>
        
        {/* Create the button and attach the click event handler */}
        {!showPayment && (
          <Button text="Proceed to Payment" onClick={handlePaymentButtonClick} />
        )}
         </div>

      <div>
      {showPayment && (
        <div className='parent-container'>
          
          <Payment
            addressFormData={addressFormData}
            cartItems={cartItems}
            placeOrder={placeOrder}
            finalamount={finalamount}
            orderitems={orderitems}
          />
          
        </div>
      )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {

  return {
    addressFormData: state.address.addressFormData,
    cartItems: state.cart.cartItems,
    orderitems: state.orderitem.orderitems,
    cartTotal: state.cart.cartTotal,
  };
};

export default connect(mapStateToProps, actions)(Checkout);