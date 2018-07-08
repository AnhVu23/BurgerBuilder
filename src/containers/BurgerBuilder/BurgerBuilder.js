import React, {Component} from 'react';

import Burger from '../../components/burger/burger';
import Aux from '../../hocs/react-aux';
class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state={
      ingredients: {
        salad: 1,
        bacon: 1,
        cheese: 2,
        meat: 2
      }
    };
  }
  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;