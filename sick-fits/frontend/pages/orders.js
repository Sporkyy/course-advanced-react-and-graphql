import React, { Component } from 'react';
import PleaseSignIn from '../components/PleaseSignIn';
import OrderList from '../components/OrderList';

export default class OrdersPage extends Component {
  render() {
    return (
      <PleaseSignIn>
        <OrderList />
      </PleaseSignIn>
    );
  }
}
