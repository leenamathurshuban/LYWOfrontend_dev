import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaStop, FaVideo, FaUpload, FaVolumeUp, FaEllipsisH, FaVolumeMute } from "react-icons/fa";
// import { FaVolumeUp, FaPlay, FaStop, FaPause, FaEllipsisH } from "react-icons/fa";

const VideoRecorder = ({ sectionIndex, itemIndex, questionId, type, QuizData, setQuizData, setQuestionId, setGetKeyIndex, isLoading }) => {
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const videoRef = useRef(null);
  const recordedChunks = useRef([]);

  const startRecording = async () => {
    try {
      setVideoURL('')
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const recorder = new MediaRecorder(stream);
      recordedChunks.current = []; // Reset recorded data

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });

        // const file = new File([blob], "recorded-video.webm", { type: "video/webm" });
        // setQuizData((prev) => ({
        //   ...prev,
        //   [`${sectionIndex}-${itemIndex}`]: file
        // }));
        // setQuestionId(questionId)
        // setGetKeyIndex(`${sectionIndex}-${itemIndex}`)
        setVideoBlob(blob);
        setVideoURL(URL.createObjectURL(blob));
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
      setIsPaused(false);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      // setRecording(false);
      videoRef.current.srcObject?.getTracks().forEach((track) => track.stop());
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
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  const handleSubmit = () => {
    const file = new File([videoBlob], "recorded-video.webm", { type: "video/webm" });
    setQuizData((prev) => ({
      ...prev,
      [`${sectionIndex}-${itemIndex}`]: file
    }));
    setQuestionId(questionId)
    setGetKeyIndex(`${sectionIndex}-${itemIndex}`)
  }
  console.log(videoURL)
  return (
    <div className="media_box video">
      {!videoURL && (
        <video ref={videoRef} autoPlay playsInline className={`${recording && 'w-full h-56 mt-3 border rounded-md'}`} />
      )}

      {/* <video ref={videoRef} autoPlay playsInline className={`${recording && 'w-full h-56 mt-3 border rounded-md'}`} /> */}

      <div className="media_boxinner">
        {!recording && (
          <>
            <div className="mediabox_container">
              <h6>{'Turn on your mike to start recording.'}</h6>
              <button onClick={startRecording} className="btn start-btn">
                Start
              </button>
            </div>
          </>
        )}
        {recording && !videoURL && (
          <>
            <div className="video_controls">
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
      {videoURL && (
        <>
          <video controls className="w-full">
            <source src={videoURL} type="video/mp4" />
          </video>
          <div className="record_overlay">
            <h5>Your video has been recorded successfully.</h5>
            <div className="button-group">
              <button onClick={startRecording} className="me-3 btn btn-light">
                Re-Record
              </button>
              <button onClick={handleSubmit} className="btn btn-primary">
                {isLoading ? 'Loading...' : 'Submit'}
              </button>
            </div>
          </div>
        </>
      )}
      {/* {QuizData[`${sectionIndex}-${itemIndex}`] && !recording && (
        <div className="mt-3">
          <video controls className="w-full">
            <source src={'https://bittrend.shubansoftware.com' + QuizData[`${sectionIndex}-${itemIndex}`]} type="video/mp4" />
          </video>
        </div>
      )} */}
    </div>
  );
};

export default VideoRecorder;