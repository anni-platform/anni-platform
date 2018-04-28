import styled from "styled-components";
import { _PlayerButton } from "components/VideoPlayer";
import { Select } from "components";

import { CHARCOAL, FLINT, PAPER, EASE_OUT_EXPO } from "./Variables";

export const PlayerControls = styled.div`
  display: flex;
`;

export const PlayerButton = styled(_PlayerButton)`
  align-items: center;
  backface-visibility: hidden;
  background: ${PAPER};
  border: 1px solid ${FLINT};
  cursor: pointer;
  display: flex;
  height: 64px;
  justify-content: center;
  margin-left: -1px;
  outline: none;
  padding: 0;
  transition: 400ms ${EASE_OUT_EXPO};
  width: 64px;

  &:hover,
  &:focus {
    svg {
      transform: scale(1.2);
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
`;

export const PlayerSelect = styled(Select)`
  background: red;
`;
