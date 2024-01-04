import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import actions from '../../actions';
import { Row, Col } from 'reactstrap';
import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import SubPage from '../../components/Manager/SubPage';

class Shipping extends React.Component {
  componentDidMount() {
    this.props.fetchAddresses();
  }

  handleSubmit = event => {
    event.preventDefault();
    const { addressFormData, setAddress, history } = this.props;
    setAddress(addressFormData);
    history.push('/checkoutsummary');
  };

  handleUseAddress = selectedAddress => {
    const { addressChange, setAddress } = this.props;
    addressChange('address', selectedAddress.address);
    addressChange('phonenumber', selectedAddress.phonenumber);
    addressChange('city', selectedAddress.city);
    addressChange('state', selectedAddress.state);
    addressChange('country', selectedAddress.country);
    addressChange('zipCode', selectedAddress.zipCode);

    if (selectedAddress.isDefault) {
      setAddress(selectedAddress);
      this.props.history.push('/checkoutsummary');
    }
  };


  render() {
    const { addressFormData, addresses, formErrors, history } = this.props;

    return (
      <SubPage
        title='Shipping Address'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        {/* Existing Addresses */}
        <div className='sub-page'>
          <div className='subpage-header'>
            <div className='mb-0'>
              {addresses.map((address, index) => (
                <div key={index} className='address-item'>
                  <p>Address: {address.address}</p>
                  <p>Phone: {address.phonenumber}</p>
                  <p>City: {address.city}</p>
                  <p>State: {address.state}</p>
                  <p>Country: {address.country}</p>
                  <p>ZipCode: {address.zipCode}</p>

                  <Button
                    variant='none'
                    size='sm'
                    text='Use this Address'
                    onClick={() => this.handleUseAddress(address)}
                  />
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* Add New Address */}
        <div className='add-address'>
          <form onSubmit={this.handleSubmit} noValidate>
            <Row>
              <Col xs='12' md='12'>
                <Input
                  type='text'
                  error={formErrors['address']}
                  label='Address'
                  name='address'
                  placeholder='Address: Street, House No / Apartment No'
                  value={addressFormData.address}
                  onInputChange={(name, value) => {
                    this.props.addressChange(name, value);
                  }}
                />
              </Col>
              <Col xs='12' md='12'>
                <Input
                  type='number'
                  error={formErrors['phonenumber']}
                  label='Phone Number'
                  name='phonenumber'
                  placeholder='enter your phone number'
                  value={addressFormData.phonenumber}
                  onInputChange={(name, value) => {
                    this.props.addressChange(name, value);
                  }}
                />
              </Col>
              <Col xs='12' md='12'>
                <Input
                  type='text'
                  error={formErrors['city']}
                  label='City'
                  name='city'
                  placeholder='City'
                  value={addressFormData.city}
                  onInputChange={(name, value) => {
                    this.props.addressChange(name, value);
                  }}
                />
              </Col>
              <Col xs='12' lg='6'>
                <Input
                  type='text'
                  error={formErrors['state']}
                  label='State'
                  name='state'
                  placeholder='State'
                  value={addressFormData.state}
                  onInputChange={(name, value) => {
                    this.props.addressChange(name, value);
                  }}
                />
              </Col>
              <Col xs='12' lg='6'>
                <Input
                  type='text'
                  error={formErrors['country']}
                  label='Country'
                  name='country'
                  placeholder='Please Enter Your country'
                  value={addressFormData.country}
                  onInputChange={(name, value) => {
                    this.props.addressChange(name, value);
                  }}
                />
              </Col>
              <Col xs='12' lg='6'>
                <Input
                  type='text'
                  error={formErrors['zipCode']}
                  label='Zipcode'
                  name='zipCode'
                  placeholder='Please Enter Your Zipcode'
                  value={addressFormData.zipCode}
                  onInputChange={(name, value) => {
                    this.props.addressChange(name, value);
                  }}
                />
              </Col>
            </Row>
            <hr />
            <div className='d-flex justify-content-center'>
              <Button type='submit' text='Continue' />
            </div>
          </form>
        </div>
      </SubPage>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    addresses: state.address.addresses,
    addressFormData: state.address.addressFormData,
    formErrors: state.address.formErrors,
    history: ownProps.history,
  };
};

export default withRouter(connect(mapStateToProps, actions)(Shipping));
