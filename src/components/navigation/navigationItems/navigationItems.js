import React from 'react';

import NavigationItem from './navigationItem/navigationItem';
import classes from './navigationItems.css';
const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' active>BurgerBuilder</NavigationItem>
      <NavigationItem link='/'>Checkout</NavigationItem>
    </ul>
  )
}

export default navigationItems;