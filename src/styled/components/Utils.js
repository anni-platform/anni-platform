import { css } from "styled-components";

export const Utils = {
  margin: (...args) => css`
    margin-top: ${props => props.mt ? `${props.mt}px` : "0"};
    margin-right: ${props => props.mr ? `${props.mr}px` : "0"};
    margin-bottom: ${props => props.mb ? `${props.mb}px` : "0"};
    margin-left: ${props => props.ml ? `${props.ml}px` : "0"};
  `,

  padding: (...args) => css`
    padding-top: ${props => props.pt ? `${props.pt}px` : "0"};
    padding-right: ${props => props.pr ? `${props.pr}px` : "0"};
    padding-bottom: ${props => props.pb ? `${props.pb}px` : "0"};
    padding-left: ${props => props.pl ? `${props.pl}px` : "0"};
  `
};
