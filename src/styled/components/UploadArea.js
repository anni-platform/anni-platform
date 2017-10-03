import styled from "styled-components";
// import { Above } from "./MediaTemplates";

import { CONCRETE, COPPER, EASE_OUT_EXPO } from "./Variables";

export const UploadArea = styled.div`
  .FileUploader {
    outline: 2px dashed ${CONCRETE};
    outline-offset: -6px;
    padding: 24px;
    transition: 300ms ${EASE_OUT_EXPO};
  }

  .FileUploader.active {
    outline-color: ${COPPER};
    outline-offset: 0;
    transition: 300ms ${EASE_OUT_EXPO};

    .ImageList {
      transition: 300ms ${EASE_OUT_EXPO};
      opacity: .3
    }
  }
`;
