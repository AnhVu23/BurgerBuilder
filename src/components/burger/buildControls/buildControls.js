import React from 'react'

import BuildControl from './buildControl/buildControl';
import classes from './buildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      {controls.map(ctrl =>
        <BuildControl label={ctrl.label}
                      key={ctrl.label}
                      added = {() => {
                        props.ingredientAdded(ctrl.type)
                      }}/>)}
    </div>
  )
};

export default buildControls;