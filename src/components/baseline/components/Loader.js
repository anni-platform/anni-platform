import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export class Loader extends Component {
  static propTypes = {
    center: PropTypes.bool,
    fullPage: PropTypes.bool,
    size: PropTypes.number
  };

  static defaultProps = {
    center: false,
    fullPage: false,
    size: 24,
    style: {}
  };

  render() {
    const { center, fullPage, size } = this.props;

    const styles = classNames({
      Loader: Loader,
      center: center,
      fullPage: fullPage
    });

    return (
      <div className={styles}>
        <svg viewBox="0 0 48 48" id={name} width={size} height={size}>
          <circle className="loaderPath" cx={size} cy={size} r="21" />
        </svg>
      </div>
    );
  }
}
