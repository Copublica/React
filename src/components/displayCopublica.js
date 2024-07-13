import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Animation12 from './Animation13.json';
import Lottie from 'lottie-react';
import bgimg from './imgbg.jpg';
import loadingSpiner from './spinner.json'
import { Link } from "react-router-dom";
const deepgramApiKey = '6fa713b27411f9bef12b4aacf3f95f3f20e33304'; // Replace this with your Deepgram API key
const questions = [
    "Hold on for a minute! Before I answer that, could you please provide some feedback to help me improve? Your input is valuable to us. How well do you feel I listened to and understood your concerns - very well, somewhat well, or not well?",
    "Was our conversation helpful for your situation - very helpful, somewhat helpful, or not at all helpful?",
    "How satisfied are you overall with our conversation - Satisfied, neutral or dissatisfied?",
    "How likely are you to recommend me to others who need support - extremely likely, somewhat likely, or not likely?",
    "On a scale of 1 to 5, how would you rate my ability to listen to and understand your concerns? 1 signifies Not Well and 5 signifies Very Well"
];
let countConversitions = 0;
let countQuestion = 0;

const DisplayCopublica = () => {
    console.log("test voicebot");
    const animation12Ref = useRef();
    const sendButtonRef = useRef();
    const micAniRef = useRef();
    const [micSize, setMicSize] = useState(120);

    console.log(countConversitions);


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

    console.log(userName);
    const [inputData, setInputData] = useState({
        question: "",
        username: { userId },
        language: "english"
    });
    const audioRef = useRef(null);
   

    let newWord = '';
    let lastTranscriptTime = Date.now();
    const alertDelay = 2500; // 3 seconds of silence before showing alert
    let finalTranscript = '';
    const stopMicDelay = 10000;


    const handleChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        });
    };
    var selectedLang = "english";
    var userId = userName
    const [messages, setMessages] = useState([
        { role: 'system', content: "You are Milla, an AI support agent built by copublica, here to assist users in learning more about our company, our services, and how we can cater to their needs. You are currently interacting with '" + userId + "'. Your goal is to provide comprehensive and accurate information in a friendly and professional manner. Start the conversation with an opening such as: Hello! I'm Milla, your AI support agent from copublica. First, let me know what you'd like to learn more about today. Are you interested in our consultancy services or our AI voicebot solutions? If the user is interested in our consultancy services, provide details on how we offer tailored consultancy for various industries, focusing on training, employee engagement, and large-scale project management. Explain the specifics of how we can help their organization achieve its goals through our personalized consultancy services. If the user wants to know more about our AI voicebot solutions, describe how our AI conversational bots enhance communication and engagement across sectors like education, hospitality, and mental health. Highlight the unique capabilities of our AI voicebots, such as empathy, multilingual support, and insightful interactions. Once the user indicates their area of interest, provide detailed information and answer any follow-up questions they may have. Ensure to ask follow-up questions to better understand their specific needs and how copublica can help them. Use the context provided to tailor your responses and suggest solutions that best benefit them from our services. Remember, you are here to help users by understanding their needs and staying focused. Clarify that questions related to academics, emotions, or anything beyond the value proposition are outside your scope. Your primary focus is to ensure users get the information they need about copublica's services and how we can cater to their specific needs.answers should not be more than 350 characters." }
    ]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        document.getElementById('msgbtn').innerHTML="One sec.."
        countConversitions++;
      
        newWord = '';
        
        if(countConversitions==2){
            var lastmsg=inputData.question;
        }
        if (countConversitions > 2 && countConversitions < 6) {
            const Questiontext = questions[countQuestion];
            countQuestion++

            const responses = await fetch('https://api.deepgram.com/v1/speak?model=aura-luna-en', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${deepgramApiKey}`,
                    'Content-Type': 'application/json',
                    'accept': 'text/plain'
                },
                body: JSON.stringify({ text: Questiontext })
            });
            const audioBlob = await responses.blob();
            // const audioBlob = new Blob([audioResponse.data], { type: 'audio/mp3' });
            const audioUrl = URL.createObjectURL(audioBlob);
       
            // Ensure the audio element is not playing
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0; // Reset the audio to the beginning
                audioRef.current.src = audioUrl;

                // Ensure audio is only played once by adding an event listener
                audioRef.current.onloadedmetadata = () => {
                    audioRef.current.play();

                    playAnimation(animation12Ref)
                    // document.getElementById('transcription').textContent = "";
                    // typeText('transcription', response.data.answer);

                    audioRef.current.onended = () => {
                        stopAnimation(animation12Ref)
                    };

                };
            } else {
                console.error('audioRef is not set');
            }

        }
        else {
            if(countConversitions==6)
            {
                const userMessage = { role: 'user', content: lastmsg };
            }
            else{
                const userMessage = { role: 'user', content: inputData.question };
            }
            const userMessage = { role: 'user', content: inputData.question };
            const newMessages = [...messages, userMessage];
            setMessages(newMessages);
            console.log("Run Submit= " + inputData.question);
            try {
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

                    console.log("get llm answer " + response.data.choices[0].message.content,);

                    const AItext = response.data.choices[0].message.content;



                    const responses = await fetch('https://api.deepgram.com/v1/speak?model=aura-luna-en', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Token ${deepgramApiKey}`,
                            'Content-Type': 'application/json',
                            'accept': 'text/plain'
                        },
                        body: JSON.stringify({ text: AItext })
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

                        // Ensure audio is only played once by adding an event listener
                        audioRef.current.onloadedmetadata = () => {
                            audioRef.current.play();

                            playAnimation(animation12Ref)
                            // document.getElementById('transcription').textContent = "";
                            // typeText('transcription', response.data.answer);

                            audioRef.current.onended = () => {
                                stopAnimation(animation12Ref)
                            };

                        };
                    } else {
                        console.error('audioRef is not set');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }


    };


    const stopmic = () => {

        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    }
    const [stream, setStream] = useState(null);
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

                    stopAnimation(animation12Ref)
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
                    
                    if (received && received.channel && received.channel.alternatives && received.channel.alternatives.length > 0) {
                        const transcript = received.channel.alternatives[0].transcript;
                
                        if (transcript && received.is_final) {
                            lastTranscriptTime = Date.now();
                            finalTranscript += transcript + ' ';
                            console.log(transcript);
                
                            setMicSize(140);
                            stopAnimation(animation12Ref);
                        }
                    } else {
                        console.error('Received data is missing expected properties:', received);
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
                if (Date.now() - lastTranscriptTime > alertDelay && finalTranscript) {
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
                    //   alert('Transcription complete: ' + finalTranscript);
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
                            lottieRef={animation12Ref}
                        />


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
                    {/* <div className='trascription text-dark px-3'>
                        <p id='transcription'>Glad to have you here. How can I help you today?</p>
                    </div> */}

                    {/* <div className='VoiceAni voice-ani' style={{ position: 'absolute', bottom: '0px' }}>
                        <Lottie
                            animationData={MicAni}
                            lottieRef={micAniRef}
                            style={{ width: micSize }}
                        />
                        <div className='round-animation'>

                        </div> */}
                        {/* <button onClick={() => playAnimation(micAniRef)}>Play MicAni</button>
                        <button onClick={() => stopAnimation(micAniRef)}>Stop MicAni</button> */}
                    {/* </div> */}
                </div>
            </div>
            {/* <div className='container-milla'>
                <img src='assets/images/mill2.gif' width={300} />
                <img src='assets/images/Animation - 1715917982588.gif' className='mic-img' width={90}></img>
            </div> */}

        </div>
    );
};

export default DisplayCopublica;