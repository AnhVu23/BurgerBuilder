import React from 'react';
import _ from 'lodash';

import classes from './burger.css'
import BurgerIngredient from "./burgerIngredient/burgerIngredient";
const burger = (props) => {
  if(props.ingredients) {
    let transformedIngredients = Object.keys(props.ingredients)
      .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
          return <BurgerIngredient type={igKey} key={igKey  + i}/>
        })
      })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
    if (transformedIngredients.length === 0) {
      transformedIngredients = <div>Please start adding ingredients</div>
    }
    return (
      <div className={classes.Burger}>
        <BurgerIngredient type='bread-top'/>
        {transformedIngredients}
        <BurgerIngredient type='bread-bottom'/>
      </div>
    );
  } else {
    return (
      <div>
        Loading
      </div>
    )
  }
};

export default burger;