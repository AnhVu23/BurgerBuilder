import React, { Component } from 'react';

import Button from '../../../components/UI/button/button';
import classes from './contactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/spinner/spinner';
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Anh Vu',
        address: {
          street: 'Kilonrinne 10',
          zipCode: '02610',
          country: 'Finland'
        },
        email : 'vu.haianh291@gmail.com'
      }
    };
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({
          loading: false
        })
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({
          loading: false
        })
      });
  }

  render() {
    let form = null;
    if(this.state.loading) {
      form =<Spinner/>
    } else {
      form = <form>
        <input className={classes.Input} type='text' name='name' placeholder='Your name' />
        <input className={classes.Input} type='email' name='email' placeholder='Your email' />
        <input className={classes.Input} type='text' name='street' placeholder='Street' />
        <input className={classes.Input} type='text' name='postal' placeholder='Postal Code' />
        <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
      </form>
    }
    return (

      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;