/**
 *
 * sizesPage
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import SizeList from '../../components/Store/SizeList';

class SizesPage extends React.PureComponent {
  componentDidMount() {
    this.props.fetchStoresizes();
  }

  render() {
    const { sizes } = this.props;

    return (
      <div className='sizes-page'>
        <SizeList sizes={sizes} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sizes: state.size.storesizes
  };
};

export default connect(mapStateToProps, actions)(SizesPage);
