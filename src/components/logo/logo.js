import React from 'react';

import burgerLogo from '../../assets/images/127 burger-logo.png';
import classes from './logo.css';
const logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo}/>
    </div>
  );
}

export default logo;