import React, { Component } from "react";
import CanvasImageScrubber from "canvas-image-scrubber";
import { PlayerViewer } from "styled";
import Controls from "./components/Controls";
import LoadingProgress from "./components/LoadingProgress";
import ProgressBar from "./components/ProgressBar";

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
            <div>
              <PlayerViewer>
                {renderViewer}
                <ProgressBar {...getViewerProgressProps()} />
              </PlayerViewer>
              <LoadingProgress {...loadingProgress} />
              <Controls {...getViewerControlsProps()} playback />
            </div>
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
