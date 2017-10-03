import styled from "styled-components";
import { BaseLoader } from "components/Loader";
import { COPPER } from "./Variables";

export const Loader = styled(BaseLoader)`
  svg {
    animation: rotate 1400ms linear infinite;
    display: inline-block;
    fill: none;
    stroke: ${COPPER};
    stroke-width: 6px;
  }

  &.center {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    text-align: center;
    width: 100%;
  }

  &.fullPage {
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
  }

  .loaderPath {
    animation: dash 1400ms linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotateZ(0deg);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 200;
      stroke-dashoffset: -30px;
    }

    100% {
      stroke-dasharray: 90, 200;
      stroke-dashoffset: -124px;
    }
  }
`;
