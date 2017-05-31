import React from "react";
import classNames from "classnames";

export const ButtonGroup = props => {
  const { className, children } = props;

  const styles = classNames({
    ButtonGroup: true,
    [className]: className
  });

  return (
    <div className={styles}>
      {children}
    </div>
  );
};

ButtonGroup.defaultProps = {
  className: "",
  children: null
};
