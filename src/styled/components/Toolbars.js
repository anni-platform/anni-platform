import styled from "styled-components";
import { COPPER, FLINT, PAPER } from "./Variables";

export const Toolbar = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  left: 0;
  position: fixed;
  width: 100%;
`;

export const ToolbarGroup = styled.div`
  align-items: center;
  border-top: ${props => props.noBorder ? "none" : `1px solid ${FLINT}`};
  display: flex;
  flex-grow: 1;

  > div {
    border-right: ${props => props.noBorder ? "none" : `1px solid ${FLINT}`};
  }
`;

export const ToolbarItem = styled.div`
  border-right: ${props => props.noBorder ? "none" : `1px solid ${FLINT}`};
  cursor: pointer;
  font-family: 'Apercu Bold', sans-serif;
  font-size: 12px;
  flex-grow: 1;
  letter-spacing: 1px;
  padding: 16px;
  text-transform: uppercase;
  text-align: center;

  &.active {
    color: ${COPPER};
  }
`;

export const ContextualToolbar = styled.div`
  background: ${PAPER};
  box-shadow: 0 2px 24px 0 ${FLINT};
  position: absolute;
  opacity: 0;
  transition: opacity 300ms $expo;
  visibility: hidden;
  z-index: 2;

  .active {
  background: ${PAPER};
  color: ${COPPER};
  }

  ::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid ${PAPER};
    position: absolute;
    bottom: -10px;
    left: calc(50% - 10px);
  }
`;
