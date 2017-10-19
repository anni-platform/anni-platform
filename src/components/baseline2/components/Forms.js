import React from "react";
import classNames from "classnames";
import { Icon } from "components/baseline";

export const TextArea = props => {
  const {
    className,
    heading,
    imageItem,
    icon,
    onChange,
    placeholder,
    subheading,
    value
  } = props;

  const styles = classNames({
    TextArea: true,
    [className]: className,
    heading,
    subheading,
    imageItem
  });

  return (
    <div className={styles}>
      {icon && <Icon name={icon} size={24} />}
      <textarea
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};
