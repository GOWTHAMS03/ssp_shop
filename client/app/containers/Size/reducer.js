/*
 *
 * size reducer
 *
 */

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
  RESET_SIZE,
  SET_SIZES_LOADING
} from './constants';

const initialState = {
  sizes: [],
  storesizes: [],
  size: {
    name: '',
    description: ''
  },
  sizesSelect: [],
  sizeFormData: {
    name: '',
    description: '',
    isActive: true
  },
  formErrors: {},
  editFormErrors: {},
  isLoading: false
};

const sizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SIZES:
      return {
        ...state,
        sizes: action.payload
      };
    case FETCH_STORE_SIZES:
      return {
        ...state,
        storesizes: action.payload
      };
    case FETCH_SIZE:
      return {
        ...state,
        size: action.payload,
        editFormErrors: {}
      };
    case FETCH_SIZES_SELECT:
      return {
        ...state,
        sizesSelect: action.payload
      };
    case ADD_SIZE:
      return {
        ...state,
        sizes: [...state.sizes, action.payload]
      };
    case REMOVE_SIZE:
      const index = state.sizes.findIndex(b => b._id === action.payload);
      return {
        ...state,
        sizes: [
          ...state.sizes.slice(0, index),
          ...state.sizes.slice(index + 1)
        ]
      };
    case SIZE_CHANGE:
      return {
        ...state,
        sizeFormData: {
          ...state.sizeFormData,
          ...action.payload
        }
      };
    case SIZE_EDIT_CHANGE:
      return {
        ...state,
        size: {
          ...state.size,
          ...action.payload
        }
      };
    case SET_SIZE_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_SIZE_FORM_EDIT_ERRORS:
      return {
        ...state,
        editFormErrors: action.payload
      };
    case SET_SIZES_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case RESET_SIZE:
      return {
        ...state,
        sizeFormData: {
          name: '',
          description: '',
          isActive: true
        },
        formErrors: {}
      };
    default:
      return state;
  }
};

export default sizeReducer;
