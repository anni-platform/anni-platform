import styledNormalize from "styled-normalize";
import { injectGlobal } from "styled-components";
import { PAPER } from "./Variables";

/*
 * Globals
 */

export default () => injectGlobal`
  ${styledNormalize}

  body {
    -ms-overflow-style: -ms-autohiding-scrollbar;
    background-color: ${PAPER};

    .dragHelper {
      .content {
        transform: scale(2);
      }
    }
  }
`;
