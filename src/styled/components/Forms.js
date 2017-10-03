import styled from "styled-components";
import {
  HAZEL,
  COPPER,
  FLINT,
  CHARCOAL,
  CONCRETE,
  PAPER,
  EASE_OUT_BACK,
  EASE_OUT_EXPO
} from "./Variables";
import { TextArea as BaseTextArea } from "components/Forms";
import { Utils } from "./Utils";

export const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${FLINT};
  color: ${CHARCOAL};
  font-family: ${props => props.subheading ? "Apercu Bold" : "Apercu"};
  font-size: ${props => props.subheading ? "24px" : "16px"};
  height: 30px;
  padding-left: ${props => props.icon && "56px"};
  position: relative;
  transition: 200ms ${EASE_OUT_EXPO};
  width: 100%;
  ${Utils.margin};

  &:hover {
    border-color: ${HAZEL};
  }

  &:focus {
    border-color: ${COPPER};
    outline: none;
  }

  ::placeholder {
    color: ${CONCRETE}
  }
`;

export const TextArea = styled(BaseTextArea)`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${FLINT};
  color: ${CHARCOAL};
  font-family: ${props => props.subheading ? "Apercu Bold" : "Apercu"};
  font-size: ${props => props.subheading ? "24px" : "16px"};
  height: 30px;
  position: relative;
  resize: none;
  transition: 200ms ${EASE_OUT_EXPO};
  width: 100%;

  &:hover {
    border-color: ${HAZEL};
  }

  &:focus {
    border-color: ${COPPER};
    outline: none;
  }

  ::placeholder {
    color: ${CONCRETE}
  }

  &.imageItem {
    background: ${PAPER};
    line-height: 2.2;
    min-height: 0;
    max-height: 50px;
    padding: 12px 16px 16px 16px;
    padding-left: ${props => props.icon && "56px"};
    position: relative;
    transition: min-height 200ms ${EASE_OUT_BACK};
    transform: translate3d(0, 0, 0);
  }

  &:focus,
  &:hover {
    line-height: 1.6;
    min-height: 50px;
    padding: 16px;
    padding-left: ${props => props.icon && "56px"};
  }
`;

export const FormGroup = styled.form`
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: ${props => props.stacked && "column"};
  justify-content: center;
  position: relative;
`;

export const FieldGroup = styled.div`
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: ${props => props.stacked && "column"};
  justify-content: ${props => props.center && "center"};
  position: relative;

  ${/* Styles for text areas with icons */ ""}
  svg {
    left: 16px;
    position: absolute;
    z-index: 2;
  }
`;

export const Label = styled.label`
  align-items: center;
  color: ${CONCRETE};
  cursor: pointer;
  display: flex;
  font-family: "Apercu Bold";
  font-size: ${props => props.micro && "12px"};
  justify-content: flex-end;
  letter-spacing: 1px;
  transition: 400ms ${EASE_OUT_EXPO};
  text-transform: ${props => props.capitalize ? "uppercase" : "default"};
  transform-origin: right;
  ${Utils.margin};

  &:hover {
    transform: scale(1.05);
  }

  &.checked {
    color: ${CHARCOAL};
  }
`;

export const Radio = styled.input.attrs({
  type: "radio"
})`
  position: ${props => props.hide ? "hidden" : "inherit"};
  ${Utils.margin};
`;
