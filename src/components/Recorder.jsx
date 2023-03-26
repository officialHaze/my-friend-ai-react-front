import React, { useEffect, useState } from "react";
import axios from "axios";
import TypingDots from "./TypingDots";
import "./recorder.css";

const formData = new FormData();
const constraint = { audio: true };
let mediaRecorder;
let setValueForAIRes;

const getTranscriptedData = async (aiResponse, audioLink) => {
	try {
		const { data } = await axios({
			method: "POST",
			// url: "http://localhost:8000/api/transcribe-audio/",
			url: "https://chatai-backend-officialhaze.onrender.com/api/transcribe-audio/",
			data: formData,
		});
		aiResponse(true, data.detail, audioLink);
		return "transcription successfull";
	} catch (err) {
		throw err;
	}
};

export default function Recorder({ aiResponse, aiSpeaking, isSpeechProcessing }) {
	setValueForAIRes = aiResponse;

	const [mediaRecorderState, setMediaRecorderState] = useState();
	const [chunks, setChunks] = useState([]);
	const [audioBlob, setAudioBlob] = useState();
	const [audioLink, setAudioLink] = useState();
	const [transcriptionSuccess, setTranscriptionSuccess] = useState(null);
	const [isRecording, setIsRecording] = useState(false);

	//getting user permission to use media devices
	useEffect(() => {
		if (navigator.mediaDevices) {
			try {
				const getUserMedia = async () => {
					const mediaStream = await navigator.mediaDevices.getUserMedia(constraint);
					console.log(mediaStream);
					mediaRecorder = new MediaRecorder(mediaStream);
				};
				getUserMedia();
			} catch (err) {
				console.log(err.message);
			}
		}
	}, []);

	//triggers when media recorder state changes to inactive
	useEffect(() => {
		if (mediaRecorderState === "inactive") {
			mediaRecorder.ondataavailable = e => {
				console.log(e.data);
				setChunks(prevObj => {
					return [...prevObj, e.data];
				});
			};
		}
	}, [mediaRecorderState]);

	useEffect(() => {
		if (chunks.length >= 1) {
			const blob = new Blob(chunks, { type: "audio/mp3; codecs=opus" });
			const audioLink = URL.createObjectURL(blob);
			setAudioBlob(blob);
			setAudioLink(audioLink);
			setChunks([]);
		}
	}, [chunks]);

	//getting the transcribed text from server and calling a function to get AI response
	useEffect(() => {
		if (audioBlob) {
			console.log(audioBlob);
			formData.append("audio_file", audioBlob, "voice_record.mp3");
			getTranscriptedData(setValueForAIRes, audioLink)
				.then(res => {
					console.log(res);
					setTranscriptionSuccess(true);
				})
				.catch(err => {
					console.log(err.message);
				});
		}
	}, [audioBlob, audioLink]);

	//displaying the record button only when ai finishes or it is stopped while speaking to prevent spamming
	useEffect(() => {
		if (!aiSpeaking) {
			setIsRecording(false);
		}
	}, [aiSpeaking]);

	//starts recording and changing the media recorder state
	const startRecord = () => {
		setIsRecording(true);
		mediaRecorder.start();
		console.log(mediaRecorder.state);
		setMediaRecorderState(mediaRecorder.state);
	};

	//stops recording media and changes its state
	const stopRecord = () => {
		if (mediaRecorder.state !== "inactive") {
			setTranscriptionSuccess(false);
			isSpeechProcessing(true);
			mediaRecorder.stop();
			setMediaRecorderState(mediaRecorder.state);
		} else {
			console.log("mediaRecorder.state is inactive");
		}
	};

	return (
		<div className="record-button-holder">
			{!isRecording ? (
				<i
					className="fa-solid fa-microphone"
					onClick={startRecord}
				/>
			) : transcriptionSuccess === false ? (
				<TypingDots />
			) : (
				<i
					className="fa-regular fa-circle-stop"
					onClick={stopRecord}
				/>
			)}
		</div>
	);
}
