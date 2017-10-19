import styled from "styled-components";
import { Above } from "./MediaTemplates";

import { COPPER, EASE_OUT_EXPO } from "./Variables";

export const ProjectNav = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  min-height: 100vh;
  padding-right: 24px;
  position: fixed;
  right: 0;
  top: 0;
  width: 80px;

  > div {
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  ${Above.sm`
    padding-right: 48px;
    width: 120px;
  `}

  ${Above.lg`
    width: 240px;
  `}
`;

export const ProjectNavItem = styled.div`
  display: flex;
  padding: 6px;
  justify-content: flex-end;

  h2 {
    display: none;

    ${Above.lg`
      display: inline-block;
      margin-right: 16px;
    `}
  }
`;

export const ProjectNavId = styled.div`
  background: ${props => props.checked ? `${COPPER}` : "transparent"};
  border: 2px solid ${COPPER};
  border-radius: 10px;
  height: 8px;
  margin-left: 8px;
  padding: 0;
  transition: 200ms ${EASE_OUT_EXPO};
  width: 8px;
`;
