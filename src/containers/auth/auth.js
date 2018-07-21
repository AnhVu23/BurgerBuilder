import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import Input from '../../components/UI/input/input';
import Button from '../../components/UI/button/button';
import Spinner from '../../components/UI/spinner/spinner';
import classes from './auth.css';
import * as Actions from '../../store/actions/index';

class Auth extends Component {
  state = {
    control: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: false
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.control,
      [controlName]: {
        ...this.state.control[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.control[controlName].validation),
        touched: true
      }
    };
    this.setState({control: updatedControls});
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.control.email.value,
      this.state.control.password.value, this.state.isSignUp);
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      }
    })
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.control) {
      formElementsArray.push({
        id: key,
        config: this.state.control[key]
      });
    }

    let form = formElementsArray.map(formElement => (
      <Input key={formElement.id}
             elementType={formElement.config.elementType}
             elementConfig={formElement.config.elementConfig}
             value={formElement.config.value}
             invalid={!formElement.config.valid}
             shouldValidate={formElement.config.validation}
             touched={formElement.config.touched}
             changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
    ));
    if(this.props.loading) {
      form = <Spinner/>
    }

    let errorMessage = null;
    if(this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.onSubmitHandler}>
          {form}
          <Button btnType='Success'>SUBMIT</Button>
        </form>
        <Button btnType='Danger' clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp? 'SIGN IN' : 'SIGN UP'}</Button>
        {errorMessage}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(Actions.auth(email, password, isSignUp))
  }
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);