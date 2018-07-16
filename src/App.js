import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hocs/layout/layout';
import Aux from './hocs/react-aux/react-aux';
import BurgerBuilder from './containers/burgerBuilder/burgerBuilder';
import Checkout from './containers/checkout/checkout';
import Orders from './containers/orders/orders';
class App extends Component {
  render() {
    return (
      <Aux>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/' exact component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </Aux>
    );
  }
}

export default App;
