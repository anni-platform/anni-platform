import React from "react";
import classNames from "classnames";
import { FieldGroup, OutlineIcon } from "styled";

export const TextArea = props => {
  const {
    className,
    onChange,
    placeholder,
    value,
    imageItem,
    icon
  } = props;

  const styles = classNames({
    imageItem: imageItem,
    [className]: className
  });

  return (
    <FieldGroup icon>
      {icon && <OutlineIcon color name={icon} size={24} />}
      <textarea
        className={styles}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </FieldGroup>
  );
};

export const Input = props => {
  const {
    className,
    onChange,
    placeholder,
    value
  } = props;

  return (
    <input
      className={className}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
};
