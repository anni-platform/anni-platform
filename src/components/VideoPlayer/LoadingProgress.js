import React from "react";
import PropTypes from "prop-types";
import { Container, Loader, Paragraph, PlayerLoader } from "styled";

export default function LoadingProgress(
  {
    loadingComplete,
    totalLoaded,
    totalFramesToLoad
  }
) {
  return !loadingComplete
    ? <PlayerLoader>
        <Container stacked>
          <Loader center />
          <Paragraph>
            {totalLoaded} of {totalFramesToLoad} frames loaded...
          </Paragraph>
        </Container>
      </PlayerLoader>
    : null;
};

LoadingProgress.propTypes = {
  loadingComplete: PropTypes.bool.isRequired,
  totalLoaded: PropTypes.number.isRequired,
  totalFramesToLoad: PropTypes.number.isRequired
};
