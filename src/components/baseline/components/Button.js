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
    nav,
    full,
    className
  } = props;

  const styles = classNames({
    Button: true,
    primary: primary,
    link: link,
    navigation: nav,
    full: full,
    noLabel: !children
  });

  if (to) {
    return (
      <Link
        className={`${styles} ${className}`}
        to={to}>
        {icon && <Icon name={icon} size={12} />}{children}
      </Link>
    )
  }
  else {
    return (
      <a href={href} className={`${styles} ${className}`}>
        {icon && <Icon name={icon} size={12} />}{children}
      </a>
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
