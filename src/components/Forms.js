import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import { FieldGroup, OutlineIcon } from "styled";

export const TextArea = props => {
  const {
    className,
    feedback,
    onChange,
    placeholder,
    value,
    imageItem,
    icon,
    readOnly,
    sidebar
  } = props;

  const styles = classNames({
    imageItem: imageItem,
    feedback: feedback,
    sidebar: sidebar,
    [className]: className,
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
    onBlur,
    onChange,
    placeholder,
    readOnly,
    value,
    icon,
    type,
  } = props;

  const styles = classNames({
    [className]: className,
  });

  const allowedProps = Object.keys(props).reduce((acc, prop) => {
    const filteredProps = { ...acc };
    if (
      !!["onKeyPress", "onKeyDown", "onKeyUp", "onFocus"].find(p => p === prop)
    ) {
      filteredProps[prop] = props[prop];
    }
    return filteredProps;
  }, {});

  const handleBlur = e => {
    if (onBlur) {
      onBlur(e.target.value);
    }
  }

  return (
    <FieldGroup icon>
      {icon && <OutlineIcon color name={icon} size={24} />}
      <input
        {...allowedProps}
        className={styles}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onBlur={handleBlur}
        type={type}
      />
    </FieldGroup>
  );
};

Input.propTypes = {
  onBlur: PropTypes.func,
};
