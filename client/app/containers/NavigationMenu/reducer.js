import { DEFAULT_ACTION, SIZECATEGORY } from './constants';

const initialState = {
  loading: false,
  productsBySize: [],
};

const navigationMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      // Handle default action if needed
      return state;
    case SIZECATEGORY:
      return {
        ...state,
        productsBySize: action.payload,
      };
    default:
      return state;
  }
};

export default navigationMenuReducer;
