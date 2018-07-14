import React from 'react';

import classes from './drawerToggle.css';
const drawerToggle = (props) => {
  return (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
};

export default drawerToggle;