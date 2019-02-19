import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import formatMoney from '../lib/formatMoney';
import RemoveFromCart from './RemoveFromCart';

const CartItemStyles = styled.li`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  display: grid;
  grid-template-columns: auto 1fr auto;
  padding: 1rem 0;

  h3 {
    margin: 0px;
  }

  img,
  p {
    margin-right: 10px;
  }
`;

export default class CartItem extends Component {
  static propTypes = {
    cartItem: PropTypes.object.isRequired
  };

  render() {
    const { cartItem } = this.props;
    // 1. Check if that item exists
    if (!cartItem.item)
      return (
        <CartItemStyles>
          <img />
          <div className="cart-item-details">
            <h3>This item has been removed</h3>
          </div>
          <RemoveFromCart id={cartItem.id} />
        </CartItemStyles>
      );
    return (
      <CartItemStyles>
        <img alt={cartItem.item.title} src={cartItem.item.image} width="100" />
        <div className="cart-item-details">
          <h3>{cartItem.item.title}</h3>
          <p>
            {formatMoney(cartItem.item.price * cartItem.quantity)}
            {' - '}
            <em>{cartItem.quantity}</em> &times; {formatMoney(cartItem.item.price)} each
          </p>
        </div>
        <RemoveFromCart id={cartItem.id} />
      </CartItemStyles>
    );
  }
}
