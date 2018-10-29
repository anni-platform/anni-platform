import styled from "styled-components";
import _Avatar from "components/Avatar";
import { Utils } from "./Utils";
import { COPPER, PAPER } from "./Variables";

export const Avatar = styled(_Avatar)`
  align-items: center;
  background: ${COPPER};
  border-radius: 100px;
  color: ${PAPER};
  cursor: pointer;
  display: flex;
  font-family: 'Apercu Bold', sans-serif;
  justify-content: center;
  font-size: 18px;
  height: 40px;
  min-width: 40px;
  padding: 0;
  position: relative;
  ${Utils.margin};
`;
