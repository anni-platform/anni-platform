import styled from "styled-components";
import _ContextualMenu from "components/ContextualMenu";
import { FLINT, PAPER, SHADE, EASE_OUT_BACK } from "./Variables";

export const ContextualMenu = styled(_ContextualMenu)`
  background-color: ${PAPER};
  box-shadow: 3px 3px 24px 0 ${SHADE};
  box-sizing: border-box;
  max-width: 400px;
  position: fixed;
  right: 16px;
  top: 90px;
  transform-origin: 50% -10px;
  transition: 280ms ${EASE_OUT_BACK};

  .container {
    background: ${PAPER};
    display: flex;
  }

  .arrow {
    background: ${PAPER};
    box-shadow: -1.5px -1.5px 4px 0 rgba(0, 0, 0, 0.04);
    height: 20px;
    position: absolute;
    right: ${props => props.arrowOffset ? `${props.arrowOffset}px` : "calc(50% - 10px)"};
    top: -10px;
    transform: rotate(45deg);
    width: 20px;
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
`;

export const ContextualMenuItem = styled.div`
  border-bottom: 1px solid ${FLINT};
  padding: 16px 24px;
`
