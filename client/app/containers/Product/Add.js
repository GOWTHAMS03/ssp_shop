/*
 *
 * Add
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddProduct from '../../components/Manager/AddProduct';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  componentDidMount() {
    this.props.fetchsizesSelect();
  }

  render() {
    const {
      history,
      user,
      productFormData,
      formErrors,
      sizes,
      productChange,
      addProduct
    } = this.props;

    return (
      <SubPage
        title='Add Product'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        <AddProduct
          user={user}
          productFormData={productFormData}
          formErrors={formErrors}
          sizes={sizes}
          productChange={productChange}
          addProduct={addProduct}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    productFormData: state.product.productFormData,
    formErrors: state.product.formErrors,
    sizes: state.size.sizesSelect
  };
};

export default connect(mapStateToProps, actions)(Add);
