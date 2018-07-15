import React, {Component} from 'react';

import classes from './layout.css';
import Toolbar from '../../components/navigation/toolbar/toolbar';
import Aux from '../react-aux/react-aux';
import SideDrawer from '../../components/navigation/sideDrawer/sideDrawer';
class Layout extends Component{
  state = {
    showSideDrawer: false
  };
  sideDrawerCloseHandler = () => {
      this.setState({
        showSideDrawer: false
      })
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer }
    })
  };

  render () {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;
