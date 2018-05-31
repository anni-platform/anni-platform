import { css } from 'styled-components';
import { breakpointSizes as sizes } from 'constants/index';

// Media Templates
export const Above = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});
