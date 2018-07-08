import React, {Component} from 'react';


import Burger from '../../components/burger/burger';
import Aux from '../../hocs/react-aux';
import BuildControls from '../../components/burger/buildControls/buildControls'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 1,
  meat: 1.5
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state={
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4
    };
  }

  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })

  };

  removeIngredientHandler = (type) => {

  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls ingredientAdded = {this.addIngredientHandler}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;