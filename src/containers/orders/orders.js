import React, { Component } from 'react';
import {connect} from 'react-redux';

import Order from '../../components/order/order';
import axios from '../../axios/axios-order';
import ErrorHandler from '../../hocs/errorHandler/errorHandler';
import * as Actions from '../../store/actions/index';
import Spinner from '../../components/UI/spinner/spinner';
class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    let orders = <Spinner/>;
    if (!this.props.loading) {
     orders = this.props.orders.map(order => (
       <Order key={order.id}
              ingredients={order.ingredients}
              price={order.price}/>
     ))
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(Actions.fetchOrders(token))
  }
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));