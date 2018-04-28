import React from "react";
import { SolidIcon } from "styled";

export const _PlayerButton = props => {
  const {
    className,
    action,
    onClick
  } = props;

  return (
    <button className={className} onClick={onClick}>
      <SolidIcon name={action} />
    </button>
  );
};
