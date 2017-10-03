import { css } from "styled-components";

const sizes = {
  xl: 1600,
  lg: 1200,
  md: 960,
  sm: 570
};

// Media Templates
export const Above = Object.keys(sizes).reduce(
  (acc, label) => {
    acc[label] = (...args) => css`
		@media (min-width: ${sizes[label] / 16}em) {
			${css(...args)}
		}
    `;
    return acc;
  },
  {}
);
