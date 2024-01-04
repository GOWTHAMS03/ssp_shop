import React, { useState } from 'react';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { storeOrder } from './actions';
import actions from '../../actions';
import CartList from '../../components/Store/CartList';
import CartSummary from '../../components/Store/CartSummary';
import { BagIcon, CloseIcon } from '../../components/Common/Icon';
import Button from '../../components/Common/Button';

const Checkout = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [couponCode, setCouponCode] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [error, setError] = useState('');

  const { authenticated, isCartOpen, cartItems, toggleCart, handleRemoveFromCart, cartTotal } = props;

  const url = 'http://localhost:3000/api';

  const handleSubmit = (event) => {
    event.preventDefault();
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.totalPrice;
    });
    axios
      .post(`${url}/coupons/apply`, { code: couponCode, totalPrice })
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
          setDiscountedPrice(0);
        } else {
          setError('');
          setDiscountedPrice(res.data.discountedPrice);
        }
      })
      .catch((err) => {
        setError('Please enter a valid coupon code.');
        setDiscountedPrice(0);
      });
  };

  const handleContinueToShipping = () => {
    if (cartItems.length > 0) {
      const total = discountedPrice > 0 ? discountedPrice : cartTotal;
      const shippingPrice = total < 500 ? 50 : 0; // Apply shipping price of 50 if total < 500, else 0
      const orderitem = { items: cartItems, total: total + shippingPrice };
      
      
      dispatch(storeOrder(orderitem));
      history.push('/shipping');
    } else {
      history.push('/shop');
    }
  };

  const total = discountedPrice > 0 ? discountedPrice : cartTotal;

  return (
    <div className="cart">
      <div className="cart-header">
        {isCartOpen && (
          <Button
            borderless
            variant="empty"
            ariaLabel="close the cart"
            icon={<CloseIcon />}
            onClick={toggleCart}
          />
        )}
      </div>
      {cartItems.length > 0 ? (
        <div className="cart-body">
          <CartList toggleCart={toggleCart} cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />
          <h2 className="my-4">Apply Coupon</h2>

          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="couponCode">Coupon Code:</label>
            <input
            className='my-4'
              type="text"
              id="couponCode"
              value={couponCode}
              onChange={(event) => setCouponCode(event.target.value)}
            />
            <br />
            <Button  type="submit" text="submit">Apply Coupon</Button>
            <br />
            <br />
          </form>
        </div>
      ) : (
        <div className="empty-cart">
          <BagIcon />
          <p>Your shopping cart is empty</p>
        </div>
      )}
      <CartSummary cartTotal={total}/>
      <div className="easy-checkout">
        <div className="checkout-actions">
          {authenticated ? (
            <Button variant="primary" text="Continue to Shipping" onClick={handleContinueToShipping} />
          ) : (
            <Button variant="primary" text="Proceed To Checkout" onClick={handleCheckout} />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isCartOpen: state.navigation.isCartOpen,
    cartItems: state.cart.cartItems,
    cartTotal: state.cart.cartTotal,
    authenticated: state.authentication.authenticated,
  };
};

export default connect(mapStateToProps, actions)(Checkout);
