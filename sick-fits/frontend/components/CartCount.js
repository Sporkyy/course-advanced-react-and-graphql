import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const AnimationStyles = styled.span`
  position: relative;

  .count {
    display: block;
    position: relative;
    backface-visibility: visible;

    /* Initial state */
    &-enter {
      opacity: 0;
      transform: rotateX(0.5turn) scale(2);
      transition: transform 360ms, opacity 0ms calc(360ms / 3.5);

      &-active {
        opacity: 1;
        transform: rotateX(0turn) scale(1);
      }
    }

    &-exit {
      opacity: 0;
      position: absolute;
      top: 0;
      transform: rotateX(0turn) scale(2);
      transition: transform 360ms, opacity 0ms calc(360ms / 3.5);

      &-active {
        opacity: 0;
        transform: rotateX(0.5turn) scale(1);
      }
    }
  }
`;

const Dot = styled.div`
  background: ${props => props.theme.red};
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-weight: 100;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const CartCount = ({ count }) => (
  <AnimationStyles>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 360, exit: 360 }}
      >
        <Dot>{count}</Dot>
      </CSSTransition>
    </TransitionGroup>
  </AnimationStyles>
);

export default CartCount;
