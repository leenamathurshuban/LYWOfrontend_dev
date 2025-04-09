import { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaPlay, FaPause, FaStop, FaUpload, FaTrash, FaVolumeUp, FaEllipsisH, FaVolumeMute } from "react-icons/fa";
import axios from "axios";
import AudioLines from "../images/icons/audio_lines.svg";
import AudioLines2 from "../images/icons/audio_lines2.svg";
const AudioRecorder = ({ sectionIndex, itemIndex, questionId, type, QuizData, setQuizData, setQuestionId, setGetKeyIndex, isLoading, isActiveSubmit, setIsActiveSubmit }) => {
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioURL, setAudioURL] = useState("");
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [uploading, setUploading] = useState(false);
    // const [isActiveSubmit,setIsActiveSubmit] = useState(false);
    const recordedChunks = useRef([]);
    const audioRef = useRef(null);

    const startRecording = async () => {
        try {
            setIsActiveSubmit(true);
            setAudioURL('')
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (audioRef.current) {
                audioRef.current.srcObject = stream;
            }

            const recorder = new MediaRecorder(stream);
            recordedChunks.current = [];

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.current.push(event.data);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(recordedChunks.current, { type: "audio/mp3" });
                // const file = new File([blob], "recorded-audio.mp3", { type: "audio/mp3" });
                setAudioBlob(blob);
                // setQuizData((prev) => ({
                //     ...prev,
                //     [`${sectionIndex}-${itemIndex}`]: file
                // }));
                // setQuestionId(questionId)
                // setGetKeyIndex(`${sectionIndex}-${itemIndex}`)
                setAudioURL(URL.createObjectURL(blob));
            };

            recorder.start();
            setMediaRecorder(recorder);
            setRecording(true);
            setIsPaused(false);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            audioRef.current.srcObject?.getTracks().forEach((track) => track.stop());
            // setRecording(false);
        }
    };

    const pauseRecording = () => {
        if (mediaRecorder && recording) {
            if (isPaused) {
                mediaRecorder.resume();
            } else {
                mediaRecorder.pause();
            }
            setIsPaused(!isPaused);
        }
    };
    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };
    const handleSubmit = () => {
        const file = new File([audioBlob], "recorded-audio.mp3", { type: "audio/mp3" });
        setQuizData((prev) => ({
            ...prev,
            [`${sectionIndex}-${itemIndex}`]: file
        }));
        setQuestionId(questionId)
        setGetKeyIndex(`${sectionIndex}-${itemIndex}`)
    }
    // const convertUrlToBlob = async (audioUrl) => {
    //     try {
    //         const response = await fetch(audioUrl);
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //         const blob = await response.blob();

    //         // Ensure the correct MIME type
    //         const audioBlob = new Blob([blob], { type: "audio/mpeg" });

    //         const blobUrl = URL.createObjectURL(audioBlob);
    //         setAudioURL(blobUrl);
    //     } catch (error) {
    //         console.error("Error converting URL to Blob:", error);
    //     }
    // };
    // useEffect(() => {
    //     convertUrlToBlob('https://bittrend.shubansoftware.com' + QuizData[`${sectionIndex}-${itemIndex}`])
    // }, []);
    console.log('https://bittrend.shubansoftware.com' + QuizData[`${sectionIndex}-${itemIndex}`])
    console.log('========================>', audioURL)
    return (
        <>
            <div className="media_box audio">
                {!audioURL && (
                    <audio ref={audioRef} autoPlay playsInline className={`${recording && 'w-full h-56 mt-3 border rounded-md'}`} />
                )}
                {/* <p className="text-lg font-semibold mb-3">Audio Recorder</p> */}

                {/* Recording Controls */}
                <div className="media_boxinner">
                    {!recording && (
                        <div className="mediabox_container">
                            <img className="ado_icon" src={AudioLines} />
                            <h6>{'Turn on your mike to start recording.'}</h6>
                            <button className="btn start-btn" onClick={() => startRecording("audio")}>
                                Start
                            </button>
                        </div>
                    )}

                    {recording && !audioURL && (
                        <>
                            <img className="ado_icon2" src={AudioLines2} />
                            <div className="audio_controls">
                                <button onClick={toggleMute} className="btn-dark">
                                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                                </button>
                                <button className="btn-dark">
                                    <FaPlay />
                                </button>
                                <button onClick={stopRecording} className="btn-danger">
                                    <FaStop />
                                </button>
                                <button onClick={pauseRecording} className="btn-dark">
                                    {isPaused ? <FaPlay size={18} /> : <FaPause size={18} />}
                                </button>
                                <button className="btn-dark">
                                    <FaEllipsisH />
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Playback & Upload */}
                {audioURL && (
                    <>
                        <div className="audio_controls">
                            <button onClick={toggleMute} className="btn-dark">
                                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                            </button>
                            <button className="btn-dark">
                                <FaPlay />
                            </button>
                            <button onClick={stopRecording} className="btn-danger">
                                <FaStop />
                            </button>
                            <button onClick={pauseRecording} className="btn-dark">
                                {isPaused ? <FaPlay size={18} /> : <FaPause size={18} />}
                            </button>
                            <button className="btn-dark">
                                <FaEllipsisH />
                            </button>
                        </div>
                        <div className="record_overlay">
                            {/* <audio controls className="w-full">
                            <source src={audioURL} type="audio/mp3" />
                        </audio> */}
                            <h5>Your audio has been recorded successfully.</h5>
                            <div className="button-group">
                                <button onClick={() => startRecording("audio")} className="me-3 btn btn-light">
                                    Re-Record
                                </button>
                                {isActiveSubmit && (
                                    <button onClick={handleSubmit} className="btn btn-primary">
                                        {isLoading ? 'Loading...' : 'Submit'}
                                    </button>
                                )}

                            </div>
                        </div>
                    </>
                )}
                {/* {QuizData[`${sectionIndex}-${itemIndex}`] && !recording && (
                    <div className="mt-3">
                        <audio controls className="w-full">
                            <source src={'https://bittrend.shubansoftware.com' + QuizData[`${sectionIndex}-${itemIndex}`]} type="audio/mp3" />
                        </audio>
                    </div>
                )} */}
            </div>

        </>
    );
};

export default AudioRecorder;
