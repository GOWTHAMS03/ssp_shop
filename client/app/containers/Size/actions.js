/*
 *
 * size actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_SIZES,
  FETCH_STORE_SIZES,
  FETCH_SIZE,
  SIZE_CHANGE,
  SIZE_EDIT_CHANGE,
  SET_SIZE_FORM_ERRORS,
  SET_SIZE_FORM_EDIT_ERRORS,
  ADD_SIZE,
  REMOVE_SIZE,
  FETCH_SIZES_SELECT,
  SET_SIZES_LOADING,
  RESET_SIZE
} from './constants';

import handleError from '../../utils/error';
import { formatSelectOptions } from '../../utils/select';
import { allFieldsValidation } from '../../utils/validation';

export const sizeChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SIZE_CHANGE,
    payload: formData
  };
};

export const sizeEditChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SIZE_EDIT_CHANGE,
    payload: formData
  };
};

// fetch store sizes api
export const fetchStoresizes = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/size/list`);

      dispatch({
        type: FETCH_STORE_SIZES,
        payload: response.data.sizes
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch sizes api
export const fetchsizes = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_SIZES_LOADING, payload: true });

      const response = await axios.get(`/api/size`);

      dispatch({
        type: FETCH_SIZES,
        payload: response.data.sizes
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_SIZES_LOADING, payload: false });
    }
  };
};

// fetch size api
export const fetchsize = sizeId => {
  return async (dispatch, getState) => {
    try {

      console.log("hiiiiiiiiiiiiiiiiiiiii")
      const response = await axios.get(`/api/size/${sizeId}`);

    

      dispatch({
        type: FETCH_SIZE,
        payload: response.data.size
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch sizes select api
export const fetchsizesSelect = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/size/list/select`);

      const formattedsizes = formatSelectOptions(response.data.sizes, true);

      dispatch({
        type: FETCH_SIZES_SELECT,
        payload: formattedsizes
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// add size api
export const addsize = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required',
        description: 'required|max:200'
      };

      const size = getState().size.sizeFormData;

      const { isValid, errors } = allFieldsValidation(size, rules, {
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'max.description': 'Description may not be greater than 200 characters.'
      });

      if (!isValid) {
        return dispatch({ type: SET_SIZE_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post(`/api/size/add`, size);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_SIZE,
          payload: response.data.size
        });

        dispatch(goBack());
        dispatch({ type: RESET_SIZE });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// update size api
export const updatesize = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required',
        slug: 'required|alpha_dash',
        description: 'required|max:200'
      };

      const size = getState().size.size;

      const newsize = {
        name: size.name,
        slug: size.slug,
        description: size.description
      };

      const { isValid, errors } = allFieldsValidation(newsize, rules, {
        'required.name': 'Name is required.',
        'required.slug': 'Slug is required.',
        'alpha_dash.slug':
          'Slug may have alpha-numeric characters, as well as dashes and underscores only.',
        'required.description': 'Description is required.',
        'max.description': 'Description may not be greater than 200 characters.'
      });

      if (!isValid) {
        return dispatch({ type: SET_SIZE_FORM_EDIT_ERRORS, payload: errors });
      }

      const response = await axios.put(`/api/size/${size._id}`, {
        size: newsize
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));

        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// activate size api
export const activatesize = (id, value) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(`/api/size/${id}/active`, {
        size: {
          isActive: value
        }
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));

        const size = getState().size.size;
        dispatch(fetchsize(size._id));
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// delete size api
export const deletesize = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/size/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_SIZE,
          payload: id
        });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
