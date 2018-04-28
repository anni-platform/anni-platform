import React from "react";
import { PlayerButton, PlayerControls } from "styled";
import { Select } from "components";

export default function Controls(
  {
    audioControls,
    reverse,
    forwards,
    fps,
    onFPSChange,
    pause,
    play,
    next,
    prev,
    isPlaying,
    togglePlay,
    currentFrame,
    loading,
    playAudio,
    toggleAudio,
    volume,
    onVolumeChange
  }
) {
  const eventSequence = sequence => sequence.forEach(event => event && event());
  const playbackToggle = isPlaying ? "pause" : "play";

  return (
    <div>
      {loading
        ? "loading..."
        : <PlayerControls>
            <label>
              frame:
              <strong>{currentFrame}</strong>
            </label>
            <PlayerButton
              onClick={() => eventSequence([pause, prev])}
              action="prev-frame"
            />
            <PlayerButton action={playbackToggle} onClick={togglePlay} />
            <PlayerButton
              onClick={() => eventSequence([pause, next])}
              action="next-frame"
            />
            <Select
              items={["12", "24", "30", "60"]}
              defaultSelectedItem={24}
              onChange={selectedItem => onFPSChange(selectedItem)}
            />

          </PlayerControls>}
    </div>
  );
}
