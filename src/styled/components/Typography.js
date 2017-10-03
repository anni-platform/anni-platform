import styled, { injectGlobal } from "styled-components";
import { Above } from "./MediaTemplates";
import { Utils } from "./Utils";
import { COPPER, CHARCOAL } from "./Variables";

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
  font-family: 'Apercu Bold', sans-serif;
  font-size: 32px;
  margin: 0 0 4px 0;
  text-transform: ${props => props.capitalize ? "uppercase" : "default"};
  ${Utils.margin};

  ${Above.sm`
    font-size: 48px;
  `}
`;

export const Subheading = styled.h2`
  color: ${props => props.color ? `${COPPER}` : `${CHARCOAL}`};
  font-family: 'Apercu Bold', sans-serif;
  font-size: 24px;
  font-size: ${props => props.tiny && "15px"};
  font-size: ${props => props.micro && "12px"};
  margin: 0;
  letter-spacing: .75px;
  text-align: ${props => props.center ? "center" : "left"};
  text-transform: ${props => props.capitalize ? "uppercase" : "default"};
  ${Utils.margin};
`;

export const Paragraph = styled.p`
  font-family: ${props => props.strong ? "Apercu Medium" : "Apercu"}, sans-serif;
  font-size: 16px;
  font-size: ${props => props.tiny && "15px"};
  font-size: ${props => props.micro && "12px"};
  line-height: 1.6;
  text-align: ${props => props.center ? "center" : "left"};
  text-transform: ${props => props.capitalize ? "uppercase" : "default"};
  ${Utils.margin};
`;
