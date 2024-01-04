/**
 *
 * Checkout
 *
 */

import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../Common/Button';

const Checkout = props => {
  const { authenticated, handleShopping, handleCheckout, toggleCart } = props;

  const history = useHistory();

  const handleClick = () => {
    history.push('/checkout');
    toggleCart()
  }

  return (
    <div className='easy-checkout'>
      <div className='checkout-actions'>
        <Button
          variant='primary'
          text='Continue shopping'
          onClick={() => handleShopping()}
        />
        {authenticated ? (
          <Button
            variant='primary'
            text='Place Order'
            onClick={() => handleClick()}
          />
        ) : (
          <Button
            variant='primary'
            text='Proceed To Checkout'
            onClick={() => handleCheckout()}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;
