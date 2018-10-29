import styled from "styled-components";
import _FeedbackItem from "components/FeedbackItem";
import {
  FLINT,
  PAPER,
  PEBBLE,
  SHADE,
  EASE_OUT_EXPO,
  EASE_OUT_BACK,
} from "./Variables";

const arrowDisplacementX = "10px";
const arrowDisplacementY = "26px";

export const FeedbackItem = styled(_FeedbackItem)`
  display: flex;
  max-width: 460px;

  .badge {
    cursor: pointer;
    height: 32px;
    position: relative;
    transition: transform 440ms ${EASE_OUT_BACK},
      opacity 440ms ${EASE_OUT_EXPO};
    width: 32px;
    will-change: transform, opacity;

    &:hover,
    &:focus {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.9);
    }

    .content {
      align-items: center;
      background: ${PAPER};
      border: 1px solid ${PEBBLE};
      border-radius: 99px;
      display: flex;
      height: 32px;
      justify-content: center;
      position: relative;
      width: 32px;
      z-index: 99;
    }

    .pulsatingRings {
      &::before,
      &::after {
        content: "";
        border-radius: 99px;
        height: 32px;
        background: ${FLINT};
        left: 0;
        opacity: 0.2;
        position: absolute;
        top: 0;
        width: 32px;
        will-change: transform, opacity;
      }

      &::before {
        animation: pulse 1600ms linear infinite;
      }

      &::after {
        animation: pulse 1600ms 800ms linear infinite;
      }
    }

    @keyframes pulse {
      0% {
        opacity: 0.4;
      }

      100% {
        opacity: 0;
        transform: scale(4);
      }
    }
  }

  &.right {
    flex-direction: row-reverse;

    .note {
      transform-origin: calc(100% + 16px) 32px;
    }
  }

  .note {
    border-bottom: ${props => !props.contextual && `1px solid ${FLINT}`};
    box-shadow: ${props => props.contextual && `3px 3px 24px 0 ${SHADE}`};
    box-sizing: border-box;
    margin: ${props => props.contextual && "-20px 18px 0 18px"};
    position: relative;
    transform-origin: -16px 32px;
    transform: scale(0);
    transition: transform 440ms ${EASE_OUT_BACK},
      opacity 440ms ${EASE_OUT_EXPO};
    width: auto;
    will-change: transform, opacity;

    .container {
      background: ${PAPER};
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
        left: calc(50% - ${arrowDisplacementX});
        top: -${arrowDisplacementX};
      }

      &.left {
        box-shadow: -1.5px -1.5px 4px 0 rgba(0, 0, 0, 0.04);
        left: -${arrowDisplacementX};
        top: ${arrowDisplacementY};
        transform: rotate(-45deg);
      }

      &.bottom {
        background: ${PEBBLE};
        box-shadow: -3px -3px 4px 0 rgba(0, 0, 0, 0.04);
        bottom: -${arrowDisplacementX};
        left: calc(50% - ${arrowDisplacementX});
        transform: rotate(224deg);
      }

      &.right {
        box-shadow: -1.5px -1.5px 4px 0 rgba(0, 0, 0, 0.06);
        right: -${arrowDisplacementX};
        top: ${arrowDisplacementY};
        transform: rotate(135deg);
      }
    }

    &.entered {
      transform: scale(1);
      opacity: 1;
    }

    &.entering,
    &.exiting {
      transform: scale(0);
      opacity: 0;
    }
  }
`;

export const FeedbackSidebar = styled.div`
  background: ${PAPER};
  border-left: 1px solid ${FLINT};
  display: flex;
  flex-direction: column;
  height: calc(100vh - 73px);
  position: fixed;
  top: 73px;
  transition: right 500ms ${EASE_OUT_EXPO};
  width: auto;
  z-index: 99;

  &.entered {
    right: 0;
  }

  &.entering,
  &.exiting {
    right: -400px;
  }
`;

export const FeedbackList = styled.div`
  flex-grow: 1;
  height: 100%;
  overflow-y: auto;
`;
