import React from 'react';

import classes from './layout.css';
import Aux from '../../hocs/react-aux';
const layout = (props) => {
  return (
    <Aux>
      <div>
        Toolbar, SideDrawer, Backdrop
      </div>
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  )
};

export default layout;
