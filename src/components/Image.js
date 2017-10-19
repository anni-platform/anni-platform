import React, { Component } from "react";
import { preloadImage } from "utils";
import PropTypes from "prop-types";
import { Loader } from "styled";

export class ImageElement extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      error: ""
    };
  }
  componentDidMount() {
    preloadImage(this.props.src)
      .then(() => {
        this.setState({ loaded: true });
      })
      .catch(e => {
        this.setState({ error: "Error loading image" });
      });
  }
  render() {
    const { children } = this.props;
    const { loaded, error } = this.state;

    if (!loaded && !error) {
      return <Loader center />;
    } else if (!!error) {
      return error;
    } else {
      return children;
    }
  }
}
ImageElement.propTypes = {
  src: PropTypes.string.isRequired
};
