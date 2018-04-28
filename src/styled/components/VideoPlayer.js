import styled from "styled-components";
import { _PlayerButton } from "components/VideoPlayer";
import { Select } from "components";

import { CHARCOAL, FLINT, PAPER, EASE_OUT_EXPO } from "./Variables";

export const PlayerControls = styled.div`
  display: flex;

  > div {
    flex-grow: 1;
  }
`;

export const PlayerButton = styled(_PlayerButton)`
  align-items: center;
  backface-visibility: hidden;
  background: ${PAPER};
  border: none;
  border-right  : 1px solid ${FLINT};
  cursor: pointer;
  display: flex;
  height: 64px;
  justify-content: center;
  outline: none;
  padding: 0;
  transition: 400ms ${EASE_OUT_EXPO};
  width: 64px;

  &:hover,
  &:focus {
    svg {
      transform: scale(1.1);
    }
  }
  &:active {
    svg {
      transform: scale(.95);
    }
  }
  svg {
    fill: ${CHARCOAL};
    height: 24px;
    stroke: transparent;
    transition: 400ms ${EASE_OUT_EXPO};
    width: 24px;
  }

  #popout {
    fill: transparent;
    stroke: ${CHARCOAL};
    stroke-width: 4px;
  }
`;

export const PlayerSelect = styled(Select)`
  background: ${PAPER};
  box-sizing: border-box;
  height: calc(100% - 10px);
  padding: 12px;
  position: relative;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  > svg {
    right: 12px;
    top: 16px;
  }

  input {
    border: none;
    padding-left: 12px;
  }
`;
