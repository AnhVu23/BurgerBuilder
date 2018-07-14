import React from 'react';

import Logo from '../../logo/logo';
import NavigationItems from '../navigationItems/navigationItems';
import Backdrop from '../../UI/backdrop/backdrop';
import Aux from '../../../hocs/react-aux';
import classes from './sideDrawer.css';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if(props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;