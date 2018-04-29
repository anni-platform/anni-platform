import React from "react";
import { PlayerTrack } from "styled";

export default function ProgressBar(
  {
    min,
    max,
    value,
    onChange
  }
) {
  return (
    <PlayerTrack
      style={{ width: "100%" }}
      list="progress"
      step={1}
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={e => onChange(parseInt(e.target.value, 10))}
    />
  );
}
