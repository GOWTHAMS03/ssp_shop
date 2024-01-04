/**
 *
 * OrderPage
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import OrderDetails from '../../components/Manager/OrderDetails';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class OrderPage extends React.PureComponent {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchOrder(id);
    this.props.fetchUsers();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const id = this.props.match.params.id;
      this.props.fetchOrder(id);
    }
  }

  render() {
    const {
      history,
      order,
      returnOrder,
      user,
      users,
      isLoading,
      cancelOrder,
      updateOrderItemStatus,
      finalamount
    } = this.props;

    return (
      <div className='order-page'>
        {isLoading ? (
          <LoadingIndicator backdrop />
        ) : order._id ? (
          <OrderDetails
          returnOrder={returnOrder}
            order={order}
            finalamount={finalamount}
            user={user}
            users={users}
            cancelOrder={cancelOrder}
            updateOrderItemStatus={updateOrderItemStatus}
            onBack={() => {
              if (window.location.toString().includes('success')) {
                history.push('/dashboard/orders');
              } else {
                history.goBack();
              }
            }}
          />
        ) : (
          <NotFound message='No order found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {

  

  return {
    users: state.users.users,
    user: state.account.user,
    order: state.order.order,
    returnOrder:state.returnOrder,
    orders :state.order.orders,
    isLoading: state.order.isLoading,
    finalamount:state.order.finalamount
  };
};

export default connect(mapStateToProps, actions)(OrderPage);
