/*
 *
 * NavigationMenu actions
 *
 */
import handleError from '../../utils/error';
import { DEFAULT_ACTION,SIZECATEGORY } from './constants';

export const defaultAction = () => {
  return {
    type: DEFAULT_ACTION
  };
};


const fetchProductsBySize = (category, size) => {
  return async (dispatch) => {
    try {

      // Make the API call to fetch products based on category and size
      const response = await fetch(`/api/category/${category}/${size}`);
      const data = await response.json();

      const product =data.categoryandsize;

  

      // Dispatch the success action with the retrieved products
      dispatch({
        type: SIZECATEGORY,
        payload: product
      });
    } catch (error) {
      handleError(error);
    }
  };
};

// Reducer
const initialState = {
  products: [],
  error: null
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIZECATEGORY:
      return {
        ...state,
        products: action.payload,
        error: action.error
      };
    default:
      return state;
  }
};

export { fetchProductsBySize, productReducer };