import React, { useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const AudioWaveform = ({ audioUrl, isPlaying }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    // Initialize WaveSurfer instance
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#A8DBA8",
      progressColor: "#3B8686",
      height: 100,
      responsive: true,
      normalize: true,
    });

    // Load the audio file
    wavesurferRef.current.load(audioUrl);

    // Cleanup on unmount
    return () => wavesurferRef.current.destroy();
  }, [audioUrl]);

  // Play or pause the audio based on the isPlaying prop
  useEffect(() => {
    if (isPlaying) {
      wavesurferRef.current.play();
    } else {
      wavesurferRef.current.pause();
    }
  }, [isPlaying]);

  return <div ref={waveformRef} />;
};

export default AudioWaveform;