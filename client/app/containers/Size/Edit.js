/*
 *
 * Edit
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import EditSize from '../../components/Manager/EditSize';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

class Edit extends React.PureComponent {
  componentDidMount() {
    const sizeId = this.props.match.params.id;
    this.props.fetchsize(sizeId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const sizeId = this.props.match.params.id;
      this.props.fetchsize(sizeId);
    }
  }

  render() {
    const {
      history,
      user,
      size,
      formErrors,
      sizeEditChange,
      updatesize,
      deletesize,
      activatesize
    } = this.props;

    return (
      <SubPage
        title='Edit size'
        actionTitle='Cancel'
        handleAction={history.goBack}
      >
        {size?._id ? (
          <EditSize
            user={user}
            size={size}
            sizeChange={sizeEditChange}
            formErrors={formErrors}
            updatesize={updatesize}
            deletesize={deletesize}
            activatesize={activatesize}
          />
        ) : (
          <NotFound message='No size found.' />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    size: state.size.size,
    formErrors: state.size.editFormErrors
  };
};

export default connect(mapStateToProps, actions)(Edit);
