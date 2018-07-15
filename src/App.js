import React, { Component } from 'react';
import Layout from './hocs/layout/layout';
import Aux from './hocs/react-aux/react-aux';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Burger from './components/burger/burger';
class App extends Component {
  render() {
    return (
      <Aux>
        <Layout>
          <BurgerBuilder/>
          <Burger/>
        </Layout>
      </Aux>
    );
  }
}

export default App;
