import { useRef, useState, useEffect } from 'react';
import * as handpose from '@tensorflow-models/handpose';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import { drawHand } from "./utilities";

function Pose() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [gesture, setGesture] = useState('');

    useEffect(() => {
        runHandpose();
    }, []);

    const runHandpose = async () => {
        await tf.setBackend("webgl");
        const net = await handpose.load();
        setInterval(() => {
            detectHandGestures(net);
        }, 100);
    };

    const detectHandGestures = async (net) => {
        if (
            webcamRef.current &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = webcamRef.current.video;
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            video.width = videoWidth;
            video.height = videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const handEstimations = await net.estimateHands(video);

            const ctx = canvasRef.current.getContext("2d");

            if (handEstimations.length > 0) {
                detectGesture(handEstimations[0].landmarks);
                drawHand(handEstimations, ctx);
            }
        }

    };

    const detectGesture = (landmarks) => {
        const thumbUpThreshold = 0.7;
        const thumbIsUp = landmarks[4][1] < landmarks[3][1] && landmarks[4][1] < landmarks[2][1];

        if (thumbIsUp && landmarks[4][1] < thumbUpThreshold * landmarks[0][1]) {
            setGesture('👍 Thumbs Up');
        } else {
            setGesture(" ");
        }

    };


    return (
        <div className="App">
            <h1>Gesture Detection</h1>
            <Webcam
                ref={webcamRef}
                className="webcam"
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zIndex: 9,
                    width: 640,
                    height: 480,
                }}
            />
            <canvas
                ref={canvasRef}
                className="canvas"
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zIndex: 9,
                    width: 640,
                    height: 480,
                }}
            />
            <div className="gesture">{gesture}</div>
        </div>
    );
}

export default Pose;