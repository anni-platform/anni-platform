import styled from "styled-components";
import { BaseButton } from "components/Button";
import { Utils } from "./Utils";

import { CHARCOAL, COPPER, PAPER, EASE_OUT_EXPO } from "./Variables";

export const ButtonGroup = styled.div`
  ${Utils.margin};
  margin: ${props => props.center && "0 auto"};
  button {
    margin: 0 8px 8px 0;
  }
`;

export const Button = styled(BaseButton)`
  align-items: center;
  backface-visibility: hidden;
  background: ${props => !props.primary || props.link ? "none" : `${COPPER}`};
  border: ${props => props.noBorder || props.link ? "none" : `2px solid ${COPPER}`};
  border: ${props => props.stacked && "none"};
  border-radius: 80px;
  color: ${CHARCOAL};
  cursor: pointer;
  display: inline-flex;
  flex-direction: ${props => props.stacked && "column"};
  font-family: 'Apercu Bold', sans-serif;
  font-size: ${props => props.stacked ? "12px" : "13px"};
  justify-content: center;
  letter-spacing: 1px;
  line-height: 1;
  outline: none;
  padding: ${props => props.full ? "0" : "12px 24px"};
  text-decoration: none;
  text-transform: uppercase;
  transition: 400ms ${EASE_OUT_EXPO};
  z-index: 2;
  ${Utils.margin};
  &:hover,
  &:focus {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(.998);
  }
  svg {
    ${Utils.padding};
    fill: ${props => props.fill ? `${CHARCOAL}` : "transparent"};
    height: ${props => props.iconSize ? `${props.iconSize}px` : "18px"};
    margin-right: ${props => props.stacked ? "0" : "6px"};
    margin-bottom: ${props => props.stacked ? "6px" : "0"};
    stroke: ${props => props.fill ? "transparent" : `${CHARCOAL}`};
    stroke: ${props => props.stacked && `${CHARCOAL}`};
    stroke-width: ${props => props.strokeWidth ? `${props.strokeWidth}px` : "6px"};
    stroke-width: ${props => props.fill && "6px"};
    transition: 400ms ${EASE_OUT_EXPO};
    width: ${props => props.iconSize ? `${props.iconSize}px` : "18px"};
  }
`;

export const Avatar = Button.extend`
  background: ${COPPER};
  color: ${PAPER};
  font-size: 18px;
  height: 40px;
  text-align: center;
  padding: 0;
  position: relative;
  width: 40px;
  span {
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }
