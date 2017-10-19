import styled from "styled-components";
import { FLINT, PAPER } from "./Variables";

export const NavBar = styled.div`
  background: ${PAPER};
  border-bottom: 1px solid ${FLINT};
  align-items: center;
  display: flex;
  height: 72px;
  left: 0;
  min-width: 100vw;
  position: fixed;
  top: 0;
  z-index: 3;
`;

export const NavItem = styled.div`
  align-items: center;
  border-left: 1px solid ${FLINT};
  display: flex;
  height: 100%;
  margin-left: ${props => props.right && "auto"};
  padding: 0 8px;
`;

export const NavItemGroup = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  margin-left: ${props => props.right && "auto"};
`;
