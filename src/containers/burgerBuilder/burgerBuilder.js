import React, {Component} from 'react';
import {connect} from 'react-redux';

import Burger from '../../components/burger/burger';
import Aux from '../../hocs/react-aux/react-aux';
import BuildControls from '../../components/burger/buildControls/buildControls'
import Modal from '../../components/UI/modal/modal';
import OrderSummary from '../../components/burger/orderSummary/orderSummary';
import Spinner from '../../components/UI/spinner/spinner';
import ErrorHandler from '../../hocs/errorHandler/errorHandler';
import * as Actions from '../../store/actions/index';
import axios from '../../axios-order'

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount() {
    this.props.onIngredientInit();
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0);
    return sum > 0
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit();
    this.props.history.push('/checkout');
  }

  render () {
    const disabledInfo = {
      ...this.props.ings
    };
    for ( let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be shown</p> : <Spinner/> ;
    if(this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            purchasing={this.purchaseHandler}/>
        </Aux>
      )
      orderSummary = <OrderSummary ingredients = {this.props.ings}
                                   purchaseCanceled = {this.purchaseCancelHandler}
                                   purchaseContinued = {this.purchaseContinueHandler}
                                   price={this.props.price}/>
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
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(Actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(Actions.removeIngredient(ingName)),
    onIngredientInit: () => dispatch(Actions.initIngredients()),
    onPurchaseInit: () => dispatch(Actions.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));