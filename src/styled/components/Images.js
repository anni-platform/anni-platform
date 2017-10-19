import styled from "styled-components";
import { CONCRETE, COPPER, CHARCOAL, PAPER, EASE_OUT_BACK } from "./Variables";

export const Image = styled.img`
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  width: 100%;
`;

export const ImageControls = styled.div`
  align-items: center;
  background: white;
  border-radius: 99px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  right: 16px;
  top: 16px;
  transform: scale(.9);
  transition: 240ms ${EASE_OUT_BACK};
  overflow: hidden;
  opacity: .25;
  z-index: 2;

  button {
    padding: 8px;
  }
`;

export const ImageControlsButton = styled.div`
  align-items: center;
  display: inline-block;
  height: 14px;
  margin: 0 12px 6px 16px;
  position: relative;
  width: 14px;

  div {
    border: 2px solid ${CONCRETE};
    left: 0;
    position: absolute;
    top: 0;

    &:hover {
      background: ${PAPER};
      border-color: ${COPPER};
      z-index: 2;
    }
  }

  .base {
    width: 6px;
    height: 6px;
    border-color: ${CHARCOAL};
  }

  .long {
    width: 14px;
    height: 6px;
  }

  .tall {
    width: 6px;
    height: 14px;
  }

  .full {
    width: 14px;
    height: 14px;
  }

  .active {
    background: ${PAPER};
    border: 2px solid ${CONCRETE};
  }

  &.hasSize {
    &::after {
      position: absolute;
      border: 2px solid ${CHARCOAL};
      background: ${PAPER};
      width: 6px;
      height: 6px;
      display: block;
      content: '';
      z-index: 2;
    }

    &.long::after {
      width: 14px;
    }

    &.tall::after {
      height: 14px;
    }

    &.full::after {
      width: 14px;
      height: 14px;
    }
  }

  &:hover::after {
    display: none;
  }
  }
`
