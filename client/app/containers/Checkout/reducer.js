/*
 *
 * Address reducer
 *
 */

import {
  FETCH_ADDRESS,
  FETCH_ADDRESSES,
  ADDRESS_CHANGE,
  ADDRESS_EDIT_CHANGE,
  SET_ADDRESS_FORM_ERRORS,
  SET_ADDRESS_FORM_EDIT_ERRORS,
  RESET_ADDRESS,
  ADD_ADDRESS,
  REMOVE_ADDRESS,
  SET_ADDRESS_LOADING,
  ORDER_ITEMS
} from './constants';

const initialState = {

  orderitems: {}
};

const orderitemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_ITEMS:
      return {
        ...state,
        orderitems: action.payload
      };


    default:
      return state;
  }
};

export default orderitemsReducer;
