import React from "react";
import PropTypes from "prop-types";
import { Paragraph } from "styled";

export default function LoadingProgress(
  {
    loadingComplete,
    totalLoaded,
    totalFramesToLoad
  }
) {
  return !loadingComplete
    ? <Paragraph>{totalLoaded} of {totalFramesToLoad} frames loaded...</Paragraph>
    : null;
}

LoadingProgress.propTypes = {
  loadingComplete: PropTypes.bool.isRequired,
  totalLoaded: PropTypes.number.isRequired,
  totalFramesToLoad: PropTypes.number.isRequired
};
