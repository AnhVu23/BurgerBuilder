import React from 'react';

import classes from './toolbar.css';
import Logo from '../../logo/logo';
import NavigationItems from '../navigationItems/navigationItems';
import DrawerToggle from '../sideDrawer/drawerToggle/drawerToggle';
const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked}/>
      <div className={classes.Logo}>
        <Logo/>
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems/>
      </nav>
    </header>
  )
};

export default toolbar;