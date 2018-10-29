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
    stroke: ${COPPER};
    height: 50px;
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

  &#more {
    > :nth-child(2){
      stroke: ${COPPER};
      stroke-width: 3;
    }
    > :nth-child(3),
    > :nth-child(4)
    {
      stroke: ${CHARCOAL};
      stroke-width: 3;
    }
  }

  &#view {
    > :nth-child(2){
      fill: ${CHARCOAL};
    }
  }


`;
