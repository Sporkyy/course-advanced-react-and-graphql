import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import CartItem from './CartItem';
import User from './User';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Cart = () => {
  return (
    <User>
      {({ data: { me } }) => {
        if (!me) return null;
        console.log(me);
        return (
          <Mutation mutation={TOGGLE_CART_MUTATION}>
            {toggleCart => (
              <Query query={LOCAL_STATE_QUERY}>
                {({ data }) => (
                  <CartStyles open={data.cartOpen}>
                    <header>
                      <CloseButton onClick={toggleCart} title="Close">
                        &times;
                      </CloseButton>
                      <Supreme>{me.name}'s Cart</Supreme>
                      <p>
                        You have {me.cart.length} Item{1 === me.cart.length ? '' : 's'} in your
                        cart.
                      </p>
                    </header>
                    <ul>
                      {me.cart.map(cartItem => (
                        <CartItem cartItem={cartItem} key={cartItem.id} />
                      ))}
                    </ul>
                    <footer>
                      <p>{formatMoney(calcTotalPrice(me.cart))}</p>
                      <SickButton>Checkout</SickButton>
                    </footer>
                  </CartStyles>
                )}
              </Query>
            )}
          </Mutation>
        );
      }}
    </User>
  );
};

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
