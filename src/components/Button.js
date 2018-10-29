import React from "react";
import classNames from "classnames";
import { Link } from "react-router";
import { OutlineIcon } from "styled";

export const BaseButton = props => {
  const {
    active,
    children,
    className,
    disabled,
    href,
    icon,
    to,
    onClick,
    initial
  } = props;

  const styles = classNames({
    active: active,
    [className]: className,
  });

  if (to) {
    return (
      <Link to={to} className={styles} onClick={onClick}>
        {icon && <OutlineIcon name={icon} />}
        {initial && <span>{initial}</span>}
        {children}
      </Link>
    );
  } else if (href) {
    return (
      <a href={href} className={styles} onClick={onClick} >
        {icon && <OutlineIcon name={icon} />}
        {initial && <span>{initial}</span>}
        {children}
      </a>
    );
  } else {
    return (
      <button className={styles} disabled={disabled} onClick={onClick}>
        {icon && <OutlineIcon name={icon} />}
        {initial && <span>{initial}</span>}
        {children}
      </button>
    );
  }
};
