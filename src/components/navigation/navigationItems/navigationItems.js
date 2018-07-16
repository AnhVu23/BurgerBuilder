import React from 'react';

import NavigationItem from './navigationItem/navigationItem';
import classes from './navigationItems.css';
const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' exact>BurgerBuilder</NavigationItem>
      <NavigationItem link='/orders'>Orders</NavigationItem>
    </ul>
  )
}

export default navigationItems;