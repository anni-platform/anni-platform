import styled from "styled-components";
import { Above } from "./MediaTemplates";
import { Utils } from "./Utils";

import { HAZEL, PEBBLE } from "./Variables";


export const Wrapper = styled.div`
  background: ${PEBBLE};
  max-width: 100vw;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: ${props => props.center ? "center" : "normal"};
  max-width: ${props => props.project ? "calc(100vw - 80px)" : "100vw"};
  min-height: 100vh;

  ${Above.sm`
    max-width: ${props => props.project ? "calc(100vw - 120px)" : "100vw"};
  `}

  ${Above.md`
    flex-direction: ${props => props.split ? "row" : "column"};
  `}

  ${Above.lg`
    max-width: ${props => props.project ? "calc(100vw - 240px)" : "100vw"};
  `}
`;

export const Content = styled.div`
  border: ${props => props.upload && `2px dashed black`};
  display: ${props => props.flex && "flex"};
  padding: ${props => props.full ? "0" : "100px 24px 24px 24px"};
  padding: ${props => props.project && "100px 0 24px 24px"};
  ${Utils.margin};

  ${Above.sm`
    padding: ${props => props.full ? "0" : "120px 48px 48px 48px"};
    padding: ${props => props.project && "120px 0 48px 48px"};
  `}

  ${Above.lg`
    padding: ${props => props.full ? "0" : "180px 120px 120px 120px"};
    padding: ${props => props.project && "180px 0 120px 120px"};
  `}
`;

export const Container = styled.div`
  align-items: center;
  background: ${props => props.media && HAZEL};
  display: ${props => props.flex && "flex"};
  display: ${props => props.center ? "flex" : "auto"};
  display: ${props => props.stacked ? "flex" : "auto"};
  flex-direction: ${props => props.stacked && "column"};
  flex-grow: ${props => props.media && 1};
  flex-wrap: wrap;
  justify-content: center;
  max-width: none;
  min-height: 540px;
  overflow: ${props => props.media && "hidden"};
  width: 100%;

  ${Above.sm`
    height: ${props => props.media ? "100vh" : "none"};
  `}

  ${Above.md`
    min-height: 100%;
    max-width: ${props => props.split ? `${props.split}%` : "100%"};
  `}
`;

export const Header = styled.div`
  left: 0;
  position: absolute;
  top: 16px;

  ${Above.sm`
    left: 24px;
    top: 24px;
  `}

  ${Above.md`
    left: 24px;
  `}

  ${Above.lg`
    left: 96px;
  `}
`;

export const Anchor = styled.div`
  display: block;
  position: relative;
  top: -90px;
  visibility: hidden;
`;
