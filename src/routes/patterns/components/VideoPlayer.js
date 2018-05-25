import React, { Component } from "react";
import CanvasImageScrubber from "canvas-image-scrubber";
import { PlayerViewer, Player } from "styled";

import Controls from "components/VideoPlayer/Controls";
import LoadingProgress from "components/VideoPlayer/LoadingProgress";
import ProgressBar from "components/VideoPlayer/ProgressBar";

export function getFrames() {
  let i = 0;
  const frames = [];
  while (i < 119) {
    frames.push(require(`media/animation/animation_${i}.jpg`));
    i++;
  }
  return frames;
}
const frames = getFrames();

export default class VideoPlayer extends Component {
  render() {
    return (
      <CanvasImageScrubber
        frames={frames}
        render={(
          {
            getViewerControlsProps,
            getViewerProgressProps,
            loadingProgress,
            renderViewer
          }
        ) => {
          return (
            <Player>
              <PlayerViewer>
                {renderViewer}
                <LoadingProgress {...loadingProgress} />
                <ProgressBar {...getViewerProgressProps()} />
              </PlayerViewer>
              <Controls {...getViewerControlsProps()} />
            </Player>
          );
        }}
        sprite
        spriteKey="huzzahSprite"
        spriteLoadCallback={img => {
          console.log("Upload file blob somewhere: ", img);
        }}
      />
    );
  }
}
