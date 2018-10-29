import styled, { injectGlobal } from "styled-components";
import Highlight from "react-highlight";
import { Above } from "./MediaTemplates";
import { Utils } from "./Utils";
import { CARMINE, COPPER, CHARCOAL, FLINT, PEBBLE } from "./Variables";

/*
 * Font Definitions
 */

import ApercuRegular from "fonts/ApercuTrial-Regular.ttf";
import ApercuMedium from "fonts/ApercuTrial-Medium.ttf";
import ApercuBold from "fonts/ApercuTrial-Bold.ttf";
import ApercuMono from "fonts/ApercuTrial-Mono.ttf";

export const GlobalStyles = injectGlobal`
  @font-face {
    font-family: 'Apercu';
    src: url(${ApercuRegular});
    weight: normal;
  }
  @font-face {
    font-family: 'Apercu Medium';
    src: url(${ApercuMedium});
    weight: 600;
  }
  @font-face {
    font-family: 'Apercu Bold';
    src: url(${ApercuBold});
    weight: 800;
  }

  @font-face {
    font-family: 'Apercu Mono';
    src: url(${ApercuMono});
  }

  html {
    -webkit-font-smoothing: antialiased;
  }
`;

/*
  Base Styles
*/

export const Heading = styled.h1`
  color: ${props => (props.color ? `${COPPER}` : `${CHARCOAL}`)};
  font-family: "Apercu Bold", sans-serif;
  font-size: 32px;
  margin: 0 0 4px 0;
  max-width: ${props => props.maxWidth && `${props.maxWidth}px`};
  text-align: ${props => (props.center ? "center" : "left")};
  text-transform: ${props => (props.capitalize ? "uppercase" : "default")};
  ${Utils.margin};

  ${Above.sm`
    font-size: 40px;
  `} ${"" /* Specific to the type animation within the Homepage */} > .ityped-cursor {
    color: #e2a480;
    animation: blink 1100ms linear infinite;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    51% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
`;

export const Subheading = styled.h2`
  color: ${props => (props.color ? `${COPPER}` : `${CHARCOAL}`)};
  font-family: "Apercu Bold", sans-serif;
  font-size: 24px;
  font-size: ${props => props.tiny && "15px"};
  font-size: ${props => props.micro && "12px"};
  margin: 0;
  max-width: ${props => props.maxWidth && `${props.maxWidth}px`};
  letter-spacing: 0.75px;
  text-align: ${props => (props.center ? "center" : "left")};
  text-transform: ${props => (props.capitalize ? "uppercase" : "default")};
  ${Utils.margin};
`;

export const Paragraph = styled.p`
  color: ${props => (props.color ? `${COPPER}` : `${CHARCOAL}`)};
  color: ${props => props.danger && CARMINE};
  display: ${props => props.inline && "inline-block"};
  font-family: ${props => props.strong ? "Apercu Medium" : "Apercu"}, sans-serif;
  font-family: ${props => (props.strong ? "Apercu Medium" : "Apercu")},
    sans-serif;
  font-size: 16px;
  font-size: ${props => props.tiny && "14px"};
  font-size: ${props => props.large && "18px"};
  line-height: 1.6;
  max-width: ${props => props.width && `${props.width}px`};
  opacity: ${props => props.subtle && `.5`};
  padding: ${props => props.padded && "24px"};
  text-align: ${props => props.center ? "center" : "left"};
  text-transform: ${props => props.capitalize ? "uppercase" : "default"};
  ${Utils.margin};

  ${Above.sm`
    font-size: ${props => props.responsive && "18px"}
  `};
`;

export const CodeBlock = styled(Highlight)`
  background: ${PEBBLE};
  border: 1px solid ${FLINT};
  display: block;
  font-family: "Apercu Mono";
  font-size: 13px;
  line-height: 1.7;
  margin: ${props => (props.noMargin ? "0" : "16px 0 24px 0")};
  overflow: scroll;
  padding: 24px;
  &.hljs {
    color: #484444;
  }

  .hljs-keyword,
  .hljs-class {
    color: #5560dd;
  }

  .hljs-string {
    color: #ef5b6c;
  }

  .hljs-attr {
    color: #e4715f;
  }

  .hljs-tag,
  .hljs-function,
  .hljs-params {
    color: #e2a480;
  }

  .hljs-comment {
    color: #939393;
  }
`;
