/**
 *
 * Application
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import actions from '../../actions';

// routes
import Login from '../Login';
import Signup from '../Signup';
import MerchantSignup from '../MerchantSignup';
import HomePage from '../Homepage';
import Dashboard from '../Dashboard';
import Support from '../Support';
import Navigation from '../Navigation';
import Authentication from '../Authentication';
import Notification from '../Notification';
import ForgotPassword from '../ForgotPassword';
import ResetPassword from '../ResetPassword';
import Shop from '../Shop';
import SizesPage from '../SizePage';
import ProductPage from '../ProductPage';
import Sell from '../Sell';
import Contact from '../Contact';
import OrderSuccess from '../OrderSuccess';
import OrderPage from '../OrderPage';
import AuthSuccess from '../AuthSuccess';
import Checkout from '../Checkout';
import Shipping from '../Shipping';
import CheckoutSummary from '../CheckoutSummary'
import Payment from '../Payment';

import Return from '../Return';

import Privacy from '../ConsumerPolicy/Privacy';
import Refund from '../ConsumerPolicy/Refund'
import ShippingPolicy from '../ConsumerPolicy/ShipingPolicy'
import Terms from '../ConsumerPolicy/Terms'


import Footer from '../../components/Common/Footer';
import Page404 from '../../components/Common/Page404';
import { CART_ITEMS } from '../../constants';

class Application extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleStorage = this.handleStorage.bind(this);
  }
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.fetchProfile();
    }

    this.props.handleCart();

    document.addEventListener('keydown', this.handleTabbing);
    document.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('storage', this.handleStorage);
  }

  handleStorage(e) {
    if (e.key === CART_ITEMS) {
      this.props.handleCart();
    }
  }

  handleTabbing(e) {
    if (e.keyCode === 9) {
      document.body.classList.add('user-is-tabbing');
    }
  }

  handleMouseDown() {
    document.body.classList.remove('user-is-tabbing');
  }

  render() {
    return (
      <div className='application'>
        <Notification />
        <Navigation />
        <main className='main'>
          <Container>
            <div className='wrapper'>
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/shop' component={Shop} />
                <Route path='/sell' component={Sell} />
                <Route path='/contact' component={Contact} />
                <Route path='/sizes' component={SizesPage} />
                <Route path='/product/:slug' component={ProductPage} />
                <Route path='/order/success/:id' component={OrderSuccess} />
                <Route path='/order/:id' component={OrderPage} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Signup} />
                <Route path='/checkout' component={Checkout} />
                <Route path='/shipping' component={Shipping} />
                <Route path='/checkoutsummary' component={CheckoutSummary} />
                <Route path='/privacy' component={Privacy} />
                <Route path='/refund' component={Refund} />
                <Route path='/shippingpolicy' component={ShippingPolicy} />
                <Route path='/terms' component={Terms} />

                <Route
                  path='/merchant-signup/:token'
                  component={MerchantSignup}
                />
                <Route path='/forgot-password' component={ForgotPassword} />
                <Route
                  path='/reset-password/:token'
                  component={ResetPassword}
                />
                <Route path='/auth/success' component={AuthSuccess} />
                <Route path='/support' component={Authentication(Support)} />
                <Route
                  path='/dashboard'
                  component={Authentication(Dashboard)}
                />

                <Route path='/return' component={Return} />

                <Route path="/payment" component={Payment} />
                <Route path='/404' component={Page404} />
                <Route path='*' component={Page404} />


               
              </Switch>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated,
    products: state.product.storeProducts
  };
};

export default connect(mapStateToProps, actions)(Application);
