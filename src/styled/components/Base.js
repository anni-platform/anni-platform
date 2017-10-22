import styledNormalize from "styled-normalize";
import { injectGlobal } from "styled-components";

/*
 * Globals
 */

export const GlobalStyles  =
injectGlobal`
  ${styledNormalize}

  body {
    .dragHelper {
      .content {
        transform: scale(2);
      }
    }
  }
`;
