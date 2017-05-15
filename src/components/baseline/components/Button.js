import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames'

import { Icon } from 'components/baseline'

export const Button = props => {

  const {
    children,
    href,
    icon,
    to,
    primary,
    link,
    large,
    nav,
    full,
    onClick,
    user,
    className
  } = props;

  const styles = classNames({
    Button: true,
    primary,
    link,
    large,
    navigation: nav,
    full,
    user,
    noLabel: !children
  });

  if (to) {
    return (
      <Link
        className={`${styles} ${className}`}
        to={to}
        onClick={onClick}>
        {icon && <Icon name={icon} size={12} />}{children}
      </Link>
    )
  } else if (href) {
    return (
      <a
        href={href}
        className={`${styles} ${className}`}
        onClick={onClick}>
        {icon && <Icon name={icon} size={12} />}{children}
      </a>
    )
  }
  else {
    return (
      <button
        href={href}
        className={`${styles} ${className}`}
        onClick={onClick}>
        {icon && <Icon name={icon} size={12} />}{children}
      </button>
    )
  }
}

Button.defaultProps = {
  children: null,
  href: null,
  icon: null,
  to: null,
  primary: false,
  link: false,
  nav: false,
  full: false,
  className: ""
}
