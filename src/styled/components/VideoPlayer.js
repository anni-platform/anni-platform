import styled from "styled-components";
import { _PlayerButton } from "components/VideoPlayer";
import { Select } from "components";

import {
  CHARCOAL,
  COPPER,
  HAZEL,
  FLINT,
  PAPER,
  EASE_OUT_EXPO
} from "./Variables";


export const Player = styled.div`
  position: relative;
`;

export const PlayerViewer = styled.div`
  position: relative;

  canvas {
  max-width: 100%;
  height: auto;
  }
`;

export const PlayerLoader = styled.div`
  align-items: center;
  background: rgba(255,255,255,0.9);
  display: flex;
  left: 0;
  justify-content: center;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
`;

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
  border-right: ${props => props.noBorder ? "none" : `1px solid ${FLINT}`};
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
    top: calc(50% - 10);
  }

  input {
    border: none;
    padding-left: 12px;
  }
`;

const trackSize = "8px";
const thumbSize = "12px";
const thumbRadius = "100px";
const progressBar = `-999px 0px 0px 999px ${COPPER}`;

export const PlayerTrack = styled.input`
  -webkit-appearance: none;
  bottom: 0;
  width: 100%;
  position: absolute;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: ${trackSize};
    cursor: pointer;
    box-shadow: 0;
    background: ${HAZEL};
    border-radius: 0px;
    border: none;
    overflow: hidden;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: ${COPPER};
    border: none;
    border-radius: ${thumbRadius};
    box-shadow: ${progressBar};
    cursor: pointer;
    height: ${thumbSize};
    margin-top: -2px;
    width: 1px;
  }

  &::-moz-range-track {
    width: 100%;
    height: ${trackSize};
    cursor: pointer;
    box-shadow: 0;
    background: ${HAZEL};
    border-radius: 0px;
    border:none;
  }
  &::-moz-range-thumb {
    background: ${COPPER};
    border: none;
    border-radius: ${thumbRadius};
    box-shadow: 0;
    cursor: pointer;
    height: ${thumbSize};
    margin-top: -2px;
    width: ${thumbSize};
  }
  &.slider::-ms-track {
    width: 100%;
    height: ${trackSize};
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: ${HAZEL};
    border:none;
    border-radius: 0px;
    box-shadow: 0;
  }
  &::-ms-fill-upper {
    background: ${HAZEL};
    border:none;
    border-radius: 0px;
    box-shadow: 0;
  }
  &::-ms-thumb {
    background: ${COPPER};
    border: none;
    border-radius: ${thumbRadius};
    box-shadow: 0;
    cursor: pointer;
    height: ${thumbSize};
    margin-top: -2px;
    width: ${thumbSize};
  }
`;
