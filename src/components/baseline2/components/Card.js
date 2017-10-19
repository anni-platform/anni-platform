import React from 'react';
import classNames from "classnames";

export const Card = ({ children, className }) => {

  const styles = classNames({
    Card: true,
    [className]: className
  });

  return (
    <div className={styles}>
      {children}
    </div>
  )
}
