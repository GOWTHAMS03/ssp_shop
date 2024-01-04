import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';
import actions from '../../../actions';
import Input from '../../Common/Input';
import Button from '../../Common/Button';

class AddOrderReturn extends React.PureComponent {
  state = {
    selectedProductIds: [], // To store the selected product _ids as an array
  };

  componentDidMount() {
    // this.props.order
    // You may need to fetch order data here if not already done.
  }

  render() {
    const {
      returnOrderFormData,
      returnOrderChange,
      returnOrderFormErrors,
      addReturnOrder,
      order,
    } = this.props;

    const productIds = order.products.map((product) => product.name);
   

    // Assuming 'order' is the object containing the 'products' array
    const productData = order.products;

    const handleProductSelect = (event) => {
      const { value, checked } = event.target;
      let selectedProductIds = [...this.state.selectedProductIds];

      if (checked) {
        selectedProductIds.push(value);
      } else {
        selectedProductIds = selectedProductIds.filter((id) => id !== value);
      }

      this.setState({ selectedProductIds });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      addReturnOrder();
    };

    const isOnlinePayment = order.paymentMethod === "Online Payment";

    return (
      <div className='bg-white p-4 box-shadow-primary add-review'>
        <form onSubmit={handleSubmit} noValidate>
          <h3 className='mb-3'>Order Return</h3>
          <Row>
            {isOnlinePayment ? null : (
              <Col xs='12' md='12'>
                <Input
                  type={'text'}
                  error={returnOrderFormErrors['upinumber']}
                  label={'Upinumber'}
                  name={'upinumber'}
                  placeholder={'Enter UpiNumber title'}
                  value={returnOrderFormData.upinumber}
                  onInputChange={(name, value) => {
                    returnOrderChange(name, value);
                  }}
                />
              </Col>
            )}

            <Col xs='12' md='12'>
              <Input
                type={'textarea'}
                error={returnOrderFormErrors['reason']}
                label={'Comment'}
                name={'reason'}
                placeholder={'Write Reason'}
                value={returnOrderFormData.reason}
                onInputChange={(name, value) => {
                  returnOrderChange(name, value);
                }}
              />
            </Col>
          </Row>
          <div className='mt-4'>
            <Button type='submit' text='Place Order Return' />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    returnOrder: state.returnOrder,
    isLoading: state.returnOrder.isLoading,
    advancedFilters: state.returnOrder.advancedFilters,
    returnOrderFormData: state.returnOrder.returnOrderFormData,
    returnOrderChange: state.returnOrder.returnOrderChange,
    returnOrderFormErrors: state.returnOrder.returnOrderFormErrors,
    addReturnOrder: state.returnOrder.addReturnOrder,
  };
};
export default connect(mapStateToProps, actions)(AddOrderReturn);
