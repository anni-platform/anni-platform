import styled from "styled-components";
import { CHARCOAL, CONCRETE } from "./Variables";

export const EditorContainer = styled.div`
  .DraftEditor-root .content span {
  	line-height: 1.6;
  }

  .DraftEditor-root {
  	font-family: "Apercu Mono";
  	font-size: 18px;
  	line-height: 1.6;
  	position: relative;
    z-index: 2;
  }

  .DraftEditor-editorContainer {
  	color: ${CHARCOAL};
  }

  .public-DraftEditorPlaceholder-root {
    color: ${CONCRETE};
    position: absolute;
    top: 0;
    width: 300px;
  }

`;
