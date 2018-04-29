import React from "react";
import { PlayerButton, PlayerControls, PlayerSelect } from "styled";

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
    currentFrame, // add this to playback bar tooltip
    playAudio,
    toggleAudio,
    volume,
    onVolumeChange,
    playback
  }
) {
  const eventSequence = sequence => sequence.forEach(event => event && event());
  const playbackToggle = isPlaying ? "pause" : "play";

  return (
    <PlayerControls>
      <PlayerButton
        onClick={() => eventSequence([pause, prev])}
        action="prev-frame"
      />
      <PlayerButton action={playbackToggle} onClick={togglePlay} />
      <PlayerButton
        onClick={() => eventSequence([pause, next])}
        action="next-frame"
      />
      {playback
        ? <PlayerSelect
            label="NOW PLAYING"
            defaultSelectedItem="GW_intro_R1"
            items={["GW_intro_SFX_R1", "GW_intro_SFX_R2", "GW_intro_SFX_R3"]}
            disabled
          />
        : <PlayerSelect
            label="VIDEO TRACK"
            items={["GW_intro_R1", "GW_intro_R2", "GW_intro_R3"]}
            defaultSelectedItem="GW_intro_R1"
          />}
      {!playback &&
        <PlayerSelect
          label="AUDIO TRACK"
          items={["GW_intro_SFX_R1", "GW_intro_SFX_R2", "GW_intro_SFX_R3"]}
          defaultSelectedItem="GW_intro_SFX_R1"
        />}
      {!playback &&
        <PlayerSelect
          label="FRAMERATE"
          items={["12", "24", "30", "60"]}
          maxWidth={160}
          defaultSelectedItem={24}
          onChange={selectedItem => onFPSChange(selectedItem)}
        />}
      <PlayerButton action="sound" />
      <PlayerButton action="popout" noBorder />

    </PlayerControls>
  );
}
