"use client"; // Ensure this runs only in the browser
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { FFmpeg } from '@ffmpeg/ffmpeg';
// import { fetchFile, createFFmpeg } from '@ffmpeg/util'; 
const ffmpeg = createFFmpeg({
  log: true
});


// const ffmpeg = createFFmpeg({ log: true });

const MediaRecorderComponent = ({ player }) => {
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const chunksRef = useRef([]);

  // Start Recording Video + Audio
  const startRecording = async (type) => {
    setVideoUrl(null);
    setAudioUrl(null);
    chunksRef.current = [];

    try {
      let constraints =
        type === "video"
          ? { video: true, audio: true }
          : { video: false, audio: true };
      setRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        if (type === "video") {
          const mp4Url = await convertToMP4(blob);
          setVideoUrl(mp4Url);
        } else {
          setAudioUrl(url);
        }
      };

      mediaRecorderRef.current.start();
      // setRecording(true);
      setProgress(0);

      // Simulate progress bar
      let progressInterval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 5 : 100));
      }, 1000);

      setTimeout(() => clearInterval(progressInterval), 10000);

      if (type === "video") {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  // Stop Recording
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current?.stream.getTracks().forEach((track) => track.stop());
    setRecording(false);
  };

  // Convert WebM to MP4
  // const convertToMP4 = async (blob) => {
  //   if (!ffmpeg.isLoaded()) {
  //     await ffmpeg.load();
  //   }
  //   setConverting(true);

  //   const inputName = "input.webm";
  //   const outputName = "output.mp4";

  //   ffmpeg.FS("writeFile", inputName, await fetchFile(blob));
  //   await ffmpeg.run("-i", inputName, "-c:v", "libx264", outputName);
  //   const data = ffmpeg.FS("readFile", outputName);
  //   const mp4Blob = new Blob([data.buffer], { type: "video/mp4" });
  //   setConverting(false);

  //   return URL.createObjectURL(mp4Blob);
  // };
  const loadFFmpeg = async () => {
    if (!ffmpeg.isLoaded()) {
      console.log("Loading FFmpeg...");
      try {
        await ffmpeg.load();
        console.log("FFmpeg loaded successfully!");
      } catch (error) {
        console.error("Error loading FFmpeg:", error);
      }
    }
  };
  
  const convertToMP4 = async (blob) => {
    await loadFFmpeg(); // Ensure FFmpeg is loaded before using it
    setConverting(true)
    const inputName = "input.webm";
    const outputName = "output.mp4";
  
    try {
      ffmpeg.FS("writeFile", inputName, await fetchFile(blob));
      await ffmpeg.run("-i", inputName, "-c:v", "libx264", "-preset", "ultrafast", outputName);
      const data = ffmpeg.FS("readFile", outputName);
      const mp4Blob = new Blob([data.buffer], { type: "video/mp4" });
      setConverting(false)
      return URL.createObjectURL(mp4Blob);
    } catch (error) {
      console.error("FFmpeg conversion error:", error);
    }
  };
  

  return (
    <div className="container">
      <motion.h2 animate={{ opacity: [0, 1], y: [-20, 0] }} transition={{ duration: 0.5 }}>
        <h6>{player=='Video'?'Turn on your camera to start recording.':'Turn on your mike to start recording.'}</h6>
      </motion.h2>

      {/* Video Preview */}
      {recording && (
        <motion.div animate={{ scale: [0.9, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
          <video ref={videoRef} autoPlay playsInline className="video-preview"></video>
        </motion.div>
      )}

      {/* Progress Bar */}
      {recording && (
        <div className="progress-bar">
          <motion.div className="progress" animate={{ width: `${progress}%` }} />
        </div>
      )}

      {/* Buttons */}
      <div className="button-group">
        {!recording ? (
          <>
            {player == 'Video' ? (
              <button className="btn start-btn" onClick={() => startRecording("video")}>
                Start
              </button>
            ) : (
              <button className="btn start-btn" onClick={() => startRecording("audio")}>
                Start
              </button>
            )}
          </>
        ) : (
          <button className="btn stop-btn" onClick={stopRecording}>
            ⏹ Stop Recording
          </button>
        )}
      </div>

      {/* Converting Indicator */}
      {converting && <p className="converting-text">Converting to MP4...</p>}

      {/* Playback Section */}
      <div className="playback-section">
        {videoUrl && (
          <div>
            <h3>📽 Recorded Video (MP4)</h3>
            <video src={videoUrl} controls className="playback-video"></video>
            <a href={videoUrl} download="recorded-video.mp4">
              <button className="btn download-btn">⬇ Download Video</button>
            </a>
          </div>
        )}

        {audioUrl && (
          <div>
            <h3>🎧 Recorded Audio</h3>
            <audio src={audioUrl} controls></audio>
            <a href={audioUrl} download="recorded-audio.webm">
              <button className="btn download-btn">⬇ Download Audio</button>
            </a>
          </div>
        )}
      </div>

      <style>
        {`
          .container {
            text-align: center;
            padding: 20px;
            font-family: Arial, sans-serif;
          }
          .video-preview {
            width: 400px;
            margin-top: 10px;
            border-radius: 10px;
          }
          .progress-bar {
            width: 80%;
            height: 8px;
            background: #ccc;
            border-radius: 5px;
            overflow: hidden;
            margin: 10px auto;
          }
          .progress {
            height: 100%;
            background: #4caf50;
          }
          .button-group {
            margin: 10px;
          }
          .btn {
            padding: 10px 20px;
            margin: 5px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: 0.3s;
          }
          .start-btn {
            background: blue;
            color: white;
          }
          .start-btn:hover {
            background: darkblue;
          }
          .stop-btn {
            background: red;
            color: white;
          }
          .stop-btn:hover {
            background: darkred;
          }
          .download-btn {
            background: green;
            color: white;
          }
          .download-btn:hover {
            background: darkgreen;
          }
          .playback-section {
            margin-top: 20px;
          }
          .playback-video {
            width: 400px;
            border-radius: 10px;
          }
          .converting-text {
            font-size: 14px;
            color: orange;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
};

export default MediaRecorderComponent;