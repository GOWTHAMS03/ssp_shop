
import { success } from 'react-notification-system-redux';
import axios from 'axios';
import DOMPurify from 'dompurify';

import {
  FETCH_ORDER_RETURN,
  ADD_ORDER_RETURN,
  REMOVE_ORDER_RETURN,
  FETCH_PRODUCT_ORDER_RETURN,
  ORDER_RETURN_CHANGE,
  SET_RETURN_LOADING,
  RESET_ORDER_RETURN,
  SET_ORDER_RETURN_FORM_ERRORS,
  SET_ADVANCED_FILTERS,
  REFUND_REQUEST,
  REFUND_SUCCESS,
  REFUND_FAILURE
} from './constants';
import handleError from '../../utils/error';
import { allFieldsValidation, santizeFields } from '../../utils/validation';


export const refundRequest = () => ({
  type: REFUND_REQUEST,
});

export const refundSuccess = () => ({
  type: REFUND_SUCCESS,
});

export const refundFailure = (error) => ({
  type: REFUND_FAILURE,
  payload: error,
});


export const returnOrderChange = (name, value) => {
  let formData = {};
  formData[name] = value;
  return {
    type: ORDER_RETURN_CHANGE,
    payload: formData
  };
};

// fetch reviews api
export const fetchReturnOrder = (n, v) => {

  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_RETURN_LOADING, payload: true });

      const response = await axios.get(`/api/returnorder`, {
        
      });

      const { returnOrder, totalPages, currentPage, count,order } = response.data;

      dispatch({ 
        type: FETCH_ORDER_RETURN, 
        payload: returnOrder,order 
      });
      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: { totalPages, currentPage, count,order }
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_RETURN_LOADING, payload: false });
    }
  };
};


export const initiateRefund = (refundAmount) => async (dispatch) => {
  dispatch(refundRequest());
  try {
    // Send the refund amount to the backend
    await axios.post('/api/refund', { refundAmount });
    dispatch(refundSuccess());
    alert('Refund request sent successfully!');
  } catch (error) {
    dispatch(refundFailure(error.message || 'Failed to initiate refund'));
    alert('Failed to send refund request. Please try again.');
  }
};

export const approveReturnOrder = returnorder => {
  return async (dispatch, getState) => {
    try {

     
      await axios.put(`/api/returnorder/approve/${returnorder._id}`);


      // const refundAmount ="100";
      // await dispatch(initiateRefund(refundAmount));
      dispatch(fetchReturnOrder());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const rejectReturnOrder = returnorder => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`/api/returnorder/reject/${returnorder._id}`);

      dispatch(fetchReturnOrder());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// delete review api
export const deleteReturnOrder = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/returnorder/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_ORDER_RETURN,
          payload: id
        });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch product reviews api

export const addReturnOrder = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        order:'required',
       
        reason: 'required',

      };

      const returnOrder = getState().returnOrder.returnOrderFormData;
      // const order = getState().order.storeProduct;
      const orderdata = getState().order.order;
      const imageUrlOfFirstProduct = orderdata.products[0].product.imageUrl;

      const newReturnOrder = {
     
        order:orderdata._id,
        returnorder:returnOrder,
        imageUrl:imageUrlOfFirstProduct,

        reason: returnOrder.reason

      };


   

      const { isValid, errors } = allFieldsValidation(newReturnOrder, rules, {
        'required.upi': 'UPI Number is required.',
        'required.reason': 'Reason is required.',

      });

      if (!isValid) {
        return dispatch({ type: SET_ORDER_RETURN_FORM_ERRORS, payload: errors });
      }

      const santizedReturnOrder = santizeFields(newReturnOrder);
      const response = await axios.post(`/api/returnorder/add`, santizedReturnOrder);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch(fetchProductReviews(product.slug));

     
        dispatch({ type: RESET_ORDER_RETURN });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

