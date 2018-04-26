import React, {Component} from 'react'
import {render} from 'react-dom';
import CanvasImageScrubber from "canvas-image-scrubber";
import Controls from './components/Controls';
import ProgressBar from './components/ProgressBar';
import LoadingProgress from './components/LoadingProgress';

export function getFrames() {
  let i = 1;
  const frames = [];
  while (i < 120) {
    frames.push(require(`media/animation/animation_${i}.jpg`));
    i++;
  }
  return frames;
}

const frames = getFrames();

export default class VideoPlayer extends Component {
  render() {
    return <div>
      <CanvasImageScrubber
        frames={frames}
        render={({
          getViewerControlsProps,
          getViewerProgressProps,
          loadingProgress,
          renderViewer,
        }) => {
          return (
            <div>
              <div style={{ maxWidth: 300 }}>
                {renderViewer}
                <ProgressBar {...getViewerProgressProps()} />
              </div>
              <LoadingProgress {...loadingProgress} />
              <Controls {...getViewerControlsProps()} />
            </div>
          )
        }}
        sprite
        spriteKey="huzzahSprite"
        spriteLoadCallback={img => {
          console.log('Upload file blob somewhere: ', img);
        }}
      />
    </div>
  }
}
