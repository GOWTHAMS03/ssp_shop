/*
 *
 * Review reducer
 *
 */

import {
  FETCH_ORDER_RETURN,
  ADD_ORDER_RETURN,
  REMOVE_ORDER_RETURN,
  FETCH_PRODUCT_ORDER_RETURN,
  ORDER_RETURN_CHANGE,
  SET_RETURN_LOADING,
  RESET_ORDER_RETURN,
  SET_ORDER_RETURN_FORM_ERRORS,
  SET_ADVANCED_FILTERS
} from './constants';

const initialState = {
  returnorder: [],
  isLoading: false,
  advancedFilters: {
    totalPages: 1,
    currentPage: 1,
    count: 0
  },
//   returnOrder: [],
//   reviewsSummary: {
//     ratingSummary: [],
//     totalRatings: 0,
//     totalReviews: 0,
//     totalSummary: 0
//   },
  returnOrderFormData: {
    // order: {
    //   _id: '',
    //   cartId: '',
    //   products: [],
    //   totalTax: 0,
    //   total: 0,
    //   status: '',
    //   addressFormData:{
    //     address:'',
    //     city:'',
    //     country:'',
    //     phonenumber:'',
    //     state:'',
    //     zipCode:'',
    //   },
    //   user:''
    // },
    upinumber: '',
    reason: '',
    
  },
  returnOrderFormErrors: {},
  
};

const returnOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER_RETURN:
      return {
        ...state,
        returnorder: action.payload
      };
    case SET_ADVANCED_FILTERS:
      return {
        ...state,
        advancedFilters: {
          ...state.advancedFilters,
          ...action.payload
        }
      };
    // case FETCH_PRODUCT_ORDER_RETURN:
    //   return {
    //     ...state,
    //     productReviews: action.payload.reviews,
    //     reviewsSummary: action.payload.reviewsSummary
    //   };
    case ADD_ORDER_RETURN:
      return {
        ...state,
        returnOrder: [...state.returnorder, action.payload]
      };
    case REMOVE_ORDER_RETURN:
      const index = state.returnorder.findIndex(r => r._id === action.payload);
      return {
        ...state,
        returnorder: [
          ...state.returnorder.slice(0, index),
          ...state.returnorder.slice(index + 1)
        ]
      };
    case ORDER_RETURN_CHANGE:
      return {
        ...state,
        returnOrderFormData: {
          ...state.returnOrderFormData,
          ...action.payload
        }
      };
    case SET_RETURN_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case RESET_ORDER_RETURN:
      return {
        ...state,
        returnOrderFormData: {

          order:[],
          upinumber: '',
          reason: '',
          
         
        },
        returnOrderFormErrors: {}
      };
    case SET_ORDER_RETURN_FORM_ERRORS:
      return {
        ...state,
        returnOrderFormErrors: action.payload
      };

    default:
      return state;
  }
};

export default returnOrderReducer;
