import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/order/checkoutSummary/checkoutSummary';
import ContactData from './contactData/contactData';
import Aux from '../../hocs/react-aux/react-aux';
import * as Actions from '../../store/actions/index';
class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to='/'/>
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null;

      summary = (
        <Aux>
          {purchasedRedirect}
          <CheckoutSummary ingredients={this.props.ings}
                           onCheckoutCancelled={this.checkoutCancelledHandler}
                           onCheckoutContinued={this.checkoutContinuedHandler}/>
          <Route path={this.props.match.path + '/contact-data'}
                 component={ContactData}/>
        </Aux>

      )
    }
    return (
      <div>
        {summary}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseInit: () => dispatch(Actions.purchaseInit())
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);