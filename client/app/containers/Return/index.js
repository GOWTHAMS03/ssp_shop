/*
 *
 * Review
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import ReturnOrderList from '../../components/Manager/ReturnOrderList';
import SearchResultMeta from '../../components/Manager/SearchResultMeta';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import Pagination from '../../components/Common/Pagination';

class ReturnOrder extends React.PureComponent {
  componentDidMount() {
    this.props.fetchReturnOrder();
    
  }


  render() {
    
    const {
      user,
      order,
      returnOrder,
      isLoading,
      advancedFilters,
      fetchReturnOrder,
      approveReturnOrder,
      rejectReturnOrder,
      deleteReturnOrder
    } = this.props;

   
    return (
      <div className='review-dashboard'>
        <SearchResultMeta label='Order Return' count={advancedFilters.count} />
              <ReturnOrderList
                user={user}
                order={order}
                returnOrder={returnOrder}
                approveReturnOrder={approveReturnOrder}
                rejectReturnOrder={rejectReturnOrder}
                deleteReturnOrder={deleteReturnOrder}
              />
           
      </div>
    );
  }
}

const mapStateToProps = state => {
 
  return {
    user: state.account.user,
    returnOrder: state.returnOrder.returnorder,
    isLoading: state.returnOrder.returnorder,
    advancedFilters: state.returnOrder.advancedFilters,
    order:state.order,
    returnOrderFormData:state.returnOrder.returnOrderFormData,
    returnOrderChange:state.returnOrder.returnOrderChange,
    returnOrderFormErrors:state.returnOrder.returnOrderFormErrors,
    addReturnOrder:state.returnOrder.addReturnOrder

  };
};

export default connect(mapStateToProps, actions)(ReturnOrder);
