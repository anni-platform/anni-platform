import styled from "styled-components";
import { BaseButton } from "components/Button";
import { Utils } from "./Utils";

import { CHARCOAL, COPPER, PAPER, EASE_OUT_EXPO, EASE_OUT_BACK } from "./Variables";

export const ButtonGroup = styled.div`
  ${Utils.margin};
  button {
    margin: 0 8px 8px 0;
  }
`;

export const Button = styled(BaseButton)`
  align-items: center;
  background: ${props => !props.primary || props.link ? "none" : `${COPPER}`};
  border: ${props => props.noBorder || props.link ? "none" : `2px solid ${COPPER}`};
  border: ${props => props.primary && "none"};
  border: ${props => props.stacked && "none"};
  border-radius: 80px;
  color: ${CHARCOAL};
  cursor: pointer;
  display: inline-flex;
  flex-direction: ${props => props.stacked && "column"};
  font-family: 'Apercu Bold', sans-serif;
  font-size: 13px;
  justify-content: center;
  letter-spacing: 1px;
  line-height: 1;
  outline: none;
  padding: 12px 24px;
  text-decoration: none;
  text-transform: uppercase;
  transition: 400ms ${EASE_OUT_EXPO};
  z-index: 2;
  ${Utils.margin};

  svg {
    fill: ${props => props.fill ? `${CHARCOAL}` : "transparent"};
    height: ${props => props.iconSize ? `${props.iconSize}px` : "18px"};
    margin-right: 4px;
    margin-bottom: ${props => props.stacked && "6px"};
    stroke: ${props => props.fill ? "transparent" : `${CHARCOAL}`};
    stroke: ${props => props.stacked && `${CHARCOAL}`};
    stroke-width: ${props => props.fill ? "0" : "6px"};
    stroke-width: ${props => props.stacked && "6px"};
    transition: 400ms ${EASE_OUT_EXPO};
    transition: transform 400ms ${EASE_OUT_BACK};
    width: ${props => props.iconSize ? `${props.iconSize}px` : "18px"};
  }

  > #logo {
    fill: none;
    height: 50px;
    stroke: ${COPPER};
    padding: 0;
    stroke-width: 1;
    width: 50px;

    > :nth-child(4){
      fill: ${COPPER};
      stroke: none;
    }

    > :nth-child(5){
      fill: ${COPPER};
      stroke: none;
    }
  }

  :hover {
    transform: ${props => props.noHover ? "scale(1)" : "scale(1.02)"};

    svg {
      transform: ${props => props.noHover ? "scale(1)" : "scale(1.05)"};
    }
  }
`;

export const Avatar = Button.extend`
  background: ${COPPER};
  color: ${PAPER};
  font-size: 18px;
  height: 40px;
  text-align: center;
  position: relative;
  width: 40px;

  span {
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }
`
