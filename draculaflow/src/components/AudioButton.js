import React, { useRef } from 'react';
// import sound1 from '../assets/sounds/DF1_1.mp3'
// import sound2 from '../assets/sounds/DF1_2.mp3'
// import sound3 from '../assets/sounds/DF1_3.mp3'

function AudioButton() {

    // Ref to keep track of the currently playing audio
    const audioRef = useRef(null);
    // Array of sound file paths
    // const sounds = [sound1, sound2, sound3];

    const requireContext = require.context('../assets/sounds', false, /\.(mp3|wav)$/);
    const sounds = requireContext.keys().map(requireContext);

    // Function to play the audio
    const playRandomAudio = () => {

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Reset playback position
        }
        const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
        const audio = new Audio(randomSound);
        // const audio = new Audio('./sounds/DF1_1.mp3'); // Path to your audio file
        audioRef.current = audio;
        audio.play().catch(error => {
            console.error("Error playing audio:", error);
            });
    };

    return (
        <div>
           
            <button  class="button-34" role="button" onClick={playRandomAudio}>Play Quote</button>


        </div>
    );
}

export default AudioButton;