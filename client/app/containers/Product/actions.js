/*
 *
 * Product actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_PRODUCTS,
  FETCH_STORE_PRODUCTS,
  FETCH_PRODUCT,
  FETCH_STORE_PRODUCT,
  PRODUCT_CHANGE,
  PRODUCT_EDIT_CHANGE,
  PRODUCT_SHOP_CHANGE,
  SET_PRODUCT_FORM_ERRORS,
  SET_PRODUCT_FORM_EDIT_ERRORS,
  RESET_PRODUCT,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  FETCH_PRODUCTS_SELECT,
  SET_PRODUCTS_LOADING,
  SET_ADVANCED_FILTERS,
  RESET_ADVANCED_FILTERS,
  FETCH_ALL_PRODUCTS
} from './constants';

import { ROLES } from '../../constants';
import handleError from '../../utils/error';
import { formatSelectOptions, unformatSelectOptions } from '../../utils/select';
import { allFieldsValidation } from '../../utils/validation';

export const productChange = (name, value) => {
  let formData = {};
  formData[name] = value;
  return {
    type: PRODUCT_CHANGE,
    payload: formData
  };
};

export const productEditChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: PRODUCT_EDIT_CHANGE,
    payload: formData
  };
};

export const productShopChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: PRODUCT_SHOP_CHANGE,
    payload: formData
  };
};

export const resetProduct = () => {
  return async (dispatch, getState) => {
    dispatch({ type: RESET_PRODUCT });
  };
};

export const setProductLoading = value => {
  return {
    type: SET_PRODUCTS_LOADING,
    payload: value
  };
};

// fetch store products by filterProducts api
export const filterProducts = (n, v) => {
  return async (dispatch, getState) => {
    try {
      n ?? dispatch({ type: RESET_ADVANCED_FILTERS });

      dispatch(setProductLoading(true));
      const advancedFilters = getState().product.advancedFilters;
      let payload = productsFilterOrganizer(n, v, advancedFilters);
      dispatch({ type: SET_ADVANCED_FILTERS, payload });
      const sortOrder = getSortOrder(payload.order);
      payload = { ...payload, sortOrder };

      const response = await axios.get(`/api/product/list`, {
        params: {
          ...payload
        }
      });
      const { products, totalPages, currentPage, count } = response.data;

      dispatch({
        type: FETCH_STORE_PRODUCTS,
        payload: products
      });

      const newPayload = {
        ...payload,
        totalPages,
        currentPage,
        count
      };
      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: newPayload
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setProductLoading(false));
    }
  };
};

// fetch store product api
export const fetchStoreProduct = slug => {
  return async (dispatch, getState) => {
    dispatch(setProductLoading(true));


    try {
      const response = await axios.get(`/api/product/item/${slug}`);

      const inventory = response.data.product.quantity;
      const product = { ...response.data.product, inventory };

     
      dispatch({
        type: FETCH_STORE_PRODUCT,
        payload: product
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setProductLoading(false));
    }
  };
};

export const fetchsizeProducts = slug => {
  return async (dispatch, getState) => {
    try {
      dispatch(setProductLoading(true));

      const response = await axios.get(`/api/product/list/size/${slug}`);

      console.log(response,"this is response")
      

      const s = getState().product.advancedFilters;

      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: Object.assign(s, {
          pages: response.data.pages,
          pageNumber: response.data.page,
          totalProducts: response.data.totalProducts
        })
      });
      dispatch({
        type: FETCH_STORE_PRODUCTS,
        payload: response.data.products
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setProductLoading(false));
    }
  };
};

export const fetchProductsSelect = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/product/list/select`);

      const formattedProducts = formatSelectOptions(response.data.products);

      dispatch({
        type: FETCH_PRODUCTS_SELECT,
        payload: formattedProducts
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch all products api
export const fetchAllProducts = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setProductLoading(true));

      const response = await axios.get(`/api/product/allproduct`);
      

      dispatch({
        type: FETCH_ALL_PRODUCTS,
        payload: response.data.products
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setProductLoading(false));
    }
  };
};

// fetch products api
export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setProductLoading(true));

      const response = await axios.get(`/api/product`);
      

      dispatch({
        type: FETCH_PRODUCTS,
        payload: response.data.products
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setProductLoading(false));
    }
  };
};

// fetch product api
export const fetchProduct = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/product/${id}`);

      const inventory = response.data.product.quantity;

      const size = response.data.product.size;
      const issize = size ? true : false;
      const sizeData = formatSelectOptions(
        issize && [size],
        !issize,
        'fetchProduct'
      );

      response.data.product.size = sizeData[0];

      const product = { ...response.data.product, inventory };

      dispatch({
        type: FETCH_PRODUCT,
        payload: product
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// add product api
export const addProduct = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        sku: 'required|alpha_dash',
        name: 'required',
        description: 'required|max:200',
        quantity: 'required|numeric',
        price: 'required|numeric',
        taxable: 'required',
        image: 'required',
        size: 'required'
      };

      const product = getState().product.productFormData;
      const user = getState().account.user;
      const sizes = getState().size.sizesSelect;

      const size = unformatSelectOptions([product.size]);

      const newProduct = {
        sku: product.sku,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
        isActive: product.isActive,
        taxable: product.taxable.value,
        size:
          user.role !== ROLES.Merchant
            ? size != 0
              ? size
              : null
            : sizes[1].value
      };

      const { isValid, errors } = allFieldsValidation(newProduct, rules, {
        'required.sku': 'Sku is required.',
        'alpha_dash.sku':
          'Sku may have alpha-numeric characters, as well as dashes and underscores only.',
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'max.description':
          'Description may not be greater than 200 characters.',
        'required.quantity': 'Quantity is required.',
        'required.price': 'Price is required.',
        'required.taxable': 'Taxable is required.',
        'required.image': 'Please upload files with jpg, jpeg, png format.',
        'required.size': 'size is required.'
      });

      if (!isValid) {
        return dispatch({ type: SET_PRODUCT_FORM_ERRORS, payload: errors });
      }
      const formData = new FormData();
      if (newProduct.image) {
        for (const key in newProduct) {
          if (newProduct.hasOwnProperty(key)) {
            if (key === 'size' && newProduct[key] === null) {
              continue;
            } else {
              formData.set(key, newProduct[key]);
            }
          }
        }
      }

      const response = await axios.post(`/api/product/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_PRODUCT,
          payload: response.data.product
        });
        dispatch(resetProduct());
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// update Product api
export const updateProduct = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required',
        sku: 'required|alpha_dash',
        slug: 'required|alpha_dash',
        description: 'required|max:200',
        quantity: 'required|numeric',
        price: 'required|numeric',
        taxable: 'required',
        size: 'required'
      };

      const product = getState().product.product;

      const size = unformatSelectOptions([product.size]);

      const newProduct = {
        name: product.name,
        sku: product.sku,
        slug: product.slug,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        taxable: product.taxable,
        size: size != 0 ? size : null
      };

      const { isValid, errors } = allFieldsValidation(newProduct, rules, {
        'required.name': 'Name is required.',
        'required.sku': 'Sku is required.',
        'alpha_dash.sku':
          'Sku may have alpha-numeric characters, as well as dashes and underscores only.',
        'required.slug': 'Slug is required.',
        'alpha_dash.slug':
          'Slug may have alpha-numeric characters, as well as dashes and underscores only.',
        'required.description': 'Description is required.',
        'max.description':
          'Description may not be greater than 200 characters.',
        'required.quantity': 'Quantity is required.',
        'required.price': 'Price is required.',
        'required.taxable': 'Taxable is required.',
        'required.size': 'size is required.'
      });

      if (!isValid) {
        return dispatch({
          type: SET_PRODUCT_FORM_EDIT_ERRORS,
          payload: errors
        });
      }

      const response = await axios.put(`/api/product/${product._id}`, {
        product: newProduct
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

// activate product api
export const activateProduct = (id, value) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(`/api/product/${id}/active`, {
        product: {
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
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// delete product api
export const deleteProduct = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/product/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_PRODUCT,
          payload: id
        });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

const productsFilterOrganizer = (n, v, s) => {
  switch (n) {
    case 'category':
      return {
        name: s.name,
        category: v,
        size: s.size,
        min: s.min,
        max: s.max,
        rating: s.rating,
        order: s.order,
        page: s.currentPage,
        limit: s.limit
      };
    case 'size':
      return {
        name: s.name,
        category: s.category,
        size: v,
        min: s.min,
        max: s.max,
        rating: s.rating,
        order: s.order,
        page: s.currentPage,
        limit: s.limit
      };
    case 'sorting':
      return {
        name: s.name,
        category: s.category,
        size: s.size,
        min: s.min,
        max: s.max,
        rating: s.rating,
        order: v,
        page: s.currentPage,
        limit: s.limit
      };
    case 'price':
      return {
        name: s.name,
        category: s.category,
        size: s.size,
        min: v[0],
        max: v[1],
        rating: s.rating,
        order: s.order,
        page: s.currentPage,
        limit: s.limit
      };
    case 'rating':
      return {
        name: s.name,
        category: s.category,
        size: s.size,
        min: s.min,
        max: s.max,
        rating: v,
        order: s.order,
        page: s.currentPage,
        limit: s.limit
      };
    case 'pagination':
      return {
        name: s.name,
        category: s.category,
        size: s.size,
        min: s.min,
        max: s.max,
        rating: s.rating,
        order: s.order,
        page: v ?? s.currentPage,
        limit: s.limit
      };
    default:
      return {
        name: s.name,
        category: s.category,
        size: s.size,
        min: s.min,
        max: s.max,
        rating: s.rating,
        order: s.order,
        page: s.currentPage,
        limit: s.limit
      };
  }
};

const getSortOrder = value => {
  let sortOrder = {};
  switch (value) {
    case 0:
      sortOrder._id = -1;
      break;
    case 1:
      sortOrder.price = -1;
      break;
    case 2:
      sortOrder.price = 1;
      break;

    default:
      break;
  }

  return sortOrder;
};
