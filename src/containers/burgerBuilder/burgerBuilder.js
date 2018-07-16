import React, {Component} from 'react';


import Burger from '../../components/burger/burger';
import Aux from '../../hocs/react-aux/react-aux';
import BuildControls from '../../components/burger/buildControls/buildControls'
import Modal from '../../components/UI/modal/modal';
import OrderSummary from '../../components/burger/orderSummary/orderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/spinner/spinner';
import ErrorHandler from '../../hocs/errorHandler/errorHandler';
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 1,
  meat: 1.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://burger-builder-3f1ea.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({
          ingredients: response.data
        })
      })
      .catch(error => {
        this.setState({
          error: true
        })
      })
  }
  updatePurchaseState (ingredients) {
    const sum = Object.keys( ingredients )
      .map( igKey => {
        return ingredients[igKey];
      } )
      .reduce( ( sum, el ) => {
        return sum + el;
      }, 0 );
    this.setState( { purchasable: sum > 0 } );
  }

  addIngredientHandler = ( type ) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = ( type ) => {
    const oldCount = this.state.ingredients[type];
    if ( oldCount <= 0 ) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {

    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for ( let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be shown</p> : <Spinner/> ;
    if(this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            purchasing={this.purchaseHandler}/>
        </Aux>
      )
      orderSummary = <OrderSummary ingredients = {this.state.ingredients}
                                   purchaseCanceled = {this.purchaseCancelHandler}
                                   purchaseContinued = {this.purchaseContinueHandler}
                                   price={this.state.totalPrice}/>
      if(this.state.loading) {
        orderSummary = <Spinner/>
      }
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing}
               modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default ErrorHandler(BurgerBuilder, axios);