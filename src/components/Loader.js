import React from "react";
import classNames from "classnames";

export const BaseLoader = ({ center, fullPage, size, className }) => {
  const styles = classNames({
    center: center,
    fullPage: fullPage,
    [className]: className
  });

  return (
    <div className={styles}>
      <svg viewBox="0 0 48 48" id={name} width={size} height={size}>
        <circle className="loaderPath" cx={size} cy={size} r="21" />
      </svg>
    </div>
  );
};

BaseLoader.defaultProps = {
  center: false,
  fullPage: false,
  size: 24,
  style: {}
};
