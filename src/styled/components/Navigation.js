import styled from "styled-components";
import { FLINT, PAPER } from "./Variables";

export const NavBar = styled.div`
  background: ${PAPER};
  border-bottom: 1px solid ${FLINT};
  bottom: ${props => props.bottom ? "0" : ""};
  align-items: center;
  display: flex;
  height: 72px;
  left: 0;
  min-width: 100vw;
  overflow: ${props => props.scroll && "scroll"};
  position: fixed;
  top: ${props => props.bottom ? "" : "0"};
  width: 100%;
  z-index: 3;
`;

export const NavItem = styled.div`
  align-items: center;
  border-left: 1px solid ${FLINT};
  display: flex;
  flex-grow: ${props => props.fit && "1"};
  justify-content: center;
  height: 100%;
  margin-left: ${props => props.right && "auto"};
  padding: 0;
  position: relative;
`;

export const NavItemGroup = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  margin-left: ${props => props.right && "auto"};
`;
