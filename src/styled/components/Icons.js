import styled from "styled-components";
import { Icons } from "components/Icons";
import { CHARCOAL, COPPER } from "./Variables";

export const SolidIcon = styled(Icons)`
  fill: ${props => props.color ? `${COPPER}` : `${CHARCOAL}`};
  stroke: transparent;
`;

export const OutlineIcon = styled(Icons)`
  fill: none;
  stroke: ${props => props.color ? `${COPPER}` : `${CHARCOAL}`};
  stroke-width: ${props => props.strokeWidth ? `${props.strokeWidth}px` : "2px"};

  &#logo {
    stroke: ${props => props.color ? `${COPPER}` : `${CHARCOAL}`};;
    stroke-width: 1;

    > :nth-child(4){
      fill: ${props => props.color ? `${COPPER}` : `${CHARCOAL}`};
      stroke: none;
    }

    > :nth-child(5){
      fill: ${props => props.color ? `${COPPER}` : `${CHARCOAL}`};
      stroke: none;
    }
  }

  &#more {
    > :nth-child(2){
      stroke: ${COPPER};
    }
  }

  &#view {
    > :nth-child(2){
      fill: ${props => props.color ? `${COPPER}` : `${CHARCOAL}`};
    }
  }


`;
