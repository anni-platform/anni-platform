import styled from "styled-components";
import { PAPER, EASE_OUT_EXPO } from "./Variables";

export const Overlay = styled.div`
  background: rgba(255,255,255,0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: ${props => props.showNav ? 2 : 4};
`;

export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
`;

export const Dialog = styled.div`
  animation: slideIn 600ms ${EASE_OUT_EXPO};
  display: inline-flex;
  flex-direction: column;
  position: relative;
  width: auto;
  max-width: calc(100% - 96px);
  transform: translate3d(0, 0, 0);

  img {
    height: 100%;
    object-fit: contain;
    width: auto;
  }

  @keyframes slideIn {
    0% {
      transform: translateY(100vh);
    }

    100% {
      transform: translateY(0);
    }
  }
`;

export const OverlayToolbar = styled.div`
  align-items: center;
  bottom: 0;
  background: ${PAPER};
  display: flex;
  left: 0;
  position: absolute;
  padding: 16px;
  width: 100%;

  &:nth-child(1) {
    flex-grow: 1;
  }
`;

export const OverlayControls = styled.div``;

export const OverlayButton = styled.div`
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  font-size: 14px;
  position: ${props => props.top || props.right || props.bottom || props.left ? "absolute" : "relative"};
  bottom: ${props => props.bottom && "24px"};
  left: ${props => props.left && "24px"};
  right: ${props => props.right && "24px"};
  top: ${props => props.left || props.right ? "50%" : ""};
  top: ${props => props.top && "24px"};
  transform: ${props => props.top || props.bottom ? "translateX(-50%)" : ""};
  transform: ${props => props.left || props.right ? "translateY(-50%)" : ""};
`;
