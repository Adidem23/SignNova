import { useRef, useState, useEffect } from 'react';
import * as handpose from '@tensorflow-models/handpose';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import { drawHand } from "./utilities";
import './PoseFinal.css';
import GoToTop from '../Components/GoToTop';
import { abi } from '../Components/Input.json';
import { bytecode } from '../Components/Input.json';
import { ethers } from 'ethers';
import axios from 'axios';

const PoseFinal = () => {

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [Gesture, setGesture] = useState('');
    const [MintNFT, setMintNFT] = useState(false)
    const [Activewebcam, setActivewebcam] = useState(true);
    const [Disabled, setDisabled] = useState(false);
    const [Deployed, setDeployed] = useState(false);
    const [FileSubmitted, setFileSubmitted] = useState("");
    const [ContractAddress, setContractAddress] = useState("");
    const [NFTImage, setNFTImage] = useState("");
    let count = 0;

    useEffect(() => {
        runHandpose();
    }, []);

    const runHandpose = async () => {
        await tf.setBackend("webgl");
        const net = await handpose.load();

        setInterval(() => {
            detectHandGestures(net);
        }, 100)

    }

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
            console.log(handEstimations[0].annotations)
            const ctx = canvasRef.current.getContext("2d");

            if (handEstimations.length > 0) {
                detectGesture(handEstimations[0].landmarks);
                drawHand(handEstimations, ctx);
            } else {
                setGesture("")
            }
        }

    };

    const detectGesture = (landmarks) => {
        const thumbUpThreshold = 0.7;
        const thumbIsUp = landmarks[4][1] < landmarks[3][1] && landmarks[4][1] < landmarks[2][1];

        if (thumbIsUp && landmarks[4][1] < thumbUpThreshold * landmarks[0][1]) {

            setGesture('👍 Thumbs Up');
            setActivewebcam(false);
            const canvasdiv = document.getElementById('canvas');
            canvasdiv.style.display = "none";
            setDisabled(true);
        }
        else {
            setGesture("🤚Normal Hand");
            count++;
            if (count > 50) {
                setMintNFT(true)
                setActivewebcam(false);
                const canvasdiv = document.getElementById('canvas');
                canvasdiv.style.display = "none";
                setDisabled(false);

            }

        }

    }

    const FileInputSubmitted = async (e) => {
        setFileSubmitted(e.target.value);
    }

    const PostFile = async (e) => {
        e.preventDefault();
        try {
            axios.post("http://localhost:6789/file", { file: FileSubmitted }, { withCredentials: true }).then(async (res) => {
                await DeployContract();
                console.log(res.data);
            }).catch((err) => {
                console.log(`Error is Ocuured ${err}`)
            })
        } catch (err) {
            console.log(`Error is Ocuured ${err}`)
        }

    }
    const DeployContract = async () => {

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        console.log(provider, signer);
        const factory = new ethers.ContractFactory(abi, bytecode, signer);
        console.log(factory);
        const contract = await factory.deploy({gasLimit: Infinity});
        setDeployed(true);
        const ContractAddressDeployed = await contract.getAddress();
        setContractAddress(ContractAddressDeployed);
        console.log("Here Is Deployed Contract Address" + await contract.getAddress());
    }


    const MintNFTWithThirdweb = async () => {

    }


    return (
        <>

            {!Disabled && !MintNFT ? <div className='container3' id='cont3'>
                <p>👍 For Deployment  and 🤚For Minting NFT</p>
                <p>Your Gesture is : <span id='span'>{Gesture}</span></p>
                <a href='https://www.loom.com/share/87013f63230e4d0aabe70a637c99db42?sid=9dc29750-a114-4c39-b3d0-95f48bd9d03a' target='_blank' rel="noreferrer" >Watch Video</a>
            </div> : <>
                {MintNFT ? <div className='container3' id='cont3'>
                    <p>MintNFT</p>
                    <a href='https://www.loom.com/share/87013f63230e4d0aabe70a637c99db42?sid=9dc29750-a114-4c39-b3d0-95f48bd9d03a' target='_blank' rel="noreferrer" >How to Mint??</a>
                </div> : <>  <div className='container3' id='cont3'>
                    <p>Deploy Contract</p>
                    <a href='https://www.loom.com/share/87013f63230e4d0aabe70a637c99db42?sid=9dc29750-a114-4c39-b3d0-95f48bd9d03a' target='_blank' rel="noreferrer" >How to Deploy??</a>
                </div>   </>}
            </>}

            {MintNFT && <>
                <div style={{ display: "block", margin: "auto", width: "fit-content", }}>
                    <label className="custum-file-upload" htmlFor="file">
                        <div className="icon">

                        </div>
                        <div className="text">
                            <span>Click to upload image</span>
                        </div>
                        <input type="file" id="file" onChange={(e) => { setNFTImage(e.target.value) }} value={NFTImage} />
                    </label>

                    <br />
                    <br />

                    <button className='but2' onClick={MintNFTWithThirdweb}>Mint</button>
                </div>
            </>}

            <div className='container2'>

                {Disabled && <div style={{ display: "block", margin: "auto", width: "fit-content" }}>

                    <textarea style={{ width: "400px", height: "200px", resize: "none" }} placeholder='Enter Your contract Here' value={FileSubmitted} onChange={FileInputSubmitted} ></textarea>

                    <br />
                    <br />

                    {Deployed && <p>Contract Deployed Address:{ContractAddress}</p>}

                    <br />
                    <br />

                    <button className='but2' onClick={PostFile}>Deploy</button>

                </div>}

                {Activewebcam && <div className="game-section">

                    <div className="card12" id='webcam1'>

                        <div className="card-content12">
                            <p className="card-title12">Gesture</p>
                            <p className="card-title12">{Gesture}</p>
                        </div>
                    </div>

                    <div className="webcam-container" id='Wert'>

                        <Webcam style={{ marginLeft: "100px", marginTop: "100px", zIndex: "9" }} ref={webcamRef} className='overlay' />

                        <canvas ref={canvasRef} className='overlay' style={{ marginLeft: "100px", marginTop: "-700px", marginBottom: "24px", zIndex: "9" }} id='canvas' />


                    </div>

                </div>}

            </div>

            <GoToTop />
        </>
    )
}

export default PoseFinal