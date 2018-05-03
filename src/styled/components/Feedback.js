import styled from "styled-components";
import _FeedbackItem from "components/FeedbackItem";
import { FLINT, PAPER, PEBBLE, SHADE } from "./Variables";

export const FeedbackItem = styled(_FeedbackItem)`
  border: ${props => !props.contextual && `1px solid ${FLINT}`};
  box-shadow: ${props => props.contextual && `3px 3px 24px 0 ${SHADE}`};
  box-sizing: border-box;
  margin-top: -2px;
  max-width: 400px;
  position: relative;
  width: auto;

  .container {
    background: ${PAPER};
    border-bottom: 1px solid ${FLINT};
    display: flex;
    padding: 16px;
  }

  .arrow {
    background: ${PAPER};
    height: 20px;
    position: absolute;
    transform: rotate(45deg);
    width: 20px;

    &.top {
      box-shadow: -1.5px -1.5px 4px 0 rgba(0, 0, 0, 0.04);
      left: calc(50% - 10px);
      top: -10px;
    }

    &.left {
      box-shadow: -1.5px -1.5px 4px 0 rgba(0, 0, 0, 0.04);
      left: -10px;
      top: 26px;
      transform: rotate(-45deg);
    }

    &.bottom {
      background: ${PEBBLE};
      box-shadow: -3px -3px 4px 0 rgba(0, 0, 0, 0.04);
      bottom: -10px;
      left: calc(50% - 10px);
      transform: rotate(224deg);
    }

    &.right {
      box-shadow: -1.5px -1.5px 4px 0 rgba(0, 0, 0, 0.06);
      right: -10px;
      top: 26px;
      transform: rotate(135deg);
    }
  }
`;

export const FeedbackList = styled.div`
  background: ${PAPER};
  border-left: 1px solid ${FLINT};
  min-height: 100vh;
  position: fixed;
  right: 0;
  top: 72px;
  width: auto;

  
`
