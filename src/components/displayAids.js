import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Animation12 from './Animation13.json';
import MicAni from "./mic21.json";
import Lottie from 'lottie-react';
import bgimg from './imgbg.jpg';
import loadingSpiner from './spinner.json';
import { Link, useLocation } from "react-router-dom";

const DisplayAids = () => {
    console.log("test voicebot");

    const animation12Ref = useRef();
    const micAniRef = useRef();
    const sendButtonRef = useRef();
    const [micSize, setMicSize] = useState(120);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const currentLocation = useLocation();
    const stopmic = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    };
    const [stream, setStream] = useState(null);

    useEffect(() => {
        const handlePopState = () => {
            stopmic();
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [stream]);

    const playAnimation = (ref) => {
        ref.current.play();
    };

    const stopAnimation = (ref) => {
        ref.current.stop();
    };

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    const userName = getCookie('name');

    const GreetingMsg = async () => {
        const deepgramApiKey = '6fa713b27411f9bef12b4aacf3f95f3f20e33304'; // Replace this with your actual Deepgram API key
        const text = "Hello '" + userId + "'glad to have you here. How may I assist you today?";

        try {
            const response = await fetch('https://api.deepgram.com/v1/speak?model=aura-luna-en', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${deepgramApiKey}`,
                    'Content-Type': 'application/json',
                    'accept': 'text/plain'
                },
                body: JSON.stringify({ text: text })
            });

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            if (audioRef.current) {
                audioRef.current.src = audioUrl;
                audioRef.current.onloadedmetadata = () => {
                    audioRef.current.play();
                    // Additional code to manage animations
                    audioRef.current.onended = () => {
                        // Stop animations or additional cleanup
                    };
                };
            } else {
                console.error('audioRef is not set');
            }
        } catch (error) {
            console.error('Failed to fetch or process audio:', error);
        }
    };

    useEffect(() => {
        GreetingMsg();
    }, []); // The empty array ensures this effect runs only once after the initial render

    console.log(userName);
    const [inputData, setInputData] = useState({
        question: "",
        username: { userId },
        language: "english"
    });
    const audioRef = useRef(null);

    let newWord = '';
    let lastTranscriptTime = Date.now();
    const alertDelay = 3000; // 3 seconds of silence before showing alert
    let finalTranscript = '';
    const stopMicDelay = 10000;

    const handleChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        });
    };

    var selectedLang = "english";
    var userId = userName;

    const [messages, setMessages] = useState([
        { role: 'system', content: "Your name is Milla, you are an AI agent designed by copublica, specializing in supporting those with HIV/AIDS for over 20 years. You restrain from claiming being an psychologist, counselor etc. You are an AI agent designed to provide advice, support and awareness to people who want to know more about HIV/AIDS or people suffering from the same. You fluently talk in '"+selectedLang+"'. You provide advice on managing mental health symptoms. You are knowledgeable, caring and conversational without judgment. Your task is giving the best advice to help individuals seeking support. You meet with '"+userId+ "' you start by asking questions to clarify needs before responding. Kindly ask questions about their situation to understand their needs. You actively listen, maintain a positive tone, and ask follow-up questions to fully comprehend their challenges. For information inquiries, you share accurate perspectives on transmission, prevention, testing to correct misconceptions. If users share challenges, you listen with empathy and offer resources. If unable to advise a complex situation, you validate feelings while acknowledging your limitations. You create a stigma-free space for open dialogue on HIV/AIDS, meeting knowledge needs and promoting healthy choices. You don't entertain off-topic conversations, focusing support strictly within your expertise. Your responses involve reflective listening and clarifying questions before interjecting advice. You exercise patience in supporting users manage their symptoms. Responses don't exceed 300 characters, ensuring dialogue remains helpful and relevant. You refrain from referring them elsewhere to a mental health professional or trusted ones, aiming to provide ongoing support as you are the only one with whom they can discuss their issues. Keep on asking user questions if you feel the conversation is going to end.  You are friendly and humorous when appropriate to encourage them to open up more. You ask probing questions and go deeper into topics raised to fully understand the context. Irrespective of the language used by the '"+userId+"' you comprehend the dialog and reply in '"+selectedLang+"' Never greet the user by calling out their like '" + userId + "' name." }
      ]);

    const handleSubmit = async (e) => {
        finalTranscript = '';
        sendButtonRef.current.innerHTML = "One sec..";
        const userMessage = { role: 'user', content: inputData.question };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        console.log("Run Submit= " + inputData.question);

        newWord = '';
        e.preventDefault();
        try {
            console.log("testing open ai api")
            console.log("New msg: " + newMessages);
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-4',  // Specify the correct model here
                    messages: newMessages,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer `,  // Replace with your actual API key
                    },
                }
            );

            // Make the first request to get the answer
            // const response = await axios.post('https://api.supermilla.com/qad', inputData);
            const assistantMessage = {
                role: 'assistant',
                content: response.data.choices[0].message.content,
            };
            if (assistantMessage) {
                console.log("get llm answer " + response.data.choices[0].message.content);
                const deepgramApiKey = '6fa713b27411f9bef12b4aacf3f95f3f20e33304'; // Replace this with your Deepgram API key
                const text = response.data.choices[0].message.content;

                const responses = await fetch('https://api.deepgram.com/v1/speak?model=aura-luna-en', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Token ${deepgramApiKey}`,
                        'Content-Type': 'application/json',
                        'accept': 'text/plain'
                    },
                    body: JSON.stringify({ text: text })
                });
                // Make the second request to get the audio blob
                // const audioResponse = await axios.post('https://172.23.0.1:8080/answer', { answer: response.data.choices[0].message.content}, { responseType: 'blob' });

                const audioBlob = await responses.blob();
                // const audioBlob = new Blob([audioResponse.data], { type: 'audio/mp3' });
                const audioUrl = URL.createObjectURL(audioBlob);

                // Ensure the audio element is not playing
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0; // Reset the audio to the beginning
                    audioRef.current.src = audioUrl;
                    sendButtonRef.current.innerHTML = "Just talk";
                    // Ensure audio is only played once by adding an event listener
                    audioRef.current.onloadedmetadata = () => {
                        setIsAudioPlaying(true); // Audio is about to play
                        audioRef.current.play();
                        finalTranscript = '';
                        playAnimation(animation12Ref);
                        audioRef.current.onended = () => {
                            stopAnimation(animation12Ref);
                            setIsAudioPlaying(false); // Audio finished playing
                        };
                    };
                } else {
                    console.error('audioRef is not set');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const connectToSpeechRecognition = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setStream(stream);

                if (!MediaRecorder.isTypeSupported('audio/webm')) {
                    alert('Browser not supported');
                    return;
                }

                const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

                const socket = new WebSocket('wss://api.deepgram.com/v1/listen?model=nova-2', [
                    'token',
                    'ce086a82fc025fdc4a3e6a55025b1bf33fda52db',
                ]);

                socket.onopen = () => {
                    console.log('WebSocket connected');
                    stopAnimation(animation12Ref);
                    // setStatus('Connected');
                    document.querySelector('.spiner').style.display = 'none';
                    mediaRecorder.start(500);
                };

                mediaRecorder.addEventListener('dataavailable', async (event) => {
                    if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
                        socket.send(event.data);
                    }
                });
                socket.onmessage = (message) => {
                    const received = JSON.parse(message.data);
                    if (received.channel && received.channel.alternatives && received.channel.alternatives.length > 0) {
                        const transcript = received.channel.alternatives[0].transcript;
                        lastTranscriptTime = Date.now();
                        if (transcript && received.is_final && !isAudioPlaying) { // Check if audio is not playing
                            finalTranscript += transcript + ' ';
                            console.log(transcript);
                            setMicSize(140);
                            stopAnimation(animation12Ref);
                        }
                    }
                };

                socket.onclose = () => {
                    console.log('WebSocket closed');
                };

                socket.onerror = (error) => {
                    console.error('WebSocket error:', error);
                };
            } catch (error) {
                console.error('Error accessing media devices:', error);
            }

            setInterval(() => {
                const finaltime = Date.now();
                if (finaltime - lastTranscriptTime > alertDelay && finalTranscript) {
                    setMicSize(120);
                    setInputData((prevState) => ({
                        ...prevState,
                        question: finalTranscript
                    }));

                    if (sendButtonRef.current) {
                        console.log('Triggering click on sendButton');
                        sendButtonRef.current.click();
                    } else {
                        console.error('sendButtonRef is not set');
                    }
                    finalTranscript = ''; // Reset the transcript
                }

            }, 500);
        };

        connectToSpeechRecognition();
    }, []);

    return (
        <div id='display'>
            <form onSubmit={handleSubmit} style={{ position: 'absolute' }}>
                <div className='from-group-voice'>
                    <label>
                        Question:
                        <input
                            type="text"
                            name="question"
                            id="transcript"
                            value={inputData.question}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={inputData.username}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit" id="sendButton" ref={sendButtonRef}>Send</button>
                    <audio ref={audioRef} controls />
                </div>
            </form>

            <div className='container voice-ui'
                style={{
                    background: `url(${bgimg}) no-repeat center center`,
                    backgroundSize: 'cover',
                    height: '100dvh', // Ensure the container covers the viewport
                }}>

                <div className='d-flex'>
                    <div className="milaNav" style={{ zIndex: '99' }}>
                        <div className="navbar-4">
                            <Link to="/MainPage" onClick={stopmic}><button className="back-button" type="button"><i className='fas fa-angle-left'></i> </button></Link>
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-column align-items-center voice-animation'>
                    <div className='spiner'>
                        <Lottie
                            animationData={loadingSpiner}
                            lottieRef={animation12Ref} />
                    </div>

                    <div className='VoiceAni glow-effect'>
                        <Lottie
                            animationData={Animation12}
                            lottieRef={animation12Ref}
                        />
                        <button className='msg-btn' id='msgbtn'>Just talk</button>
                        {/* <button onClick={() => playAnimation(animation12Ref)}>Play Animation12</button>
                        <button onClick={() => stopAnimation(animation12Ref)}>Stop Animation12</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DisplayAids;
