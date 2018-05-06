import styled from "styled-components";
import {
  CARMINE,
  HAZEL,
  COPPER,
  FLINT,
  CHARCOAL,
  CONCRETE,
  PEBBLE,
  PAPER,
  EASE_OUT_BACK,
  EASE_OUT_EXPO,
} from "./Variables";
import { TextArea as BaseTextArea } from "components/Forms";
import { Input as BaseInput } from "components/Forms";
import { Above } from "./MediaTemplates";
import { Utils } from "./Utils";

const inputPadding = `4px 0`;
const inputHeight = "30px";
const selectInputPadding = "4px";

export const Input = styled(BaseInput)`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${FLINT};
  border-color: ${props => props.danger && CARMINE};
  color: ${CHARCOAL};
  font-family: ${props => (props.subheading ? "Apercu Bold" : "Apercu")};
  font-size: ${props => (props.subheading ? "24px" : "16px")};
  height: ${inputHeight};
  padding: ${props => (props.select ? selectInputPadding : inputPadding)};
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
    color: ${CONCRETE};
  }
`;

export const Select = styled.div`
  position: relative;

  #chevron-down {
    fill: ${props => (props.rotateIcon ? COPPER : CONCRETE)};
    position: absolute;
    right: 12px;
    top: calc(50% - 12px);
    transform: ${props => props.rotateIcon && "rotate(180deg)"};
    transition: transform 400ms ${EASE_OUT_EXPO};
  }
`;

export const SelectOptions = styled.div`
  background-color: ${PAPER};
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 165px;
  overflow-y: auto;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.5);
`;

export const SelectOption = styled.div`
  background-color: ${props => (props.active ? PEBBLE : PAPER)};
  font-family: "Apercu";
  font-size: "16px";
  height: ${inputHeight};
  line-height: ${inputHeight};
  padding: ${selectInputPadding};
  border-bottom: 1px solid ${FLINT};
`;

export const TextArea = styled(BaseTextArea)`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${FLINT};
  color: ${CHARCOAL};
  font-family: ${props => (props.subheading ? "Apercu Bold" : "Apercu")};
  font-size: ${props => (props.subheading ? "24px" : "16px")};
  height: ${props => (props.height ? `${props.height}px` : "30px")};
  line-height: 1.6;
  min-height: 0;
  position: relative;
  padding-left: ${props => props.icon && "56px"};
  resize: none;
  transition: 200ms ${EASE_OUT_EXPO};
  transition: min-height 200ms ${EASE_OUT_BACK};
  width: 100%;

  &:hover {
    border-color: ${HAZEL};
  }

  &:focus {
    border-color: ${COPPER};
    outline: none;
  }

  ::placeholder {
    color: ${CONCRETE};
  }

  &.imageItem {
    background: ${PAPER};
    line-height: 2.2;
    max-height: 50px;
    padding: 12px 16px 16px 16px;
    padding-left: ${props => props.icon && "56px"};
    position: relative;
    transform: translate3d(0, 0, 0);

    &:focus,
    &:hover {
      line-height: 1.6;
      padding: 16px;
      padding-left: ${props => props.icon && "56px"};
    }
  }

  &:focus,
  &:hover {
    min-height: 50px;
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
  ${Utils.margin};
`;

export const FieldGroup = styled.div`
  align-items: stretch;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.center && "center"};
  position: relative;
  ${Utils.margin};

  ${Above.sm`
    align-items: center;
    flex-direction: ${props => (props.stacked ? "column" : "row")};
  `} ${/* Styles for text areas with icons */ ""} svg {
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
  text-transform: ${props => (props.capitalize ? "uppercase" : "default")};
  transform-origin: right;
  ${Utils.margin};

  span {
    display: ${props => (props.hide ? "none" : "block")};
    ${Above.lg`
      display: block;
    `};
  }

  &:hover {
    transform: scale(1.05);
  }

  &.checked {
    color: ${CHARCOAL};
  }
`;

export const Radio = styled.input.attrs({
  type: "radio",
})`
  position: ${props => (props.hide ? "hidden" : "inherit")};
  ${Utils.margin};
`;
