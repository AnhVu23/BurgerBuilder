import React, { Component } from 'react';

import Order from '../../components/order/order';
import axios from '../../axios-order';
import ErrorHandler from '../../hocs/errorHandler/errorHandler';
class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
      axios.get('/orders.json')
        .then(res => {
          console.log(res.data)
          const fetchedOrdered = [];
          for(let key in res.data) {
            fetchedOrdered.push({...res.data[key], id: key});
          }
          this.setState({
            loading: false,
            orders: fetchedOrdered
          })
        })
        .catch(err => {
          this.setState({
            loading: false
          })
        })
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order key={order.id}
                 ingredients={order.ingredients}
                 price={order.price}/>
        ))}
      </div>
    );
  }
}

export default ErrorHandler(Orders, axios);