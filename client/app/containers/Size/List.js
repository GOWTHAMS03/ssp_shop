/*
 *
 * List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';
import { ROLES } from '../../constants';

import SizeList from '../../components/Manager/SizeList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchsizes();
  }

  render() {
    const { history, sizes, isLoading, user } = this.props;

    return (
      <>
        <SubPage
          title={user.role === ROLES.Admin ? 'sizes' : 'size'}
          actionTitle={user.role === ROLES.Admin && 'Add'}
          handleAction={() => history.push('/dashboard/size/add')}
        >
          {isLoading ? (
            <LoadingIndicator inline />
          ) : sizes.length > 0 ? (
            <SizeList sizes={sizes} user={user} />
          ) : (
            <NotFound message='No sizes found.' />
          )}
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    sizes: state.size.sizes,
    isLoading: state.size.isLoading,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(List);
