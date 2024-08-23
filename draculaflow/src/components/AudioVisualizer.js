import React, { useRef, useEffect, useState } from 'react';

function AudioVisualizer() {
    const canvasRef = useRef(null);
    const [audioContext, setAudioContext] = useState(null);
    const [analyser, setAnalyser] = useState(null);
    const [source, setSource] = useState(null);
    const [audioElement, setAudioElement] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Loads all mp3 or wav files in the sounds folder
    const requireContext = require.context('../assets/sounds', false, /\.(mp3|wav)$/);
    const sounds = requireContext.keys().map(requireContext);

    // Initialize AudioContext and AnalyserNode
    useEffect(() => {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(context);

        const analyserNode = context.createAnalyser();
        analyserNode.fftSize = 128;
        analyserNode.smoothingTimeConstant = .2;
        setAnalyser(analyserNode);

        return () => {
            if (context) {
                context.close();
            }
        };
    }, []);

    // Set up canvas drawing for centered waveform
    useEffect(() => {
        if (!analyser || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);


        // Function to update canvas size
        // const updateCanvasSize = () => {
        //     if (canvas) {
        //         // Get the size from CSS
        //         const width = canvas.clientWidth;
        //         const height = canvas.clientHeight;

        //         // Set internal canvas size
        //         canvas.width = width;
        //         canvas.height = height;
        //     }
        // };

        // Update size on component mount
        // updateCanvasSize();
        
        const draw = () => {
            requestAnimationFrame(draw);
           
            // Clear the entire canvas to maintain transparency and remove old frame
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

            analyser.getByteFrequencyData(dataArray);

            canvasCtx.fillStyle = '#333';
            // canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

            const centerY = canvas.height / 2;
            const maxHeight = centerY - 80; // Adjust as needed to avoid canvas edge

            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = '#d4d4d4';
            canvasCtx.beginPath();

            const sliceWidth = canvas.width / bufferLength;
            let x = 0;


            // Define the frequency range you want to display
            const minFrequency = 0; // Minimum frequency in Hz
            const maxFrequency = 44100; // Maximum frequency in Hz

            // Calculate the index range for the desired frequency range
            const nyquist = 44100 / 2; // Assuming a sample rate of 44100 Hz
            const minIndex = Math.floor((minFrequency / nyquist) * bufferLength);
            const maxIndex = Math.floor((maxFrequency / nyquist) * bufferLength);

            // Ensure the index range is within bounds
            const start = Math.max(minIndex, 0);
            const end = Math.min(maxIndex, bufferLength);


            
            for (let i = start; i < end; i++) {
                const v = dataArray[i] / 128.0; // Normalize data
                const y = v * maxHeight;

                canvasCtx.moveTo(x, centerY - y);
                canvasCtx.lineTo(x, centerY + y);

                x += sliceWidth * 1.4;
            }

            canvasCtx.stroke();
        };

        draw();

    }, [analyser]);

    // Handle audio playback and visualization
    const playAudio = () => {
        
        if (audioContext && !isPlaying) {
            const audio = new Audio(sounds[Math.floor(Math.random() * sounds.length)]);
            const sourceNode = audioContext.createMediaElementSource(audio);
            sourceNode.connect(analyser);
            analyser.connect(audioContext.destination);

            setAudioElement(audio);
            setSource(sourceNode);
            setIsPlaying(true);

            audio.play().catch(error => console.error("Error playing audio:", error));

            audio.onended = () => {
                setIsPlaying(false);
            };
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <canvas ref={canvasRef} width="300%"  maxWidth= '500px' height={200} ></canvas>
            <button className="button-34" onClick={playAudio}>
                Play Quote
            </button>
        </div>
    );
}

export default AudioVisualizer;