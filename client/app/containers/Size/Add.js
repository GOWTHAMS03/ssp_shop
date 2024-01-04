/*
 *
 * Add
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import Addsize from '../../components/Manager/AddSize';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  render() {
    const {
      history,
      sizeFormData,
      formErrors,
      sizeChange,
      addsize
    } = this.props;

    return (
      <SubPage
        title='Add size'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        <Addsize
          sizeFormData={sizeFormData}
          formErrors={formErrors}
          sizeChange={sizeChange}
          addsize={addsize}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    sizeFormData: state.size.sizeFormData,
    formErrors: state.size.formErrors
  };
};

export default connect(mapStateToProps, actions)(Add);
