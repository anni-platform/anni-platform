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
    icon,
    readOnly,
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
        readOnly={readOnly}
      />
    </FieldGroup>
  );
};

export const Input = props => {
  
  const {
    className,
    onChange,
    placeholder,
    readOnly,
    value,
    icon,
    ...rest,
  } = props;

  const styles = classNames({
    [className]: className
  });

  return (
    <FieldGroup icon>
      {icon && <OutlineIcon color name={icon} size={24} />}
      <input
        {...rest}
        className={styles}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
      />
    </FieldGroup>
  );
};
